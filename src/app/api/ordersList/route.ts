async function getOrders(token: string | null) {

  if (token) {
    const res = await fetch("https://simple-books-api.glitch.me/orders", {
      method: "GET",
      headers: { Authorization: token },
      cache: "no-store",
    });
    console.log("response from server", res);
    if (!res.ok) {
      return "error";
    }
    return res.json();
  }
}



export async function GET(request:Request){
    const token = request.headers.get('authorization')
    const res = await getOrders(token)
    return new Response(JSON.stringify(res))
}