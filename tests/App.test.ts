import { test, expect } from "@playwright/test";
import { fromJSON } from "convert-source-map";
import v8ToIstanbul from "v8-to-istanbul";
import { randomUUID } from "crypto";
import path from "path";
import { writeFile } from "fs/promises";

if (process.env.COVERAGE === "true") {
  test.beforeEach(async ({ page }) => {
    await page.coverage.startJSCoverage();
  });

  test.afterEach(async ({ page, request }) => {
    const coverage = await page.coverage.stopJSCoverage();

    for (const entry of coverage) {
      // get source map file from webpack-dev-server
      const sourceMapResponse = await request.get(`${entry.url}.map`);

      const sourcemapConverter = fromJSON(await sourceMapResponse.text());
      const converter = v8ToIstanbul("", 0, {
        source: entry.source,
        originalSource: "",
        // set sourceMap
        sourceMap: { sourcemap: sourcemapConverter.sourcemap },
      });
      await converter.load();
      converter.applyCoverage(entry.functions);

      const coveragePath = path.resolve(".coverage");
      await writeFile(
        path.join(coveragePath, `${randomUUID()}.json`),
        JSON.stringify(converter.toIstanbul())
      );
    }
  });
}

test("Show initial page.", async ({ page }) => {
  await page.goto("/");

  // assert initial page
  await expect(page.locator("label")).toHaveText(
    "Add message, submit by enter."
  );
  await expect(page.locator("table > tbody > tr > td")).toHaveText(
    "no messages."
  );
});

test("Input message and enter, push messages to table.", async ({ page }) => {
  await page.goto("/");

  // submit first message
  await page.fill("#AddMessage", "Hello, world!");
  await page.keyboard.press("Enter");

  await expect(page.locator("table > tbody > tr > td")).toHaveText(
    "Hello, world!"
  );

  // submit second message
  await page.fill("#AddMessage", "134");
  await page.keyboard.press("Enter");

  // latest message exists on top
  await expect(
    page.locator("table > tbody > tr:nth-of-type(1) > td")
  ).toHaveText("134");
  await expect(
    page.locator("table > tbody > tr:nth-of-type(2) > td")
  ).toHaveText("Hello, world!");
});
