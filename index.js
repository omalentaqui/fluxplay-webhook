import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// === Função que chama a API nova (POST), extrai link curto e monta o texto ===
async function gerarMensagem() {
  const apiURL = "https://seventvpainel.top/api/chatbot/MeWe0QbDnN/z2BDvoWrkj";

  // Chamada à API — somente POST funciona
  const r = await fetch(apiURL, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: "{}"
  });

  const data = await r.json();

  // -----------------------------------------
  // EXTRAÇÃO DO LINK CURTO M3U (via REGEX)
  // -----------------------------------------
  const replyText = data.reply || "";
  const regexM3u = /http:\/\/\S+\/m3u/gi;
  const match = replyText.match(regexM3u);
  const linkCurtoM3U = match && match.length > 0 ? match[0] : "Não encontrado";

  // -----------------------------------------
  // MENSAGEM FINAL (como você pediu)
  // -----------------------------------------
  return `
🚀 *FluxPlay IPTV – Seu Teste Foi Gerado!*

👤 *Usuário:* ${data.username}
🔑 *Senha:* ${data.password}

🔗 *Link Curto M3U:*  
${linkCurtoM3U}

📆 *Criado:* ${data.createdAtFormatted}
⏳ *Válido até:* ${data.expiresAtFormatted}
📦 *Pacote:* ${data.package}

💳 *Assinar / Renovar:*  
(Plano Mensal): https://mpago.la/1aKsznY  
(Plano Trimestral): —  
(Plano Semestral): —  

Se precisar de ajuda para instalação, podemos te orientar.
Digite *9* para falar com nossa equipe 😉
`;
}

// === ROTA SOMENTE PARA DIALOGFLOW (POST) ===
app.post("/webhook", async (req, res) => {
  try {
    const msg = await gerarMensagem();
    return res.json({ fulfillmentText: msg });

  } catch (err) {
    console.error("🔥 ERRO AO GERAR TESTE:", err);

    return res.json({
      fulfillmentText: "⚠️ Erro ao gerar seu teste. Tente novamente em instantes."
    });
  }
});

// Porta Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("🔥 Webhook FluxPlay ativo (POST somente)")
);
