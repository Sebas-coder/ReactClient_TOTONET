import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import Footer from '../../commons/Footer/Footer';
import Navbar from '../../commons/Navbar/Navbar';
import Swal from 'sweetalert2';

const axios = require('axios');

const AdminUsers = () => {

    const [isNotZero, setisNotZero] = useState(false)

    const [items, setItems] = useState([])
    const [tableItems, settableItems] = useState([])

    const navitems = [
        { href: "/upload", title: "Carga masiva" },
        { href: "/payroll", title: "Nuevo usuario" },
        { href: "/users", title: "Control de plantilla" }
    ]

    function getUser(){
        axios.get('http://localhost:4000/users')
            .then(function (response) {
                console.log(response);

                if (response.data.length !== 0) {
                    settableItems(response.data.users)
                    setItems(response.data.users)
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
        getUser();
    }, [])

    function handlerChange(name, value) {
        if (value !== '') {
            filtrar(value);
        } else {
            setItems(tableItems)
        }

    }

    async function update_user(res) {
        await axios.post('http://localhost:4000/update-user', res)
            .then(function (response) {
                console.log(response);
                Swal.fire(
                    res.activo === 0 ? `${res.newName} fue desactivado` : `${res.newName} fue activado`,
                    `Activado/desactivado de usuario`,
                    'success'
                )
                getUser();
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal!'
                })
            });
    }

    function deleteUser(id, nombre, activo) {
        console.log(id, nombre, activo)

        Swal.fire({
            title: 'Estas seguro?',
            text: activo === 1 ? `Desactivar a ${nombre}` : `Activar a ${nombre}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cambiar!'

        }).then((result) => {
            if (result.isConfirmed) {
                update_user({
                    id: id,
                    activo: activo === 1 ? 0 : 1,
                    newName: nombre
                })
            }
        })
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tableItems.filter((elemento) => {

            if (
                elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.rol.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.departamento.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });

        setItems(resultadosBusqueda);
    }

    return (
        <>
            <Navbar navitem_list={navitems} isLogin={true} />
            {isNotZero ?

                <div className='container'>
                    <h1>Usuarios</h1>
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
                                    <th>Password</th>
                                    <th>Fecha de creacion</th>
                                    <th>Rol</th>
                                    <th>Departamento</th>
                                    <th>Activo</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items &&
                                    items.map((item, index) => (
                                        <tr className="table-primary" key={index}>
                                            <th scope="row">{item.name}</th>
                                            <th scope="row">{item.contrasenia}</th>
                                            <th scope="row">{item.fecha}</th>
                                            <th scope="row">{item.rol}</th>
                                            <th scope="row">{item.departamento}</th>
                                            <th scope="row">{item.activo === 1 ? "Activo" : "No activo"}</th>
                                            <th scope="row">
                                                {item.activo === 1 ?
                                                    <div>
                                                        <span className="badge bg-danger">Desactivar</span>
                                                        <img onClick={(e) => deleteUser(item.id, item.name, item.activo)} src={images.x} alt="delete" className="img-fluid ms-2" style={{ height: "25px" }} />
                                                    </div>
                                                    :
                                                    <div>
                                                        <span className="badge bg-success">Activar</span>
                                                        
                                                        <img onClick={(e) => deleteUser(item.id, item.name, item.activo)} src={images.c} alt="delete" className="img-fluid ms-4" style={{ height: "25px" }} />
                                                    </div>
                                                }
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

export default AdminUsers;
