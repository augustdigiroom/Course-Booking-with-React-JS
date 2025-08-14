 import { useState, useEffect, useContext} from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

function AddNews() {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (!user.isAdmin) {
      navigate('/news');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (name.trim() && description.trim()) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [name, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    
    const newsData = {
      name,
      description,
    };
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newsData),
      });


  const data = await response.json();

  console.log(data); // Debugging this part

      if (data.message === "News already exists") {
        notyf.error("News Already Exists");
        setName("");
        setDescription("");
      } else if (data.success) {
        notyf.success("News Added");
        navigate('/news');
      } else {
        notyf.error("Unsuccessful News Creation");
      }
    } catch (error) {
      console.error("Error:", error);
      notyf.error("Error adding news");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add News</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formCourseName">
          <Form.Label>News Headline</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the news headline"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formCourseDescription">
          <Form.Label>News Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter news details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={isSubmitDisabled}>Submit</Button>
      </Form>
    </Container>
  );
}

export default AddNews;