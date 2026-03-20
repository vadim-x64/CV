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
                            &emsp;Звати мене Вадим, студент 3 курсу університету. Я молодший спеціаліст в ІТ сфері.
                            В планах стати інженером-програмістом у галузі розробки програмного забезпечення.
                            Створюю різні програмні рішення такими мовами як .NET, Java, Python, JavaScript
                            залежно від вимог та цілей майбутньої програми. Приділяю особливу увагу у написанні
                            логіки роботи програми, підключаю бази даних, вирішую помилки в коді, вручну тестую
                            написані функції. <br/>
                            &emsp;Моїми слабкими сторонами є фронтенд та вебдизайн. Під час створення
                            застосунків використовую інструменти ШІ для прискорення процесу розробки, водночас
                            самостійно аналізую ринок, складаю вимоги, займаюсь проєктуванням UML, моделюю архітектуру
                            БД тощо.
                        </p>
                        <p>
                            &emsp;З програмуванням познайомився у школі на уроках інформатики.
                            Мова, на якій вчився писати код була Pascal. Дуже сподобалось
                            програмувати, запускати й тестувати створені програми. Почало
                            виходити, так і пішов у цьому напрямку. <br/>
                            &emsp;Як такого досвіду над реальним проєктом або роботи в команді
                            немає. Маю лише кілька сертифікатів про проходження
                            безплатних курсів. Переважно все роблю самостійно, бо досвіду
                            роботи в команді мало.
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
                                    href="/docs/Резюме.docx"
                                    download="Резюме.docx"
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
                                    href="/docs/Resume.docx"
                                    download="Resume.docx"
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
                                <p className="period">2011 — 2020</p>
                                <p className="txt">Базова середня освіта.</p>
                            </div>
                            <div className="edu-item">
                                <p className="title">
                                    <abbr
                                        title="Фаховий коледж інформаційних систем і технологій Київського національного економічного університету імені Вадима Гетьмана">
                                        ФКІСІТ КНЕУ ім. В. Гетьмана
                                    </abbr>
                                </p>
                                <p className="period">2020 — 2024</p>
                                <p className="txt">Фаховий молодший бакалавр.</p>
                            </div>
                            <div className="edu-item">
                                <p className="title">
                                    <abbr title="Державний університет інформаційно-комунікаційних технологій">
                                        ДУІКТ
                                    </abbr>
                                </p>
                                <p className="period">2024 —</p>
                                <p className="txt">Бакалавр.</p>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="experience">
                        <h2>Досвід роботи</h2>
                        <div className="experience-grid">
                            <div className="exp-item">
                                <p className="title">ПрАТ «Київський КПК»</p>
                                <p className="period">2024</p>
                                <p className="txt">Проходив технологічну практику.</p>
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
                                        1) Працював з REST API, ООП, реляційними базами даних, проєктуванням UML,
                                        розгортанням на Docker.
                                        <br/>
                                        2) Розробляв рішення на ASP.NET MVC, WPF, Razor/Blazor, Java Spring, JavaFX,
                                        JavaScript.
                                        <br/>
                                        3) На фронтенді знаю тільки HTML, CSS, JS, BOOTSTRAP.
                                        <br/>
                                        4) Трохи розумію Figma, Unity, Python та інструменти по типу Postman, Swagger.
                                    </p>
                                </div>
                                <div className="languages">
                  <span className="language-item">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/14009/14009737.png"
                        alt=""
                        className="flag-icon"
                    />
                    Українська — рідна
                  </span>
                                    <span className="language-item">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/14009/14009732.png"
                        alt=""
                        className="flag-icon"
                    />
                    Англійська — середня
                  </span>
                                </div>
                            </div>
                            <div className="soft-skills">
                                <div className="skill">
                                    <p>
                                        1) Системно підходжу до розв'язання складних задач.
                                        <br/>
                                        2) Приділяю увагу аналізу, рефакторингу та виправленню помилок у коді.
                                        <br/>
                                        3) Можу складати та оформляти документацію по проєкту.
                                        <br/>
                                        4) З гнучких навичок можу виділити старанність, цілеспрямованість та
                                        стресостійкість.
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