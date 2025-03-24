import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

export default function UserView({ coursesData }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(coursesData.map(course => (
            <CourseCard key={course._id} courseProp={course} />
        )));
    }, [coursesData]);

    return (
        <div>
            <h1>Courses</h1>
            {courses}
        </div>
    );
}