import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Função que gera o texto retornado para o Dialogflow
async function gerarMensagem() {
  const apiURL = "https://painelxstart.top/api/chatbot/PkaL4V5Wgr/JOALy014wx";
  const r = await fetch(apiURL);
  const data = await r.json();

  return `
🚀 *FluxPlay IPTV – Seu Teste Foi Gerado!*

Aqui estão os seus dados:

👤 *Usuário:* ${data.username}
🔑 *Senha:* ${data.password}
🌐 *URL:* ${data.dns}
📆 *Criado em:* ${data.createdAtFormatted}
⏳ *Válido até:* ${data.expiresAtFormatted}
📱 *Conexões:* ${data.connections}

📦 *Plano:* ${data.package}

-----------------------------------------

Se precisar de ajuda com a instalação, posso te orientar 😉
`;
}

/* ======================================
   🔵 POST /webhook — EXCLUSIVO DIALOGFLOW
   ====================================== */
app.post("/webhook", async (req, res) => {
  try {
    const msg = await gerarMensagem();

    return res.json({
      fulfillmentText: msg
    });

  } catch (err) {
    console.error("Erro no webhook:", err);

    return res.json({
      fulfillmentText:
        "⚠️ Ocorreu um erro ao gerar seu teste. Tente novamente em instantes."
    });
  }
});

/* Porta do Render */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`🔥 Webhook FluxPlay ativo exclusivamente para Dialogflow`)
);
