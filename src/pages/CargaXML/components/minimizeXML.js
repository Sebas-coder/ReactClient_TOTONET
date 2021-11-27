

function minXmlData(xml) {
    let deparmentArray = [];

    if (typeof xml === 'boolean' && xml) return xml;

    if (xml['name'].toLowerCase() === 'departamentos') {
        let deparments = xml.children;

        deparments.map((deparment, index) => {
            if (deparment['name'].toLowerCase() === 'departamento') {
                let deparmentAtributes = deparment.children;
                let deparmentConstruction = {}

                deparmentAtributes.map((atribute, index) => {
                    if (atribute['name'].toLowerCase() === 'nombre') {
                        deparmentConstruction['name'] = atribute['value'];
                    } else if (atribute['name'].toLowerCase() === 'capital_total') {
                        deparmentConstruction['capital'] = atribute['value'];
                    } else if (atribute['name'].toLowerCase() === 'puestos') {
                        let puestos = atribute.children;
                        deparmentConstruction['puestos'] = minXmlPuestos(puestos)
                    } else if (atribute['name'].toLowerCase() === 'departamentos') {
                        deparmentConstruction['departamentos'] = minXmlData(atribute);
                    } else {
                        return true;
                    }
                })
                deparmentArray.push(deparmentConstruction)
            }
        })


    } else {
        return true
    }
    return deparmentArray;
}


function minXmlPuestos(xml) {
    let puestosArray = [];

    xml.map((puesto, index) => {
        if (puesto['name'].toLowerCase() === 'puesto') {
            let puestoAtributes = puesto.children;
            let puestoConstruction = {}

            puestoAtributes.map((atribute, index) => {

                if (atribute['name'].toLowerCase() === 'nombre') {
                    puestoConstruction['name'] = atribute['value']
                } else if (atribute['name'].toLowerCase() === 'salario') {
                    puestoConstruction['salario'] = atribute['value']
                } else if (atribute['name'].toLowerCase() === 'categorias') {
                    const categorias = atribute.children;
                    puestoConstruction['categorias'] = []

                    categorias.map((categoria,index) =>{
                        if (categoria['name'].toLowerCase() === 'categoria') {
                            const categogiaAtributes = categoria.children;
                            categogiaAtributes.map( (categogiaAtribute, index) =>{
                                if (categogiaAtribute['name'].toLowerCase() === 'nombre') {
                                    puestoConstruction['categorias'].push(categogiaAtribute['value'])
                                }
                            })
                        }
                    })
                } else if (atribute['name'].toLowerCase() === 'requisitos') {
                    let requisitos = atribute.children;
                    puestoConstruction['requisitos'] = minXMLRequirements(requisitos)
                }else if (atribute['name'].toLowerCase() === 'imagen') {
                    puestoConstruction['imagen'] = atribute['value']
                }
            })
            puestosArray.push(puestoConstruction);
        }else{
            return true;
        }
    })
    return puestosArray;
}




function minXMLRequirements(xml){
    let requirementsArray = [];

    xml.map((requirement, index) => {
        if (requirement['name'].toLowerCase() === 'requisito') {
            let requirementAtributes = requirement.children;
            let requirementConstruction = {}

            requirementAtributes.map((atribute, index) => {

                if (atribute['name'].toLowerCase() === 'nombre') {
                    requirementConstruction['name'] = atribute['value']
                } else if (atribute['name'].toLowerCase() === 'tama') {
                    requirementConstruction['tamanio'] = atribute['value']
                } else if (atribute['name'].toLowerCase() === 'formatos') {
                    const formatos = atribute.children;
                    requirementConstruction['formatos'] = []

                    formatos.map((categoria,index) =>{
                        if (categoria['name'].toLowerCase() === 'formato') {
                            const categogiaAtributes = categoria.children;
                            categogiaAtributes.map( (categogiaAtribute, index) =>{
                                if (categogiaAtribute['name'].toLowerCase() === 'nombre') {
                                    requirementConstruction['formatos'].push(categogiaAtribute['value'])
                                }
                            })
                        }
                    })
                } else if (atribute['name'].toLowerCase() === 'obligatorio') {
                    requirementConstruction['obligatorio'] = atribute['value']
                }
            })
            requirementsArray.push(requirementConstruction);
        }else{
            return true;
        }
    })
    return requirementsArray;
}


export default minXmlData;