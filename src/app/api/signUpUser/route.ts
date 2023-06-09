
async function signUp(
  body: { clientName: string; clientEmail: string } | null
) {
 
  if (body?.clientEmail.trim().length !==0 || body?.clientName.trim().length !==0  ) {
    const res = await fetch(`https://simple-books-api.glitch.me/api-clients/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) {
      return ('Response error')
    }
    return res.json();
  }
  return "No data provided";
}


export async function POST(request: Request) {
  let body = await request.json();
  let result = await signUp(body);
  if (result === undefined){
    console.log('res',result)
  }  
  return new Response(JSON.stringify(result));
}
