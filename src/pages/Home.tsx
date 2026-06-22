import {useEffect, useRef, useState, useCallback} from 'react'
import Spoiler from '../components/Spoiler'

type Ball = { x: number; y: number; r: number; dx: number; dy: number }
const SLIDES = ['Java', '.NET', 'JavaScript', 'Kotlin', 'Dart', 'Python', 'C++', 'Docker', 'PostgreSQL', 'git']

interface Project {
    img: string
    title?: string
    description?: string
    link?: string
}

const PROJECTS: Project[] = [
    {
        img: '/images/restaurant.png',
        title: 'Restaurant',
        description: 'Це простий сайт-візитка онлайн ресторану, написаний на HTML/CSS/JavaScript ' +
            'і Bootstrap. Включає в себе такі сторінки як головна (категорії страв), ' +
            'сторінка зі стравами, сторінка деталей страви, кошик, форма замовлення ' +
            'і сторінки типу форума, про ресторан, умови оплати і доставки.',
    },
    {
        img: '/images/spots.png',
        title: 'Spots',
        description: 'Інтерактивна головоломка "П\'ятнашки", реалізована на простому ' +
            'JavaScript у зимовому стилі з музикою на фоні та мультяшним інтерфейсом. ' +
            'Має базовий ряд налаштувань типу звуки/музика, правила гри, складність і ' +
            'таймер. Сприяє розвитку логічного мислення й може слугувати як розвага, ' +
            'так і антистрес.',
    },
    {
        img: '/images/smarttodo.png',
        title: 'SmartToDo',
        description: 'Вебсистема управління завданнями на Express JS, що надасть ' +
            'користувачу можливість фіксувати свої робочі та повсякденні справи. ' +
            'Можна написати алгоритм виконання спортивних вправ, або поставити ' +
            'задачі під якийсь проєкт наприклад. Дозволяє створювати завдання, ' +
            'встановлювати терміни виконання, розподіляти їх по категоріях та ' +
            'отримувати нагадування про події.',
    },
    {
        img: '/images/chatbot.png',
        title: 'Chatbot',
        description: 'Простий інформаційно-навчальний бот на Java + Telegram. Спрямований ' +
            'на тих, хто цікавиться автомобілями, вчиться в автошколі та простих автолюбителів. ' +
            'Надає короткі довідки про принцип роботи, основи керування, будову авто, техніку управління, ' +
            'категорії ТЗ, марки, історію.',
    },
    {
        img: '/images/tirevault.png',
        title: 'TireVault',
        description: 'Вебрішення для автосервісу написане на Java/Spring Boot. Клієнти можуть онлайн ' +
            'записатися на технічне обслуговування або ремонт, переглядати перелік послуг і купувати ' +
            'автозапчастини в інтегрованому магазині. Передбачено особистий кабінет із історією записів і ' +
            'замовлень, а також відгуки на виконані роботи.',
    },
    {
        img: '/images/myblog.png',
        title: 'MyBlog',
        description: 'Вебплатформа для ведення блогу, реалізована на ASP.NET. Користувачі можуть реєструватися, ' +
            'створювати та редагувати власні пости, прикріплювати зображення. Передбачена система коментарів ' +
            'для обговорення публікацій та лайки для оцінки контенту. Адміністрація здійснює модерацію дописів ' +
            'і може блокувати порушників правил спільноти.',
    },
    {
        img: '/images/cloudy.jpg',
        title: 'Cloudy',
        description: 'Мобільний Android додаток для прогнозу погоди на базі Flutter/Dart. Використовує ' +
            'геолокацію та API штучного інтелекту для аналізу метеоданих. Має систему динамічних ' +
            'фонів, які адаптуються під хронологію часу доби, анімації ' +
            'погоди, прогноз та інші віджети. Є система пошуку міст для визначення погоди.',
    },
    {
        img: '/images/myfinance.jpg',
        title: 'MyFinance',
        description: 'Нативний Android-застосунок на Kotlin для управління особистим бюджетом ' +
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
                    {}
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
                                        className={revealed ? '' : 'blurred'}
                                    />
                                    {}
                                    <div className="watery-sticker photo-sticker" />
                                </div>
                                <div className="about-me">
                                    <h2>Інженер <br/> програмного <br/> забезпечення</h2>
                                    <p>
                                        3 роки у сфері розробки. Бекенд-інженер. Займаюсь створенням різного формату
                                        додатків - мобільних, десктопних, веб. Вважаю, що хороший софт - це насамперед
                                        правильна логіка, а не гарний вигляд.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h2 className="section-title">Проєкти GitHub</h2>
                            <p className="section-subtitle">Деякі з моїх робіт. Наведіть курсором на картку для деталей.</p>
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
                    {}
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
                    {}
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h2 className="section-title">Контактні дані</h2>
                            <p className="section-subtitle">Я на зв'язку</p>
                            <div className="home-footer-section">
                                <div className="contact-info-blocks">
                                    <div className="info-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.374.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                        </svg>
                                        <Spoiler> @vadymvoitsekhovskyi </Spoiler>
                                        <CopyBtn text="@vadymvoitsekhovskyi"/>
                                    </div>
                                    <div className="info-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.787l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
                                        </svg>
                                        <Spoiler> @vadymvoitsekhovskyi </Spoiler>
                                        <CopyBtn text="@vadymvoitsekhovskyi"/>
                                    </div>
                                    <div className="info-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#5f6368">
                                            <path
                                                d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                                        </svg>
                                        <Spoiler> 067 518 22 22 </Spoiler>
                                        <CopyBtn text="067 518 22 22"/>
                                    </div>
                                    <div className="info-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                                        </svg>
                                        <Spoiler> vadim.rolex.2005@gmail.com </Spoiler>
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