import React from 'react';
import Label from './components/Label/Label';
import Input from './components/Input/Input'

const InputForm = ({attributes, handlerChange, stateInput, text})=>{
    return(
        <>
            <Label text={text}/>
            <Input 
            attributes={attributes}
            handlerChange={handlerChange}
            stateInput={stateInput}
            text={text}
            />
        </>
    )
}

export default InputForm;