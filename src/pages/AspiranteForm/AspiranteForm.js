import React, { useState, useRef } from 'react'
import InputForm from '../../commons/InputForm/InputForm';
import Navbar from '../../commons/Navbar/Navbar';
import Footer from '../../commons/Footer/Footer';
import { useParams } from "react-router-dom";
import '../../styles/bootstrap.min.css'
import Swal from 'sweetalert2';

const axios = require('axios');

const AspiranteForm = () => {
    const fileImput = useRef();

    const [cui, setCui] = useState('')
    const [cuiErr, setCuiErr] = useState(false)

    let { id } = useParams();
    const [puesto] = useState(id)

    const [nombres, setNombres] = useState('')
    const [nombresErr, setNombresErr] = useState(false)

    const [apellidos, setApellidos] = useState('')
    const [apellidosErr, setApellidosErr] = useState(false)

    const [correo, setCorreo] = useState('')
    const [correoErr, setCorreoErr] = useState(false)

    const [direccion, setDireccion] = useState('')
    const [direccionErr, setDireccionErr] = useState(false)

    const [telefono, setTelefono] = useState('')
    const [telefonoErr, setTelefonoErr] = useState(false)

    const [file, setfile] = useState('')
    const [fileErr, setfileErr] = useState(false)

    const [hasError, setHasError] = useState(false);

    function handlerChange(name, value) {
        let cui_reg = /^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/
        let correo_reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
        let tel_reg = /^\d{8}$/

        if (name === 'cui') {
            if (cui_reg.test(value)) {
                setCui(value)
                setCuiErr(false)
            } else {
                setCuiErr(true)
            }
        } else if (name === 'correo') {
            if (correo_reg.test(value)) {
                setCorreo(value)
                setCorreoErr(false)
            } else {
                setCorreoErr(true)
            }
        } else if (name === 'telefono') {
            if (tel_reg.test(value)) {
                setTelefono(value)
                setTelefonoErr(false)
            } else {
                setTelefonoErr(true)
            }
        } else if (name === 'nombres') {
            if (value.length > 0) {
                setNombres(value)
                setNombresErr(false)
            } else {
                setNombresErr(true)
            }
        } else if (name === 'apellidos') {
            if (value.length > 0) {
                setApellidos(value)
                setApellidosErr(false)
            } else {
                setApellidosErr(true)
            }
        } else if (name === 'direccion') {
            if (value.length > 0) {
                setDireccion(value)
                setDireccionErr(false)
            } else {
                setDireccionErr(true)
            }
        } else {
            try {
                if (fileImput.current.files.length !== 0) {
                    setfileErr(false)
                    setfile(fileImput.current.files[0])
                    console.log('Archivo guardado')
                } else {
                    setfileErr(true)
                }
            } catch (error) {
                setfileErr(true)
            }
        }
    }

    function handlerSubmit(e) {
        e.preventDefault();
        if (!cuiErr && !nombresErr && !apellidosErr && !correoErr && !direccionErr && !telefonoErr && !fileErr) {
            /* let account = { cui, nombres, apellidos, correo, direccion, telefono, file } */

            let formData = new FormData();
            formData.append('file', file)
            formData.append('cui', cui)
            formData.append('nombres', nombres)
            formData.append('apellidos', apellidos)
            formData.append('correo', correo)
            formData.append('direccion', direccion)
            formData.append('telefono', telefono)
            formData.append('puesto', puesto)

            inser_user(formData)
            setHasError(false);
        } else {
            setHasError(true);
        }
    }


    async function inser_user(res) {
        await axios.post('http://localhost:4000/upload', res)

            .then(function (response) {
                console.log(response);
                Swal.fire(
                    'Usuario actualizado',
                    `Activado/desactivado de usuario`,
                    'success'
                )
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal!'
                })
            });
    }

    const navitems = [
        { href: "/carousel", title: "Carousel" },
        { href: "/empleos", title: "Busqueda de empleos" }
    ]

    return (
        <>
            <Navbar navitem_list={navitems} isLogin={false} />
            <div className="p-3 mb-2 bg-primary text-white">
                <div className="container d-flex justify-content-center">
                    <form onSubmit={handlerSubmit}>
                        <fieldset className="mt-5">
                            <legend>Formulario de aspirante</legend>

                            {hasError &&
                                <p className="text-danger"> Hay un error en sus datos, intenta de nuevo.</p>
                            }

                            <p>Puesto ID {puesto}</p>

                            <InputForm
                                attributes={{
                                    id: 'cui',
                                    type: 'number',
                                    name: 'cui',
                                    placeholder: 'Ingrese cui'
                                }}
                                text='CUI/DPI'
                                handlerChange={handlerChange}
                                stateInput={cuiErr ? 0 : 2}
                            />
                            <InputForm
                                attributes={{
                                    id: 'nombres',
                                    type: 'text',
                                    name: 'nombres',
                                    placeholder: 'Ingrese nombres'
                                }}
                                text='Nombres'
                                handlerChange={handlerChange}
                                stateInput={nombresErr ? 0 : 2}
                            />
                            <InputForm
                                attributes={{
                                    id: 'apellidos',
                                    type: 'text',
                                    name: 'apellidos',
                                    placeholder: 'Ingrese apellidos'
                                }}
                                text='Apellidos'
                                handlerChange={handlerChange}
                                stateInput={apellidosErr ? 0 : 2}
                            />
                            <InputForm
                                attributes={{
                                    id: 'correo',
                                    type: 'text',
                                    name: 'correo',
                                    placeholder: 'Ingrese correo'
                                }}
                                text='Correo'
                                handlerChange={handlerChange}
                                stateInput={correoErr ? 0 : 2}
                            />
                            <InputForm
                                attributes={{
                                    id: 'direccion',
                                    type: 'text',
                                    name: 'direccion',
                                    placeholder: 'Ingrese direccion'
                                }}
                                text='Direccion'
                                handlerChange={handlerChange}
                                stateInput={direccionErr ? 0 : 2}
                            />
                            <InputForm
                                attributes={{
                                    id: 'telefono',
                                    type: 'tel',
                                    name: 'telefono',
                                    placeholder: 'Ingrese telefono'
                                }}
                                text='Telefono'
                                handlerChange={handlerChange}
                                stateInput={telefonoErr ? 0 : 2}
                            />

                            <div className="form-group">
                                <label className="form-label mt-4">CV</label>
                                <input className="form-control" onChange={handlerChange} type="file" id="formFile" ref={fileImput} name='file' required />
                            </div>


                            <button className="btn btn-primary mt-5 mb-4 mx-auto" style={{ width: '500px' }}>Enviar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AspiranteForm;