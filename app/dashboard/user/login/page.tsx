export const metadata = {
    title: 'Admin Login'
};

export default function LoginPage() {
    return (
        <>
            <header id="header">Header</header>
            <main>
                <h1>Admin Login</h1>
                <form action="/user/login" method="post">
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </main>
        </>
    );
}