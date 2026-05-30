import {useEffect, useState} from 'react'

const CERTIFICATES: string[] = [
    '/images/c2.jpg',
    '/images/c5.jpg',
    '/images/c3.jpg',
    '/images/c4.jpg',
    '/images/c1.jpg',
    '/images/c6.jpg',
    '/images/c7.jpg',
]

const Portfolio = () => {
    const [modalSrc, setModalSrc] = useState<string | null>(null)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setModalSrc(null)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    return (
        <div className="page-portfolio">
            <main>
                <div className="git">
                    <a href="https://github.com/vadim-x64" target="_blank" rel="noreferrer">
                        <img src="/images/github.png" alt="GitHub"/>
                    </a>
                </div>
                <div className="container">
                    <div className="certificates">
                        <h2>Сертифікати</h2>
                        <div className="certificate-gallery">
                            {CERTIFICATES.map((src, i) => (
                                <div
                                    key={i}
                                    className="certificate-card"
                                    onClick={() => setModalSrc(src)}
                                >
                                    <img src={src} alt=""/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className={`modal${modalSrc ? ' active' : ''}`}
                    onClick={() => setModalSrc(null)}
                >
                    {modalSrc && <img src={modalSrc} alt=""/>}
                </div>
            </main>
        </div>
    )
}

export default Portfolio