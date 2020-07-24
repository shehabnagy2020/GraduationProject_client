import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import PageDoctorAssignment from './components/DoctorAssignment/PageDoctorAssignment';
import PageStudentAssignment from './components/StudentAssignment/PageStudentAssignment';
import PageHomeScreen from './components/HomeScreen/PageHomeScreen';
const LoggedApp = () => {
    return (
        <>
            <Header />
            <Switch>

                <Route exact path="/assignment/doctor" component={PageDoctorAssignment} />

                <Route exact path="/assignment/student" component={PageStudentAssignment} />

                <Route exact path="/home" component={PageHomeScreen} />


            </Switch></>
    )
}

export default LoggedApp
