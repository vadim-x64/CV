import {useEffect, useRef} from 'react'
import {Link, useLocation} from 'react-router-dom'

const Header = () => {
    const headerRef = useRef<HTMLElement>(null)
    const {pathname} = useLocation()

    useEffect(() => {
        const el = headerRef.current
        if (!el) return
        let lastScroll = 0

        const handleScroll = () => {
            const current = window.pageYOffset
            if (current <= 0) {
                el.style.transform = 'translateY(0)'
                lastScroll = current
                return
            }

            el.style.transform =
                current > lastScroll && current > 100
                    ? 'translateY(-100%)'
                    : 'translateY(0)'
            lastScroll = current
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const nav = (path: string) =>
        pathname === path ? 'current' : undefined

    return (
        <header ref={headerRef}>
            <div className="name">
                <img src="/images/label.png" alt="" className="santa-hat"/>
                <Link to="/">Вадим Войцеховський</Link>
            </div>
            <nav className="nav-buttons">
                <Link to="/" className={nav('/')}>Головна</Link>
                <Link to="/profile" className={nav('/profile')}>Профіль</Link>
                <Link to="/portfolio" className={nav('/portfolio')}>Портфоліо</Link>
            </nav>
        </header>
    )
}

export default Header