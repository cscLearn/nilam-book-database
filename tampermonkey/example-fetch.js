// Tampermonkey metadata needed:
// @grant   GM_xmlhttpRequest
// @connect 127.0.0.1

const DATA_URL = "http://127.0.0.1:8765/data/merged/books-all.json";

function loadBooks() {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: DATA_URL,
      onload: (response) => resolve(JSON.parse(response.responseText)),
      onerror: reject
    });
  });
}

async function getRandomBook({ source = "synthetic", category, language = "bm" } = {}) {
  const books = await loadBooks();
  const matches = books.filter((book) => {
    if (source && book.source !== source) return false;
    if (category && book.category !== category) return false;
    if (language && book.language !== language) return false;
    return true;
  });

  return matches[Math.floor(Math.random() * matches.length)];
}

// Example:
// const book = await getRandomBook({ category: "Fiksyen", language: "bm" });
// console.log(book);
