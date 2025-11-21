import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Rota do webhook
app.post("/webhook", async (req, res) => {
  try {
    const { deviceType, listaTipo } = req.body;

    // Chamada à API do seu painel
    const apiURL =
      "https://painelxstart.top/api/chatbot/PkaL4V5Wgr/JOALy014wx";

    const r = await fetch(apiURL);
    const data = await r.json();

    let apps = "";

    if (deviceType === "android") {
      apps = `
📱 *Android / TV Box*
📲 VUSER: https://play.google.com/store/apps/details?id=com.p2plobo.app
📲 PLAYSIM: https://play.google.com/store/apps/details?id=com.ultrastream.ultraxcplayer
      `;
    }

    if (deviceType === "smart") {
      apps = `
📺 *Smart TVs*
🌐 XCLOUD – Código: star0
🌐 ASSIST PLUS – Código: 3489767
🌐 LAZER PLAY – Código: 3080
🌐 PLAY SIM – Código: 938124
🌐 VIZZION PLAY – Código: 165930
`;
    }

    if (deviceType === "androidtv") {
      apps = `
🔥 *Android TV / FireStick*
🌐 LAZER PLAY – Código: 3080
📲 VUSER – https://play.google.com/store/apps/details?id=com.p2plobo.app
📲 PLAYSIM – https://play.google.com/store/apps/details?id=com.ultrastream.ultraxcplayer
`;
    }

    const msg = `
🚀 *FluxPlay IPTV – Seu Teste Está Pronto!*

👤 Usuário: ${data.username}
🔑 Senha: ${data.password}
🌐 URL: ${data.dns}
⏳ Validade: ${data.expiresAtFormatted}
🔞 Lista: ${
      listaTipo === "adulto" ? "COM canais adultos" : "SEM canais adultos"
    }

${apps}

💳 Assinar: ${data.payUrl}

Qualquer dúvida, posso te ajudar! 😊
`;

    return res.json({ msg });
  } catch (err) {
    console.error(err);
    return res.json({
      msg: "❌ Houve um problema ao gerar seu teste. Tente novamente."
    });
  }
});

// Porta que o Render define automaticamente
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`🚀 Webhook online na porta ${PORT}`)
);
