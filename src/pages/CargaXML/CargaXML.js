import React from 'react'
import Footer from '../../commons/Footer/Footer'
import Navbar from '../../commons/Navbar/Navbar'
import XMLByLocal from './components/XMLByLocal/XMLByLocal'
import XMLByUrl from './components/XMLByUrl/XMLByUrl'

const CargaXML = () => {
    const customTheme = {
        "attributeKeyColor": "#00FE0E",
        "attributeValueColor": "#FFA601",
        "textColor": "#FFFFFF",
        "separatorColor": "#FFFFFF",
        "tagColor": "ORANGE"
    }

    const customInvalidXml = '<error> Ocurrio un error </error>'

    const navitems = [
        {href: "/upload",title: "Carga masiva"},
        {href: "/payroll",title: "Nuevo usuario"},
        {href: "/users",title: "Control de plantilla"}
    ]

    return (
        <>
            <Navbar navitem_list={navitems} isLogin={true} />

            <div className="p-3 mb-2 bg-primary text-white">

                <div className="container d-flex justify-content-center">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#byURL">URL</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#byLocal">Local</a>
                        </li>
                    </ul>

                    <div id="myTabContent" className="tab-content">
                        <div className="tab-pane fade" id="byURL">
                            <XMLByUrl customTheme={customTheme} customInvalidXml={customInvalidXml} />
                        </div>
                        <div className="tab-pane fade active show" id="byLocal">
                            <XMLByLocal customTheme={customTheme} customInvalidXml={customInvalidXml} />
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default CargaXML
