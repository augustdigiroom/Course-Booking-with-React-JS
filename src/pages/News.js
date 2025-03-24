import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import NewsCard from '../components/NewsCard';
import AdminNewsView from '../components/AdminNewsView';
import UserNewsView from '../components/UserNewsView';
import UserContext from '../context/UserContext';

export default function News() {
  const { user } = useContext(UserContext);
  const [news, setNews] = useState([]);  // Declare this only once

  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Fetch news data from API
  useEffect(() => {
    fetch("http://localhost:4000/news/")
      .then(res => res.json())
      .then(data => {
        setNews(data);  // Store raw data instead of JSX elements
      });
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Feedback submission handler
  function sendFeedback(e) {
    e.preventDefault();

    setEmail("");
    setFeedback("");

    alert("Thank you for your feedback. We'll get back to you as soon as we can.");
  }

  // Enable or disable the feedback button based on form fields
  useEffect(() => {
    if (email !== "" && feedback !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, feedback]);

  return (
    <>
      {user.isAdmin ? (
        // If the user is an admin, show only the admin view, no news or feedback form
        <AdminNewsView newsData={news} />
      ) : (
        <>
          {/* Render the User News View and Feedback Form only if the user is not an admin */}
          <UserNewsView newsData={news} />

          <h1 className="my-5 text-center">Feedback</h1>
          <Form onSubmit={(e) => sendFeedback(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter Email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Feedback</Form.Label>
              <Form.Control 
                as="textarea"
                rows={5}
                placeholder="Let us know what you think." 
                required
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
            </Form.Group>

            {/* Conditionally render the submit button */}
            {isActive ? 
              <Button variant="primary" type="submit" id="feedbackBtn">
                Send Feedback
              </Button> 
              : 
              <Button variant="danger" type="submit" id="feedbackBtn" disabled>
                Send Feedback
              </Button>
            }
          </Form>
        </>
      )}
    </>
  );
}
