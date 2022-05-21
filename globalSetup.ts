import path from "path";
import { mkdir, rm } from "fs/promises";

export default async function () {
  // Collect coverage only when you run `npm run test:coverage`.
  if (process.env.COVERAGE === "true") {
    const coveragePath = path.resolve(".coverage");

    // Cleanup coverage directory.
    await rm(coveragePath, { recursive: true, force: true });
    await mkdir(coveragePath);
  }
}
