import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import images from '../../assets/images'
import Footer from '../../commons/Footer/Footer';
import Navbar from '../../commons/Navbar/Navbar';

const axios = require('axios');

const Carrusel = () => {

    const [isNotZero, setisNotZero] = useState(false)
    const [itemsOfCarousel, setitemsOfCarousel] = useState([])


    const [jobsItems, setjobsItems] = useState([])
    const [tableItems, settableItems] = useState([])

    const navitems = [
        { href: "/carousel", title: "Carousel" },
        { href: "/empleos", title: "Busqueda de empleos" }
    ]

    const defaultImage = () => {
        const items = (
            <Carousel.Item>
                <img
                    className="rounded mx-auto d-block" style={{ height: "980px" }}
                    src={images.tl}
                    alt='Sin resultados'
                />
                <Carousel.Caption>
                    <h3>Sin resultados</h3>
                    <p>No hay plazas vacantes.</p>
                </Carousel.Caption>
            </Carousel.Item>

        )
        setitemsOfCarousel(items)
    }

    useEffect(() => {
        axios.get('http://localhost:4000/carousel')
            .then(function (response) {
                console.log(response);

                if (response.data.length !== 0) {

                    let object = []
                    for (var clave in response.data) {
                        object.push({
                            id: clave,
                            name: response.data[clave]['name'],
                            salario: response.data[clave]['salario'],
                            departamento: response.data[clave]['departamento'],
                            categorias: response.data[clave]['categorias']
                        })
                    }
                    settableItems(object)
                    setjobsItems(object)
                    setisNotZero(true)
                } else {
                    defaultImage();
                }
            })
            .catch(function (error) {
                defaultImage();
            });

    }, [])

    function handlerChange(name, value) {
        if (value !== '') {
            filtrar(value);
        } else {
            setjobsItems(tableItems)
        }

    }  

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tableItems.filter((elemento) => {
            let categoriesToLower = elemento.categorias.map(name => name.toLowerCase());
            if (
                elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.departamento.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                categoriesToLower.includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });

        setjobsItems(resultadosBusqueda);
    }

    return (
        <>
            <Navbar navitem_list={navitems} isLogin={false} />
            {isNotZero ?

                <div className='container'>
                    <h1>Empleos</h1>
                    <div className="container d-flex justify-content-center my-5">
                        <input
                            type='text'
                            name='busqueda'
                            className='form-control'
                            id='busqueda'
                            placeholder='Ingrese lo que desea buscar'
                            onChange={(e) => handlerChange(e.target.name, e.target.value)}
                            required
                        />
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Salario</th>
                                    <th>Departamento</th>
                                    <th>Categorias</th>
                                    <th>Formulario</th>
                                </tr>
                            </thead>

                            <tbody>
                                {jobsItems &&
                                    jobsItems.map((job, index) => (
                                        <tr className="table-primary" key={index}>
                                            <th scope="row">{job.name}</th>
                                            <th scope="row">{job.salario}</th>
                                            <th scope="row">{job.departamento}</th>
                                            <th scope="row">{job.categorias.toString()}</th>
                                            <th scope="row"><a href={`/applicant/${job.id}`}> <span className="badge bg-success">¡Postulate!</span></a></th>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>

                    </div>
                </div>
                : <Carousel className="mt-4" controls={false} interval={2000}>
                    {itemsOfCarousel}
                </Carousel >}
            <Footer />
        </>
    )
}

export default Carrusel;
