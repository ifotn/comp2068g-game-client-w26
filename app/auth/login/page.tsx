export default function Login() {
    return (
        <main>
            <h1>Login</h1>
            <form>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input name="username" id="username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input name="password" id="password" type="password" />
                </fieldset>
                <button>Login</button>
            </form>
        </main>
    )
}