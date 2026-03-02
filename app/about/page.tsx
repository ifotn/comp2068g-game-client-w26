// child component
import Publisher from "../components/publisher";

export default function About() {
    return (
        <main>
            <h1>About this Site</h1>
            <p>We're building this for COMP2068G in Winter 2026 @ Lakehead - Georgian.</p>
            <h2>Our Game Publishers</h2>
            <Publisher name="Nintendo" yearFounded={1889} />
            <Publisher name="From Software" yearFounded={1986} />
            <Publisher name="Sega" yearFounded={1960} />
            <Publisher name="Capcom" yearFounded={1979} />
        </main>
    );
}