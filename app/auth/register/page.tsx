'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

    // state vars
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');

    // state key/val dict of val errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!username.trim()) newErrors.username = 'Username is required';
        if (password.trim().length < 8) newErrors.password = 'Password must be min 8 characters';
        if (password !== confirm) newErrors.confirm = 'Passwords do not match';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) return true;

        return false;
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        // form valid => post user to server api
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            alert(res.text());
            return;
        }

        // ok => redirect to login
        router.push('/auth/login');
    }

    return (
        <main>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {errors.username && <span className="error">{errors.username}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input name="password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {errors.password && <span className="error">{errors.password}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input name="confirm" id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                    {errors.confirm && <span className="error">{errors.confirm}</span>}
                </fieldset>
                <button>Register</button>
            </form>
        </main>
    )
}