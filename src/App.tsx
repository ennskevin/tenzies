import Die from "./components/Die"

export default function App() {

    return (
        <>
            <main>
                <div className="container main-section">
                    <span className="game-title">Tenzies</span>
                    <span className="game-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</span>
                    <div className="dice">
                        <Die value={1n} />
                        <Die value={1n} />
                        <Die value={1n} />
                        <Die value={1n} />
                        <Die value={1n} />
                        <Die value={1n} />
                        <Die value={1n} />
                        <Die value={1n} />
                        <Die value={1n} />
                        <Die value={1n} />
                    </div>
                </div>
            </main>
        </>
    )
}