import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

import Die from "./components/Die"

export default function App() {

    const [diceObjects, setDiceObjects] = useState(() => generateAllNewDice())
    const [heldDiceObjects, setHeldDiceObjects] = useState<any>([])
    const [targetRoll, setTargetRoll] = useState<any>(null)
    const newGameButtonRef = useRef<HTMLButtonElement>(null)

    const gameWon = diceObjects.length === heldDiceObjects.length

    const diceElements = diceObjects.map((o) => {
        return <Die 
            key={o.id}
            id={o.id}
            value={o.value}
            isHeld={o.isHeld}
            hold={hold} 
        />
    })

    function generateAllNewDice() {
        console.log("calling generateallnewdice()")
        const arr = Array(10).fill({})
        const newDiceObjects = arr.map(() => {
            return {
                value: getRandomValue(),
                isHeld: false,
                id: nanoid()
            }
        })
        return newDiceObjects
    }

    function getRandomValue() {
        return BigInt(Math.ceil(Math.random() * 6))
    }

    function startNewGame() {
        setDiceObjects(generateAllNewDice)
        setHeldDiceObjects([])
        setTargetRoll(null)
    }

    function rollUnheldDice() {
        setDiceObjects(prevDice => prevDice.map(die => {
            if (die.isHeld === true) {
                return die
            }
            else {
                return {...die, value: getRandomValue()}
            }
        }))
    }

    function hold(id: string) {
        const die = diceObjects.find(o => o.id === id)
        const value = die?.value
        if (targetRoll === null) {
            setTargetRoll(value)
        }
        else if (value !== targetRoll) return
        const newDiceObjects = diceObjects.map((o) => {
            if (o.id === id) return {...o, isHeld: !o.isHeld}
            return o
        })
        setDiceObjects(newDiceObjects)
        const newHeldDiceObjects = newDiceObjects.filter(o => o.isHeld)
        if (newHeldDiceObjects.length === 0) {
            setTargetRoll(null)
        }
        setHeldDiceObjects(newHeldDiceObjects)
    }

    useEffect(() => {
        if (gameWon) {
            newGameButtonRef.current?.focus()
        }
    }, [gameWon])

    return (
        <>
            <main>
                {gameWon? <Confetti /> : null}
                <div aria-live="polite" className="sr-only">
                    {gameWon ? <p>Congratulations! You have won the game</p> : null}
                </div>
                <div className="container main-section">
                    <span className="game-title">Tenzies</span>
                    <span className="game-description">Roll until all dice are the same. Click each die to hold it at its current value between rolls</span>
                    <div className="dice">
                        {diceElements}
                    </div>
                    <button 
                        className={"roll-button"} 
                        onClick={gameWon ? startNewGame : rollUnheldDice}
                        ref={newGameButtonRef}
                    >
                        {gameWon ? "New Game" : "Roll"}
                    </button>
                </div>
            </main>
        </>
    )
}