const { Link } = ReactRouterDOM;

export function Home() {
  return (
    <section className="hero-img">
      <div className="hero-text">
        <h2>Welcome To Your Digital Workspace</h2>
        <div className="flex space-around">
        <Link className="clean-link go-to-btn" to="/mail/">Go to Mail</Link>
        <Link className="clean-link go-to-btn" to="/note/">Go to Notes</Link>
        <Link className="clean-link go-to-btn" to="/book/">Go to BookShop</Link>
        </div>
      </div>
    </section>
  );
}
