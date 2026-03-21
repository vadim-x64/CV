import {useEffect, useRef, useState} from 'react'

interface Props {
    children: React.ReactNode
}

type Ball = { x: number; y: number; r: number; dx: number; dy: number }

const Spoiler = ({children}: Props) => {
    const [active, setActive] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return
        const ctx = canvas.getContext('2d')!
        let animId: number

        const resize = () => {
            canvas.width = container.offsetWidth
            canvas.height = container.offsetHeight
        }

        resize()
        window.addEventListener('resize', resize)

        const balls: Ball[] = Array.from({length: 300}, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
        }))

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#fff'
            balls.forEach(b => {
                ctx.beginPath()
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
                ctx.fill()
                b.x += b.dx
                b.y += b.dy
                if (b.x < 0 || b.x > canvas.width) b.dx *= -1
                if (b.y < 0 || b.y > canvas.height) b.dy *= -1
            })
            animId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={`spoiler${active ? ' active' : ''}`}
            onClick={() => setActive(a => !a)}
        >
            <span className="spoiler-text">{children}</span>
            <canvas ref={canvasRef} className="spoiler-canvas"/>
        </div>
    )
}

export default Spoiler