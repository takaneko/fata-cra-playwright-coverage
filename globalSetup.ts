import path from "path";
import { mkdir, rm } from "fs/promises";

export default async function () {
  if (process.env.COVERAGE === "true") {
    const coveragePath = path.resolve(".coverage");

    await rm(coveragePath, { recursive: true, force: true });
    await mkdir(coveragePath);
  }
}
