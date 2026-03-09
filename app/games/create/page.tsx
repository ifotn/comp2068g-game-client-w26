'use client';

import { useState } from "react";

export default function CreateGame() {
    // state vars
    const [title, setTitle] = useState<string>('');

    // state var key/val dictionary of validation errors in form
    const [errors, setErrors] = useState<Record<string, string>>({});

    // form val
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        // create new error key/val pair if title is empty
        if (!title.trim()) newErrors.title = 'Title is Required';

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
            alert('Invalid Form');
            return;
        }
        else {
            alert('Valid Form.  Will submit next');
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
                    <label htmlFor="publisher">Publisher: *</label>
                    <input name="publisher" id="publisher" />
                </fieldset>
                <fieldset>
                    <label htmlFor="genre">Genre: *</label>
                    <input name="genre" id="genre" />
                    </fieldset>
                <fieldset>
                    <label htmlFor="price">Price:</label>
                    <input name="price" id="price" />
                    </fieldset>
                <fieldset>
                    <label htmlFor="rating">Rating: </label>
                    <input name="rating" id="rating" />
                </fieldset>
                <button>Save</button>
            </form>
        </main>
    )
}