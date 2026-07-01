# NILAM Book Database

Ready-to-fetch JSON book data for NILAM-style reading records.

## Data Layers

- `data/verified/`: real books only. ISBN and metadata must be checked before adding.
- `data/synthetic/`: generated books with valid ISBN-13 format, clearly marked as synthetic.
- `data/merged/`: generated output for Tampermonkey or other clients.

Each book keeps these filter fields:

- `source`: `verified` or `synthetic`
- `category`: `Fiksyen` or `Bukan Fiksyen`
- `language`: `bm`, `en`, or `zh`

## Use From Tampermonkey

Use the raw GitHub URL after pushing this folder to GitHub:

```javascript
const DATA_URL = "https://raw.githubusercontent.com/YOUR_NAME/nilam-book-database/main/data/merged/books-all.json";
```

Category-specific files:

```javascript
const FIKSYEN_URL = "https://raw.githubusercontent.com/YOUR_NAME/nilam-book-database/main/data/merged/books-fiksyen.json";
const BUKAN_FIKSYEN_URL = "https://raw.githubusercontent.com/YOUR_NAME/nilam-book-database/main/data/merged/books-bukan-fiksyen.json";
```

## Build

```bash
npm run build
```

This regenerates synthetic data, merges all layers, and validates the output.

## Important

Synthetic ISBN values are format-valid ISBN-13 numbers for testing and automation. They are not claims that the generated books are real published books.
