type Props = {
    value: bigint;
}

export default function Die({ value }: Props) {
    return (
        <>
            <button className="die">
                {value}
            </button>
        </>
    )
}