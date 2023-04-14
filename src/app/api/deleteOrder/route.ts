async function deleteOrder(token: string | null, id: string | null) {

  if (token && id && token?.trim().length !== 0 && id?.trim().length !== 0) {
    // console.log('delete token and id',token,id)
    const res = await fetch(`https://simple-books-api.glitch.me/orders/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
      cache: "no-store",
    });
    if (!res.ok) {
      return "error";
    }
    return "deleted";
  }
}




export async function DELETE(request:Request){
    const token = request.headers.get('authorization')
    const id = request.headers.get('id')
    const res = deleteOrder(token,id)
    return new Response(JSON.stringify(res))

}