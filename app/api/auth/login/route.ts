export async function POST(req: Request) {
    // get credentials from form request
    const body = await req.json();

    // try authenticating user in server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'  // needed to receive cookie w/jwt from api
    });

    // evaluate response
    if (!res.ok) {
        const errorText = await res.text();
        console.log(`Login error: ${errorText}`);
        return new Response(errorText, { status: res.status });
    }

    // api call succeeds & returns 200, plus header containing our cookie w/jwt
    // now moved to verify-otp for 2fa
    // need to pass cookie to client so we have it for private api calls
    // const setCookieHeader = res.headers.get('set-cookie');
    // const responseHeaders = new Headers();

    // if (setCookieHeader) {
    //     responseHeaders.set('Set-Cookie', setCookieHeader);
    // }

    // return success response + http header that contains cookie w/jwt
    return Response.json({ success: true }); //, { headers: responseHeaders });
}