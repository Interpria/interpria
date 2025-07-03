export async function fetchCurrentInterpreterId(): Promise<number | null> {
  try {
    const res = await fetch('/api/auth/login');
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.user && data.user.userId) {
      const userRes = await fetch(`/api/user/${data.user.userId}`);
      if (!userRes.ok) return null;
      const userData = await userRes.json();
      const user = Array.isArray(userData) ? userData[0] : userData;
      return user?.interpreter_id ?? null;
    }
    return null;
  } catch {
    return null;
  }
}
