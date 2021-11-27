import React, { useState } from 'react'
import Swal from 'sweetalert2';
import Footer from '../../commons/Footer/Footer';
import Navbar from '../../commons/Navbar/Navbar';
import Cookies from 'universal-cookie'

const axios = require('axios');

export default function Formulario() {
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')

    const newRecord = async (e) => {
        e.preventDefault();
        const loggerInUser = {
            username: name,
            password
        };

        console.log(loggerInUser)

        axios.post('http://localhost:5000/login', loggerInUser)
            .then(function (response) {

                console.log(response.data)

                const cookies = new Cookies();

                if (response.data['isFound']) {

                    cookies.set('access', response.data.accessToken, { path: '/' });
                    cookies.set('refresh', response.data.refreshToken, { path: '/' });
                    cookies.set('id', response.data.id, { path: '/' });
                    cookies.set('isLogin', true, { path: '/' });
                    cookies.set('rol', response.data.rol, { path: '/' });

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Bienvenido`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    

                    setTimeout(() => {
                        if(response.data.rol === 1){
                            window.location.href = '/upload';
                        }else if(response.data.rol === 3){
                            window.location.href = '/expedientes';
                        }if(response.data.rol === 5){
                            window.location.href = '/requirement';
                        }
                    }, 1000);

                } else {

                    cookies.set('isLogin', false, { path: '/' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Datos incorrectos',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(function (error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Datos incorrectos',
                    showConfirmButton: false,
                    timer: 1500
                })


                console.log(error);
            })
            .then(function () {

            })
    }

    const navitems = [
        { href: "/carousel", title: "Carousel" },
        { href: "/empleos", title: "Busqueda de empleos" }
    ]

    return (
        <>
            <Navbar navitem_list={navitems} isLogin={false} />
            <div className="container d-flex justify-content-center">
                <form onSubmit={newRecord}>
                    <fieldset className="mt-5">
                        <legend>Login</legend>

                        <label className="form-label mt-3">User</label>
                        <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Insert user name"
                            onChange={e => setname(e.target.value)} required />


                        <label className="form-label mt-3">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Insert user password"
                            onChange={e => setpassword(e.target.value)} required />

                        <button type='submit' className="btn btn-primary mt-4 mx-auto" style={{ width: '300px' }}>Enviar</button>
                    </fieldset>
                </form>
            </div>
            <Footer />
        </>
    )
}
