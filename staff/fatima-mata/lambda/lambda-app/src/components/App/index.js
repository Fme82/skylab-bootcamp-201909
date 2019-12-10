import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Classrooms from '../Classrooms'
import Info from '../Info'
import Student from '../Student'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, listClassrooms, createClassroom, createInfo, createStudent, listInfo, listStudents } from '../../logic'



export default withRouter(function ({ history }) {
    const [name, setName] = useState()
    const [classrooms, setClassrooms] = useState([])
    const [infos, setInfos] = useState([])
    const [students, setStudents] = useState([])

    useEffect(() => {
        const { token } = sessionStorage;
        
        (async () => {
            if (token) {
                const { name } = await retrieveUser(token)

                setName(name)

                await retrieveClassrooms(token)
               // await retrieveStudents(token)
                //await retrieveInfos(token)
            }
        })()
    }, [sessionStorage.token])

    async function retrieveClassrooms(token) {
        const classrooms = await listClassrooms(token)

        setClassrooms(classrooms)
    }

    //async function retrieveStudents(token) {
    //  const students = await listStudents(token)

    //  setStudents(students)
    //}

    //async function retrieveInfos(token) {
      //  const infos = await listInfo(token)

        //setInfos(infos)
   // }

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLogin() { history.push('/login') }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleLogin(username, password) {
        try {
            
            const token = await authenticateUser(username, password)
        
            sessionStorage.token = token

            history.push('/classrooms')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleOnCreateClassroom(name) {
        try {
            const { token } = sessionStorage

            await createClassroom(token, name)

            await retrieveClassrooms(token)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleOnCreateInfo(idClassroom, title, description) {
        try {
            const { token } = sessionStorage

            await createInfo(token, idClassroom, title, description)
            
            history.push('/classrooms')
            //await retrieveClassrooms(token)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleOnCreateStudent(idClassroom, name, surname, email) {
        try {
            const { token } = sessionStorage

            await createStudent(token, idClassroom, name, surname, email)
            
            history.push('/classrooms')
            //await retrieveClassrooms(token)
        } catch (error) {
            console.error(error)
        }
    }

    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()

        handleGoBack()
    }

    const { token} = sessionStorage

    return <>
     <Route exact path="/" render={() => token ? <Redirect to="/classrooms" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
     <Route path="/register" render={() => token ? <Redirect to="/classrooms" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
     <Route path="/login" render={() => token ? <Redirect to="/classrooms" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
     <Route path="/classrooms" render={() => token ? <Classrooms user={name} classrooms={classrooms} onLogout={handleLogout} onCreateClassroom={handleOnCreateClassroom}/> : <Redirect to="/" />} />
     <Route path="/info" render={() => token ? <Info onCreateInfo={handleOnCreateInfo} onBack={handleGoBack}/> : <Redirect to="/" />} />
     <Route path="/student" render={() => token ? <Student onCreateStudent={handleOnCreateStudent} onBack={handleGoBack}/> : <Redirect to="/" />} />

</>


})




    






