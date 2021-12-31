import { BookDetails } from './pages/book-details.jsx'
import { BookApp } from './pages/BookApp.jsx'
import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AddReview } from './cmps/AddReview.jsx'
import { UserMsg } from './cmps/UserMsg.jsx';


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-app">
                    <Switch>
                        <Route component={AddReview} path="/book/addReview/:bookId?" />
                        <Route component={BookDetails} path="/book/:bookId" />
                        <Route component={BookApp} path="/book" />
                        <Route component={About} path="/about" />
                        <Route component={Home} path="/" />
                    </Switch>
                <footer>©CoffeeRight by Barak Lebowitz</footer>
                </main>
            </section>
            <UserMsg/>
        </Router>
    )
}










