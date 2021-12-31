const { NavLink, Link } = ReactRouterDOM

export class AppHeader extends React.Component {
    render() {
        return <header className="main-header">
            <Link to="/">
            <h1>Book Shop 📙</h1>
            </Link>
            <nav className="navbar">
                <NavLink exact to="/">  Home</NavLink>
                <NavLink to="/book">  Book-list </NavLink>
                <NavLink to="/about">  About </NavLink>
            </nav>
        </header>
    }
}