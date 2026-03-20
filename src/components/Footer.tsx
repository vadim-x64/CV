import {useEffect, useState} from 'react'

const Footer = () => {
    const [isDark, setIsDark] = useState(
        () => localStorage.getItem('theme') === 'dark'
    )

    const [showScroll, setShowScroll] = useState(false)

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDark)
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    useEffect(() => {
        const check = () => setShowScroll(window.pageYOffset > 300)
        check()
        window.addEventListener('scroll', check)
        return () => window.removeEventListener('scroll', check)
    }, [])

    return (
        <div className="foot">
            <div className="theme-toggle" onClick={() => setIsDark(d => !d)}>
                <span className="material-icons theme-icon sun-icon">dark_mode</span>
                <span className="material-icons theme-icon moon-icon">light_mode</span>
            </div>
            <div
                className={`scroll-to-top${showScroll ? ' visible' : ''}`}
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
                <span className="material-icons">arrow_upward</span>
            </div>
        </div>
    )
}

export default Footer