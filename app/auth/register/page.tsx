export default function Register() {
    return (
        <main>
            <h1>Register</h1>
            <form>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input name="username" id="username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input name="password" id="password" type="password" />
                </fieldset>
                <fieldset>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input name="confirm" id="confirm" type="password" />
                </fieldset>
                <button>Register</button>
            </form>
        </main>
    )
}