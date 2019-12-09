import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Board from '../Board'
import StudentList from '../StudentList';
import CreateStudent from '../CreateStudent';
import ClassroomList from '../ClassroomList';
import CreateClassroom from '../CreateClassroom';
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, listStudents, listClassrooms, createClassroom, createStudent, deleteClassroom, deleteUser } from '../../logic'




export default withRouter(function ({ history }) {
    const [students, setStudents] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [control, setControl] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {

        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const classrooms = await listClassrooms(token)
                const user = await retrieveUser(token)
                setClassrooms(classrooms)
                setUser(user)
            }
        })()
    }, [sessionStorage.token, control])

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLogin() { history.push('/login') }

    async function handleLogin(username, password) {
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            history.push('/board')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleRetrieveStudent() {
        const students = await listStudents(token)

        setStudents(students)
    }

    async function handleRemoveStudents(id) {
        const { token } = sessionStorage
        await deleteUser(token, id)

        setControl(!control)
    }

    async function handleCreateStudent(name, surname, email) {
        await createStudent(name, surname, email)

        setControl(!control)

    }

    async function handleRetrieveClassroom() {
        const classrooms = await listClassrooms(token)

        setClassrooms(classrooms)
    }

    async function handleRemoveClassroom(id) {
        const { token } = sessionStorage
        await deleteClassroom(token, id)

        setControl(!control)
    }

    async function handleCreateClassroom(className) {
        const { token } = sessionStorage
        debugger
        try {
            await createClassroom(token, className)
            debugger
            const classes = await listClassrooms(token)
            debugger
            setClassrooms(classes)

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


    const { token } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/board" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/board" render={() => token ? <Board onLogout={handleLogout} classrooms={classrooms} /> : <Redirect to="/" />} />
        <Route path="/list-students" render={() => token ? <StudentList students={students} onRemoveStudent={handleRemoveStudents} /> : <Redirect to="/" />} />
        <Route path="/create-student" render={() => token ? <CreateStudent onCreateStudent={handleCreateStudent} onRetrieveStudent={handleRetrieveStudent} /> : <Redirect to="/" />} />
        <Route path="/classroom-list" render={() => token ? <ClassroomList classrooms={classrooms} onRemoveClassroom={handleRemoveClassroom} /> : <Redirect to="/" />} />
        <Route path="/create-classroom" render={() => token ? <CreateClassroom onCreateClassroom={handleCreateClassroom} onRetrieveClassroom={handleRetrieveClassroom} /> : <Redirect to="/" />} />

    </>


})











