const { NavLink, Link } = ReactRouterDOM

export class AppHeader extends React.Component {

    render() {
        return <header className="main-header flex space-between align-center">
            <Link className="clean-link" to="/">
                <h1 className="logo" >APPSUS</h1>
            </Link>
            <nav className="navbar">
                <NavLink className="clean-link top-nav-link" exact to="/">  Home</NavLink>
                <NavLink className="clean-link top-nav-link" to="/mail">  Email </NavLink>
                <NavLink className="clean-link top-nav-link" to="/note">  Notes </NavLink>
                <NavLink className="clean-link top-nav-link" to="/about">  About </NavLink>
            </nav>

        </header>
    }
}