const { NavLink, Link } = ReactRouterDOM

export class AppHeader extends React.Component {
    
    render() {
        return <header className="main-header flex space-between align-center">
        <Link className="clean-link" to="/">
        <h1>HEADER</h1>
        </Link>
        <nav className="navbar">
            <NavLink className="clean-link" exact to="/">  Home</NavLink>
            <NavLink className="clean-link" to="/">  Email </NavLink>
            <NavLink className="clean-link" to="/">  About </NavLink>
        </nav>
      
    </header>
    }
}