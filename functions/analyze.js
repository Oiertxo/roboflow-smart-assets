export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { image } = await request.json();

    const API_KEY = env.PRIVATE_ROBOFLOW_KEY;
    const MODEL_ID = env.MODEL_ID || "coco/3"; 

    const roboflowUrl = `https://outline.roboflow.com/${MODEL_ID}?api_key=${API_KEY}`;

    const roboflowResponse = await fetch(roboflowUrl, {
      method: "POST",
      body: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await roboflowResponse.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Proxy Error", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}