export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // ⚠️ EC2 BACKEND (HTTP)
  const EC2_URL = "http://18.138.11.123:8000/process-image";

  try {
    const qs = req.url.includes("?") ? req.url.split("?")[1] : "";
    const upstream = await fetch(`${EC2_URL}?${qs}`, {
      method: "POST",
      headers: {
        "content-type": req.headers["content-type"] || "",
      },
      body: req,
    });

    res.status(upstream.status);
    res.setHeader(
      "content-type",
      upstream.headers.get("content-type") || "application/json"
    );

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.send(buf);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
