export async function POST(req: Request) {
    // get credentials from form request
    const body = await req.json();

    // try registering new user in server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    // evaluate response
    if (!res.ok) {
        const errorText = await res.text();
        console.log(`Register error: ${errorText}`);
        return new Response(errorText, { status: res.status });
    }

    return Response.json({ success: true });
}