import React, { useRef, useState } from 'react'
import XMLParser from 'react-xml-parser';
import XMLViewer from 'react-xml-viewer';
import minXmlData from '../minimizeXML'; 
const axios = require('axios');

const XMLByLocal = ({ customInvalidXml, customTheme }) => {
    const [xmldata, setXmldata] = useState('<info>Informacion </info>')
    const [hasError, setHasError] = useState(true);
    const [fileError, setFileError] = useState(false);
    const fileImput = useRef();



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

    const onLoading = (e) => {
        let resultado = e.target.result;
        setXmldata(resultado);
    }

    const handlerChange = (e) => {
        try {
            if ('text/xml' === fileImput.current.files[0].type) {
                let reader = new FileReader();
                reader.readAsText(fileImput.current.files[0]);
                reader.onload = onLoading;
                setFileError(false);
                setHasError(false);
            } else {
                setHasError(true);
                setFileError(true);
                setXmldata('<sd>');
            }
        } catch {
            setHasError(true);
            setFileError(true);
            setXmldata('<sd>');
        }
    }

    return (
        <>
            <div className="container d-flex justify-content-center">

                <form onSubmit={handlerSubmit}>
                    <fieldset className="mt-5">
                        <legend>Carga de datos - Local</legend>
                        {fileError &&
                            <p className="text-danger"> Hay un error en sus datos, intenta de nuevo.</p>
                        }

                        <div className="form-group">
                            <label className="form-label mt-4">Archivo XML</label>
                            <input className="form-control" onChange={handlerChange} type="file" id="formFile" ref={fileImput} required />
                        </div>


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

export default XMLByLocal
