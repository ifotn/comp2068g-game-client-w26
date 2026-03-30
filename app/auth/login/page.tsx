'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/components/appContext";

export default function Login() {
    // global context var setters
    const { setAppUsername, setIsAuthenticated } = useAppContext();

    const router = useRouter();

    // state vars
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // state key/val dict of val errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!username.trim()) newErrors.username = 'Username is required';
        if (!password.trim()) newErrors.password = 'Password is required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) return true;

        return false;
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        // form valid => post user to server api
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            alert(res.text());
            return;
        }

        // ok => set global vars then redirect to games
        setAppUsername(username);
        //setIsAuthenticated(true); => moved to 2fa success
        router.push('/auth/verify-otp');
    }

    return (
        <main>
            <h1>Login</h1>
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
                <button>Login</button>
            </form>
        </main>
    )
}