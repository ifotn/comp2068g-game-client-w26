export default function CreateGame() {
    return (
        <main>
            <h1>Game Details</h1>
            <form>
                <fieldset>
                    <label htmlFor="title">Title: *</label>
                    <input name="title" id="title" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="publisher">Publisher: *</label>
                    <input name="publisher" id="publisher" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="genre">Genre: *</label>
                    <input name="genre" id="genre" required />
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