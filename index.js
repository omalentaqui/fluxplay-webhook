import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// === Função que chama a API nova (POST) e monta o texto ===
async function gerarMensagem() {
  const apiURL = "https://seventvpainel.top/api/chatbot/MeWe0QbDnN/z2BDvoWrkj";

  // A API só funciona em POST → então vamos usar POST.
  const r = await fetch(apiURL, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: "{}"
  });

  const data = await r.json();

  return `
🚀 *FluxPlay IPTV – Seu Teste Foi Gerado!*

Aqui estão os seus dados:

👤 *Usuário:* ${data.username}
🔑 *Senha:* ${data.password}
🌐 *Servidor:* ${data.dns}

📆 *Criado:* ${data.createdAtFormatted}
⏳ *Válido até:* ${data.expiresAtFormatted}
📱 *Conexões:* ${data.connections}

📦 *Pacote:* ${data.package}

-----------------------------------------

Se precisar do passo-a-passo de instalação é só pedir 😉
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
app.listen(PORT, () => console.log("🔥 Webhook FluxPlay ativo (POST somente)"));
