import React, { useEffect, useState } from 'react'
import Footer from '../../commons/Footer/Footer';
import Navbar from '../../commons/Navbar/Navbar';
import Cookies from 'universal-cookie'
import '../../styles/bootstrap.min.css'
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import images from '../../assets/images'

const axios = require('axios');

const UploadFiles = () => {

    const cookies = new Cookies();
    let idUsuario = cookies.get('id')

    let { id } = useParams();
    const [puesto] = useState(id)

    const [requirements, setRequirements] = useState([])
    const [forms, setForms] = useState([])

    const [isNotZero, setisNotZero] = useState(false)
    const [items, setItems] = useState([])
    const [tableItems, settableItems] = useState([])

    function getRequirements() {
        axios.get(`http://localhost:4000/requirements2/${id}`)
            .then(function (response) {
                console.log(response)
                if (Object.keys(response.data.requisitos).length !== 0) {
                    let array = []
                    for (var clave in response.data.requisitos) {
                        array.push(response.data.requisitos[clave])
                    }
                    setRequirements(array)
                    settableItems(array)
                    setItems(array)
                    setisNotZero(true)
                    console.log(array)
                } else {
                    setisNotZero(false)
                }

            })
            .catch(function (error) {

            });
    }

    useEffect(() => {
        getRequirements();
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
                elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });

        setItems(resultadosBusqueda);
    }

    const navitems = [
        { href: "/requirement", title: "Cargar requerimientos" }
    ]

    async function update_user(res) {
        await axios.post('http://localhost:4000/update-user', res)
            .then(function (response) {
                console.log(response);
                Swal.fire(
                    res.activo === 0 ? `${res.newName} fue desactivado` : `${res.newName} fue activado`,
                    `Activado/desactivado de usuario`,
                    'success'
                )
                getRequirements();
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal!'
                })
            });
    }

    async function stateChange(id, estado) {
        console.log(id, estado)

        if (estado === 2) {

            Swal.fire({
                title: 'Accion sobre expediente',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: `Rechazar`,
            }).then(async (result) => {

                if (result.isConfirmed) {
                    let body = {}
                    body['id'] = id;
                    body['estado'] = 'Aceptado';
                    // updateRecords(body)

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
                    // updateRecords(body)

                }
            })


        }

    }


    return (
        <>
            <Navbar navitem_list={navitems} isLogin={true} />

            {isNotZero ?

                <div className='container'>
                    <h1>Requisitos</h1>
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
                                    <th>Formatos</th>
                                    <th>Obligatorio</th>
                                    <th>Tamanio min</th>
                                    <th>Estado</th>
                                    <th>Documento</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items &&
                                    items.map((item, index) => (
                                        <tr className="table-primary" key={index}>
                                            <th scope="row">{item.nombre}</th>
                                            <th scope="row">{item.formatos.toString()}</th>
                                            <th scope="row">{item.obligatorio ?
                                                <span className="badge bg-danger">Obligatorio</span>
                                                :
                                                <span className="badge bg-success">No obligatorio</span>
                                            }</th>
                                            <th scope="row">{item.tamanio}</th>
                                            <th scope="row">{item.estado}</th>
                                            <th scope="row">{item.doc ?

                                                <a href={item.doc}><img src={images.fab} alt="delete" className="img-fluid ms-2" style={{ height: "25px" }} /> </a>
                                                :
                                                <img src={images.x} alt="delete" className="img-fluid ms-2" style={{ height: "25px" }} />
                                            }</th>

                                            <th scope="row">
                                                <div>
                                                    <span className="badge bg-info" onClick={(e) => stateChange(item.id, item.estado)} >Aceptar/rechazar</span>
                                                </div>
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

export default UploadFiles
