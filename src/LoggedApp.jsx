import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import PageDoctorAssignment from './components/DoctorAssignment/PageDoctorAssignment';

const LoggedApp = () => {
    return (
        <>
            <Header />
            <Switch>
                {/* <Route exact path="/code" component={PageCode} />

            <Route exact path="/login/:id" component={PageLogin} />

            <Route exact path="/register/student" component={PageRegsiter} /> */}

                <Route exact path="/assignment/doctor" component={PageDoctorAssignment} />


            </Switch></>
    )
}

export default LoggedApp
