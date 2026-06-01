import {useEffect, useState} from 'react'

const Profile = () => {
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setModalOpen(false)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    const closeOnBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) setModalOpen(false)
    }

    return (
        <div className="page-profile">
            <main className="timeline-main">
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    {}
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h2 className="section-title">Профіль</h2>
                            <div className="profile-text">
                                <p>
                                    &emsp;Звати мене Вадим. Студент 3-го курсу університету.
                                    В розробці 3 роки. В планах надалі вчитися та
                                    працювати у напрямі backend development. Розробляю рішення різними мовами,
                                    зокрема на Java, .NET та JavaScript – бекенд, REST API, робота з БД тощо. В рамках
                                    навчання маю досвід в написанні різних програмних рішень таких як сайти, десктопні
                                    програми, ігри, мобільні застосунки. Працював з проєктуванням UML, розгортанням на
                                    Docker, створенням прототипів у Figma. Слабкі сторони – фронтенд, дизайн,
                                    комунікативні навички. <br/>
                                    &emsp;З програмуванням познайомився у школі на уроках інформатики.
                                    Мова, на якій вчився писати код була Pascal. Дуже сподобалось
                                    програмувати, запускати й тестувати створені програми.
                                </p>
                                <p>
                                    &emsp; Почало виходити, так і пішов у цьому напрямку. Практичного досвіду
                                    над реальними проєктами та задачами немає. На період навчання в технікумі
                                    проходив технологічну практику на підприємстві, де ознайомлювався з
                                    ІТ-відділом та виробничими процесами. Як результат практики написав 2
                                    рішення - дропшипінгову платформу й автомобільний чат-бот. У 2025 проходив
                                    ознайомчу практику і як результат написав з командою невеликий проєкт. У 2026 році
                                    пройшов
                                    виробничу практику в компанії. За методологією Scrum у команді написали і
                                    захистили проєкт. В основному працюю самостійно, маю кілька сертифікатів
                                    про проходження безплатних курсів та пару проєктів на GitHub.
                                    <br/>
                                </p>
                                <button className="download-btn" onClick={() => setModalOpen(true)}>
                                    Скачати резюме
                                </button>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h2 className="section-title">Освіта</h2>
                            <div className="education-grid">
                                <div className="edu-item">
                                    <p className="title">Академічний ліцей №5</p>
                                    <p className="period">2011 - 2020</p>
                                    <p className="txt">Базова середня освіта</p>
                                </div>
                                <div className="edu-item">
                                    <p className="title">
                                        <abbr
                                            title="Фаховий коледж інформаційних систем і технологій Київського національного економічного університету імені Вадима Гетьмана">
                                            ФКІСІТ КНЕУ ім. В. Гетьмана
                                        </abbr>
                                    </p>
                                    <p className="period">2020 - 2024</p>
                                    <p className="txt">Фаховий молодший бакалавр</p>
                                </div>
                                <div className="edu-item">
                                    <p className="title">
                                        <abbr title="Державний університет інформаційно-комунікаційних технологій">
                                            ДУІКТ
                                        </abbr>
                                    </p>
                                    <p className="period">2024 - наш час</p>
                                    <p className="txt">Бакалавр</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h2 className="section-title">Досвід роботи</h2>
                            <div className="experience-grid">
                                <div className="exp-item">
                                    <p className="title">ПрАТ «ККПК»</p>
                                    <p className="period">2024</p>
                                    <p className="txt">Проходив технологічну та переддипломну практику. Ознайомлювався з
                                        IT-відділом
                                        підприємства, написав 2 рішення.</p>
                                </div>
                                <div className="exp-item">
                                    <p className="title">NIX Solutions</p>
                                    <p className="period">2026</p>
                                    <p className="txt">Перебував дистанційно на виробничій практиці. Разом з командою
                                        розробляли
                                        невеликий проєкт за методологією Scrum. Був бекенд-розробником у команді,
                                        займався
                                        серверною частиною програми, і трохи зачепив фронтенд-верстку деяких сторінок.
                                        Попрацював з GitLab, Trello, Java, TypeScript.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="timeline-section">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h2 className="section-title">Технічні навички</h2>
                            <div className="skills-container">
                                <div className="hard-skills">
                                    <div className="skill">
                                        <p>
                                            1) Java (OOP, Core)
                                            <br/>
                                            2) C# (.NET)
                                            <br/>
                                            3) Python (базово)
                                            <br/>
                                            4) JavaScript/TypeScript (базово)
                                            <br/>
                                            5) Docker
                                            <br/>
                                            6) Postman, Swagger
                                            <br/>
                                            7) OOP, REST, MVC
                                        </p>
                                        <p>
                                            8) Android (Java, Kotlin, Flutter)
                                            <br/>
                                            9) Spring Boot, Spring MVC, Hibernate/JPA
                                            <br/>
                                            10) MVVM, WPF, WinForms, JavaFX, Razor
                                            <br/>
                                            11) PostgreSQL, MySQL, Firebase
                                            <br/>
                                            12) git, GitLab/GitHub
                                            <br/>
                                            13) Figma, Bootstrap
                                            <br/>
                                            14) HTML, CSS
                                        </p>
                                    </div>
                                    <div className="languages">
                                        <span className="language-item">
                                            <img src="https://cdn-icons-png.flaticon.com/128/14009/14009737.png" alt=""
                                                 className="flag-icon"/>
                                            Українська -<br/>
                                            рідна
                                        </span>
                                        <span className="language-item">
                                            <img src="https://cdn-icons-png.flaticon.com/128/14009/14009732.png" alt=""
                                                 className="flag-icon"/>
                                            Англійська - обмежений рівень <br/>
                                            (достатній для роботи)
                                        </span>
                                    </div>
                                </div>
                                <div className="soft-skills">
                                    <div className="skill other-info">
                                        <p className="other-title">Інше</p>
                                        <p>
                                            Двічі приймав участь у школі DES.
                                            Писав і захищав з командою
                                            невеличкі ІТ-проєкти.
                                        </p>
                                        <p>
                                            <b>Хобі</b>: настільний теніс, велоспорт,
                                            автомобілі. Маю посвідчення водія.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {}
                <div className={`modal${modalOpen ? ' show' : ''}`} onClick={closeOnBackdrop}>
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setModalOpen(false)}>
                            &times;
                        </span>
                        <h3>Виберіть мову резюме 👇</h3>
                        <div className="language-options">
                            <a href="/docs/Резюме.pdf" download="Резюме.pdf" className="language-option">
                                <img src="https://cdn-icons-png.flaticon.com/128/14009/14009737.png" alt=""
                                     className="flag-icon"/>
                                <span>Українська</span>
                            </a>
                            <a href="/docs/Resume.pdf" download="Resume.pdf" className="language-option">
                                <img src="https://cdn-icons-png.flaticon.com/128/14009/14009732.png" alt=""
                                     className="flag-icon"/>
                                <span>Англійська</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile