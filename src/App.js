import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router-dom';

import {useState, useEffect} from 'react';

import {UserProvider} from './context/UserContext.js';

import AppNavbar from './components/AppNavbar';

import Courses from './pages/Courses';
import CourseView from './pages/CourseView';
import Home from './pages/Home';
import Login from './pages/Login';
import News from './pages/News';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Profile from './pages/Profile';  // Import Profile Page
import Error from './pages/Error';
import AddCourse from "./pages/AddCourse";
import AddNews from "./pages/AddNews";

function App() {
  // user - state of the user
  // setUser - to update the user state
  const [user, setUser] = useState({ id: null, isAdmin: null});
  // unsetUser - to clear all data in localstorage
  function unsetUser(){ // unset the local storage
    localStorage.clear();
    // setUser({ id: null, isAdmin: null});
  }
  useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token') }`
        }
      })
      .then(res => res.json())
      .then(data => {

        console.log(data)
        console.log(typeof data !== undefined)
        
        // Set the user states values with the user details upon successful login.
        if (typeof data !== undefined) {

          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });

        // Else set the user states to the initial values
        } else {

          setUser({
            id: null,
            isAdmin: null
          });

        }

      })
    }, [])

  return (
    <>
      <UserProvider value = {{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/courses" element={<Courses />}/>
            <Route path="/courses/:courseId" element={<CourseView />}/>
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/news" element={<News />}/>
            <Route path="/addNews" element={<AddNews />} />
            <Route path="/register" element={user.id ? <Navigate to="/courses" /> : <Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/profile" element={user.id ? <Profile /> : <Navigate to="/login" />} />

            <Route path="*" element={<Error />}/>
          </Routes>
        </Container>
      </Router>
      </UserProvider>
    </>
  )
}

export default App