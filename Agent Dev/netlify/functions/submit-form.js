const fetch = require("node-fetch");

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  if (!data.name || !data.email || !data.message) {
    return { statusCode: 400, body: "Missing required fields" };
  }

  const discordWebhook = process.env.DISCORD_WEBHOOK;
  if (discordWebhook) {
    await fetch(discordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📡 Encrypted Message Received:\n\n🔐 Name: ${data.name}\n📧 Email: ${data.email}\n🚨 Priority: ${data.priority || 'Not specified'}\n📄 Message: ${data.message}\n🔒 PGP Enabled: ${data.secure ? 'Yes' : 'No'}`
      }),
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      message: "Transmission received securely."
    })
  };
};
