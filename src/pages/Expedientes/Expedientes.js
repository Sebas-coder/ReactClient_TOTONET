import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import Footer from '../../commons/Footer/Footer';
import Navbar from '../../commons/Navbar/Navbar';
import Swal from 'sweetalert2';
import StateBag from './components/StateBag';

const axios = require('axios');

const Expedientes = () => {

    const [isNotZero, setisNotZero] = useState(false)

    const [items, setItems] = useState([])
    const [tableItems, settableItems] = useState([])

    const navitems = [
        { href: "/upload", title: "Carga masiva" },
        { href: "/payroll", title: "Nuevo usuario" },
        { href: "/users", title: "Control de plantilla" }
    ]

    function getExpedientes() {
        axios.get('http://localhost:4000/expedientes')
            .then(function (response) {
                console.log(response);

                if (response.data.length !== 0) {
                    settableItems(response.data.expedientes)
                    setItems(response.data.expedientes)
                    setisNotZero(true);
                } else {
                    setisNotZero(false);
                }
            })
            .catch(function (error) {
                setisNotZero(false);
            });
    }

    useEffect(() => {
        getExpedientes();
    }, [])

    function handlerChange(name, value) {
        if (value !== '') {
            filtrar(value);
        } else {
            setItems(tableItems)
        }

    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tableItems.filter((elemento) => {

            if (
                elemento.nombres.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.apellidos.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.estado.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.cui.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.puesto.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });

        setItems(resultadosBusqueda);
    }

    async function updateRecords(res) {
        await axios.post('http://localhost:4000/updateRecord', res)
            .then(function (response) {
                console.log(response);
                Swal.fire(
                    'Cambio exitoso',
                    `Expedientes`,
                    'success'
                )
                getExpedientes();
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal!'
                })
            });
    }

    async function stateChange(id, estado, cui, correo) {
        console.log(id, estado)

        if (estado === 'Pendiente') {

            Swal.fire({
                title: 'Accion sobre expediente',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: `Rechazar`,
            }).then( async (result) => {

                if (result.isConfirmed) {
                    let body = {}
                    body['id'] = id;
                    body['estado'] = 'Aceptado';
                    body['cui'] = cui;
                    body['correo'] = correo;
                    updateRecords(body)

                } else if (result.isDenied) {
                    
                    
                    const { value: formValues } = await Swal.fire({
                        title: 'Motivo de rechazo',
                        html:
                            '<input id="swal-input1" class="swal2-input">',
                        focusConfirm: false,
                        preConfirm: () => {
                            return [
                                document.getElementById('swal-input1').value
                            ]
                        }
                    })

                    let body = {}
                    if (formValues) {
                        if (formValues[0] === "") {
                            body['motivo'] = 'Sin motivo'
                        } else {
                            body['motivo'] = formValues[0]
                        }
                    }
                    body['id'] = id;
                    body['estado'] = 'Rechazado';
                    body['correo'] = correo;
                    updateRecords(body)

                }
            })


        }

    }



    return (
        <>
            <Navbar navitem_list={navitems} isLogin={true} />
            {isNotZero ?

                <div className='container'>
                    <h1>Expedientes</h1>
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
                                    <th>CUI</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Correo</th>
                                    <th>Direccion</th>
                                    <th>Telefono</th>
                                    <th>Puesto</th>
                                    <th>CV</th>
                                    <th>Requirimientos</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items &&
                                    items.map((item, index) => (
                                        <tr className="table-primary" key={index}>
                                            <th scope="row">{item.cui}</th>
                                            <th scope="row">{item.nombres}</th>
                                            <th scope="row">{item.apellidos}</th>
                                            <th scope="row">{item.correo}</th>
                                            <th scope="row">{item.direccion}</th>
                                            <th scope="row">{item.telefono}</th>
                                            <th scope="row">{item.puesto}</th>
                                            <th scope="row"><a href={item.cv} >
                                                <img src={images.fab} alt="delete" className="img-fluid" style={{ height: "25px" }} />
                                            </a></th>
                                            <th scope="row">{
                                                (item.estado === 'Rechazado' || item.estado === 'Pendiente') ?
                                                <span className="badge bg-secondary">Sin opcion</span>
                                                    : 
                                                    <a href={`/requisitos/${item.id}`}> <span className="badge bg-success">Ver {item.id}</span></a>
                                            }</th>

                                            <th scope="row">
                                                <StateBag state={item.estado} eventCLick={(e) => stateChange(item.id, item.estado, item.cui, item.correo)} />
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>

                    </div>
                </div>
                :
                <h1>
                    No hay nada
                </h1 >
            }
            <Footer />
        </>
    )
}

export default Expedientes;
