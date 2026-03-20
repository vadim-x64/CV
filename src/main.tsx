import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter} from 'react-router-dom'
import App from './App'
import './css/global.css'
import './css/home.css'
import './css/profile.css'
import './css/portfolio.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter>
            <App/>
        </HashRouter>
    </StrictMode>
)