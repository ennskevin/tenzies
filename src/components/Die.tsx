
type Props = {
    id: string;
    value: bigint;
    isHeld: boolean;
    hold: (id: string) => void;
}

export default function Die({ id, value, isHeld, hold }: Props) {

    return (
        <>
            <button className={`die ${isHeld ? "held" : ""}`} onClick={() => hold(id)}>
                {value}
            </button>
        </>
    )
}