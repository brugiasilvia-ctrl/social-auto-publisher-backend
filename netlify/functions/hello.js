// netlify/functions/publishSocial.js
// (per semplicità riusiamo ancora il nome "hello.js" nel repo, ma la function si chiamerà publishSocial)

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed. Use POST." }),
      };
    }

    // Body che arriva dalla tua app
    const body = JSON.parse(event.body || "{}");
    const { platforms, imageUrl, caption } = body;

    if (!Array.isArray(platforms) || !platforms.length || !imageUrl || !caption) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Devi passare platforms (array), imageUrl, caption",
        }),
      };
    }

    // QUI in futuro chiameremo realmente Late / altro servizio API per pubblicare.
    // Per ora facciamo solo finta, così puoi collegare l'app:
    console.log("Richiesta publishSocial ricevuta:", {
      platforms,
      imageUrl,
      caption,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        message: "Simulazione pubblicazione riuscita",
        received: { platforms, imageUrl, caption },
      }),
    };
  } catch (err) {
    console.error("Errore publishSocial:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        error: err?.message || "Errore interno",
      }),
    };
  }
};
