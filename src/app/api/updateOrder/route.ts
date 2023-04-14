
async function updateOrder(
  token: string | null,
  id: string | null,
  consumerName: string | null
) {
  if (
    token &&
    token.trim().length !== 0 &&
    id &&
    id.trim().length !== 0 &&
    consumerName &&
    consumerName.trim().length !== 0
  ) {
    const res = await fetch(`https://simple-books-api.glitch.me/orders/${id}`, {
      method: "PATCH",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ customerName: consumerName }),
      cache: "no-store",
    });
    if (!res.ok) {
      return "error";
    }
    return "updated";
  }
}


export async function PATCH(request: Request) {
  let result = await updateOrder(
    request.headers.get("authorization"),
    request.headers.get("id"),
    request.headers.get("consumername")
  );
  return new Response(JSON.stringify(result));
}
