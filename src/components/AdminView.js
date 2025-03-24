import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function AdminView({ courseData }) {
    const [courses, setCourses] = useState([]);

    // This is to update the courses state whenever courseData changes
    useEffect(() => {
        // This is to map through the courseData and create table rows for each course
        setCourses(courseData.map(course => (
            <tr key={course._id}>
                <td>{course._id}</td>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>PHP {course.price}</td>
                <td className={course.isActive ? "text-success" : "text-danger"}>
                    {course.isActive ? "Available" : "Unavailable"}
                </td>
                <td>
                    <button className="btn btn-primary">Edit</button>
                </td>
                <td>
                    <button className="btn btn-danger">Archive</button>
                </td>
            </tr>
        )));
    }, [courseData]); // Dependency array ensures this runs whenever courseData changes

    return (
        <div className="mt-5 mb-5">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            <Table striped bordered hover responsive>
                <thead className="text-center">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render the courses as table rows */}
                    {courses}
                </tbody>
            </Table>
        </div>
    );
}