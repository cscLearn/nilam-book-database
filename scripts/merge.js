import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const layers = ["verified", "synthetic"];
const categories = ["fiksyen", "bukan-fiksyen"];
const languages = ["bm", "en", "zh"];

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function main() {
  const all = [];
  const byCategory = new Map(categories.map((category) => [category, []]));

  for (const layer of layers) {
    for (const category of categories) {
      for (const language of languages) {
        const file = path.join("data", layer, category, `books-${language}.json`);
        const books = await readJson(file);
        all.push(...books);
        byCategory.get(category).push(...books);
      }
    }
  }

  await mkdir(path.join("data", "merged"), { recursive: true });
  await writeFile(path.join("data", "merged", "books-all.json"), `${JSON.stringify(all, null, 2)}\n`);
  await writeFile(path.join("data", "merged", "books-fiksyen.json"), `${JSON.stringify(byCategory.get("fiksyen"), null, 2)}\n`);
  await writeFile(path.join("data", "merged", "books-bukan-fiksyen.json"), `${JSON.stringify(byCategory.get("bukan-fiksyen"), null, 2)}\n`);

  const files = await readdir(path.join("data", "merged"));
  console.log(`Merged ${all.length} books into ${files.length} files.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
