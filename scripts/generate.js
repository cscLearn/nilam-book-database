import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const created = "2026-07-01";
const version = "1.0";

// Helper to format text (Capitalize words)
function capitalizeWords(str) {
  return str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ----------------------------------------------------
// 1. Malay (bm) Templates
// ----------------------------------------------------
const bmFictionTemplates = [
  {
    title: (n, h, t, b, s, hl) => `Kisah Sang ${capitalizeWords(h)} yang ${capitalizeWords(s)}`,
    rumusan: (n, h, t, b, s, hl) => `Buku ini menceritakan tentang seekor ${h} bernama Sang ${capitalizeWords(h)} yang sangat ${s} dalam hidupnya. Apabila dia terjumpa ${b} yang hilang di ${t}, dia berusaha mencari pemilik asalnya tanpa mengharapkan sebarang ganjaran.`,
    lesson: (n, h, t, b, s, sn) => `Kita hendaklah sentiasa bersikap ${s} dan mengamalkan nilai ${sn} dalam kehidupan seharian.`
  },
  {
    title: (n, h, t, b, s, hl) => `${n} dan Misteri ${capitalizeWords(b)} Ajaib`,
    rumusan: (n, h, t, b, s, hl) => `Mengisahkan seorang kanak-kanak bernama ${n} yang menemui sebuah ${b} ajaib di belakang rumahnya dekat ${t}. Barangan tersebut membantunya menyelesaikan pelbagai masalah tetapi mengajarnya bahawa usaha sendiri lebih bernilai daripada keajaiban.`,
    lesson: (n, h, t, b, s, sn) => `Kita tidak boleh bergantung kepada jalan pintas, sebaliknya perlu berusaha keras dengan kebolehan diri sendiri.`
  },
  {
    title: (n, h, t, b, s, hl) => `Pengembaraan Sang ${capitalizeWords(h)} di ${t}`,
    rumusan: (n, h, t, b, s, hl) => `Buku ini mengikuti pengembaraan seekor Sang ${capitalizeWords(h)} yang bijak menerokai kawasan ${t}. Di sana, dia bekerjasama dengan haiwan-haiwan lain untuk menyelamatkan habitat mereka daripada bahaya pencemaran.`,
    lesson: (n, h, t, b, s, sn) => `Semangat kerjasama dan perpaduan ialah kunci kejayaan dalam menghadapi sebarang cabaran besar.`
  },
  {
    title: (n, h, t, b, s, hl) => `Impian ${n} Memiliki ${capitalizeWords(b)}`,
    rumusan: (n, h, t, b, s, hl) => `${n} sangat mengimpikan untuk mempunyai ${b} sendiri untuk dibawa ke sekolah. Melalui bimbingan bapanya, dia mula belajar menyimpan wang saku sedikit demi sedikit sehinggalah impiannya tercapai dengan bangga.`,
    lesson: (n, h, t, b, s, sn) => `Sikap sabar, berjimat cermat dan gigih berusaha adalah penting untuk mencapai cita-cita yang diidamkan.`
  },
  {
    title: (n, h, t, b, s, hl) => `Sang ${capitalizeWords(h)} Mencari Sahabat Sebenar`,
    rumusan: (n, h, t, b, s, hl) => `Sang ${capitalizeWords(h)} berasa sunyi lalu mengembara ke ${t} untuk mencari kawan baharu. Sepanjang perjalanan, dia belajar adab menghormati orang lain dan kepentingan bertutur dengan kata-kata yang sopan.`,
    lesson: (n, h, t, b, s, sn) => `Adab sopan dan tutur kata yang baik adalah asas utama dalam membina persahabatan yang erat dan harmoni.`
  },
  {
    title: (n, h, t, b, s, hl) => `Misteri Laluan Rahsia di ${t}`,
    rumusan: (n, h, t, b, s, hl) => `Sekumpulan kawan yang diketuai oleh ${n} menemui laluan rahsia di belakang ${t}. Mereka bekerjasama menyelesaikan teka-teki kuno untuk mendedahkan sejarah lama kawasan tempat tinggal mereka.`,
    lesson: (n, h, t, b, s, sn) => `Perasaan ingin tahu yang positif mendorong kita mempelajari sejarah dan perkara baharu yang bermanfaat.`
  },
  {
    title: (n, h, t, b, s, hl) => `Hari yang Sibuk bagi ${n}`,
    rumusan: (n, h, t, b, s, hl) => `Mengisahkan aktiviti seharian ${n} yang sangat ringan tulang membantu ibunya mengemas rumah, menyiram pokok bunga dan menolong jiran yang memerlukan di sekitar ${t}.`,
    lesson: (n, h, t, b, s, sn) => `Sikap rajin membantu keluarga dan komuniti membawa kebahagiaan serta mengeratkan hubungan persaudaraan.`
  },
  {
    title: (n, h, t, b, s, hl) => `Sang ${capitalizeWords(h)} Belajar Berkongsi Rezeki`,
    rumusan: (n, h, t, b, s, hl) => `Sang ${capitalizeWords(h)} enggan berkongsi makanan dan ${b} dengan rakan-rakannya di ${t}. Namun, apabila dia sendiri menghadapi kesukaran dan kelaparan, barulah dia menyedari kepentingan sifat berkongsi.`,
    lesson: (n, h, t, b, s, sn) => `Sifat pemurah dan sudi berkongsi rezeki akan mendatangkan berkat dan mengeratkan hubungan sesama rakan.`
  },
  {
    title: (n, h, t, b, s, hl) => `Tabung Buluh ${n}`,
    rumusan: (n, h, t, b, s, hl) => `Buku ini mengisahkan ${n} yang belajar tentang pengurusan wang daripada datuknya. Dia menggunakan tabung buluh untuk menyimpan baki wang saku demi membeli ${b} idaman tanpa menyusahkan ibu bapanya.`,
    lesson: (n, h, t, b, s, sn) => `Amalan menabung sejak kecil membantu kita berdikari dan lebih menghargai nilai setiap barangan.`
  },
  {
    title: (n, h, t, b, s, hl) => `Keberanian Sang ${capitalizeWords(h)} Kecil`,
    rumusan: (n, h, t, b, s, hl) => `Menceritakan tentang Sang ${capitalizeWords(h)} yang bertubuh kecil tetapi berjiwa besar. Dia menyelamatkan rakan-rakannya di ${t} daripada ancaman haiwan yang lebih besar menggunakan kebijaksanaan akalnya.`,
    lesson: (n, h, t, b, s, sn) => `Kebijaksanaan akal fikiran dan keberanian bertindak lebih berkesan daripada kekuatan fizikal semata-mata.`
  },
  {
    title: (n, h, t, b, s, hl) => `Hadiah Istimewa untuk ${n}`,
    rumusan: (n, h, t, b, s, hl) => `Mengisahkan ${n} yang menerima ${b} daripada datuknya sebelum datuknya berpindah. Hadiah tersebut bukan sekadar barang biasa, tetapi mengandungi pesanan bertulis yang sangat berharga tentang nilai kehidupan.`,
    lesson: (n, h, t, b, s, sn) => `Kita haruslah menghargai setiap pemberian orang lain terutamanya pesanan bernilai daripada golongan tua.`
  },
  {
    title: (n, h, t, b, s, hl) => `Sang ${capitalizeWords(h)} Penjaga ${t}`,
    rumusan: (n, h, t, b, s, hl) => `Sang ${capitalizeWords(h)} berasa sedih melihat kawasan ${t} dipenuhi sampah-sarap akibat perbuatan pengunjung yang tidak bertanggungjawab. Dia mengetuai kempen membersihkan kawasan tersebut bersama semua penduduk hutan.`,
    lesson: (n, h, t, b, s, sn) => `Menjaga kebersihan dan kelestarian alam sekitar adalah tanggungjawab kita bersama demi kesihatan semua.`
  },
  {
    title: (n, h, t, b, s, hl) => `Pertandingan Bakat di ${t}`,
    rumusan: (n, h, t, b, s, hl) => `${n} menyertai pertandingan bakat kreatif di ${t}. Walaupun dia menghadapi kegagalan pada awalnya, dia terus berlatih tanpa jemu sehinggalah berjaya memenangi anugerah khas.`,
    lesson: (n, h, t, b, s, sn) => `Kunci kejayaan utama ialah keazaman yang tinggi dan keengganan untuk menyerah kalah sebelum berjuang.`
  },
  {
    title: (n, h, t, b, s, hl) => `Sikap Jujur ${n}`,
    rumusan: (n, h, t, b, s, hl) => `Mengisahkan ${n} yang tersilap merosakkan ${b} kepunyaan rakannya di sekolah. Walaupun takut dimarahi, dia memilih untuk mengaku kesalahannya dengan jujur dan meminta maaf secara ikhlas.`,
    lesson: (n, h, t, b, s, sn) => `Sikap jujur dan berani mengaku kesalahan sendiri akan membina kepercayaan yang utuh dalam persahabatan.`
  },
  {
    title: (n, h, t, b, s, hl) => `Kembara ${n} ke Kampung halaman`,
    rumusan: (n, h, t, b, s, hl) => `Buku ini menceritakan perjalanan percutian ${n} pulang ke kampung datuknya di ${t}. Di sana, dia belajar mengenali pelbagai jenis pokok herba tradisional dan cara menghormati orang tua di kampung.`,
    lesson: (n, h, t, b, s, sn) => `Menghargai tradisi keluarga dan menghormati datuk nenek mengukuhkan lagi nilai kekeluargaan kita.`
  },
  {
    title: (n, h, t, b, s, hl) => `Kisah Sang ${capitalizeWords(h)} yang Sombong`,
    rumusan: (n, h, t, b, s, hl) => `Sang ${capitalizeWords(h)} sering berbangga dengan kepantasan dan kekuatannya di ${t}. Suatu hari, dia kalah dalam satu perlumbaan penting menentang Sang ${hl} yang sangat sabar dan fokus.`,
    lesson: (n, h, t, b, s, sn) => `Sifat sombong hanya akan membawa kerugian, manakala sikap rendah diri dan sabar membawa kejayaan.`
  },
  {
    title: (n, h, t, b, s, hl) => `Misteri Buku Latihan ${n}`,
    rumusan: (n, h, t, b, s, hl) => `Buku latihan sekolah milik ${n} hilang secara misteri sebelum kelas bermula. Dia bersama rakannya menyiasat kes tersebut di sekitar sekolah dan menemui jalan penyelesaian yang penuh pengajaran.`,
    lesson: (n, h, t, b, s, sn) => `Bekerjasama dalam kumpulan membantu menyelesaikan masalah dengan lebih pantas dan harmoni.`
  },
  {
    title: (n, h, t, b, s, hl) => `Sang ${capitalizeWords(h)} yang Cergas dan Sihat`,
    rumusan: (n, h, t, b, s, hl) => `Sang ${capitalizeWords(h)} sentiasa mengamalkan aktiviti bersenam setiap pagi di ${t}. Dia mengajak rakan-rakannya yang sering malas dan sakit untuk turut serta demi kesihatan jangka panjang.`,
    lesson: (n, h, t, b, s, sn) => `Menjaga kesihatan diri dan rajin bersenam adalah tanggungjawab penting untuk hidup sejahtera.`
  },
  {
    title: (n, h, t, b, s, hl) => `Kawan Baharu dari ${t}`,
    rumusan: (n, h, t, b, s, hl) => `Mengisahkan kedatangan seorang murid baharu bernama ${n} yang berpindah dari ${t}. Watak utama menyambutnya dengan mesra dan membantunya menyesuaikan diri dengan persekitaran sekolah baharu.`,
    lesson: (n, h, t, b, s, sn) => `Sikap mesra, ramah dan prihatin terhadap orang baharu memupuk suasana perpaduan yang indah.`
  },
  {
    title: (n, h, t, b, s, hl) => `Bengkel Kreatif Cilik ${n}`,
    rumusan: (n, h, t, b, s, hl) => `${n} sangat kreatif dalam membaiki ${b} yang telah rosak di rumahnya. Dia menggunakannya semula secara inovatif daripada membuangnya, sekali gus menjimatkan perbelanjaan keluarga.`,
    lesson: (n, h, t, b, s, sn) => `Kreativiti dan sikap berjimat cermat membantu mengurangkan pembaziran barangan harian kita.`
  }
];

const bmNonFictionTemplates = [
  {
    title: (t) => `Mari Kenal Dunia ${capitalizeWords(t)}`,
    rumusan: (t) => `Buku sains ini memperkenalkan topik ${t} secara ringkas dan menarik untuk kanak-kanak sekolah rendah. Ia dilengkapi dengan gambar rajah berwarna-warni dan eksperimen sains ringkas.`,
    lesson: "Mendidik murid-murid untuk menghargai ilmu sains dan memupuk rasa ingin tahu tentang alam di sekitar kita."
  },
  {
    title: (t) => `Kepentingan ${capitalizeWords(t)} dalam Kehidupan Kita`,
    rumusan: (t) => `Membincangkan kepentingan dan peranan utama ${t} dalam kehidupan seharian manusia, tumbuhan dan haiwan serta cara-cara mengekalkan kelestariannya.`,
    lesson: "Kita hendaklah sentiasa menghargai sumber alam dan mengamalkan nilai bertanggungjawab terhadap ekosistem."
  },
  {
    title: (t) => `Panduan Praktikal Mengurus ${capitalizeWords(t)}`,
    rumusan: (t) => `Menyediakan panduan praktikal dan langkah mudah untuk memahami serta menguruskan isu berkaitan ${t} secara bijak di rumah mahupun di sekolah.`,
    lesson: "Mengajar murid untuk bertanggungjawab, bersikap rasional dan menjaga kebersihan dalam rutin harian."
  },
  {
    title: (t) => `Fakta Menarik dan Keunikan ${capitalizeWords(t)}`,
    rumusan: (t) => `Mengandungi pelbagai fakta unik dan maklumat menarik yang jarang diketahui tentang ${t} untuk merangsang minda cerdas pembaca muda.`,
    lesson: "Menimbulkan minat ingin tahu dan memupuk sifat rajin membaca dalam kalangan murid sekolah."
  },
  {
    title: (t) => `Cara-cara Memelihara Kelestarian ${capitalizeWords(t)}`,
    rumusan: (t) => `Menhuraikan kaedah saintifik dan langkah yang betul untuk menjaga serta memelihara ${t} demi kebaikan generasi masa kini dan masa depan.`,
    lesson: "Kita hendaklah sentiasa bekerjasama menjaga kebersihan dan kelestarian alam sekitar di sekeliling kita."
  },
  {
    title: (t) => `Pengenalan Awal Kepada Sains ${capitalizeWords(t)}`,
    rumusan: (t) => `Sebuah buku rujukan awal yang membincangkan konsep asas ${t} dengan menggunakan bahasa yang amat mudah difahami berserta glosari istilah.`,
    lesson: "Mempelajari perkara sains baharu membantu meluaskan ufuk pemikiran dan meningkatkan pencapaian akademik murid."
  },
  {
    title: (t) => `Misteri di Sebalik ${capitalizeWords(t)}`,
    rumusan: (t) => `Membongkar rahsia dan keunikan fenomena ${t} serta impak langsungnya kepada kestabilan ekosistem sejagat dan hidupan lain.`,
    lesson: "Setiap ciptaan alam semula jadi mempunyai peranan, keunikan dan nilai yang tersendiri."
  },
  {
    title: (t) => `Sains dan Teknologi ${capitalizeWords(t)}`,
    rumusan: (t) => `Menerangkan konsep sains fizikal dan aplikasi teknologi moden di sebalik kewujudan serta fungsi ${t} dalam tamadun manusia.`,
    lesson: "Sains dan teknologi membantu kita memahami dunia dengan lebih mendalam, rasional dan logik."
  },
  {
    title: (t) => `Kembara Eksplorasi Keindahan ${capitalizeWords(t)}`,
    rumusan: (t) => `Membawa pembaca mengembara secara visual untuk menerokai keindahan serta keunikan struktur ${t} yang mempesonakan di seluruh dunia.`,
    lesson: "Mempunyai sifat ingin tahu adalah kunci utama kepada pembelajaran sepanjang hayat dan kecemerlangan diri."
  },
  {
    title: (t) => `Ekosistem dan Pemeliharaan ${capitalizeWords(t)}`,
    rumusan: (t) => `Menonjolkan peranan kepelbagaian biologi yang terdapat pada ${t} melalui penerangan ringkas, peta minda dan gambar foto yang menarik.`,
    lesson: "Keindahan dan keseimbangan alam semula jadi patut dihargai serta dipelihara dengan baik oleh semua pihak."
  }
];

// ----------------------------------------------------
// 2. English (en) Templates
// ----------------------------------------------------
const enFictionTemplates = [
  {
    title: (n, h, t, b, s, hl) => `The Story of the ${capitalizeWords(s)} Little ${capitalizeWords(h)}`,
    rumusan: (n, h, t, b, s, hl) => `This book tells the heartwarming story of a little ${h} named Barnaby who was very ${s}. When he found a lost ${b} in the ${t}, he went on a long journey to return it to its rightful owner.`,
    lesson: (n, h, t, b, s, sn) => `We should always practice the value of ${sn} and do the right thing, even when no one is watching.`
  },
  {
    title: (n, h, t, b, s, hl) => `${n} and the Mystery of the Magic ${capitalizeWords(b)}`,
    rumusan: (n, h, t, b, s, hl) => `Follows the journey of a young boy named ${n} who discovers a magical ${b} near the ${t}. The magic object helps him with his daily chores but teaches him that honest effort is better than magic.`,
    lesson: (n, h, t, b, s, sn) => `Relying on shortcut methods is never sustainable; hard work and self-reliance are the keys to true success.`
  },
  {
    title: (n, h, t, b, s, hl) => `The Great Adventure of ${capitalizeWords(h)} in ${t}`,
    rumusan: (n, h, t, b, s, hl) => `Join a clever little ${h} as it embarks on an exciting adventure across the beautiful ${t}. Along the way, the animal cooperates with other creatures to protect their forest home from danger.`,
    lesson: (n, h, t, b, s, sn) => `Unity and teamwork make it much easier to solve big problems and overcome unexpected challenges.`
  },
  {
    title: (n, h, t, b, s, hl) => `${n}'s Dream of Having a ${capitalizeWords(b)}`,
    rumusan: (n, h, t, b, s, hl) => `${n} dreams of owning a new ${b} to bring to school. With the guidance of his parents, he begins to save his allowance daily and helps with chores to achieve his goal.`,
    lesson: (n, h, t, b, s, sn) => `Patience, financial discipline, and steady effort are essential when working toward a personal goal.`
  },
  {
    title: (n, h, t, b, s, hl) => `The Little ${capitalizeWords(h)} Looks for a True Friend`,
    rumusan: (n, h, t, b, s, hl) => `A lonely little ${h} travels all the way to ${t} in search of new friends. During the trip, the animal learns how polite words, sharing, and good manners make a big difference.`,
    lesson: (n, h, t, b, s, sn) => `Good manners and kind words are the main foundation of any lasting and meaningful friendship.`
  },
  {
    title: (n, h, t, b, s, hl) => `Mystery of the Hidden Path in ${t}`,
    rumusan: (n, h, t, b, s, hl) => `A group of school friends led by ${n} discovers a hidden path behind the ${t}. Together, they work to solve ancient riddles and uncover the old history of their neighborhood.`,
    lesson: (n, h, t, b, s, sn) => `Positive curiosity drives us to learn history and discover new useful knowledge about our world.`
  },
  {
    title: (n, h, t, b, s, hl) => `A Very Busy Day for ${n}`,
    rumusan: (n, h, t, b, s, hl) => `This story follows the busy day of ${n}, who happily helps his mother clean the house, water the garden, and help an elderly neighbor in ${t}.`,
    lesson: (n, h, t, b, s, sn) => `Being helpful to our family and local community brings happiness to ourselves and joy to others.`
  },
  {
    title: (n, h, t, b, s, hl) => `The Greedy ${capitalizeWords(h)} Learns to Share`,
    rumusan: (n, h, t, b, s, hl) => `A selfish little ${h} refuses to share food and toys with other animals in ${t}. When he gets stuck in a tricky situation, he realizes how important sharing is.`,
    lesson: (n, h, t, b, s, sn) => `Being generous and willing to share blessings will bring happiness and strengthen friendships.`
  },
  {
    title: (n, h, t, b, s, hl) => `${n}'s Bamboo Savings Jar`,
    rumusan: (n, h, t, b, s, hl) => `This educational story follows ${n} as he learns about money management. He uses a handmade bamboo jar to save money to buy a ${b} he wants.`,
    lesson: (n, h, t, b, s, sn) => `Saving money from a young age helps us develop independence and understand the true value of goods.`
  },
  {
    title: (n, h, t, b, s, hl) => `The Bravery of a Tiny ${capitalizeWords(h)}`,
    rumusan: (n, h, t, b, s, hl) => `Tells the story of a very tiny ${h} who has a big heart. He saves his friends in ${t} from a large predator by using his clever wits instead of strength.`,
    lesson: (n, h, t, b, s, sn) => `Clever thinking and timely courage are far more effective than mere physical strength.`
  },
  {
    title: (n, h, t, b, s, hl) => `A Special Gift for ${n}`,
    rumusan: (n, h, t, b, s, hl) => `Focuses on ${n}, who receives a special ${b} from his grandfather. The gift is not just a toy, but contains a handwritten letter with valuable life advice.`,
    lesson: (n, h, t, b, s, sn) => `We must cherish every gift we receive, especially the wisdom and advice passed down by elders.`
  },
  {
    title: (n, h, t, b, s, hl) => `The ${capitalizeWords(h)} Guarding ${t}`,
    rumusan: (n, h, t, b, s, hl) => `A little ${h} is sad to see the beautiful ${t} filled with plastic waste. He organizes a big cleanup campaign with all the forest animals to restore nature.`,
    lesson: (n, h, t, b, s, sn) => `Taking care of the environment and reducing waste is a shared duty to protect our health.`
  },
  {
    title: (n, h, t, b, s, hl) => `The School Talent Show at ${t}`,
    rumusan: (n, h, t, b, s, hl) => `${n} signs up for a creative talent competition at ${t}. Although he struggles at first, he keeps practicing diligently until he wins a special prize.`,
    lesson: (n, h, t, b, s, sn) => `Success is built on high determination, regular practice, and refusing to give up easily.`
  },
  {
    title: (n, h, t, b, s, hl) => `Being Honest Pays Off for ${n}`,
    rumusan: (n, h, t, b, s, hl) => `During school hours, ${n} accidentally breaks a ${b} belonging to his classmate. Despite being scared, he decides to tell the truth and apologize.`,
    lesson: (n, h, t, b, s, sn) => `Honesty and admitting mistakes build deep trust and respect in any friendship.`
  },
  {
    title: (n, h, t, b, s, hl) => `${n}'s Vacation in the Countryside`,
    rumusan: (n, h, t, b, s, hl) => `Follows ${n} as he spends his school holidays at his grandparents' cozy house in ${t}. He learns about herbal plants and local community values.`,
    lesson: (n, h, t, b, s, sn) => `Valuing family traditions and spending time with grandparents strengthens our family bonds.`
  },
  {
    title: (n, h, t, b, s, hl) => `The Proud ${capitalizeWords(h)} and the Patient ${capitalizeWords(hl)}`,
    rumusan: (n, h, t, b, s, hl) => `A very proud ${h} challenges a patient ${hl} to a race in the ${t}. Because of his arrogance, he makes mistakes and loses to the steady competitor.`,
    lesson: (n, h, t, b, s, sn) => `Arrogance leads to failure, while humility, patience, and steady focus lead to success.`
  },
  {
    title: (n, h, t, b, s, hl) => `The Mystery of the Missing Notebook`,
    rumusan: (n, h, t, b, s, hl) => `${n}'s favorite school notebook goes missing right before class. He and his friends search the school yard and find it with a funny, unexpected twist.`,
    lesson: (n, h, t, b, s, sn) => `Working together as a team helps solve problems faster and makes the process enjoyable.`
  },
  {
    title: (n, h, t, b, s, hl) => `The Active and Healthy Little ${capitalizeWords(h)}`,
    rumusan: (n, h, t, b, s, hl) => `This book features an active ${h} who does morning exercises daily in the ${t}. He encourages his lazy friends to join him to stay healthy.`,
    lesson: (n, h, t, b, s, sn) => `Exercising regularly and eating healthy foods are key factors for a long and energetic life.`
  },
  {
    title: (n, h, t, b, s, hl) => `A New Friend from ${t}`,
    rumusan: (n, h, t, b, s, hl) => `Tells the story of a new student who moves to the school from ${t}. ${n} welcomes him warmly and helps him find his way around the classroom.`,
    lesson: (n, h, t, b, s, sn) => `Being friendly and welcoming to newcomers creates a harmonious and inclusive environment.`
  },
  {
    title: (n, h, t, b, s, hl) => `${n}'s Creative Workshop`,
    rumusan: (n, h, t, b, s, hl) => `${n} is a creative kid who loves to repair broken ${b} instead of throwing them away. He repurposes old items to save money for his family.`,
    lesson: (n, h, t, b, s, sn) => `Creativity and recycling help reduce waste and teach us the value of resourcefulness.`
  }
];

const enNonFictionTemplates = [
  {
    title: (t) => `Let's Explore the World of ${capitalizeWords(t)}`,
    rumusan: (t) => `This science book introduces children to the basics of ${t} with simple English sentences and colorful illustrations. It includes easy home experiments for young students.`,
    lesson: "Inspires young minds to love science and fosters curiosity about the natural world around us."
  },
  {
    title: (t) => `The Crucial Role of ${capitalizeWords(t)} in Our Lives`,
    rumusan: (t) => `Discusses why ${t} is vital for human survival, animal life, and the planet's ecosystem, highlighting modern methods for its conservation.`,
    lesson: "Teaches us to appreciate our natural resources and practice sustainable habits in our daily lives."
  },
  {
    title: (t) => `A Child's Practical Guide to ${capitalizeWords(t)}`,
    rumusan: (t) => `A practical guide explaining the core concepts of ${t} in a clear way, providing easy tips for kids to practice at school or home.`,
    lesson: "Encourages children to make healthy, rational, and responsible choices in their daily routine."
  },
  {
    title: (t) => `Fun Facts and Wonders of ${capitalizeWords(t)}`,
    rumusan: (t) => `Packed with amazing details, scientific facts, and unique questions about ${t} to inspire children's reading interests.`,
    lesson: "Fosters curiosity and promotes a healthy reading habit for continuous lifelong learning."
  },
  {
    title: (t) => `How We Can Preserve the Future of ${capitalizeWords(t)}`,
    rumusan: (t) => `Explores the scientific methods and practical steps needed to protect ${t} for current and future generations.`,
    lesson: "Taking care of the environment is a shared responsibility, and we should start with small steps."
  },
  {
    title: (t) => `An Introduction to the Science of ${capitalizeWords(t)}`,
    rumusan: (t) => `A beginner's reference book that explains the basic scientific concept of ${t} using clear diagrams and definitions.`,
    lesson: "Learning science helps to expand our minds and understand how the natural world operates."
  },
  {
    title: (t) => `The Secrets of ${capitalizeWords(t)} and Ecosystems`,
    rumusan: (t) => `Reveals the science and unique role of ${t} in maintaining the balance of the global ecosystem and biological diversity.`,
    lesson: "Every element of nature has its own special purpose and value in the chain of life."
  },
  {
    title: (t) => `Science and Technology Behind ${capitalizeWords(t)}`,
    rumusan: (t) => `Explains simple physics and modern technology behind the development and usage of ${t} in human civilization.`,
    lesson: "Science and technology help us solve complex human problems with rational and objective reasoning."
  },
  {
    title: (t) => `Exploring the Beauty of ${capitalizeWords(t)}`,
    rumusan: (t) => `Takes young readers on a visual journey to discover the beauty, shapes, and colorful variety of ${t} around the globe.`,
    lesson: "Developing a sense of wonder and observation is key to academic success and self-development."
  },
  {
    title: (t) => `Biodiversity and Saving Our ${capitalizeWords(t)}`,
    rumusan: (t) => `Highlights the diverse species and ecological value found in ${t} through maps, simple text, and clear photos.`,
    lesson: "The beauty and balance of our environment must be protected and valued by all citizens."
  }
];

// ----------------------------------------------------
// 3. Chinese (zh) Templates
// ----------------------------------------------------
const zhFictionTemplates = [
  {
    title: (n, h, t, b, s, hl) => `${s}${h}的故事`,
    rumusan: (n, h, t, b, s, hl) => `本书讲述了一只生活在${t}里的可爱${h}的故事。它非常${s}，在林中空地捡到了一个精美的${b}后，主动克服了私心，千方百计寻找失主并归还。`,
    lesson: (n, h, t, b, s, sn) => `我们在生活中应当始终坚持${sn}的品质，做个诚实守信、令人信赖的好孩子。`
  },
  {
    title: (n, h, t, b, s, hl) => `${n}和神奇的${b}`,
    rumusan: (n, h, t, b, s, hl) => `讲述了男孩${n}在${t}探险时，意外获得了一个具有神奇功能的${b}。魔法虽然帮他省了很多力气，但最后他发现，靠自己努力完成任务才最踏实。`,
    lesson: (n, h, t, b, s, sn) => `我们不能依赖虚幻的捷径，只有脚踏实地依靠自身汗水换来的成果才最真实。`
  },
  {
    title: (n, h, t, b, s, hl) => `小${h}在${t}的奇遇记`,
    rumusan: (n, h, t, b, s, hl) => `活泼好动的小${h}独自前往${t}旅行，一路上遇到了许多新奇的事物。在面临暴风雨威胁时，它带领森林里的小动物们共同协作，成功加固了家园。`,
    lesson: (n, h, t, b, s, sn) => `团结协作是克服困难的法宝，与朋友分工合作能让难题迎刃而解。`
  },
  {
    title: (n, h, t, b, s, hl) => `${n}的新${b}梦`,
    rumusan: (n, h, t, b, s, hl) => `学校马上要开学了，${n}非常渴望拥有一个精美的${b}。为了减轻父母的负担，他在家长的建议下通过做家务和节省零花钱，用自己的积蓄买下了它。`,
    lesson: (n, h, t, b, s, sn) => `树立理财意识，通过勤劳和耐心实现自己的小目标，是成长的重要一课。`
  },
  {
    title: (n, h, t, b, s, hl) => `寻找真正朋友的小${h}`,
    rumusan: (n, h, t, b, s, hl) => `孤单的小${h}为了寻找真心朋友，决定去外面的${t}看一看。在旅途中，它渐渐学会了微笑、倾听以及礼貌待人的方法，终于收获了珍贵的友谊。`,
    lesson: (n, h, t, b, s, sn) => `真诚的微笑和礼貌的言行是人与人之间沟通的桥梁，也是赢得友谊的基础。`
  },
  {
    title: (n, h, t, b, s, hl) => `${t}的神秘地道`,
    rumusan: (n, h, t, b, s, hl) => `${n}和几个好朋友在${t}附近玩耍时，意外发现了一个被树叶遮挡的旧地道。他们分工合作，解开了一个个谜题，发现了一段关于这个小镇的历史故事。`,
    lesson: (n, h, t, b, s, sn) => `保持健康的好奇心和团队协作精神，能让我们在探索中增长见识、收获快乐。`
  },
  {
    title: (n, h, t, b, s, hl) => `热心肠的${n}`,
    rumusan: (n, h, t, b, s, hl) => `描写了懂事孩子${n}忙碌而有意义的一天。他放学后主动帮妈妈扫地、洗菜，还顺路帮住在${t}的王奶奶把报纸送上楼。`,
    lesson: (n, h, t, b, s, sn) => `百善孝为先，多为父母分担家务、积极帮助邻里，能让我们的社会更加温暖。`
  },
  {
    title: (n, h, t, b, s, hl) => `小${h}学会了分享`,
    rumusan: (n, h, t, b, s, hl) => `小${h}平时总是把好吃的好玩的藏起来，不愿意分享给${t}的小伙伴。直到有一回它的零食被大风卷走，伙伴们却纷纷伸出援手，它才明白了分享的道理。`,
    lesson: (n, h, t, b, s, sn) => `分享不会让我们的快乐减少，反而会让快乐加倍，能让我们收获更多的温暖。`
  },
  {
    title: (n, h, t, b, s, hl) => `${n}的小存钱罐`,
    rumusan: (n, h, t, b, s, hl) => `这本书讲述了${n}如何建立储蓄习惯的故事。他每天把没花完的零钱投进存钱罐里，最终成功用这笔钱买下了心仪已久的${b}，体会到了储蓄的乐趣。`,
    lesson: (n, h, t, b, s, sn) => `积少成多，培养勤俭节约、合理消费的习惯对我们的一生都大有裨益。`
  },
  {
    title: (n, h, t, b, s, hl) => `勇敢的矮个子小${h}`,
    rumusan: (n, h, t, b, s, hl) => `讲述了一只身材娇小的小${h}在${t}里智斗大灰狼的故事。它虽然力气很小，但遇到危险时冷静沉着，利用地形和机关巧妙地保护了大家。`,
    lesson: (n, h, t, b, s, sn) => `遇到危险时慌张没有用，要学会用智慧保护自己，冷静观察周围的环境。`
  },
  {
    title: (n, h, t, b, s, hl) => `爷爷的特别礼物`,
    rumusan: (n, h, t, b, s, hl) => `外公在生日那天送给${n}一个看起来有些旧的${b}，里面还夹着一封信。信中外公写下了许多关于诚实与勤奋的人生寄语，成为了${n}最宝贵的财富。`,
    lesson: (n, h, t, b, s, sn) => `比起物质财富，长辈留给我们的宝贵建议和家风美德更值得我们用心珍藏。`
  },
  {
    title: (n, h, t, b, s, hl) => `小${h}清理大森林`,
    rumusan: (n, h, t, b, s, hl) => `小${h}看到美丽的${t}里被丢弃了许多饮料瓶和垃圾，非常心疼。它主动拿来小垃圾袋，带领森林学校的同学们利用周末开展了一次清洁大行动。`,
    lesson: (n, h, t, b, s, sn) => `爱护环境、人人有责，文明习惯要从我做起，从小事做起，共同呵护美丽家园。`
  },
  {
    title: (n, h, t, b, s, hl) => `学校的绘画大赛`,
    rumusan: (n, h, t, b, s, hl) => `学校举办了主题为“我眼中的${t}”的绘画比赛，${n}认真准备，用七彩画笔描绘了心中的家园。虽然只拿到了优秀奖，但他依然感到非常自豪。`,
    lesson: (n, h, t, b, s, sn) => `重在参与，结果并不是最重要的，只要在努力的过程中有所进步就是成功。`
  },
  {
    title: (n, h, t, b, s, hl) => `小诚实的代价`,
    rumusan: (n, h, t, b, s, hl) => `在学校里，${n}不小心碰倒并摔坏了同学的${b}。他没有假装不知道，而是勇敢地走到老师和同学面前承认了错误，并用自己的零花钱重新买了一个赔给同学。`,
    lesson: (n, h, t, b, s, sn) => `诚实是立身之本，做错事要敢于承担后果，勇于纠正错误才能赢得尊重。`
  },
  {
    title: (n, h, t, b, s, hl) => `${n}去乡下外婆家`,
    rumusan: (n, h, t, b, s, hl) => `放暑假了，${n}乘车回到了位于${t}的外公外婆家。在那里他跟着长辈认识了各种各样的农作物，体验到了劳动的辛苦与大自然的丰富回馈。`,
    lesson: (n, h, t, b, s, sn) => `体验乡村生活能让我们更加珍惜盘中餐，同时要多陪伴长辈，孝敬老人。`
  },
  {
    title: (n, h, t, b, s, hl) => `骄傲的小${h}和耐心的${hl}`,
    rumusan: (n, h, t, b, s, hl) => `森林学校里骄傲的小${h}总觉得自己是跑得最快的。在一次障碍越野赛中，它因为骄傲大意而迷了路，而踏实稳重的小${hl}则一步一个脚印，最终赢得了比赛。`,
    lesson: (n, h, t, b, s, sn) => `骄傲使人落后，谦虚使人进步。做任何事情都要有恒心和耐心，切忌浮躁。`
  },
  {
    title: (n, h, t, b, s, hl) => `寻找丢失的数学作业本`,
    rumusan: (n, h, t, b, s, hl) => `第一节课铃声快响了，${n}却怎么也找不到数学本。在几个热心同桌的帮助下，大家顺着上学路上的线索，终于在学校长椅下找回了本子，过程既紧张又有趣。`,
    lesson: (n, h, t, b, s, sn) => `面对突发问题时不要慌张，团结同学、互相协助是高效解决问题的最好办法。`
  },
  {
    title: (n, h, t, b, s, hl) => `爱运动的小${h}`,
    rumusan: (n, h, t, b, s, hl) => `这本故事画册介绍了一只每天清晨在${t}里坚持慢跑的小${h}的故事。它不仅自己锻炼，还劝说那些整天睡懒觉的小胖猪一起运动，帮助大家保持身材。`,
    lesson: (n, h, t, b, s, sn) => `生命在于运动，坚持体育锻炼不仅能让我们身体健康，还能让我们每天精神饱满。`
  },
  {
    title: (n, h, t, b, s, hl) => `欢迎新同学`,
    rumusan: (n, h, t, b, s, hl) => `班里转来了一位从${t}来的新同学。${n}主动当起了“向导”，带新同学熟悉校园环境，介绍学校的各项活动，帮助新同学很快地融入了新集体。`,
    lesson: (n, h, t, b, s, sn) => `我们要用热情和善意去对待新朋友，主动帮助他人，营造团结有爱的集体氛围。`
  },
  {
    title: (n, h, t, b, s, hl) => `${n}的旧物变身记`,
    rumusan: (n, h, t, b, s, hl) => `${n}是一个手巧且有创意的孩子，他把废弃的${b}改造成了精美的收纳盒和花盆。不仅美化了房间，还起到了废物利用的环保效果。`,
    lesson: (n, h, t, b, s, sn) => `动脑筋进行旧物改造，可以减少环境垃圾，也能培养我们的动手实践能力。`
  }
];

const zhNonFictionTemplates = [
  {
    title: (t) => `带孩子认识${t}`,
    rumusan: (t) => `本书通过通俗易懂的儿童语言和丰富的全彩插图，向小学生系统介绍了有关${t}的基础自然科学知识，并附有简单有趣的课堂互动问答。`,
    lesson: "激发孩子们对自然科学的探索欲，帮助建立探索未知科学领域的好奇心。"
  },
  {
    title: (t) => `${t}在人类生活中的重要角色`,
    rumusan: (t) => `深度探讨了${t}在人类日常生活、生态平衡以及环境保护中的重要地位，结合社会实践探讨了现代科学保护手段。`,
    lesson: "引导我们珍惜身边的每一份自然资源，增强对生态环境的主动保护意识。"
  },
  {
    title: (t) => `给小学生的${t}科普指南`,
    rumusan: (t) => `一本专为少年儿童量身打造的实用科普手册，梳理了关于${t}的知识要点，提供了便于在日常生活中实践的环保小建议。`,
    lesson: "指导孩子们在日常作息中做出更有利于身心健康和保护地球环境的明智选择。"
  },
  {
    title: (t) => `关于${t}的有趣奇闻与发现`,
    rumusan: (t) => `汇编了人类关于${t}的许多前沿科学发现和趣味历史事实，让科学知识不再枯燥，充满阅读乐趣。`,
    lesson: "培养孩子多读书、善于思考的好习惯，学会在生活中寻找科学常识。"
  },
  {
    title: (t) => `如何科学保护我们的${t}`,
    rumusan: (t) => `为孩子们提供了浅显易懂的科学建议与行动方案，阐明了在应对气候变暖时，我们应当如何合理保护${t}。`,
    lesson: "环境保护是全人类的共同事业，每一个微小的环保行动都具有重要意义。"
  },
  {
    title: (t) => `初探${t}：给小读者的第一本书`,
    rumusan: (t) => `本参考书为低年级学生设计，以简练直观的图表和文字，深入浅出地讲解了${t}这一科普课题的发展历程。`,
    lesson: "学无止境，从基础的科学概念开始，有助于为未来的理科学习打下坚实根基。"
  },
  {
    title: (t) => `${t}与地球生态平衡的奥秘`,
    rumusan: (t) => `揭示了${t}在自然循环和地球生态系统中发挥的巨大核心作用，让孩子明白万物相连的科学道理。`,
    lesson: "大自然中各种资源和生物相互依存，我们必须遵循自然规律，与之和谐相处。"
  },
  {
    title: (t) => `${t}背后的科学基础与现代应用`,
    rumusan: (t) => `介绍物理、化学等基础学科在解释${t}现象时的应用，帮助孩子把课本上的科学知识与实际生活联系起来。`,
    lesson: "科学是一把神奇的钥匙，能够帮助我们用客观、逻辑的态度来理解世界运行的法则。"
  },
  {
    title: (t) => `漫步地球：探索${t}的极致之美`,
    rumusan: (t) => `通过许多精美的航拍照片和地理知识，带领孩子们从视觉上领略地球上不同地区${t}的壮丽与奇妙。`,
    lesson: "读万卷书行万里路，时刻对世界保持求知热情，是快乐成长的源动力。"
  },
  {
    title: (t) => `物种多样性与珍稀的${t}`,
    rumusan: (t) => `利用清晰的数据图表、趣味手绘插画，生动展示了与${t}相关的生物群落及它们的生存现状。`,
    lesson: "地球是所有生物的共同家园，关爱动物植物，就是关爱人类自己。"
  }
];

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

// ----------------------------------------------------
// Main Generators
// ----------------------------------------------------
function generateBm(categorySlug) {
  const books = [];
  const authors = ["Noraini Ahmad", "Siti Hajar", "Zalina Hassan", "Aina Farhana", "Nur Hafizah", "Siti Maisarah", "Zulhilmi Ahmad", "Dr. Farid Omar", "Rohana Ali", "Nadia Rahim", "Azman Yusof", "Ahmad Faisal", "Khairul Anuar", "Fatimah Zahra", "Mohd Syamil", "Rosli Harun", "Faridah Ismail", "Hazim Shah", "Aishah Rahman", "Zulkifli Musa"];
  const publishers = ["Penerbitan Pelangi Sdn. Bhd.", "Pustaka Sri Dunia", "Sasbadi Sdn. Bhd.", "Cerdik Publications", "Dewan Bahasa dan Pustaka", "Penerbitan Fajar Bakti", "PTS Publishing House", "Pustaka Bestari", "Penerbitan Ilmu Bakti", "Karya Bestari"];

  if (categorySlug === "fiksyen") {
    const nama = ["Ali", "Siti", "Aman", "Mimi", "Raju", "Mei Mei", "Zaki", "Hafiz", "Sarah", "Daniel", "Sofea", "Adam", "Fatimah", "Aina", "Aiman", "Chong", "Suresh", "Bella", "Haziq", "Balqis"];
    const haiwan = ["arnab", "kucing", "burung", "tupai", "kura-kura", "monyet", "anak ayam", "singa", "gajah", "semut", "belalang", "kancil", "anjing", "itik", "katak", "kambing", "lembu", "kuda", "panda", "koala"];
    const tempat = ["Hutan Hijau", "Kampung Damai", "Pulau Indah", "Taman Bunga", "Sekolah Impian", "Bukit Ceria", "Kampung Sentosa", "Tasik Indah", "Lembah Gemilang", "Taman Harmony"];
    const benda = ["kotak kayu", "beg sekolah", "pensel warna", "basikal lama", "layang-layang", "bola sepak", "cermin antik", "kunci emas", "jam dinding", "topi jerami"];
    const sifat = ["jujur", "berani", "rajin", "bijak", "baik hati", "sabar", "pemurah", "cerdik", "sopan", "amanah"];
    const sifatNoun = {
      "jujur": "kejujuran", "berani": "keberanian", "rajin": "kerajinan", "bijak": "kebijaksanaan",
      "baik hati": "kebaikan hati", "sabar": "kesabaran", "pemurah": "sifat pemurah", "cerdik": "kecerdikan",
      "sopan": "kesopanan", "amanah": "sifat amanah"
    };

    for (let i = 0; i < 3000; i++) {
      const tId = i % bmFictionTemplates.length;
      const n = nama[i % nama.length];
      const h = haiwan[(i + 3) % haiwan.length];
      const hl = haiwan[(i + 7) % haiwan.length];
      const t = tempat[(i + 5) % tempat.length];
      const b = benda[(i + 2) % benda.length];
      const s = sifat[(i + 1) % sifat.length];
      const sn = sifatNoun[s] || s;

      const template = bmFictionTemplates[tId];
      const title = template.title(n, h, t, b, s, hl);
      const rumusan = template.rumusan(n, h, t, b, s, hl);
      const lesson = template.lesson(n, h, t, b, s, sn);

      books.push({
        title,
        rumusan,
        lesson,
        author: authors[i % authors.length],
        publisher: publishers[i % publishers.length],
        year: 2016 + (i % 9),
        pages: 16 + (i % 24)
      });
    }
  } else {
    // Bukan Fiksyen
    const topics = ["cuaca", "sistem air", "hujan", "matahari", "bulan", "bintang", "planet", "awan", "angin", "tanah", "batu", "pasir", "lautan", "sungai", "tasik", "kolam", "hutan", "gunung", "lembah", "padang pasir", "haiwan peliharaan", "haiwan liar", "burung", "ikan", "serangga", "reptilia", "mamalia", "tumbuhan", "bunga", "buah-buahan", "sayur-sayuran", "pokok", "daun", "akar", "kitar semula", "sampah", "plastik", "kertas", "kaca", "logam", "kesihatan", "kebersihan", "gigi", "mata", "telinga", "kulit", "rambut", "jantung", "paru-paru", "otak", "tulang", "otot", "makanan", "minuman", "susu", "roti", "nasi", "buah", "sayur", "daging", "sukan", "bola sepak", "badminton", "berenang", "berlari", "berbasikal", "sejarah", "budaya", "muzik", "lukisan", "tarian", "permainan tradisi", "sains", "matematik", "teknologi", "komputer", "internet", "angkasa", "tenaga", "elektrik", "magnet", "cahaya", "bunyi", "haba", "graviti", "air bersih", "udara bersih", "kebun sayur", "peternakan", "perikanan", "pertanian", "pengangkutan", "kereta", "keretapi", "kapal terbang", "kapal laut", "keselamatan", "kebakaran", "pertolongan cemas", "adab sopan"];

    for (let i = 0; i < 3000; i++) {
      const tId = i % bmNonFictionTemplates.length;
      const topic = topics[i % topics.length];

      const template = bmNonFictionTemplates[tId];
      const title = template.title(topic);
      const rumusan = template.rumusan(topic);
      const lesson = template.lesson;

      books.push({
        title,
        rumusan,
        lesson,
        author: authors[i % authors.length],
        publisher: publishers[i % publishers.length],
        year: 2016 + (i % 9),
        pages: 16 + (i % 24)
      });
    }
  }
  return books;
}

function generateEn(categorySlug) {
  const books = [];
  const authors = ["Emily Carter", "Sarah Collins", "Anna Brooks", "Michael Reed", "Helen Ward", "Peter Grant", "Laura Hill", "Rachel Green", "John Smith", "Mary Johnson", "David Brown", "James Wilson", "Robert Taylor", "Linda Thomas", "Elizabeth White", "William Harris", "Barbara Martin", "Richard Thompson", "Susan Garcia", "Joseph Martinez"];
  const publishers = ["Ladybird Books", "Oxford University Press", "Scholastic Asia", "Penguin Random House UK", "Macmillan Education", "HarperCollins Publishers", "Pearson Education", "Cambridge University Press", "National Geographic Kids", "DK Publishing"];

  if (categorySlug === "fiksyen") {
    const names = ["Oliver", "Emma", "Jack", "Lily", "Leo", "Anna", "Ryan", "Lucy", "Toby", "Sophie", "Max", "Mia", "Zac", "Grace", "Lucas", "Ella", "Ben", "Chloe", "Sam", "Ruby"];
    const animals = ["rabbit", "kitten", "puppy", "squirrel", "turtle", "monkey", "chick", "lion", "elephant", "ant", "bee", "frog", "duck", "lamb", "bear", "fox", "deer", "panda", "koala", "mouse"];
    const places = ["Green Forest", "Peaceful Valley", "Sunny Meadow", "Happy Garden", "Dream School", "Sunny Hill", "Cozy Town", "Crystal Lake", "Golden Valley", "Rainbow Creek"];
    const objects = ["wooden box", "school bag", "colored pencil", "old bicycle", "colorful kite", "soccer ball", "antique mirror", "golden key", "wall clock", "straw hat"];
    const adjectives = ["honest", "brave", "hardworking", "clever", "kind", "patient", "generous", "polite", "helpful", "loyal"];
    const adjectiveNouns = {
      "honest": "honesty", "brave": "bravery", "hardworking": "hard work", "clever": "cleverness",
      "kind": "kindness", "patient": "patience", "generous": "generosity", "polite": "politeness",
      "helpful": "helpfulness", "loyal": "loyalty"
    };

    for (let i = 0; i < 3000; i++) {
      const tId = i % enFictionTemplates.length;
      const n = names[i % names.length];
      const h = animals[(i + 3) % animals.length];
      const hl = animals[(i + 7) % animals.length];
      const t = places[(i + 5) % places.length];
      const b = objects[(i + 2) % objects.length];
      const s = adjectives[(i + 1) % adjectives.length];
      const sn = adjectiveNouns[s] || s;

      const template = enFictionTemplates[tId];
      const title = template.title(n, h, t, b, s, hl);
      const rumusan = template.rumusan(n, h, t, b, s, hl);
      const lesson = template.lesson(n, h, t, b, s, sn);

      books.push({
        title,
        rumusan,
        lesson,
        author: authors[i % authors.length],
        publisher: publishers[i % publishers.length],
        year: 2016 + (i % 9),
        pages: 16 + (i % 24)
      });
    }
  } else {
    // Non-Fiction
    const topics = ["weather", "water systems", "rain", "the sun", "the moon", "stars", "planets", "clouds", "wind", "soil", "rocks", "sand", "oceans", "rivers", "lakes", "ponds", "forests", "mountains", "valleys", "deserts", "pets", "wildlife", "birds", "fish", "insects", "reptiles", "mammals", "plants", "flowers", "fruits", "vegetables", "trees", "leaves", "roots", "recycling", "waste", "plastics", "paper", "glass", "metals", "health", "hygiene", "teeth", "eyes", "ears", "skin", "hair", "the heart", "lungs", "the brain", "bones", "muscles", "food", "drinks", "milk", "bread", "rice", "fruits", "vegetables", "meat", "sports", "football", "badminton", "swimming", "running", "cycling", "history", "culture", "music", "art", "dance", "traditional games", "science", "mathematics", "technology", "computers", "the internet", "outer space", "energy", "electricity", "magnets", "light", "sound", "heat", "gravity", "clean water", "clean air", "vegetable gardens", "farming", "fishing", "agriculture", "transportation", "cars", "trains", "airplanes", "ships", "safety", "fire safety", "first aid", "good manners"];

    for (let i = 0; i < 3000; i++) {
      const tId = i % enNonFictionTemplates.length;
      const topic = topics[i % topics.length];

      const template = enNonFictionTemplates[tId];
      const title = template.title(topic);
      const rumusan = template.rumusan(topic);
      const lesson = template.lesson;

      books.push({
        title,
        rumusan,
        lesson,
        author: authors[i % authors.length],
        publisher: publishers[i % publishers.length],
        year: 2016 + (i % 9),
        pages: 16 + (i % 24)
      });
    }
  }
  return books;
}

function generateZh(categorySlug) {
  const books = [];
  const authors = ["林小慧", "陈美玲", "王丽萍", "李安琪", "周明华", "黄佳怡", "刘文杰", "张雅雯", "赵强", "吴明", "孙丽", "周洁", "王伟", "李军", "刘洋", "张平", "李娜", "王静", "陈浩", "刘强"];
  const publishers = ["明天出版社", "二十一世纪出版社", "长江少年儿童出版社", "安徽少年儿童出版社", "浙江少年儿童出版社", "江苏凤凰少年儿童出版社", "接力出版社", "四川少年儿童出版社", "湖南少年儿童出版社", "北京少年儿童出版社"];

  if (categorySlug === "fiksyen") {
    const names = ["小明", "美美", "阿豪", "丽丽", "小华", "欢欢", "乐乐", "天天", "小东", "红红", "强强", "亮亮", "小芳", "兰兰", "佳佳", "宇宇", "洋洋", "晨晨", "欣欣", "小雅"];
    const animals = ["小兔子", "小猫", "小狗", "小松鼠", "小乌龟", "小猴子", "小鸡", "大狮子", "小象", "小蚂蚁", "小蜜蜂", "小青蛙", "小鸭子", "小绵羊", "小熊", "小狐狸", "小鹿", "小熊猫", "小考拉", "小老鼠"];
    const places = ["青青森林", "幸福小镇", "快乐学校", "美丽花园", "太阳山谷", "彩虹草地", "水晶湖畔", "阳光山丘", "金色小溪", "和谐社区"];
    const objects = ["红雨伞", "魔法盒", "新书包", "大自行车", "彩虹风筝", "足球", "古董镜子", "金色钥匙", "大闹钟", "小草帽"];
    const adjectives = ["诚实的", "勇敢的", "勤劳的", "聪明的", "善良的", "有耐心的", "大方的", "懂礼貌的", "乐于助人的", "守信用的"];
    const adjectiveNouns = {
      "诚实的": "诚实", "勇敢的": "勇气", "勤劳的": "勤劳", "聪明的": "智慧",
      "善良的": "善良", "有耐心的": "耐心", "大方的": "慷慨", "懂礼貌的": "礼貌",
      "乐于助人的": "互助", "守信用的": "守信"
    };

    for (let i = 0; i < 3000; i++) {
      const tId = i % zhFictionTemplates.length;
      const n = names[i % names.length];
      const h = animals[(i + 3) % animals.length];
      const hl = animals[(i + 7) % animals.length];
      const t = places[(i + 5) % places.length];
      const b = objects[(i + 2) % objects.length];
      const s = adjectives[(i + 1) % adjectives.length];
      const sn = adjectiveNouns[s] || s;

      const template = zhFictionTemplates[tId];
      const title = template.title(n, h, t, b, s, hl);
      const rumusan = template.rumusan(n, h, t, b, s, hl);
      const lesson = template.lesson(n, h, t, b, s, sn);

      books.push({
        title,
        rumusan,
        lesson,
        author: authors[i % authors.length],
        publisher: publishers[i % publishers.length],
        year: 2016 + (i % 9),
        pages: 16 + (i % 24)
      });
    }
  } else {
    // Non-Fiction
    const topics = ["天气变化", "水资源系统", "降雨现象", "太阳的奥秘", "月球探索", "闪烁的星星", "八大行星", "云朵的形成", "风的力量", "泥土与植物", "岩石与矿物", "沙子的故事", "辽阔的海洋", "奔流的河流", "美丽的湖泊", "小池塘生态", "森林生态系统", "雄伟的山脉", "神秘的山谷", "荒凉的沙漠", "可爱的小宠物", "野生动物世界", "天空中的鸟类", "水中的鱼类", "神奇的昆虫", "爬行动物科普", "哺乳动物特征", "绿色植物生长", "美丽的花朵", "水果的生长", "蔬菜的营养", "高大的树木", "树叶的光合作用", "植物的根部", "垃圾分类知识", "生活垃圾处理", "塑料制品的危害", "纸张回收利用", "玻璃制品工艺", "金属材料分类", "身体健康管理", "个人卫生习惯", "牙齿保健常识", "眼睛保护指南", "耳朵的奥秘", "皮肤的防护", "头发的清洁", "神奇的心脏", "肺部呼吸原理", "大脑发育过程", "骨骼与关节", "肌肉的力量", "日常食物分类", "干净的饮用水", "牛奶的营养价值", "面包的制作过程", "稻谷与米饭", "美味的水果", "绿色蔬菜", "肉类食品安全", "体育运动常识", "足球运动魅力", "羽毛球运动技巧", "游泳的乐趣", "跑步锻炼方法", "骑自行车的安全", "历史故事人物", "中华传统文化", "优美的音乐旋律", "美术绘画基础", "少儿舞蹈艺术", "民间传统游戏", "奇妙的物理现象", "数学基础运算", "现代科技应用", "电脑的日常用途", "互联网的世界", "神秘的太空探索", "自然资源能源", "电的产生原理", "磁铁的吸引力", "光线的传播路径", "声音是怎样产生的", "热能转换常识", "万有引力概念", "干净的饮用水源", "新鲜的空气质量", "家庭绿色菜园", "畜牧养殖科学", "淡水养鱼技术", "现代生态农业", "交通工具演变", "汽车的发展史", "火车的旅行", "飞机的飞行原理", "轮船航行奥秘", "居家安全防范", "防范火灾知识", "急救基础小知识", "日常礼仪规范"];

    for (let i = 0; i < 3000; i++) {
      const tId = i % zhNonFictionTemplates.length;
      const topic = topics[i % topics.length];

      const template = zhNonFictionTemplates[tId];
      const title = template.title(topic);
      const rumusan = template.rumusan(topic);
      const lesson = template.lesson;

      books.push({
        title,
        rumusan,
        lesson,
        author: authors[i % authors.length],
        publisher: publishers[i % publishers.length],
        year: 2016 + (i % 9),
        pages: 16 + (i % 24)
      });
    }
  }
  return books;
}

async function main() {
  let index = 1;

  for (const source of ["verified", "synthetic"]) {
    for (const language of ["bm", "en", "zh"]) {
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
