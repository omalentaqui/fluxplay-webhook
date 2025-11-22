import express from "express";
import fetch from "node-fetch";

const app = express();

// Aceita GET simples
app.get("/webhook", async (req, res) => {
  try {
    // Chamar API do painel
    const apiURL = "https://painelxstart.top/api/chatbot/PkaL4V5Wgr/JOALy014wx";
    const r = await fetch(apiURL);
    const data = await r.json();

    // ================================
    // 🔥 FORMATAÇÃO FLUXPLAY IPTV
    // ================================
    const msg = `
🚀 *FluxPlay IPTV – Seu Teste Foi Gerado!*

Aqui estão os seus dados de acesso:

👤 *Usuário:* ${data.username}
🔑 *Senha:* ${data.password}
🌐 *URL do Servidor:* ${data.dns}
📆 *Criado em:* ${data.createdAtFormatted}
⏳ *Válido até:* ${data.expiresAtFormatted}
📱 *Conexões:* ${data.connections}

📦 *Plano referente ao teste:*  
${data.package}

----------------------------------------------------

Se precisar de ajuda para instalar, posso te guiar passo a passo! 😊
`;

    // RETORNO EM TEXTO PURO PARA O AUTOREPLY
    return res.send(msg);

  } catch (err) {
    console.log(err);
    return res.send("⚠️ Tivemos um problema ao gerar seu teste. Tente novamente.");
  }
});

// Porta Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Webhook FluxPlay ativo"));
