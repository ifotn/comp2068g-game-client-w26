'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGame() {
    // instantiate router for redirecting after successful save
    const router = useRouter();

    // state vars
    const [title, setTitle] = useState<string>('');
    const [developer, setDeveloper] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [rating, setRating] = useState<string>('');

    // state var key/val dictionary of validation errors in form
    const [errors, setErrors] = useState<Record<string, string>>({});

    // form val
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        // create new error key/val pair if title is empty
        if (!title.trim()) newErrors.title = 'Title is Required';
        if (!developer.trim()) newErrors.developer = 'Developer is Required';
        if (!genre.trim()) newErrors.genre = 'Genre is Required';

        // update error state dict
        setErrors(newErrors);

        // no new errors in dict
        if (Object.keys(newErrors).length === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    // submit
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        // disable form's default behaviour; we'll use TS to process instead
        e.preventDefault();

        if (!validate()) {
            return;
        }
        else {
            // call route which calls api
            const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'applcation/json' },
                body: JSON.stringify({
                    title, developer, genre, price : price ? parseFloat(price) : null, rating
                })
            });

            if (!res.ok) {
                alert('Failed to save game');
            }

            // ok, refresh games list
            router.push('/games');
        }
    }

    return (
        <main>
            <h1>Game Details</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="title">Title: *</label>
                    <input name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors.title && <span className="error">{errors.title}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="developer">Developer: *</label>
                    <input name="developer" id="developer" value={developer} onChange={(e) => setDeveloper(e.target.value)} />
                    {errors.developer && <span className="error">{errors.developer}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="genre">Genre: *</label>
                    <input name="genre" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                    {errors.genre && <span className="error">{errors.genre}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="price">Price:</label>
                    <input name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" step="0.01" />
                    </fieldset>
                <fieldset>
                    <label htmlFor="rating">Rating: </label>
                    <input name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                </fieldset>
                <button>Save</button>
            </form>
        </main>
    )
}