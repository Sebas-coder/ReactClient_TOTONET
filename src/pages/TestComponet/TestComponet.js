import React from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";

const TestComponet = (props) => {
    const history = useHistory();

    console.log(props);
    const pulsado = () => {
        history.replace('/login');
    }
    const query = new URLSearchParams(useLocation().search);
    const questionId = query.get('questionId');
    let { id } = useParams();

    return (
        <>

            <h1>SOy la pruebas dasdas</h1>
            <button onClick={pulsado}>Pulsame</button>
            <h1>{questionId} </h1>
            <h1>cocococcooooinck {id} </h1>
        </>
    );
}

export default TestComponet
