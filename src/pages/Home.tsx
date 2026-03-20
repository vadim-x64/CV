import {useEffect, useRef, useState, useCallback} from 'react'
import Spoiler from '../components/Spoiler'

type Ball = { x: number; y: number; r: number; dx: number; dy: number }
const SLIDES = ['.NET', 'Java', 'Python', 'HTML/CSS/JS', 'MySQL', 'PostgreSQL']

const Home = () => {
    const [revealed, setRevealed] = useState(false)
    const leftPhotoRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const currentIdx = useRef(1)

    useEffect(() => {
        const container = leftPhotoRef.current
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

        const balls: Ball[] = Array.from({length: 2000}, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.5 + 1,
            dx: (Math.random() - 0.5) * 1.2,
            dy: (Math.random() - 0.5) * 1.2,
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

    const displaySlides = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]]

    const goTo = useCallback((idx: number, animated = true) => {
        const el = sliderRef.current
        if (!el) return
        el.style.transition = animated ? 'transform 0.5s ease-in-out' : 'none'
        el.style.transform = `translateX(-${idx * 100}%)`
        currentIdx.current = idx
    }, [])

    useEffect(() => {
        goTo(1, false)

        const el = sliderRef.current
        if (!el) return

        const onEnd = () => {
            const i = currentIdx.current
            if (i === 0) goTo(SLIDES.length, false)
            else if (i === SLIDES.length + 1) goTo(1, false)
        }
        el.addEventListener('transitionend', onEnd)
        return () => el.removeEventListener('transitionend', onEnd)
    }, [goTo])

    const prev = () => goTo(currentIdx.current - 1)
    const next = () => goTo(currentIdx.current + 1)

    return (
        <div className="page-home">
            <main>
                {}
                <div className="content">
                    <div
                        ref={leftPhotoRef}
                        className={`left-photo${revealed ? ' revealed' : ''}`}
                        onClick={() => setRevealed(r => !r)}
                    >
                        <img
                            src="/images/photo.png"
                            alt=""
                            className={revealed ? '' : 'blurred'}
                        />
                        <canvas ref={canvasRef} className="left-photo-canvas"/>
                    </div>
                    <div className="about-me">
                        <h2>Інженер <br/> програмного <br/> забезпечення</h2>
                        <p>бекенд розробник</p>
                        <div className="container-label">Профіль</div>
                    </div>
                    <div className="right-photo">
                        <img src="/images/soft.png" alt=""/>
                        <div className="container-label">Софт</div>
                    </div>
                </div>
                {}
                <div className="new-section">
                    <div className="left-image-container">
                        <img src="/images/style.png" alt=""/>
                    </div>
                    <div className="slider-container">
                        <div ref={sliderRef} className="language-slider">
                            {displaySlides.map((s, i) => (
                                <div key={i} className="slide">
                                    <h2>{s}</h2>
                                </div>
                            ))}
                        </div>
                        <div className="pagination-controls">
                            <button className="nav-button prev" onClick={prev}>&lt;</button>
                            <button className="nav-button next" onClick={next}>&gt;</button>
                        </div>
                        <div className="container-label">Стек</div>
                    </div>
                    <div className="right-image-container">
                        <img src="/images/code.png" alt=""/>
                    </div>
                </div>
                {}
                <div className="photo-section">
                    <div className="photo-container-left">
                        <img src="/images/contacts.png" alt=""/>
                        <div className="contact-overlay">
                            <div className="contact-columns">
                                <div className="contact-column">
                                    <div className="contact-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.374.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                        </svg>
                                        <Spoiler> @vadymvoitsekhovskyi </Spoiler>
                                    </div>
                                    <div className="contact-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.787l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
                                        </svg>
                                        <Spoiler> @vadymvoitsekhovskyi </Spoiler>
                                    </div>
                                    <div className="contact-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#5f6368">
                                            <path
                                                d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                                        </svg>
                                        <Spoiler> Номер приховано </Spoiler>
                                    </div>
                                    <div className="contact-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                                        </svg>
                                        <Spoiler> vadim.rolex.2005@gmail.com </Spoiler>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="photo-container-right">
                        <img src="/images/projects.png" alt=""/>
                        <div className="social-buttons">
                            <div className="right-button">
                                <a href="https://github.com/vadim-x64" target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            </div>
                        </div>
                        <div className="container-label">Портфоліо</div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home