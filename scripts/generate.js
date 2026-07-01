import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const created = "2026-07-01";
const version = "1.0";

const specs = [
  {
    language: "bm",
    fiction: [
      ["Kisah Sang Tupai", "Aina Farhana", "Pelangi", 2018, 24, "Seekor tupai kecil belajar berkongsi makanan dengan rakan-rakannya di hutan.", "Kita perlu berkongsi dan membantu kawan yang memerlukan."],
      ["Burung Kecil Yang Berani", "Nur Hafizah", "Sasbadi", 2020, 28, "Seekor burung kecil berani menolong anak haiwan lain ketika hujan lebat.", "Keberanian yang baik ialah berani membuat perkara yang betul."],
      ["Hadiah Untuk Ibu", "Siti Maisarah", "Pelangi", 2016, 20, "Seorang kanak-kanak menyediakan hadiah ringkas untuk menghargai ibunya.", "Kasih sayang boleh ditunjukkan melalui usaha kecil yang ikhlas."],
      ["Aman dan Layang-layang", "Zulhilmi Ahmad", "Cerdik Publications", 2022, 32, "Aman belajar bersabar apabila layang-layangnya rosak sebelum pertandingan.", "Sabar dan usaha membantu kita menyelesaikan masalah."]
    ],
    nonfiction: [
      ["Mari Kenal Cuaca", "Dr. Farid Omar", "Sasbadi", 2019, 24, "Buku ini menerangkan hujan, panas, angin dan awan dengan contoh mudah.", "Memahami cuaca membantu kita merancang aktiviti harian."],
      ["Haiwan Di Sekeliling Kita", "Rohana Ali", "Pelangi", 2017, 28, "Pembaca mengenali haiwan jinak dan liar serta tempat tinggalnya.", "Kita perlu menyayangi haiwan dan menjaga alam sekitar."],
      ["Jimat Air Setiap Hari", "Nadia Rahim", "Ilmu Bakti", 2021, 20, "Buku ini memberi cara mudah menjimatkan air di rumah dan sekolah.", "Sumber air perlu dijaga kerana penting untuk semua hidupan."],
      ["Makanan Sihat Untuk Saya", "Azman Yusof", "Cerdik Publications", 2023, 24, "Buku ini memperkenalkan kumpulan makanan dan kepentingan pemakanan seimbang.", "Makanan sihat membantu badan kuat dan minda cerdas."]
    ]
  },
  {
    language: "en",
    fiction: [
      ["The Helpful Bird", "Emily Carter", "Ladybird", 2018, 24, "A small bird helps lost animals find their way home before sunset.", "Helping others can make a community safer and kinder."],
      ["Mina and the Red Kite", "Sarah Collins", "Oxford", 2020, 28, "Mina fixes her kite with patience and shares it with her friends.", "Patience and sharing can turn a problem into a happy day."],
      ["The Little Raincoat", "Anna Brooks", "Scholastic", 2017, 20, "A child learns to be prepared when dark clouds appear before school.", "Good preparation helps us face changes calmly."],
      ["Tom's Garden Surprise", "Michael Reed", "Ladybird", 2022, 32, "Tom discovers that caring for plants takes time and responsibility.", "Living things grow well when we care for them every day."]
    ],
    nonfiction: [
      ["My First Book of Weather", "Helen Ward", "Oxford", 2019, 24, "This book explains sun, rain, wind and clouds using simple examples.", "Learning about weather helps us make safe daily choices."],
      ["Animals Around Us", "Peter Grant", "Scholastic", 2016, 28, "Readers learn about common animals, their homes and basic habits.", "Animals should be treated with care and respect."],
      ["Saving Water at Home", "Laura Hill", "Oxford", 2021, 20, "The book gives easy ways to avoid wasting water at home.", "Small daily actions can protect important natural resources."],
      ["Healthy Food for Kids", "Rachel Green", "Ladybird", 2023, 24, "Children learn about fruits, vegetables, grains and balanced meals.", "Healthy food gives energy for learning and playing."]
    ]
  },
  {
    language: "zh",
    fiction: [
      ["小熊学礼貌", "林小慧", "明天出版社", 2018, 24, "小熊在学校和朋友相处时，慢慢学会说谢谢和对不起。", "有礼貌能让人与人之间相处得更愉快。"],
      ["小鸭过马路", "陈美玲", "二十一世纪出版社", 2020, 28, "小鸭在妈妈的带领下学习看红绿灯，安全过马路。", "遵守交通规则可以保护自己和别人。"],
      ["会分享的月饼", "王丽萍", "长江少年儿童出版社", 2017, 20, "中秋节时，小女孩把月饼分给邻居和朋友。", "分享能带来快乐，也能拉近彼此的距离。"],
      ["勇敢的小种子", "李安琪", "明天出版社", 2022, 32, "一颗小种子经历风雨，最后长成美丽的小花。", "遇到困难时坚持下去，就会慢慢成长。"]
    ],
    nonfiction: [
      ["认识天气", "周明华", "二十一世纪出版社", 2019, 24, "本书介绍晴天、雨天、刮风和云的变化。", "认识天气能帮助我们安排生活和活动。"],
      ["身边的小动物", "黄佳怡", "长江少年儿童出版社", 2016, 28, "孩子通过图片和短文认识常见动物的特点。", "爱护动物也是爱护我们的生活环境。"],
      ["节约用水", "刘文杰", "明天出版社", 2021, 20, "本书说明在家里和学校节约用水的方法。", "水资源很珍贵，人人都应该珍惜。"],
      ["健康饮食小知识", "张雅雯", "二十一世纪出版社", 2023, 24, "孩子学习蔬菜、水果和均衡饮食的重要性。", "健康饮食能让身体更强壮，学习更有精神。"]
    ]
  }
];

function isbn13(seed) {
  const body = `978${String(seed).padStart(9, "0")}`;
  const sum = [...body].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0);
  const isbn = `${body}${(10 - (sum % 10)) % 10}`;
  return `${isbn.slice(0, 3)}-${isbn.slice(3, 6)}-${isbn.slice(6, 9)}-${isbn.slice(9, 12)}-${isbn.slice(12)}`;
}

function makeBook([title, author, publisher, year, pages, rumusan, lesson], source, categorySlug, language, index) {
  const category = categorySlug === "fiksyen" ? "Fiksyen" : "Bukan Fiksyen";
  const langCode = language;
  const srcCode = source === "synthetic" ? "syn" : "ver";
  const catCode = categorySlug === "fiksyen" ? "fik" : "bf";
  const id = `${srcCode}-${catCode}-${langCode}-${String(index).padStart(6, "0")}`;

  return {
    id,
    source,
    category,
    language,
    title,
    author,
    publisher,
    year,
    pages,
    isbn: isbn13(700000000 + index),
    isbn_type: source === "verified" ? "verified" : "synthetic",
    rumusan,
    lesson,
    quality: source === "verified" ? "verified" : "high",
    created,
    version
  };
}

async function main() {
  let index = 1;

  for (const source of ["verified", "synthetic"]) {
    for (const spec of specs) {
      for (const [categorySlug, rows] of [["fiksyen", spec.fiction], ["bukan-fiksyen", spec.nonfiction]]) {
        const dir = path.join("data", source, categorySlug);
        await mkdir(dir, { recursive: true });
        const books = source === "verified" ? [] : rows.map((row) => makeBook(row, source, categorySlug, spec.language, index++));
        await writeFile(path.join(dir, `books-${spec.language}.json`), `${JSON.stringify(books, null, 2)}\n`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
