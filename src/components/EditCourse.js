 import { useState } from 'react';
 import { Button, Modal, Form } from 'react-bootstrap';
 import { Notyf } from 'notyf';


 export default function EditCourse({ course, fetchData }){

 	const notyf = new Notyf();

 	const [courseId, setCourseId] = useState(course._id);
 	const [name, setName] = useState(course.name);
 	const [description, setDescription] = useState(course.description);
 	const [price, setPrice] = useState(course.price);

 	const [showEdit, setShowEdit] = useState(false);


 	const openEdit = () => {

 		setShowEdit(true);
 	}


 	const closeEdit = () => {

 		setShowEdit(false);

 	}

 	// Function to update the course

 	const editCourse = (e, courseId) => {

 		e.preventDefault();
 		fetch(`${process.env.REACT_APP_API_URL}/courses/${ courseId }`, {
 			method: 'PATCH',
 			headers: {
 				'Content-Type': 'application/json',
 				Authorization: `Bearer ${ localStorage.getItem('token')}`
 			},
 			body: JSON.stringify({
 				name: name,
 				description: description,
 				price: price
 			})
 		})
 		.then(res => res.json())
 		.then(data => {

 			console.log(data);

 			if(data.success === true){
 				notyf.success("Successfully updated");
 				closeEdit();
 				fetchData();
 			} else { 
 				notyf.error("Something went wrong");
 				closeEdit();
 				fetchData();
 			}
 		})
 	}

 	return(
 		<>
 			<Button variant="primary" size="sm" onClick={() => openEdit()}>Edit</Button>

 			{/*EDIT MODAL*/}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editCourse(e, courseId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="courseName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="courseDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="coursePrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                            type="number" 
                            required
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
 		</>

 	)
 }