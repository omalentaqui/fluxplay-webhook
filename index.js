import express from "express";
import fetch from "node-fetch";

const app = express();

// Aceitar GET sem corpo
app.get("/webhook", async (req, res) => {
  try {
    // Chamada para sua API do painel
    const apiURL =
      "https://painelxstart.top/api/chatbot/PkaL4V5Wgr/JOALy014wx";

    const r = await fetch(apiURL);
    const data = await r.json();

    // Texto padrão, já que não teremos deviceType nem listaTipo
    const deviceType = "android"; 
    const listaTipo = "sem-adulto"; 

    let apps = `
📱 *Celular Android / TV Box*

📲 VUSER  
https://play.google.com/store/apps/details?id=com.p2plobo.app

📲 PLAYSIM  
https://play.google.com/store/apps/details?id=com.ultrastream.ultraxcplayer
`;

    // Mensagem para retorno
    const msg = `
🚀 *FluxPlay IPTV – Seu Teste Está Pronto!*

Aqui estão seus dados:

👤 *Usuário:* ${data.username}
🔑 *Senha:* ${data.password}
🌐 *URL:* ${data.dns}
⏳ *Validade:* ${data.expiresAtFormatted}

📦 *Lista:* ${
      listaTipo === "adulto" ? "COM canais adultos" : "SEM canais adultos"
    }

${apps}

💳 *Assinar Plano:*  
${data.payUrl}

Qualquer dúvida, posso te ajudar! 😊
`;

    // AutoReply precisa de texto simples
    return res.send(msg);

  } catch (err) {
    console.error(err);

    return res.send("❌ Não consegui gerar seu teste agora. Tente novamente.");
  }
});

// Porta do Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("🚀 Webhook ativo no Render"));
