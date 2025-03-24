import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Use null to prevent showing empty data

  useEffect(() => {
    if (!user || !user.id) {
      navigate('/courses'); // Redirect if user is not logged in
      return;
    }

    fetch('http://localhost:4000/users/details/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            alert('User not found.');
          } else {
            alert('Something went wrong, kindly contact us for assistance.');
          }
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUserData(data); // Store the fetched data
        }
      })
      .catch((err) => {
        console.error('Error fetching user details:', err);
        alert('Something went wrong, kindly contact us for assistance.');
      });
  }, [user, navigate]);

  if (!userData) {
    return <p>Loading user details...</p>; // Show loading message while fetching
  }

  return (
    // <div className="container d-flex justify-content-center align-items-center">
    // <div className="text-center">
    <div className="profile-container">
      <div className="profile-content">
        <h1>Your Profile</h1>
        <h2><strong>{userData.firstName} {userData.lastName}</strong></h2>
        <h5><strong>Contacts:</strong></h5>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Mobile Number:</strong> {userData.mobileNo}</p>
      </div>
    </div>
  );
}

export default Profile;