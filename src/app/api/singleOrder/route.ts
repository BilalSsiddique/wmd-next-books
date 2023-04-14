async function getSigleOrder(token:string|null,id:string|null) {

  if (token && id && token.trim().length!==0 && id.trim().length!==0){
    const url = `https://simple-books-api.glitch.me/orders/${id}`;
    const response = await fetch(url,{
      method:'GET',
      headers:{
        Authorization:token,
      },
      cache : 'no-store'
    });
    // console.log('response',response)
    try {
      if (!response.ok) {
        throw new Error("Response not Ok");
      }
      return response.json();
    } catch (error) {
      return error as "error";
    }
  }
};

export async function GET(request:Request){
    const res = await getSigleOrder(request.headers.get('authorization'),request.headers.get('id'))
    return new Response(JSON.stringify(res))
}