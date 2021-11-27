import React from 'react'
import Navbar from '../../commons/Navbar/Navbar'
import Footer from '../../commons/Footer/Footer'

const Home = () => {

    const navitems = [
        { href: "/carousel", title: "Carousel" },
        { href: "/empleos", title: "Busqueda de empleos" }
    ]

    return (
        <>
            <Navbar navitem_list={navitems} isLogin={false} />
            <div className="mx-auto my-4" style={{ width: '700px' }}>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1>Bienvenido a TOTONET servicio web</h1>
                <div className="progress">
                    <div className="progress-bar  bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}></div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            <Footer />
        </>
    )
}

export default Home
