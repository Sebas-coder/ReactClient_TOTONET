import React, { useState } from 'react'
import InputForm from '../../../../commons/InputForm/InputForm';
import XMLParser from 'react-xml-parser';
import XMLViewer from 'react-xml-viewer';
import minXmlData from '../minimizeXML';
const axios = require('axios');

const XMLByUrl = ({ customInvalidXml, customTheme }) => {

    const [hasError, setHasError] = useState(false);
    const [xmldata, setXmldata] = useState('<info>Informacion </info>')

    const handlerSubmit = async (e) => {
        e.preventDefault();
        let xml = new XMLParser().parseFromString(xmldata);
        const response = minXmlData(xml);
        // console.table(response)

        axios.post('http://localhost:4000/xml-loading', response)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handlerChange(name, value) {
        axios.get(value)
            .then(function (response) {
                setXmldata(response.data);
                setHasError(false);
            })
            .catch(function (error) {
                setHasError(true);
                setXmldata(customInvalidXml);
            })
    }

    return (
        <>
            <div className="container d-flex justify-content-center">


                <form onSubmit={handlerSubmit}>
                    <fieldset className="mt-5">
                        <legend>Carga de datos - URL    </legend>
                        {hasError &&
                            <p className="text-danger"> Hay un error en sus datos, intenta de nuevo.</p>
                        }


                        <InputForm
                            attributes={{
                                id: 'URL',
                                type: 'text',
                                name: 'URL',
                                placeholder: 'Ingrese URL'
                            }}
                            text='URL'
                            handlerChange={handlerChange}
                        />

                        <div className="row mt-1 mb-5">
                            <div className="col text-center">
                                <button className="btn btn-primary mt-4 mx-auto" style={{ width: "200px" }} disabled={hasError}>Cargar</button>
                            </div>
                        </div>



                        <XMLViewer xml={xmldata} theme={customTheme} invalidXml={customInvalidXml} collapsible={true} indentSize={6} />

                    </fieldset>
                </form>


            </div>
        </>
    )
}

export default XMLByUrl
