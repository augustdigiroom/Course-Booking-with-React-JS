import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function AdminNewsView({ newsData }) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // This is to map through the courseData and create table rows for each course
        setNews(newsData.map(news => (
            <tr key={news._id}>
                <td>{news._id}</td>
                <td>{news.name}</td>
                <td>{news.description}</td>
                <td className={news.isActive ? "text-success" : "text-danger"}>
                    {news.isActive ? "Available" : "Unavailable"}
                </td>
                <td>
                    <button className="btn btn-primary">Edit</button>
                </td>
                <td>
                    <button className="btn btn-danger">Archive</button>
                </td>
            </tr>
        )));
    }, [newsData]); // Dependency array ensures this runs whenever newsData changes

    return (
        <div className="mt-5 mb-5">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            <Table striped bordered hover responsive>
                <thead className="text-center">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {news}
                </tbody>
            </Table>
        </div>
    );
} 