async function placeOrder(
  body: { bookId: string; customerName: string } | null,
  token: string | null
) {

  if (body && token) {
    const res = await fetch(`https://simple-books-api.glitch.me//orders`, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    try {
      if (!res.ok) {
        throw new Error("Response not Ok");
      }
      return res.json();
    } catch (error) {
      return error as "error";
    }
  }
  return "error";
}

export async function POST(request: Request) {
  let body = await request.json();
  let token = request.headers.get("authorization");
  let res = await placeOrder(body, token);
  return new Response(JSON.stringify(res));
}
