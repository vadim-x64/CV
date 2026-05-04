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
            <main>
                <div className="container">
                    {}
                    <div className="about-me">
                        <h2>Профіль</h2>
                        <p>
                            &emsp;Звати мене Вадим. Студент 3-го курсу університету.
                            В розробці 3 роки. В планах стати інженером у галузі розробки
                            програмного забезпечення. Можу створювати різні програмні рішення
                            за допомогою штучного інтелекту й такими мовами наприклад як
                            Java, C#, JavaScript, Kotlin залежно від вимог та цілей майбутньої
                            програми. Приділяю особливу увагу у написанні логіки роботи
                            програми, підключаю бази даних, вирішую помилки в коді, вручну
                            тестую написані функції, розгортаю в контейнерах. <br/>
                            &emsp;Мої слабкі сторони - фронтенд та вебдизайн. За період свого
                            навчання реалізовував сайти, десктопні застосунки, ігри, нещодавно
                            зайнявся мобільною розробкою Android. Маю досвід проєктування UML,
                            малювання дизайну у Figma, розгортання застосунків. <br/>
                            &emsp;З програмуванням познайомився у школі на уроках інформатики.
                            Мова, на якій вчився писати код була

                        </p>
                        <p>
                            &emsp; Pascal. Дуже сподобалось
                            програмувати, запускати й тестувати створені програми.
                            Почало виходити, так і пішов у цьому напрямку. Практичного досвіду
                            над реальними проєктами та задачами немає. На період навчання в технікумі
                            проходив технологічну практику на підприємстві, де ознайомлювався з
                            ІТ-відділом та виробничими процесами. Як результат практики написав 2
                            рішення - дропшипінгову платформу й автомобільного чат-бота. У 2025 проходив
                            ознайомчу практику і як результат написав з командою проєкт. У 2026 році пройшов
                            виробничу практику в компанії. За методологією Scrum у команді написали і
                            захистили проєкт. В основному працюю самостійно, маю кілька сертифікатів
                            про проходження безплатних курсів та пару проєктів на GitHub.
                            <br/><br/>
                            <button className="download-btn" onClick={() => setModalOpen(true)}>
                                Скачати резюме
                            </button>
                        </p>
                    </div>
                    {}
                    <div
                        className={`modal${modalOpen ? ' show' : ''}`}
                        onClick={closeOnBackdrop}
                    >
                        <div className="modal-content">
              <span className="close-button" onClick={() => setModalOpen(false)}>
                &times;
              </span>
                            <h3>Виберіть мову резюме 👇</h3>
                            <div className="language-options">
                                <a
                                    href="/docs/Резюме.pdf"
                                    download="Резюме.pdf"
                                    className="language-option"
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/14009/14009737.png"
                                        alt=""
                                        className="flag-icon"
                                    />
                                    <span>Українська</span>
                                </a>
                                <a
                                    href="/docs/Resume.pdf"
                                    download="Resume.pdf"
                                    className="language-option"
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/14009/14009732.png"
                                        alt=""
                                        className="flag-icon"
                                    />
                                    <span>Англійська</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="education">
                        <h2>Освіта</h2>
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
                    {}
                    <div className="experience">
                        <h2>Досвід роботи</h2>
                        <div className="experience-grid">
                            <div className="exp-item">
                                <p className="title">ПрАТ «ККПК»</p>
                                <p className="period">2024</p>
                                <p className="txt">Проходив технологічну та переддипломну практику. Ознайомлювався з IT-інфраструктурою підприємства, написав 2 рішення.</p>
                            </div>
                            <div className="exp-item">
                                <p className="title">NIX Solutions</p>
                                <p className="period">2026</p>
                                <p className="txt">Проходив виробничу практику. Був бекенд-розробником у команді, займався розробкою серверної частини, трохи зачепив фронтенд-верстку деяких сторінок. Попрацював з Scrum, GitLab, Trello, Java, TypeScript.</p>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="skills">
                        <h2>Навички</h2>
                        <div className="skills-container">
                            <div className="hard-skills">
                                <div className="skill">
                                    <p>
                                        1) Java (Spring, JavaFX), C# (ASP.NET)
                                        <br/>
                                        2) JavaScript/TypeScript - базово
                                        <br/>
                                        3) Docker, Postman, Swagger
                                        <br/>
                                        4) OOP, REST, MVC
                                        <br/>
                                        5) Spring Boot/Thymeleaf, Hibernate
                                        <br/>
                                        6) WPF/WinForms, Razor Pages
                                        <br/>
                                        7) PostgreSQL, MySQL, ORM
                                        <br/>
                                        8) git, GitLab, GitHub
                                        <br/>
                                        9) Figma, Bootstrap
                                        <br/>
                                        10) HTML/CSS
                                    </p>
                                </div>
                                <div className="languages">
                  <span className="language-item">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/14009/14009737.png"
                        alt=""
                        className="flag-icon"
                    />
                    Українська
                  </span>
                                    <span className="language-item">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/14009/14009732.png"
                        alt=""
                        className="flag-icon"
                    />
                    Англійська
                  </span>
                                </div>
                            </div>
                            <div className="soft-skills">
                                <div className="skill">
                                    <p>
                                        1) Подобається навчатися новому та вирішувати складні завдання.
                                        <br/>
                                        2) Приділяю увагу аналізу, рефакторингу та виправленню помилок у коді.
                                        <br/>
                                        3) Можу складати та оформляти документацію по проєкту.
                                        <br/>
                                        4) Старанність, цілеспрямованість, стресостійкість.
                                    </p>
                                </div>
                                <div className="skill other-info">
                                    <p className="other-title">Інше</p>
                                    <p>
                                        Граю в настільний теніс. Захоплююся автомобілями.
                                        Маю посвідчення водія.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile