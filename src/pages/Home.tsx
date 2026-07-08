import {useEffect, useRef, useState, useCallback} from 'react'

type Ball = { x: number; y: number; r: number; dx: number; dy: number }
const SLIDES = ['Java', '.NET', 'JavaScript', 'Kotlin', 'Dart', 'Python', 'C++', 'Docker', 'PostgreSQL', 'git']

interface Project {
    img: string
    title?: string
    description?: React.ReactNode
    link?: string
}

const PROJECTS: Project[] = [
    {
        img: '/images/restaurant.png',
        title: 'Restaurant',
        description:
            'Простий сайт-візитка онлайн ресторану, написаний на HTML/CSS/JavaScript. З нього я почав знайомство з ' +
            'вебом. Сайт не функціональний, без бази даних. ' +
            'Просто робив його, щоб навчитися розташовувати кнопки, блоки, меню, попрацювати зі стилями, фреймворком ' +
            'Bootstrap. На сайті кілька сторінок, зокрема головна з категоріями страв, конкретні страви та їх деталі, ' +
            'кошик та оформлення замовлення.',
    },
    {
        img: '/images/spots.png',
        title: 'Spots',
        description: (
            <>
                Інтерактивна головоломка "П'ятнашки", створена на простому
                JavaScript у зимовому стилі з музикою на фоні та мультяшним інтерфейсом.
                Має базовий ряд налаштувань типу звуки/музика, правила гри, складність і
                таймер. Сприяє розвитку логічного мислення й може слугувати як розвага,
                так і антистрес. Пограти можна за посиланням {' '}
                <a href="https://topkidgame.onrender.com" target="_blank" rel="noreferrer">
                    topkidgame.onrender.com
                </a>.
            </>
        ),
    },
    {
        img: '/images/smarttodo.png',
        title: 'SmartToDo',
        description:
            'Вебсистема управління завданнями, реалізована на ExpressJS, що надасть ' +
            'користувачу можливість фіксувати свої робочі записи та повсякденні справи. ' +
            'Можна написати алгоритм виконання спортивних вправ або поставити ' +
            'задачі під якийсь проєкт. Дозволяє створювати завдання, ' +
            'встановлювати терміни виконання, прикріпляти їх на головній сторінці, розподіляти їх по категоріях та ' +
            'отримувати нагадування (наприклад, про завершення дедлайну справи).',
    },
    {
        img: '/images/chatbot.png',
        title: 'Chatbot',
        description: (
            <>
                Простий інформаційно-навчальний бот на Java + TelegramAPI. Спрямований
                на тих, хто цікавиться автомобілями, вчиться в автошколі та простих автолюбителів.
                Надає короткі довідки про принцип роботи, основи керування, будову авто, техніку управління,
                категорії ТЗ, марки, історію. Поки доступно невелику кількість функціоналу, програма в процесі
                розробки.
                Ознайомитися з ботом можна за посиланням {' '}
                <a href="https://chatbot-ftcs.onrender.com" target="_blank" rel="noreferrer">
                    chatbot-ftcs.onrender.com
                </a>.
            </>
        ),
    },
    {
        img: '/images/tirevault.png',
        title: 'TireVault',
        description:
            'Вебрішення для автосервісу написане на Java + Spring Boot. Клієнти можуть онлайн ' +
            'записатися на технічне обслуговування або ремонт, переглядати перелік послуг і купувати ' +
            'автозапчастини в інтегрованому магазині. Передбачено особистий кабінет із історією записів і ' +
            'замовлень, а також користувачі можуть лишати відгуки в магазині та на послуги.',
    },
    {
        img: '/images/myblog.png',
        title: 'MyBlog',
        description:
            'Вебплатформа для ведення блогу, реалізована на ASP.NET. Користувачі можуть реєструватися, ' +
            'створювати та редагувати власні пости, прикріплювати зображення. Передбачена система коментарів ' +
            'для обговорення публікацій та лайки для оцінки контенту. Адміністрація здійснює модерацію дописів ' +
            'і може блокувати порушників правил спільноти.',
    },
    {
        img: '/images/cloudy.jpg',
        title: 'Cloudy',
        description:
            'Мобільний Android додаток для прогнозу погоди на базі Flutter/Dart. Використовує ' +
            'геолокацію та API штучного інтелекту для аналізу метеоданих. Має систему динамічних ' +
            'фонів, які адаптуються під хронологію часу доби, анімації ' +
            'погоди, прогноз та інші віджети. Є система пошуку міст для визначення погоди.',
    },
    {
        img: '/images/myfinance.jpg',
        title: 'MyFinance',
        description:
            'Нативний Android-застосунок на Kotlin для управління особистим бюджетом ' +
            'та фіксації транзакцій. Базується на сервісах Firebase для безпечного збереження ' +
            'даних. Є можливість авторизації через OAuth. Містить інтерактивну статистику, кастомізацію профілю та ' +
            'можливості імпорту й експорту фінансової історії у CSV або JSON.',
    }
]

const CopyBtn = ({text}: { text: string }) => {
    const [copied, setCopied] = useState(false)
    const handle = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }
    return (
        <span
            onClick={handle}
            title="Копіювати"
            className="material-icons copy-btn"
        >
            {copied ? 'check' : 'content_copy'}
        </span>
    )
}

const Home = () => {
    const [revealed, setRevealed] = useState(false)
    const [modalSrc, setModalSrc] = useState<string | null>(null)
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({})
    const leftPhotoRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const currentIdx = useRef(1)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const toggleFlip = (idx: number) => {
        setFlippedCards(prev => ({...prev, [idx]: !prev[idx]}))
    }

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setModalSrc(null)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
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

    const prev = useCallback(() => goTo(currentIdx.current - 1), [goTo])
    const next = useCallback(() => goTo(currentIdx.current + 1), [goTo])

    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(() => {
            next()
        }, 3000)
        return () => clearInterval(interval)
    }, [isAutoPlaying, next])

    return (
        <div className="page-home">
            <main className="timeline-main">
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="content">
                                <div
                                    className={`left-photo${revealed ? ' revealed' : ''}`}
                                    onClick={() => setRevealed(r => !r)}
                                >
                                    <img
                                        src="/images/resume.png"
                                        alt=""
                                        className={revealed ? 'unveiled' : 'blurred'}
                                    />
                                </div>
                                <div className="about-me">
                                    <h2>Інженер <br/> програмного <br/> забезпечення</h2>
                                    <p>
                                        Як інженер, я хочу продовжувати іти в напрямі backend розробки. Пишу різний
                                        софт - мобільні додатки, десктопні програми, вебзастосунки. Основна моя задача -
                                        розробляти прості рішення що не мають зайвих функцій, окрім тих, які дійсно
                                        описують для чого конкретно це рішення потрібно.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h2 className="section-title">Проєкти GitHub</h2>
                            <p className="section-subtitle">Деякі з моїх робіт. Наведіть курсором на картку для
                                деталей.</p>
                            <div className="home-projects">
                                <div className="project-gallery">
                                    {PROJECTS.map((p, i) => (
                                        <div key={i} className="project-card">
                                            <div
                                                className={`project-card-inner${flippedCards[i] ? ' flipped' : ''}`}
                                                onClick={() => setModalSrc(p.img)}
                                            >
                                                <div className="project-card-front">
                                                    <img src={p.img} alt=""/>
                                                    <div className="info-btn" onClick={(e) => {
                                                        e.stopPropagation()
                                                        toggleFlip(i)
                                                    }}>
                                                        <span className="material-icons">info</span>
                                                    </div>
                                                </div>
                                                <div className="project-card-back">
                                                    <h3>{p.title}</h3>
                                                    {p.description && <p>{p.description}</p>}
                                                    <div className="close-flip-btn" onClick={(e) => {
                                                        e.stopPropagation()
                                                        toggleFlip(i)
                                                    }}>
                                                        <span className="material-icons">close</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h2 className="section-title">Технології</h2>
                            <p className="section-subtitle">Інструменти з якими працюю</p>
                            <div
                                className="skills-carousel-section"
                                onMouseEnter={() => setIsAutoPlaying(false)}
                                onMouseLeave={() => setIsAutoPlaying(true)}
                            >
                                <button className="carousel-btn prev-btn" onClick={prev}>&lt;</button>
                                <div className="carousel-viewport">
                                    <div ref={sliderRef} className="carousel-track">
                                        {displaySlides.map((s, i) => (
                                            <div key={i} className="carousel-slide">
                                                <h2>{s}</h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="carousel-btn next-btn" onClick={next}>&gt;</button>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h2 className="section-title">Контактні дані</h2>
                            <p className="section-subtitle">Я на зв'язку</p>
                            <div className="home-footer-section">
                                <div className="contact-info-blocks">
                                    <div className="info-block">
                                        <div className="icons-combined">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 24 24" style={{color: '#0088cc'}}>
                                                <path
                                                    d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.787l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
                                            </svg>
                                        </div>
                                        <span>@vadymvoitsekhovskyi</span>
                                        <CopyBtn text="@vadymvoitsekhovskyi"/>
                                    </div>
                                    <div className="info-block">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            style={{color: '#5865F2'}}
                                        >
                                            <path
                                                d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
                                        </svg>
                                        <span>@vadymvoitsekhovskyi</span>
                                        <CopyBtn text="@vadymvoitsekhovskyi"/>
                                    </div>
                                    <div className="info-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                                             fill="currentColor" style={{color: '#4CAF50'}}>
                                            <path
                                                d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                                        </svg>
                                        <span>067 518 22 22</span>
                                        <CopyBtn text="067 518 22 22"/>
                                    </div>
                                    <div className="info-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             style={{color: '#EA4335'}}>
                                            <path
                                                d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                                        </svg>
                                        <span>vadim.rolex.2005@gmail.com</span>
                                        <CopyBtn text="vadim.rolex.2005@gmail.com"/>
                                    </div>
                                </div>
                                <div className="social-links-blocks">
                                    <a href="https://github.com/vadim-x64" target="_blank" rel="noreferrer"
                                       className="social-btn">
                                        GitHub
                                    </a>
                                    <a href="https://www.linkedin.com/in/%D0%B2%D0%B0%D0%B4%D0%B8%D0%BC-%D0%B2%D0%BE%D0%B9%D1%86%D0%B5%D1%85%D0%BE%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-623868300/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BDggACzrERfy6nZQkdqhi7w%3D%3D"
                                       target="_blank" rel="noreferrer" className="social-btn">
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
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

export default Home