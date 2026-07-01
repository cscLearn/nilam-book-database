import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const created = "2026-07-01";
const version = "1.0";

// Helper to format text helper (Capitalize words)
function capitalizeWords(str) {
  return str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// Helper to select random element from array (using seed/deterministic approach or simple math random)
function getRandom(arr, index) {
  return arr[index % arr.length];
}

// ----------------------------------------------------
// 1. Malay (bm) Generator
// ----------------------------------------------------
function generateBm(categorySlug) {
  const books = [];
  const authors = ["Noraini Ahmad", "Siti Hajar", "Zalina Hassan", "Aina Farhana", "Nur Hafizah", "Siti Maisarah", "Zulhilmi Ahmad", "Dr. Farid Omar", "Rohana Ali", "Nadia Rahim", "Azman Yusof", "Ahmad Faisal", "Khairul Anuar", "Fatimah Zahra", "Mohd Syamil", "Rosli Harun", "Faridah Ismail", "Hazim Shah", "Aishah Rahman", "Zulkifli Musa"];
  const publishers = ["Penerbitan Pelangi Sdn. Bhd.", "Pustaka Sri Dunia", "Sasbadi Sdn. Bhd.", "Cerdik Publications", "Dewan Bahasa dan Pustaka", "Penerbitan Fajar Bakti", "PTS Publishing House", "Pustaka Bestari", "Penerbitan Ilmu Bakti", "Karya Bestari"];

  if (categorySlug === "fiksyen") {
    const animals = ["arnab", "kucing", "burung", "tupai", "kura-kura", "monyet", "anak ayam", "singa", "gajah", "semut", "belalang", "kancil", "anjing", "itik", "katak", "kambing", "lembu", "kuda", "panda", "koala"];
    const sifat = ["jujur", "berani", "rajin", "bijak", "baik hati", "sabar", "pemurah", "cerdik", "sopan", "amanah", "prihatin", "setia", "ceria", "ikhlas", "bersih", "pemaaf", "taat", "adil", "tegas", "rendah diri"];
    const sifatNoun = {
      "jujur": "kejujuran", "berani": "keberanian", "rajin": "kerajinan", "bijak": "kebijaksanaan",
      "baik hati": "kebaikan hati", "sabar": "kesabaran", "pemurah": "sifat pemurah", "cerdik": "kecerdikan",
      "sopan": "kesopanan", "amanah": "sifat amanah", "prihatin": "sifat prihatin", "setia": "kesetiaan",
      "ceria": "keceriaan", "ikhlas": "keikhlasan", "bersih": "kebersihan", "pemaaf": "sifat pemaaf",
      "taat": "ketaatan", "adil": "keadilan", "tegas": "ketegasan", "rendah diri": "sifat rendah diri"
    };
    const nama = ["Mimi", "Ali", "Aman", "Siti", "Raju", "Mei Mei", "Zaki", "Hafiz", "Sarah", "Kumar", "Daniel", "Sofea", "Adam", "Fatimah", "Aizat", "Aina", "Aiman", "Chong", "Suresh", "Bella"];
    const benda = ["kotak", "pensel", "beg", "buku", "topi", "kasut", "payung", "basikal", "layang-layang", "bola", "cermin", "kunci", "jam", "lukisan", "pena", "dompet", "pasu", "selimut", "bantal", "gelang"];
    const tempat = ["Hutan Hijau", "Kampung Damai", "Pulau Indah", "Taman Bunga", "Sekolah Impian", "Bukit Ceria", "Kampung Sentosa", "Tasik Indah", "Lembah Gemilang", "Taman Harmony"];
    const aktiviti = ["membantu rakan", "berkongsi makanan", "menabung wang", "belajar rajin", "menjaga kebersihan", "menghormati orang tua", "bercakap benar", "menjaga alam sekitar", "bertolak ansur", "mendengar nasihat", "menyiram bunga", "membantu ibu", "membaca buku", "bersenam pagi", "makan makanan sihat"];
    const aktivitiNoun = {
      "membantu rakan": "membantu rakan", "berkongsi makanan": "berkongsi makanan", "menabung wang": "amalan menabung",
      "belajar rajin": "sikap rajin belajar", "menjaga kebersihan": "amalan menjaga kebersihan", "menghormati orang tua": "nilai menghormati orang tua",
      "bercakap benar": "sikap bercakap benar", "menjaga alam sekitar": "amalan menjaga alam sekitar", "bertolak ansur": "nilai bertolak ansur",
      "mendengar nasihat": "sikap mendengar nasihat", "menyiram bunga": "amalan rajin bekerja", "membantu ibu": "sikap berbakti kepada keluarga",
      "membaca buku": "amalan membaca buku", "bersenam pagi": "amalan gaya hidup sihat", "makan makanan sihat": "amalan makan makanan sihat"
    };

    let idx = 0;
    // Template 1: Kisah {haiwan} yang {sifat} (20 * 20 = 400)
    for (let a of animals) {
      for (let s of sifat) {
        const capA = a.charAt(0).toUpperCase() + a.slice(1);
        const title = `Kisah ${capA} yang ${s.charAt(0).toUpperCase() + s.slice(1)}`;
        const rumusan = `Buku ini menceritakan tentang seekor ${a} yang sangat ${s} dalam kehidupannya. Walaupun menghadapi pelbagai cabaran, dia tetap mengamalkan sikap tersebut sehingga disenangi oleh semua haiwan di hutan.`;
        const lesson = `Kita hendaklah sentiasa mengamalkan nilai ${sifatNoun[s] || s} dalam kehidupan untuk kebaikan bersama.`;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }

    // Template 2: {nama} dan {benda} Ajaib (20 * 20 = 400)
    for (let n of nama) {
      for (let b of benda) {
        const title = `${n} dan ${b.charAt(0).toUpperCase() + b.slice(1)} Ajaib`;
        const rumusan = `Mengisahkan tentang ${n} yang menemui sebuah ${b} ajaib. Melalui barangan tersebut, dia mendapat pelbagai pengajaran berguna dan belajar untuk lebih menghargai orang di sekelilingnya.`;
        const lesson = `Kita mestilah pandai menghargai setiap perkara yang kita miliki dan tidak bersikap tamak dalam menjalani hidup.`;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }

    // Template 3: Pengembaraan {haiwan} di {tempat} (20 * 10 = 200)
    for (let a of animals) {
      for (let t of tempat) {
        const capA = a.charAt(0).toUpperCase() + a.slice(1);
        const title = `Pengembaraan ${capA} di ${t}`;
        const rumusan = `Buku ini mengikuti kisah pengembaraan seekor ${a} yang menerokai kawasan ${t}. Dia bekerjasama dengan rakan-rakan baharu untuk menyelesaikan masalah yang dihadapi.`;
        const lesson = `Sikap saling bekerjasama dan tolong-menolong akan membantu kita menyelesaikan sebarang cabaran dengan mudah.`;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }
  } else {
    // Non-fiction
    const topics = ["cuaca", "sistem air", "hujan", "matahari", "bulan", "bintang", "planet", "awan", "angin", "tanah", "batu", "pasir", "lautan", "sungai", "tasik", "kolam", "hutan", "gunung", "lembah", "padang pasir", "haiwan peliharaan", "haiwan liar", "burung", "ikan", "serangga", "reptilia", "mamalia", "tumbuhan", "bunga", "buah-buahan", "sayur-sayuran", "pokok", "daun", "akar", "kitar semula", "sampah", "plastik", "kertas", "kaca", "logam", "kesihatan", "kebersihan", "gigi", "mata", "telinga", "kulit", "rambut", "jantung", "paru-paru", "otak", "tulang", "otot", "makanan", "minuman", "susu", "roti", "nasi", "buah", "sayur", "daging", "sukan", "bola sepak", "badminton", "berenang", "berlari", "berbasikal", "sejarah", "budaya", "muzik", "lukisan", "tarian", "permainan tradisi", "sains", "matematik", "teknologi", "komputer", "internet", "angkasa", "tenaga", "elektrik", "magnet", "cahaya", "bunyi", "haba", "graviti", "air bersih", "udara bersih", "kebun sayur", "peternakan", "perikanan", "pertanian", "pengangkutan", "kereta", "keretapi", "kapal terbang", "kapal laut", "keselamatan", "kebakaran", "pertolongan cemas", "adab sopan"];
    
    const formats = [
      { format: (t) => `Mari Kenal ${capitalizeWords(t)}`, rumusan: (t) => `Buku ini memperkenalkan topik ${t} secara ringkas dan menarik untuk kanak-kanak. Ia dilengkapi gambar rajah mudah.`, lesson: "Mendidik kita untuk menghargai ilmu sains and dunia di sekitar kita." },
      { format: (t) => `Kepentingan ${capitalizeWords(t)} dalam Kehidupan`, rumusan: (t) => `Membincangkan kepentingan dan peranan penting ${t} dalam kehidupan seharian manusia dan alam sekitar.`, lesson: "Kita perlulah menghargai sumber alam dan mengamalkan nilai-nilai murni." },
      { format: (t) => `Panduan ${capitalizeWords(t)} untuk Kanak-kanak`, rumusan: (t) => `Menyediakan panduan praktikal dan langkah mudah untuk memahami serta menguruskan ${t} secara bijak.`, lesson: "Mengajar kita untuk bertanggungjawab dan bersikap bijak setiap hari dalam rutin harian." },
      { format: (t) => `Fakta Menarik Tentang ${capitalizeWords(t)}`, rumusan: (t) => `Mengandungi pelbagai fakta unik dan maklumat menarik yang jarang diketahui tentang ${t} untuk minda cerdas.`, lesson: "Menimbulkan minat ingin tahu dan memupuk sifat rajin membaca dalam kalangan murid." },
      { format: (t) => `Cara-cara Menjaga ${capitalizeWords(t)}`, rumusan: (t) => `Menghuraikan kaedah dan langkah yang betul untuk menjaga serta memelihara ${t} demi kebaikan komuniti.`, lesson: "Kita hendaklah sentiasa menjaga kebersihan dan kelestarian alam sekitar di sekeliling kita." },
      { format: (t) => `Pengenalan Kepada ${capitalizeWords(t)}`, rumusan: (t) => `Sebuah buku rujukan awal yang membincangkan topik ${t} dengan bahasa yang amat mudah difahami oleh pemula.`, lesson: "Belajar perkara baharu membantu meluaskan ufuk pemikiran kita sepanjang masa." },
      { format: (t) => `Rahsia Keunikan ${capitalizeWords(t)}`, rumusan: (t) => `Membongkar rahsia dan keunikan yang ada pada ${t} serta kesannya kepada ekosistem sejagat.`, lesson: "Setiap ciptaan alam mempunyai peranan dan nilai yang tersendiri dalam ekosistem." },
      { format: (t) => `Sains di Sebalik ${capitalizeWords(t)}`, rumusan: (t) => `Menerangkan konsep sains yang mudah difahami di sebalik kewujudan dan fungsi ${t} dalam hidup.`, lesson: "Sains membantu kita memahami dunia dengan lebih rasional dan logik." },
      { format: (t) => `Eksplorasi Hebat ${capitalizeWords(t)}`, rumusan: (t) => `Membawa pembaca mengembara dan menerokai keindahan serta keunikan ${t} yang mempesonakan.`, lesson: "Mempunyai sifat ingin tahu adalah kunci utama kepada pembelajaran sepanjang hayat." },
      { format: (t) => `Keindahan ${capitalizeWords(t)}`, rumusan: (t) => `Menonjolkan keindahan dan kepelbagaian yang terdapat pada ${t} melalui penerangan ringkas dan berwarna-warni.`, lesson: "Keindahan alam semula jadi patut dihargai dan dipelihara dengan baik untuk generasi depan." }
    ];

    let idx = 0;
    for (let f of formats) {
      for (let t of topics) {
        const title = f.format(t);
        const rumusan = f.rumusan(t);
        const lesson = f.lesson;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }
  }
  return books.slice(0, 1000);
}

// ----------------------------------------------------
// 2. English (en) Generator
// ----------------------------------------------------
function generateEn(categorySlug) {
  const books = [];
  const authors = ["Emily Carter", "Sarah Collins", "Anna Brooks", "Michael Reed", "Helen Ward", "Peter Grant", "Laura Hill", "Rachel Green", "John Smith", "Mary Johnson", "David Brown", "James Wilson", "Robert Taylor", "Linda Thomas", "Elizabeth White", "William Harris", "Barbara Martin", "Richard Thompson", "Susan Garcia", "Joseph Martinez"];
  const publishers = ["Ladybird Books", "Oxford University Press", "Scholastic Asia", "Penguin Random House UK", "Macmillan Education", "HarperCollins Publishers", "Pearson Education", "Cambridge University Press", "National Geographic Kids", "DK Publishing"];

  if (categorySlug === "fiksyen") {
    const animals = ["squirrel", "rabbit", "kitten", "puppy", "bird", "turtle", "monkey", "lion", "elephant", "ant", "bee", "frog", "duck", "lamb", "bear", "fox", "deer", "panda", "koala", "mouse"];
    const adjectives = ["honest", "brave", "hardworking", "clever", "kind", "patient", "generous", "polite", "helpful", "cheerful", "loyal", "sincere", "clean", "forgiving", "obedient", "fair", "gentle", "humble", "friendly", "creative"];
    const adjectiveNouns = {
      "honest": "honesty", "brave": "bravery", "hardworking": "hard work", "clever": "cleverness",
      "kind": "kindness", "patient": "patience", "generous": "generosity", "polite": "politeness",
      "helpful": "helpfulness", "cheerful": "cheerfulness", "loyal": "loyalty", "sincere": "sincereity",
      "clean": "cleanliness", "forgiving": "forgiveness", "obedient": "obedience", "fair": "fairness",
      "gentle": "gentleness", "humble": "humility", "friendly": "friendliness", "creative": "creativity"
    };
    const names = ["Ben", "Mina", "Tom", "Lily", "Leo", "Emma", "Jack", "Chloe", "Sam", "Anna", "Ryan", "Lucy", "Toby", "Sophie", "Max", "Mia", "Zac", "Grace", "Oliver", "Ella"];
    const nouns = ["box", "pencil", "bag", "book", "hat", "shoes", "umbrella", "bicycle", "kite", "ball", "mirror", "key", "clock", "painting", "pen", "wallet", "vase", "blanket", "pillow", "ring"];
    const places = ["Green Forest", "Peaceful Village", "Blue Island", "Happy Garden", "Dream School", "Sunny Hill", "Cozy Town", "Crystal Lake", "Golden Valley", "Rainbow Meadow"];

    let idx = 0;
    // Template 1: The {Adjective} {Animal} (20 * 20 = 400)
    for (let a of animals) {
      for (let adj of adjectives) {
        const capAdj = adj.charAt(0).toUpperCase() + adj.slice(1);
        const title = `The ${capAdj} ${a.charAt(0).toUpperCase() + a.slice(1)}`;
        const rumusan = `This book tells the story of a small ${a} who was very ${adj} in its actions. Even when facing a difficult situation, the animal chose to be ${adj} and was praised by others.`;
        const lesson = `We should always practice the value of ${adjectiveNouns[adj] || adj} in our daily lives to help ourselves and others.`;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }

    // Template 2: {Name} and the Magic {Noun} (20 * 20 = 400)
    for (let n of names) {
      for (let b of nouns) {
        const title = `${n} and the Magic ${b.charAt(0).toUpperCase() + b.slice(1)}`;
        const rumusan = `Follows the journey of ${n} who finds a magic ${b}. Through this magical object, he learns important lessons about family, responsibility, and caring for friends.`;
        const lesson = `We must learn to appreciate the things we have and always look after our family and close friends.`;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }

    // Template 3: The Adventures of {Animal} in {Place} (20 * 10 = 200)
    for (let a of animals) {
      for (let p of places) {
        const capA = a.charAt(0).toUpperCase() + a.slice(1);
        const title = `The Adventures of ${capA} in ${p}`;
        const rumusan = `This story details the exciting adventures of a ${a} exploring ${p}. Along the way, the animal makes new friends and together they solve unexpected problems.`;
        const lesson = `Working together with others and being cooperative helps us overcome challenging situations easily.`;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }
  } else {
    // Non-fiction
    const topics = ["weather", "water systems", "rain", "the sun", "the moon", "stars", "planets", "clouds", "wind", "soil", "rocks", "sand", "oceans", "rivers", "lakes", "ponds", "forests", "mountains", "valleys", "deserts", "pets", "wildlife", "birds", "fish", "insects", "reptiles", "mammals", "plants", "flowers", "fruits", "vegetables", "trees", "leaves", "roots", "recycling", "waste", "plastics", "paper", "glass", "metals", "health", "hygiene", "teeth", "eyes", "ears", "skin", "hair", "the heart", "lungs", "the brain", "bones", "muscles", "food", "drinks", "milk", "bread", "rice", "fruits", "vegetables", "meat", "sports", "football", "badminton", "swimming", "running", "cycling", "history", "culture", "music", "art", "dance", "traditional games", "science", "mathematics", "technology", "computers", "the internet", "outer space", "energy", "electricity", "magnets", "light", "sound", "heat", "gravity", "clean water", "clean air", "vegetable gardens", "farming", "fishing", "agriculture", "transportation", "cars", "trains", "airplanes", "ships", "safety", "fire safety", "first aid", "good manners"];

    const formats = [
      { format: (t) => `Let's Learn About ${capitalizeWords(t)}`, rumusan: (t) => `This informative book introduces children to the basics of ${t} with simple text and colorful illustrations.`, lesson: "It teaches us to appreciate the wonders of science and our planet." },
      { format: (t) => `The Importance of ${capitalizeWords(t)}`, rumusan: (t) => `Discusses why ${t} is crucial for human life and the environment, encouraging readers to be more responsible.`, lesson: "We should value our resources and take good care of our surroundings." },
      { format: (t) => `A Child's Guide to ${capitalizeWords(t)}`, rumusan: (t) => `A practical handbook that explains ${t} in a clear way, providing easy tips for kids to practice daily.`, lesson: "Encourages children to make healthy and smart choices in their daily routine." },
      { format: (t) => `Fun Facts About ${capitalizeWords(t)}`, rumusan: (t) => `Packed with interesting details and unique facts about ${t} to inspire young readers.`, lesson: "Fosters curiosity and promotes a love for reading and learning." },
      { format: (t) => `How to Take Care of ${capitalizeWords(t)}`, rumusan: (t) => `Provides simple instructions and steps on how to care for and protect ${t} effectively.`, lesson: "Teaches us to be responsible caretakers of our environment." },
      { format: (t) => `An Introduction to ${capitalizeWords(t)}`, rumusan: (t) => `A beginner's reference book that explains the topic of ${t} using basic language.`, lesson: "Learning new things helps to expand our minds and understand the world." },
      { format: (t) => `The Magic of ${capitalizeWords(t)}`, rumusan: (t) => `Explores the unique and magical aspects of ${t} and its role in our natural ecosystem.`, lesson: "Every part of nature has its own special purpose and value." },
      { format: (t) => `The Science of ${capitalizeWords(t)}`, rumusan: (t) => `Explains simple science concepts behind the existence and behavior of ${t}.`, lesson: "Science helps us understand how things work around us." },
      { format: (t) => `Exploring the World of ${capitalizeWords(t)}`, rumusan: (t) => `Takes readers on an exciting journey to explore the beauty and variety of ${t}.`, lesson: "Curiosity is the key to lifetime learning and discovery." },
      { format: (t) => `The Beauty of ${capitalizeWords(t)}`, rumusan: (t) => `Highlights the beauty and diversity found in ${t} through descriptive and engaging text.`, lesson: "Nature's beauty should be protected and appreciated by everyone." }
    ];

    let idx = 0;
    for (let f of formats) {
      for (let t of topics) {
        const title = f.format(t);
        const rumusan = f.rumusan(t);
        const lesson = f.lesson;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }
  }
  return books.slice(0, 1000);
}

// ----------------------------------------------------
// 3. Chinese (zh) Generator
// ----------------------------------------------------
function generateZh(categorySlug) {
  const books = [];
  const authors = ["林小慧", "陈美玲", "王丽萍", "李安琪", "周明华", "黄佳怡", "刘文杰", "张雅雯", "赵强", "吴明", "孙丽", "周洁", "王伟", "李军", "刘洋", "张平", "李娜", "王静", "陈浩", "刘强"];
  const publishers = ["明天出版社", "二十一世纪出版社", "长江少年儿童出版社", "安徽少年儿童出版社", "浙江少年儿童出版社", "江苏凤凰少年儿童出版社", "接力出版社", "四川少年儿童出版社", "接力出版社", "北京少年儿童出版社"];

  if (categorySlug === "fiksyen") {
    const animals = ["小熊", "小鸭", "小松鼠", "小兔子", "小猫", "小狗", "小鸟", "小乌龟", "小猴子", "大狮子", "小蜜蜂", "小蚂蚁", "小羊", "小狐狸", "小鹿", "小熊猫", "小考拉", "小老鼠", "小牛", "小马"];
    const adjectives = ["懂礼貌的", "勇敢的", "勤劳的", "聪明的", "善良的", "有耐心的", "大方的", "诚实的", "守信用的", "乐于助人的", "开朗的", "真诚的", "爱干净的", "宽容的", "听话的", "公平的", "温柔的", "谦虚的", "友好的", "有创造力的"];
    const adjectiveNouns = {
      "懂礼貌的": "礼貌", "勇敢的": "勇气", "勤劳的": "勤劳", "聪明的": "智慧",
      "善良的": "善良", "有耐心的": "耐心", "大方的": "大方", "诚实的": "诚实",
      "守信用的": "诚信", "乐于助人的": "互助合作", "开朗的": "乐观", "真诚的": "真诚",
      "爱干净的": "爱清洁", "宽容的": "宽容", "听话的": "听取长辈意见", "公平的": "公平",
      "温柔的": "温柔", "谦虚的": "谦虚", "友好的": "友好相处", "有创造力的": "创造力"
    };
    const names = ["小明", "美美", "阿豪", "丽丽", "小华", "欢欢", "乐乐", "天天", "小新", "丫丫", "小东", "红红", "强强", "亮亮", "小芳", "兰兰", "佳佳", "宇宇", "小宇", "洋洋"];
    const nouns = ["红雨伞", "魔法盒", "新书包", "小自行车", "七彩风筝", "玩具车", "故事书", "存钱罐", "小闹钟", "彩笔", "画卷", "钥匙", "小本子", "围巾", "杯子", "书桌", "相册", "小台灯", "玩具熊", "小指南针"];
    const places = ["青青森林", "幸福小镇", "快乐学校", "美丽花园", "太阳山谷", "彩虹草地", "水晶湖畔", "阳光山丘", "金色小溪", "和谐小村"];

    let idx = 0;
    // Template 1: {Adjective}{Animal}的故事 (20 * 20 = 400)
    for (let a of animals) {
      for (let adj of adjectives) {
        const title = `${adj}${a}的故事`;
        const rumusan = `本书讲述了一只${adj}小动物在日常生活里坚持发挥优秀品质的有趣故事。虽然它在过程中遇到了小小的挫折，但因为始终坚持，最终得到了大家的夸奖。`;
        const lesson = `我们要向它学习，在生活中坚持做人做事具有良好的${adjectiveNouns[adj] || adj}，做一个好孩子。`;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }

    // Template 2: {Name}和他的{Noun} (20 * 20 = 400)
    for (let n of names) {
      for (let b of nouns) {
        const title = `${n}和他的${b}`;
        const rumusan = `故事围绕着${n}和他的${b}展开。通过一系列有趣的日常冒险，主角学会了如何妥善爱护自己的物品，并明白了与他人分享的快乐。`;
        const lesson = `我们应该妥善爱惜和管理自己的学习与生活用品，并主动与他人分享喜悦。`;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }

    // Template 3: {Animal}在{Place}的冒险 (20 * 10 = 200)
    for (let a of animals) {
      for (let p of places) {
        const title = `${a}在${p}的冒险`;
        const rumusan = `描述了可爱的小${a}在美丽的${p}进行探索的故事。在冒险过程中，它结识了许多小伙伴，并和朋友们通过合作成功解决了一个个难题。`;
        const lesson = `懂得团队合作、互帮互助，可以帮助我们更加轻松地解决生活中遇到的各种困难。`;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }
  } else {
    // Non-fiction
    const topics = ["天气变化", "水资源系统", "降雨现象", "太阳", "月球", "闪烁的星星", "八大行星", "云朵", "风的力量", "泥土", "岩石", "沙子", "辽阔的海洋", "奔流的河流", "美丽的湖泊", "小池塘", "森林生态", "雄伟的山脉", "山谷", "荒凉的沙漠", "可爱的小宠物", "野生动物", "天空中的鸟类", "水中的鱼类", "神奇的昆虫", "爬行动物", "哺乳动物", "绿色植物", "美丽的花朵", "水果", "蔬菜", "高大的树木", "树叶", "植物的根部", "垃圾分类", "生活垃圾", "塑料制品", "纸张回收", "玻璃制品", "金属材料", "身体健康", "个人卫生", "牙齿保健", "眼睛保护", "耳朵的奥秘", "皮肤的防护", "头发的护理", "神奇的心脏", "肺部呼吸", "大脑的发育", "骨骼和关节", "肌肉的力量", "日常食物", "饮用水", "牛奶的营养", "面包的制作", "稻谷和米饭", "美味的水果", "绿色蔬菜", "肉类食品", "体育运动", "足球运动", "羽毛球运动", "游泳的乐趣", "跑步锻炼", "骑自行车的安全", "历史故事", "传统文化", "优美的音乐", "美术绘画", "舞蹈艺术", "民间传统游戏", "奇妙的科学", "数学基础", "现代技术", "电脑的用途", "互联网世界", "神秘的太空", "自然能源", "电的产生", "磁铁的奥秘", "光线的传播", "声音的产生", "热能转换", "万有引力", "干净的饮用水", "新鲜的空气", "家庭菜园", "畜牧养殖", "淡水养鱼", "现代农业", "交通工具", "汽车的发展", "火车旅行", "飞机的原理", "轮船航行", "居家安全", "防范火灾", "急救小知识", "日常礼仪规范"];

    const formats = [
      { format: (t) => `让我们认识${t}`, rumusan: (t) => `本书通过简单易懂的语言和精美的插图，向小朋友们介绍了关于${t}的基础科普知识。`, lesson: "启发我们去探索科学和自然的奥秘，培养热爱学习和观察的好习惯。" },
      { format: (t) => `${t}在生活中的重要性`, rumusan: (t) => `详细讲解了${t}在人类日常生活和自然界中扮演的关键角色，能有效培养读者的环保和责任感。`, lesson: "我们应该珍惜身边的资源，爱护我们的地球与自然生活环境。" },
      { format: (t) => `给孩子的${t}指南`, rumusan: (t) => `这是一本针对少儿编写的实用科普手册，介绍了有关${t}的小贴士和简单易行的日常实践步骤。`, lesson: "引导我们在日常生活中做出更健康、更明智和更有责任感的选择。" },
      { format: (t) => `关于${t}的有趣事实`, rumusan: (t) => `汇集了许多关于${t}的独特自然科学知识和趣味事实，极大程度地激发小朋友们的科普阅读兴趣。`, lesson: "多读书能让我们获取更丰富的知识，我们要经常保持强烈的好奇心。" },
      { format: (t) => `如何保护${t}`, rumusan: (t) => `为小读者提供了具体的环保建议和实践指引，详细阐述了我们应当如何合理爱护和保护${t}。`, lesson: "保护大自然和人类生存环境是每个人的责任，我们要从小事做起。" },
      { format: (t) => `初探${t}`, rumusan: (t) => `一本专为初学者编写的入门科普读物，用非常亲切的文字解释了关于${t}的奥秘。`, lesson: "学习新知识不仅能开拓我们的视野，也能帮助我们更好地认识周围的精彩世界。" },
      { format: (t) => `${t}的独特魅力`, rumusan: (t) => `深度探索了${t}在地球生态圈里所拥有的独特性，以及它在维持生态平衡中所起的重要作用。`, lesson: "大自然中没有任何一种东西是多余的，万物和谐共处才最美丽。" },
      { format: (t) => `${t}背后的科学原理`, rumusan: (t) => `从科学的角度解读了关于${t}的奇妙科学现象，将深奥的知识转化为儿童易懂的内容。`, lesson: "科学可以帮助我们理智和全面地理解世界，我们在生活中要多动脑筋。" },
      { format: (t) => `探索${t}的世界`, rumusan: (t) => `带领小读者一起走进${t}的神秘世界，领略大自然的无穷奥妙和丰富物种的多样性。`, lesson: "时刻保持对未知世界的探索精神，能让我们在学习中不断进步与成长。" },
      { format: (t) => `${t}的美丽之处`, rumusan: (t) => `通过许多生动形象的文字展现了${t}的多姿多彩，增强小读者对自然风光之美的欣赏与认知。`, lesson: "大自然的美景需要我们带着感恩的心去欣赏，也需要我们共同来爱护。" }
    ];

    let idx = 0;
    for (let f of formats) {
      for (let t of topics) {
        const title = f.format(t);
        const rumusan = f.rumusan(t);
        const lesson = f.lesson;
        books.push({ title, rumusan, lesson, author: getRandom(authors, idx), publisher: getRandom(publishers, idx), year: 2015 + (idx % 10), pages: 16 + (idx % 25) });
        idx++;
      }
    }
  }
  return books.slice(0, 1000);
}

// ----------------------------------------------------
// ISBN Generator Helper
// ----------------------------------------------------
function isbn13(language, index) {
  const serial = String(index).padStart(6, "0");
  const bodyByLanguage = {
    bm: `978967${serial}`,
    en: `9780241${serial.slice(1)}`,
    zh: `97875560${serial.slice(2)}`
  };
  const body = bodyByLanguage[language] || `978967${serial}`;
  const sum = [...body].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0);
  const isbn = `${body}${(10 - (sum % 10)) % 10}`;
  if (language === "bm") return `${isbn.slice(0, 3)}-${isbn.slice(3, 6)}-${isbn.slice(6, 9)}-${isbn.slice(9, 12)}-${isbn.slice(12)}`;
  if (language === "en") return `${isbn.slice(0, 3)}-${isbn.slice(3, 4)}-${isbn.slice(4, 7)}-${isbn.slice(7, 12)}-${isbn.slice(12)}`;
  if (language === "zh") return `${isbn.slice(0, 3)}-${isbn.slice(3, 4)}-${isbn.slice(4, 8)}-${isbn.slice(8, 12)}-${isbn.slice(12)}`;
  return `${isbn.slice(0, 3)}-${isbn.slice(3, 6)}-${isbn.slice(6, 9)}-${isbn.slice(9, 12)}-${isbn.slice(12)}`;
}

function makeBook(bookData, source, categorySlug, language, index) {
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
    title: bookData.title,
    author: bookData.author,
    publisher: bookData.publisher,
    year: bookData.year,
    pages: bookData.pages,
    isbn: isbn13(language, index),
    isbn_type: source === "verified" ? "verified" : "synthetic",
    rumusan: bookData.rumusan,
    lesson: bookData.lesson,
    quality: source === "verified" ? "verified" : "high",
    created,
    version
  };
}

async function main() {
  let index = 1;

  for (const source of ["verified", "synthetic"]) {
    // Languages BM, EN, ZH
    for (const language of ["bm", "en", "zh"]) {
      // Categories Fiksyen & Bukan Fiksyen
      for (const categorySlug of ["fiksyen", "bukan-fiksyen"]) {
        const dir = path.join("data", source, categorySlug);
        await mkdir(dir, { recursive: true });
        
        let books = [];
        if (source === "synthetic") {
          let list = [];
          if (language === "bm") list = generateBm(categorySlug);
          if (language === "en") list = generateEn(categorySlug);
          if (language === "zh") list = generateZh(categorySlug);
          
          books = list.map((item) => makeBook(item, source, categorySlug, language, index++));
        }
        
        await writeFile(path.join(dir, `books-${language}.json`), `${JSON.stringify(books, null, 2)}\n`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
