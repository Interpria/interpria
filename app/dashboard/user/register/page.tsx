export const metadata = {
    title: 'Admin Register'
};

export default function RegisterPage() {
    return (
        <>
            <header id="header">Header</header>
            <main>
                <h1>Admin Register</h1>
                <form action="/user/register" method="post">
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </main>
        </>
    );
}