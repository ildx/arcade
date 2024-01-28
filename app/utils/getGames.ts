import matter from 'gray-matter';
import path from 'path';
import { cache } from 'react';

import fs from 'fs/promises';

export type Game = {
  name: string;
  owner: string;
  platform: Platform;
};

export type Platform = Record<'brand' | 'console', string>;

const EXTENSION = 'mdx';
const FILE_PATH = `./${EXTENSION}/`;

const getFiles = async (dir: string) => {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = (await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  )) as string[];
  return files.flat().filter((f) => !f.includes('.DS_Store'));
};

export const getGames = cache(async () => {
  const files = await getFiles(FILE_PATH);
  return Promise.all(
    files
      .filter((f) => path.extname(f) === `.${EXTENSION}`)
      .map(async (fp) => {
        const game = await fs.readFile(fp, 'utf8');
        const { data } = matter(game);
        return data as Game;
      }),
  );
});
