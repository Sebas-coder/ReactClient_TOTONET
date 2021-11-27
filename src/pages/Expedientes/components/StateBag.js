import React from 'react'

const StateBag = ({ state, eventCLick }) => {
    const clsnm = () => {
        if(state === 'Rechazado'){
            return "badge bg-danger"
        }else if(state === 'Pendiente'){
            return "badge bg-warning"
        }else if(state === 'Aceptado'){
            return "badge bg-info"
        }else if(state === 'Correcciones'){
            return "badge bg-Secondary"
        }else if(state === 'Finalizado'){
            return "badge bg-success"
        }
    }

    return (
        <>
            <span className={clsnm()} onClick={eventCLick}>{state}</span>
        </>
    )
}

export default StateBag
