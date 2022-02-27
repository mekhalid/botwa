const { Client } = require("whatsapp-web.js");
var qrcode = require("qrcode-terminal");
var fs = require("fs");

const SESSION_FILE_PATH = "./session.json";
let sessionCfg;
var client;

try {
  if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
  }

  client = new Client({ session: sessionCfg });
} catch (err) {
  client = new Client();
}

client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  console.log("QR RECEIVED", qr);

  qrcode.generate(qr, { small: true }, function (qrcode) {
    console.log(qrcode);
  });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (msg) => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  }

  if (msg.body == "command-line") {
    msg.reply(
      "_*Pesan ini dibalas secara otomatis*_\n\nBerikut adalah command utk mengetahui info seputar cheat vip :\n\n*price-list* = Memberikan list harga cheat vip.\n*jam-buka* = Memberikan info jadwal buka dan tutup toko ini.\n*versi-cheat* = Memberikan info ada berapa versi cheat yg tersedia."
    );
  }

  if (msg.body == "price-list") {
    client.sendMessage(
      msg.from,
      "*[==Paket Personal Point Blank Zepetto==]*\n\n==[🎫] Rp. 10.000 = 1 Hari\n==[🎫] Rp. 15.000 = 2 Hari\n==[🎫] Rp. 25.000 = 5 Hari\n==[🎫] Rp. 50.000 = 10 Hari\n==[🎫] Rp. 70.000 = 18 Hari\n==[🎫] Rp. 90.000 = 26 Hari\n==[🎫] Rp. 100.000 = 36 Hari\n==[🎫] Rp. 180.000 = 67 Hari\n==[🎫] Rp. 250.000 = 98 Hari"
    );
  }

  if (msg.body == "jam-buka") {
    client.sendMessage(
      msg.from,
      "*OPEN & CLOSE VUNNY VIP STORE*\n🟢 OPEN ON = 08.00 - 00.00 WIB\n\nSetelah jam lewat 00.00 admin akan membalas pesan di jam 08.00 tolong untuk tidak memberikan spam message!"
    );
  }

  if (msg.body == "versi-cheat") {
    client.sendMessage(
      msg.from,
      "*Versi yang tersedia :*\n\n- Versi 1 Simple & Hard.\n- Versi 2 Fullpack.\n- Versi 3 Fullpack."
    );
  }

  if (msg.body == "chat-admin") {
    client.sendMessage(
      msg.from,
      "*_Tunggu sebentar, aku akan mengalihkan pesan ini ke admin....._*"
    );
  }
});

client.initialize();
