import { serialize } from "cookie"

export async function POST() {
    
    try {
        const clearCookie = serialize('jwt-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            expires: new Date(0),
        });

        return new Response(JSON.stringify({ message: 'Signed out successfully' }), {
            status: 200,
            headers: {'Set-Cookie': clearCookie},
        });

    } catch (error) {
        console.error('Error from api/auth/signout:POST: ', error);
        return Response.json({error: "Internal server error"}, {status: 500});
    }
}
