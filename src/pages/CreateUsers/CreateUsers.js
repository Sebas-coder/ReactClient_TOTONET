import React, { useState, useEffect } from 'react'
import InputForm from '../../commons/InputForm/InputForm';
import Navbar from '../../commons/Navbar/Navbar';
import Footer from '../../commons/Footer/Footer';
import Select from 'react-select'
const axios = require('axios');

const CreateUsers = () => {
    const [hasError, setHasError] = useState(false);

    const [nombre, setnombre] = useState('')
    const [nombreErr, setnombreErr] = useState(false)

    const [Contrasenia, setContrasenia] = useState('')
    const [ContraseniaErr, setContraseniaErr] = useState(false)

    const [idDeparment, setidDeparment] = useState('')
    const [idDeparmentErr, setidDeparmentErr] = useState(false)

    const [idTipo, setidTipo] = useState('')
    const [idTipoErr, setidTipoErr] = useState(false)

    const [deparmentItems, setdeparmentItems] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/deparments')
            .then(function (response) {
                console.log(response);
                let items = response.data['deparments'].map((dep, index) => {
                    return {
                        value: dep.id,
                        label: dep.name
                    }
                })
                
                setdeparmentItems(items)
            })
            .catch(function (error) {

            });

    }, [])


    function handlerChange(name, value) {
        if (name === 'nombre') {
            if (value.length > 0) {
                setnombre(value)
                setnombreErr(false)
            } else {
                setnombreErr(true)
            }
        } else if (name === 'password') {
            if (value.length > 0) {
                setContrasenia(value)
                setContraseniaErr(false)
            } else {
                setContraseniaErr(true)
            }
        } else {
            if (value.name === 'deparment') {
                if (name !== null) {
                    setidDeparment(name.value)
                    setidDeparmentErr(false)
                } else {
                    setidDeparmentErr(true)
                }
            } else if (value.name === 'tipo') {
                if (name !== null) {
                    setidTipo(name.value)
                    setidTipoErr(false)
                } else {
                    setidTipoErr(true)
                }
            }
        }
    }

    function handlerSubmit(e) {
        e.preventDefault();
        if (!idDeparmentErr && !idTipoErr && !nombreErr && !ContraseniaErr) {
            let newUser = { idDeparment, idTipo, nombre, Contrasenia }
            console.log(newUser)

            axios.post('http://localhost:4000/new-user', newUser)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {

                });




            console.log('se envio ;v')
            setHasError(false)
        } else {
            setHasError(true)
            console.log('Arregle esa coss')
        }
    }

    const navitems = [
        {href: "/upload",title: "Carga masiva"},
        {href: "/payroll",title: "Nuevo usuario"},
        {href: "/users",title: "Control de plantilla"}
    ]

    const options = [
        { value: 2, label: 'Coordinador' },
        { value: 3, label: 'Revisor' }
    ]

    return (
        <>
            <Navbar navitem_list={navitems} isLogin={true} />
            <div className="p-3 mb-2 bg-primary text-white">
                <div className="container d-flex justify-content-center">
                    <form onSubmit={handlerSubmit}>
                        <fieldset className="mt-5">
                            <legend>Creacion de usuarios</legend>

                            {hasError &&
                                <p className="text-danger"> Hay un error en sus datos, intenta de nuevo.</p>
                            }

                            <InputForm
                                attributes={{
                                    id: 'nombre',
                                    type: 'text',
                                    name: 'nombre',
                                    placeholder: 'Ingrese nombre'
                                }}
                                text='Nombre de usuario'
                                handlerChange={handlerChange}
                                stateInput={nombreErr ? 0 : 2}
                            />


                            <InputForm
                                attributes={{
                                    id: 'password',
                                    type: 'text',
                                    name: 'password',
                                    placeholder: 'Ingrese password'
                                }}
                                text='Contrasenia'
                                handlerChange={handlerChange}
                                stateInput={ContraseniaErr ? 0 : 2}
                            />

                            <div className="form-group">
                                <label className="form-label mt-4">Departamento</label>
                                <Select options={deparmentItems} name='deparment' onChange={handlerChange} isClearable={true} />
                                {idDeparmentErr &&
                                    <p className="text-danger"> Selecciona un departamento.</p>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-4">Tipo</label>
                                <Select options={options} name='tipo' onChange={handlerChange} isClearable={true} />
                                {idTipoErr &&
                                    <p className="text-danger"> Selecciona un tipo.</p>
                                }
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

export default CreateUsers