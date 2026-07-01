import { readFile } from "node:fs/promises";
import path from "node:path";

const required = [
  "id",
  "source",
  "category",
  "language",
  "title",
  "author",
  "publisher",
  "year",
  "pages",
  "isbn",
  "isbn_type",
  "rumusan",
  "lesson",
  "quality",
  "created",
  "version"
];

function isValidIsbn13(isbn) {
  const compact = String(isbn).replaceAll("-", "");
  if (!/^978\d{10}$/.test(compact)) return false;
  const digits = [...compact].map(Number);
  const sum = digits.slice(0, 12).reduce((total, digit, index) => total + digit * (index % 2 === 0 ? 1 : 3), 0);
  return digits[12] === (10 - (sum % 10)) % 10;
}

async function main() {
  const books = JSON.parse(await readFile(path.join("data", "merged", "books-all.json"), "utf8"));
  const ids = new Set();

  for (const book of books) {
    for (const key of required) {
      if (!(key in book)) throw new Error(`${book.id ?? "unknown"} missing ${key}`);
    }
    if (ids.has(book.id)) throw new Error(`Duplicate id ${book.id}`);
    ids.add(book.id);
    if (!["verified", "synthetic"].includes(book.source)) throw new Error(`${book.id} has invalid source`);
    if (!["Fiksyen", "Bukan Fiksyen"].includes(book.category)) throw new Error(`${book.id} has invalid category`);
    if (!["bm", "en", "zh"].includes(book.language)) throw new Error(`${book.id} has invalid language`);
    if (!isValidIsbn13(book.isbn)) throw new Error(`${book.id} has invalid ISBN-13`);
    if (book.source === "synthetic" && book.isbn_type !== "synthetic") throw new Error(`${book.id} must mark synthetic ISBN`);
  }

  console.log(`Validated ${books.length} books.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
