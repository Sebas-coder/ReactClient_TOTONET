import React, { useState, useRef } from 'react'
import Swal from 'sweetalert2';

const axios = require('axios');


const FileUplouder = ({ dataFile, reload }) => {

    const [file, setfile] = useState('')
    const [fileErr, setfileErr] = useState(false)
    const fileImput = useRef();

    console.log("Datos: ", dataFile)

    function handlerChange(name, value) {
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

    function handlerSubmit(e) {
        e.preventDefault();
        if (!fileErr) {

            let formData = new FormData();
            formData.append('file', file)
            formData.append('id', dataFile.idUser)
            formData.append('requerimiento', dataFile.id)

            inser_user(formData)
            
        } else {
            setfileErr(true);
        }
        reload()
    }


    async function inser_user(res) {
        await axios.post('http://localhost:4000/uploadRequirement', res)
            .then(function (response) {
                console.log(response);
                Swal.fire(
                    'Requerimiento cargado',
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

    let estado = (<></>)
    if (dataFile.estado === 0) {
        estado = (<>
            <span className="badge bg-danger">Rechazado</span>
            <a href={dataFile.doc}> Documento </a>
        </>)
    } else if (dataFile.estado === 1) {
        estado = (<>
            <span className="badge bg-warning">Pendiente</span>
        </>)
    } else if (dataFile.estado === 2) {
        estado = (<>
            <span className="badge bg-info">Revision</span>
        </>)
    }


    return (
        <>
            <div className="container d-flex justify-content-center">
                <form onSubmit={handlerSubmit}>
                    <fieldset className="mt-5">

                        <div className="form-group">
                            {dataFile.obligatorio ? <span className="badge rounded-pill bg-danger m-2">Obligatorio</span> : <></>}
                            <label className="form-label mt-4 me-2">{dataFile.nombre}</label>
                            {estado}
                            <p className="text-success m-0 p-0">Formatos: {dataFile.formatos.toString()} | tamanio {dataFile.tamanio}</p>

                            {dataFile.estado !== 2 && dataFile.estado !== 4 ?
                                <input className="form-control" onChange={handlerChange} type="file" id="formFile" ref={fileImput} name='file' required />
                                :
                                <></>
                            }
                        </div>

                        {dataFile.estado !== 2 && dataFile.estado !== 4 ?
                            <button className="btn btn-primary mt-5 mb-4 mx-auto" style={{ width: '500px' }}>Enviar</button>
                            :
                            <></>
                        }

                    </fieldset>
                </form>
            </div>
        </>
    )
}

export default FileUplouder
