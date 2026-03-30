'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "./appContext";

export default function Navbar() {
    // auth global vars + setters
    const { appUsername, setAppUsername, isAuthenticated, setIsAuthenticated } = useAppContext();

    const router = useRouter();

    const handleLogout = async () => {
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/logout`);

        if (!res.ok) console.log('Logout failed');

        // clear global context vars using setters
        setAppUsername('');
        setIsAuthenticated(false);
        router.push('/');
    }

    return (
        <nav className="bg-gray-900 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center">
           <h1 className="text-xl font-bold mb-2 md:mb-0">COMP2068G Game Library</h1>
           <ul className="flex flex-col md:flex-row md:space-x-4">
               <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
               <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
               <li><Link href="/games" className="hover:text-gray-300">Games</Link></li>
               {!isAuthenticated && (
                <>
                    <li><Link href="/auth/register" className="hover:text-gray-300">Register</Link></li>
                    <li><Link href="/auth/login" className="hover:text-gray-300">Login</Link></li>
                </>
               )}
               {isAuthenticated && (
                <li>
                    <a className="hover:text-gray-300 navLink" onClick={handleLogout}>
                        Logout
                    </a>
                </li>
                )}           
           </ul>
       </nav>
    );
}