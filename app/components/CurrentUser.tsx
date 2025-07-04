export async function fetchCurrentUserId(): Promise<number | null> {
try {
    const res = await fetch('/api/auth/login');
    if (res.ok) {
    const data = await res.json();
    if (data && data.user && data.user.userId) {
        return data.user.userId;
    }
    }
} catch {
    return null;
}
return null;
}