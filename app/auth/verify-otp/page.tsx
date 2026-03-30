'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/components/appContext";

export default function VerifyOtp() {
    // global context var setters
    const { appUsername, setIsAuthenticated } = useAppContext();

    const router = useRouter();

    // state vars
    const [code, setCode] = useState<string>('');

    // state key/val dict of val errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!code.trim()) newErrors.code = 'One-Time Passcode is required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) return true;

        return false;
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        const username = appUsername?.toString();

        // form valid => post user to server api
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, username })
        });

        if (!res.ok) {
            alert(res.text());
            return;
        }

        // ok => set global vars then redirect to games
        setIsAuthenticated(true);
        router.push('/games');
    }

    return (
        <main>
            <h1>One-Time Passcode</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="code">Passcode:</label>
                    <input name="code" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
                    {errors.code && <span className="error">{errors.code}</span>}
                </fieldset>
                <button>Verify</button>
            </form>
        </main>
    )
}