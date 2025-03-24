import { useState, useEffect, useContext} from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

function AddCourse() {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (!user.isAdmin) {
      navigate('/courses');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (name.trim() && description.trim() && price.trim()) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [name, description, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    
    const courseData = {
      name,
      description,
      price,
    };
    
    try {
      const response = await fetch("http://localhost:4000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

  //     if (!response.ok) {
  //       throw new Error("Failed to add course");
  //     }

  //     alert("Course added successfully!");
  //     setName("");
  //     setDescription("");
  //     setPrice("");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error adding course");
  //   }
  // };

  const data = await response.json();

  console.log(data); // Debugging this part

      if (data.message === "Course already exists") {
        notyf.error("Course Already Exists");
        setName("");
        setDescription("");
        setPrice("");
      // } else if (data._id) {
      } else if (data.success) {
        notyf.success("Course Added");
        navigate('/courses');
      } else {
        notyf.error("Unsuccessful Course Creation");
      }
    } catch (error) {
      console.error("Error:", error);
      notyf.error("Error adding course");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Course</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formCourseDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formCoursePrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter course price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={isSubmitDisabled}>Submit</Button>
      </Form>
    </Container>
  );
}

export default AddCourse;