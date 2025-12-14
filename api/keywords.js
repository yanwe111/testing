export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // ✅ EC2 KeyBERT API (HTTP)
  const EC2_KEYWORD_API = "http://18.138.11.123:8000/keywords";

  try {
    const upstream = await fetch(EC2_KEYWORD_API, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader("content-type", upstream.headers.get("content-type") || "application/json");
    return res.send(text);
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
