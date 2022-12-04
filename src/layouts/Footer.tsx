import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <React.Fragment>
            <footer className="footer">
                <div className="container-fluid">
                    <Row >
                        <Col md={6}>
                            <div className='d-flex left'>
                             <p style={{marginRight: "24px"}}>Privacy Policy</p>
                             <p>Terms of Use</p>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="text-md-end footer-links d-none d-sm-block">
                            Copyright {currentYear} &copy; CCL. All rights reserved.
                            </div>
                        </Col>
                    </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
