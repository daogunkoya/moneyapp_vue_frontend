// authService.ts

export function getAuthorizationHeader(): { headers: { Authorization: string } } | null {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        console.error('Token is missing or invalid');
        return null; // or handle the lack of a token in a way that makes sense for your application
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}
