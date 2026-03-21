import {useEffect, useState} from 'react'

interface Project {
    img: string
    title?: string
    description?: string
    link?: string
}

const PROJECTS: Project[] = [
    {
        img: '/images/spots.png',
        title: 'TopKidGame',
        description:
            'Інтерактивна головоломка "П\'ятнашки", реалізована на JavaScript, підійде для дітей і дорослих. Має дружній мультяшний інтерфейс, музику на фоні та базові налаштування для комфортної гри. Сприяє розвитку логічного мислення й може слугувати як розвага, так і антистрес. Також адаптовано під телефон.',
        link: 'https://topkidgame.onrender.com',
    },
    {
        img: '/images/todo.png',
        title: 'SmartToDo',
        description:
            'Вебсистема для управління завданнями, яка допомагає організувати особисті та робочі справи в одному місці. Дозволяє створювати завдання, встановлювати терміни виконання, розподіляти їх по категоріях та отримувати нагадування про події. Застосунок написаний на JavaScript і має зручний інтерфейс для швидкого планування щоденних справ.',
        link: 'https://smarttodo-iver.onrender.com',
    },
    {
        img: '/images/chatbot.png',
        title: 'Chatbot',
        description:
            'Простий інформаційно-навчальний бот на Java. Спрямований на тих, хто цікавиться автомобілями, вчиться в автошколі та простих автолюбителів. Надає короткі довідки про принцип роботи, основи керування, будову авто, техніку управління, категорії ТЗ, марки, історію.',
        link: 'https://chatbot-ftcs.onrender.com',
    },
    {
        img: '/images/media.png',
        title: 'MediaApp',
        description:
            'Десктопний застосунок на .NET WPF, який автоматично знаходить дублікати фото та відео на комп\'ютері. Аналізує якість файлів і дозволяє швидко видалити зайві копії, залишаючи найкращі. Ефективний інструмент для звільнення непотрібних медіафайлів та впорядкування медіатеки. Працює тільки під керуванням Windows.',
    },
]

const CERTIFICATES: string[] = [
    '/images/c2.jpg',
    '/images/c5.jpg',
    '/images/c3.jpg',
    '/images/c4.jpg',
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
                    <div className="projects">
                        <h2>Проєкти</h2>
                        <div className="project-gallery">
                            {PROJECTS.map((p, i) => (
                                <div key={i} className="project-card">
                                    <div
                                        className="image-wrapper"
                                        onClick={() => setModalSrc(p.img)}
                                    >
                                        <img src={p.img} alt=""/>
                                    </div>
                                    {p.title && (
                                        <div className="project-content">
                                            <h3>{p.title}</h3>
                                            {p.description && <p>{p.description}</p>}
                                            {p.link && (
                                                <a href={p.link} target="_blank" rel="noreferrer">
                                                    {p.link}
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
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
                {}
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