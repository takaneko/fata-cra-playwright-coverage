import path from "path";
import { mkdir, rm, readFile, writeFile } from "fs/promises";
import glob from "glob";
import { createCoverageMap } from "istanbul-lib-coverage";

export default async function () {
  // Collect coverage only when you run `npm run test:coverage`.
  if (process.env.COVERAGE === "true") {
    // Cleanup .nyc_output directory.
    const istanbulPath = path.resolve(".nyc_output");
    await rm(istanbulPath, { recursive: true, force: true });

    const coveragePath = path.resolve(".coverage");
    const coverageFiles = glob.sync(path.join(coveragePath, "*.json"));

    // Merge coverage files for each test.
    const map = createCoverageMap({});
    for (const file of coverageFiles) {
      const raw = await readFile(file);
      map.merge(JSON.parse(raw.toString()));
    }

    await mkdir(istanbulPath);

    // Write `.nyc_output/out.json` for nyc report
    await writeFile(path.join(istanbulPath, "out.json"), JSON.stringify(map));
  }
}
