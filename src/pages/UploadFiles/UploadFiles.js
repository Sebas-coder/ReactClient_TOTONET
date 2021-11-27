import React, { useEffect, useState } from 'react'
import Footer from '../../commons/Footer/Footer';
import Navbar from '../../commons/Navbar/Navbar';
import FileUplouder from './components/FileUplouder';
import Cookies from 'universal-cookie'

const axios = require('axios');

const UploadFiles = () => {

    const cookies = new Cookies();
    let id = cookies.get('id')

    const [requirements, setRequirements] = useState([])
    const [forms, setForms] = useState([])

    function getRequirements() {
        axios.get(`http://localhost:4000/requirements/${id}`)
            .then(function (response) {

                let array = []
                for (var clave in response.data.requisitos) {
                    array.push(response.data.requisitos[clave])
                }
                setRequirements(array)
                console.log(array)
            })
            .catch(function (error) {

            });
    }

    useEffect(() => {
        getRequirements();
    }, [])



    const navitems = [
        { href: "/requirement", title: "Cargar requerimientos" }
    ]

    return (
        <>
            <Navbar navitem_list={navitems} isLogin={true} />

            <h1 className='text-center'>Requisitos</h1>
            {requirements && 
                requirements.map((item, index) => (
                    <FileUplouder dataFile={{...item, idUser: parseInt(id)}} key={index} reload={(e) => getRequirements()} />
                ))   
            }

            <Footer />
        </>
    )
}

export default UploadFiles
