const { Link } = ReactRouterDOM;

export function Home() {
  return (
    <section className="hero-img">
      <div className="hero-text">
        <h2>Welcome To Your Digital Workspace</h2>
        <Link className="clean-link go-to-mail-btn" to="/mail/">Go to Mail</Link>
        <Link className="clean-link go-to-mail-btn" to="/note/">Go to Notes</Link>
      </div>
    </section>
  );
}
