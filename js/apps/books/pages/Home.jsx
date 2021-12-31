const { Link } = ReactRouterDOM

export function Home() {

    return (
        <section className="home-page">
            <div className="hero-image">
                <div className="hero-text">
                    <h1>Hello User!,
                        <br />
                        Welcome to my Book-Shop
                    </h1>
                    <Link to="/book">  <button>Buy Books Here</button></Link>
                </div>
            </div>
            <div className="home-txt">
                <div>
                    <img className="book-icon" src="../assets/img/book-icon.png" alt=""/>
                <h1>Find the best book here</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Illum mollitia qui deserunt accusamus hic ipsum id perspiciatis
                    error quae aliquam quisquam, impedit animi architecto nulla quasi
                    officia sapiente, non culpa!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel
                    culpa a voluptates eaque doloremque optio eius,
                    reprehenderit ullam qui incidunt id quis quam autem animi
                    eligendi aliquid similique aut. Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Accusantium ducimus vel sint cum rerum
                    architecto omnis animi excepturi. Quis voluptatem eos blanditiis corrupti,
                    suscipit error illo maiores dolore eum accusantium? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Corporis consequuntur animi optio aut, cum labore
                    fugit repellendus ipsa aperiam, eius alias fuga, debitis incidunt ipsam ea veniam.
                    Perferendis, sequi! Consectetur? Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quos blanditiis harum quod veritatis dolores nesciunt earum.
                    Doloribus, odio minima quia optio laborum officia,
                    alias assumenda nam ea fuga officiis nobis.
                </p>
                </div>
                <div>
                <img className="price-icon" src="../assets/img/price-icon.png" alt=""/>
                <h1>We have the best prices because</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Illum mollitia qui deserunt accusamus hic ipsum id perspiciatis
                    error quae aliquam quisquam, impedit animi architecto nulla quasi
                    officia sapiente, non culpa!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel
                    culpa a voluptates eaque doloremque optio eius,
                    reprehenderit ullam qui incidunt id quis quam autem animi
                    eligendi aliquid similique aut. Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Accusantium ducimus vel sint cum rerum
                    architecto omnis animi excepturi. Quis voluptatem eos blanditiis corrupti,
                    suscipit error illo maiores dolore eum accusantium? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Corporis consequuntur animi optio aut, cum labore
                    fugit repellendus ipsa aperiam, eius alias fuga, debitis incidunt ipsam ea veniam.
                    Perferendis, sequi! Consectetur? Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quos blanditiis harum quod veritatis dolores nesciunt earum.
                    Doloribus, odio minima quia optio laborum officia,
                    alias assumenda nam ea fuga officiis nobis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem aspernatur dolor aut, unde distinctio fuga illum porro fugit, qui a harum quo ab cupiditate iusto, quis illo quidem ex 
                    commodi.
                </p>
                </div>
            </div>
        </section>
    )
}