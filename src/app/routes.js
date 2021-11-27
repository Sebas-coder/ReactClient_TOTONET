import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AspiranteForm from '../pages/AspiranteForm/AspiranteForm';
import Login from '../pages/Login/Login'
import FailPage from '../pages/FaiPage/FailPage';
import TestComponet from '../pages/TestComponet/TestComponet';
import CreateUsers from '../pages/CreateUsers/CreateUsers';
import Carrusel from '../pages/Carrusel/Carrusel';
import CargaXML from '../pages/CargaXML/CargaXML';
import UploadFiles from '../pages/UploadFiles/UploadFiles';
import Empleos from '../pages/Empleos/Empleos';
import AdminUsers from '../pages/AdminUsers/AdminUsers'
import Expedientes from '../pages/Expedientes/Expedientes';
import RequireRecruiter from '../pages/RequireRecruiter/RequireRecruiter' ;
import Logear from '../pages/Login/Login';

import React from 'react'

const routes = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>

                    {/* Guest pages */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Logear} />
                    <Route exact path="/carousel" component={Carrusel} />
                    <Route exact path="/empleos" component={Empleos} />
                    <Route path="/applicant/:id" component={AspiranteForm} />

                    <Route path="/login" component={Login} />

                    {/* Admin pages */}
                    <Route exact path="/upload" component={CargaXML} />
                    <Route exact path="/payroll" component={CreateUsers} />
                    <Route exact path="/users" component={AdminUsers} />

                    {/* coordinator pages */}
                    {/* <Route exact path="/upload" component={CargaXML} /> */}

                    {/* recruiter pages */}
                    <Route exact path="/expedientes" component={Expedientes} />
                    <Route exact path="/requisitos/:id" component={RequireRecruiter} />

                    {/* Aspirant pages */}
                    <Route exact path="/requirement" component={UploadFiles} />

                    {/* Test component */}
                    <Route exact path="/prueba" component={TestComponet} />

                    <Route path="*" component={FailPage} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default routes;