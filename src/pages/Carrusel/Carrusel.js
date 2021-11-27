import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import images from '../../assets/images'
import Footer from '../../commons/Footer/Footer';
import Navbar from '../../commons/Navbar/Navbar';
const axios = require('axios');

const Carrusel = () => {

    const [itemsOfCarousel, setitemsOfCarousel] = useState([])
    const navitems = [
        { href: "/carousel", title: "Carousel" },
        { href: "/empleos", title: "Busqueda de empleos" }
    ]

    const jobs = [
        {
            img: images.tl,
            title: 'Sin resultados',
            description: 'No hay plazas vacantes.'
        }
    ]

    const defaultImage = () => {
        const items = jobs.map((job, index) => (
            <Carousel.Item key={index}>
                <img
                    className="rounded mx-auto d-block" style={{ height: "980px" }}
                    src={job.img}
                    alt={job.title}
                />
                <Carousel.Caption>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                </Carousel.Caption>
            </Carousel.Item>

        ))
        setitemsOfCarousel(items)
    }

    useEffect(() => {


        axios.get('http://localhost:4000/carousel')
            .then(function (response) {
                console.log(response);

                if (response.data.length !== 0) {

                    let items = []
                    for (var clave in response.data) {

                        let item = (
                            <Carousel.Item key={clave}>
                                <img
                                    className="rounded mx-auto d-block" style={{ height: "980px" }}
                                    src={response.data[clave]['imagen'] ? response.data[clave]['imagen'] : images.tl}
                                    alt={response.data[clave]['name']}
                                />
                                <Carousel.Caption>
                                    <div className="mx-auto" style={{ width: '700px' }}>
                                        <div className="card border-warning mb-3" style={{ maxWidth: '40rem' }}>
                                            <div className="card-header">{response.data[clave]['departamento']}</div>
                                            <div className="card-body">
                                                <h4 className="card-title">{response.data[clave]['name']} - {response.data[clave]['salario']}</h4>
                                                <p className="card-text">{response.data[clave]['categorias'].toString()}</p>
                                                <a href={`/applicant/${clave}`}>¡Postulate!</a>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                        items.push(item)
                    }
                    setitemsOfCarousel(items)

                } else {
                    defaultImage();
                }
            })
            .catch(function (error) {
                defaultImage();
            });

    }, [])


    return (
        <>
            <Navbar navitem_list={navitems} isLogin={false} />
            <Carousel className="mt-4" controls={false} interval={2000}>
                {itemsOfCarousel}
            </Carousel >
            <Footer />
        </>
    )
}

export default Carrusel;
