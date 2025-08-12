import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({ data }) {
    const { title, content, destination, buttonLabel } = data;

    return (
        <Row
            className="align-items-center text-center"
            style={{
                backgroundImage: `url('./laptop.jpg')`, // Place this file inside /public
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '500px',
                color: 'white',
                position: 'relative'
            }}
        >
            {/* Optional dark overlay for better text visibility */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }}
            ></div>

            <Col style={{ zIndex: 2 }}>
                <h1>{title}</h1>
                <p>{content}</p>
                <Link to={destination} className="btn btn-primary">
                    {buttonLabel}
                </Link>
            </Col>
        </Row>
    );
}
