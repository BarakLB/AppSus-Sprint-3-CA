//PAGES
// import {Home} from './pages/Home.jsx'

//CMPS
import { AppHeader } from './cmps/AppHeader.jsx'

//ROUTER
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
   return <Router>
    <section className="app">
        <AppHeader />
        <main className="main-app">
    
        </main>
    </section>
 
</Router>
}








