import { useState, useEffect, useContext } from 'react';
import CourseCard from '../components/CourseCard';
import UserContext from '../context/UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
// import coursesData from '../data/coursesData';

export default function Courses() {

	const { user } = useContext(UserContext);
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		// get all active courses
		fetch('http://localhost:4000/courses/')
		.then(res => res.json())
		.then(data => {

			console.log(data);
			
			setCourses(data); // Store the fetched data directly
		});
			// 	setCourses(data.map(course => {

			// 		return (
			// 			<CourseCard key={course._id} courseProp={course} />
			// 		)
			// 	}))
			// })
	}, [])
	// Checks to see if the mock data was captured
	// console.log(coursesData);
	// console.log(coursesData[0]);

	// The "map" method loops through the individual course objects in our array and returns a component for each course
	// Multiple components created through the map method must have a unique key that will help React JS identify which components/elements have been changed, added or removed
	// Everytime the map method loops through the data, it creates a "CourseCard" component and then passes the current element in our coursesData array using the courseProp
	// const courses = coursesData.map(course => {
	//     return (
	//         <CourseCard key={course.id} courseProp={course}/>
	//     );
	// })

	return(
		<>
			{user.isAdmin ? (
                // If AdminView if the user is an admin
                <AdminView courseData={courses} />
            ) : (
                // Render UserView if the user is not an admin
                <UserView coursesData={courses} />
            )}
		</>
	)
}
