//PAGES
import {Home} from './pages/Home.jsx'

//CMPS
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

//ROUTER
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <main className="main-app">
                <Switch>
                    <Route component={Home} path="/"></Route>
                </Switch>
            </main>
<AppFooter />
        </section>

    </Router>
}








