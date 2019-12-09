import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Board from '../Board'
import StudentList from '../StudentList';
import CreateStudent from '../CreateStudent';
import ClassList from '../ClassList';
import CreateClass from '../CreateClass';
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, listStudents, listClasses, createClass, createStudent, deleteClass, deleteUser } from '../../logic'




export default withRouter(function ({ history }) {
    const [students, setStudents] = useState([])
    const [classes, setClasses] = useState([])
    const [control, setControl] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {

        const { token, type } = sessionStorage;

        (async () => {
            if (token && type) {
                const student = await listStudents(token)
                const _class = await listClasses(token)
                const user = await retrieveUser(token)
                setStudents(student)
                setClasses(_class)
                setUser(user)
            }
        })()
    }, [sessionStorage.token, control])

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLogin() { history.push('/login') }

    async function handleLogin(username, password) {
        try {
            debugger
            const token = await authenticateUser(username, password)
            debugger
            sessionStorage.token = token

            history.push('/board')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleRegister(name, surname, email, username, password, type) {
        try {
            await registerUser(name, surname, email, username, password, type)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleRetrieveStudent() {
        const students = await listStudents(token)

        setStudents(students)
    }

    async function handleRemoveStudents(id){
        const { token } = sessionStorage
        await deleteUser(token, id)

        setControl(!control)
    }

    async function handleCreateStudent(name, surname, email, username, password){
        const type = 'student'
        await createStudent(name, surname, email, username, password, type)

        setControl(!control)

    }

    async function handleRetrieveClass() {
        const classes = await listClasses(token)

        setClasses(classes)
    }

    async function handleRemoveClasses(id){
        const { token } = sessionStorage
        await deleteClass(token, id)

        setControl(!control)
    }

    async function handleCreateClass(className){
        const { token } = sessionStorage
        debugger
        try {
            await createClass(token, className)
            debugger
            const classes = await listClasses(token) 
            debugger
            setClasses(classes)

            history.push('/board')
        } catch ({ message }) {
            console.error(message)
        }

        setControl(!control)

    }

    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()

        handleGoBack()
    }


    const { token} = sessionStorage

    return <>
    <Route exact path="/" render={() => token ? <Redirect to="/board" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
    <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
    <Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
    <Route path="/board" render={() => token ? <Board onLogout={handleLogout} classes={classes} /> : <Redirect to="/" />} />
    <Route path="/student-list" render={() => token ? <StudentList students = {students} onRemoveStudent={handleRemoveStudents} /> : <Redirect to="/" />} />
    <Route path="/student-create" render={() => token ? <CreateStudent onCreateStudent={handleCreateStudent} onRetrieveStudent={handleRetrieveStudent} /> : <Redirect to="/" />} />
    <Route path="/class-list" render={() => token ? <ClassList classes = {classes} onRemoveClass={handleRemoveClasses} /> : <Redirect to="/" />} />
    <Route path="/class-create" render={() => token ? <CreateClass onCreateClass={handleCreateClass} onRetrieveClass={handleRetrieveClass} /> : <Redirect to="/" />} />
    
</>


})




    






