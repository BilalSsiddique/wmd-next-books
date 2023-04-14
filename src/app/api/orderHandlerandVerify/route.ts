async function getOrder(token: string | null) {
  
  if (token && token.length > 63) {
    const res = await fetch("https://simple-books-api.glitch.me/orders", {
      method: "GET",
      headers: {
        Authorization: token,
      },
      cache: "no-store",
    });
    // console.log("response from server", res);
    if (!res.ok) {
      return "error";
    }
    return res.status;
  }
  return 'error'
}

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  const order = await getOrder(authorization);
  return new Response(JSON.stringify(order));
}
