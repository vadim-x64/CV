import {useState} from 'react'

interface Props {
    children: React.ReactNode
}

const Spoiler = ({children}: Props) => {
    const [active, setActive] = useState(false)

    return (
        <div
            className={`spoiler${active ? ' active' : ''}`}
            onClick={() => setActive(a => !a)}
        >
            <span className="spoiler-text">{children}</span>
            <div className="watery-sticker" />
        </div>
    )
}

export default Spoiler