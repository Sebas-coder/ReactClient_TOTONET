import React from 'react'

const Label = ({ attributes, handlerChange, stateInput }) => {
    const clsnm =  () => {
        switch (stateInput) {
            case 0:
                return "form-control is-invalid"
            case 1:
                return "form-control is-valid"
            default:
                return "form-control"
        }
    }

    const classname = clsnm()

    return (
        <>
            <input
                type={attributes.type}
                name={attributes.name}
                className={classname}
                id={attributes.id}
                placeholder={attributes.placeholder}
                onChange={(e) => handlerChange(e.target.name, e.target.value)} 
                required 
            />
        </>
    )
}

export default Label;