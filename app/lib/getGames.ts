import matter from "gray-matter";
import type { Game } from "./types";
import { cache } from "react";
import path from "path";
import fs from "fs/promises";

const getFiles = async (dir: string) => {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = (await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  )) as string[];
  return files.flat().filter((f) => !f.includes(".DS_Store"));
};

export const getGames = cache(async () => {
  const files = await getFiles("./mdx/");
  return Promise.all(
    files
      .filter((f) => path.extname(f) === ".mdx")
      .map(async (fp) => {
        const game = await fs.readFile(fp, "utf8");
        const { data } = matter(game);
        return data as Game;
      })
  );
});
