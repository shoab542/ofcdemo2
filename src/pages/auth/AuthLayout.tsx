import React, { useEffect } from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Design from '../../assets/images/design.png';
import Avat from '../../assets/images/avater.jpg';

interface AccountLayoutProps {
    helpText?: string;
    bottomLinks?: any;
    isCombineForm?: boolean;
    children?: any;
}

const AuthLayout = ({ helpText, bottomLinks, children, isCombineForm }: AccountLayoutProps) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (document.body) document.body.classList.remove('authentication-bg', 'authentication-bg-pattern');
        if (document.body) document.body.classList.add('auth-fluid-pages', 'pb-0');

        return () => {
            if (document.body) document.body.classList.remove('auth-fluid-pages', 'pb-0');
        };
    }, []);

    return (
        <>
        <Container style={{width: "1170px", height: "780"}}>
            <div className="auth-fluid" style={{background: "#F5F6F8", marginTop: "50px"}}>
                {/* Auth fluid left content */}
                <Container>
                <Row className="pr-0">
               <Col lg={5} > <div className="auth-fluid-form-box">
                    <div className="align-items-center d-flex h-100">
                        <Card.Body>
                            {/* logo */}
                            <div className="auth-brand text-center text-lg-start">
                                <div className="auth-logo">
                                    {/* <Link to="/" className="logo logo-dark text-center outline-none">
                                        <span className="logo-lg">
                                            <img src={CCL_Logo} alt="" height="140" />
                                        </span>
                                    </Link>

                                    <Link to="/" className="logo logo-light text-center">
                                        <span className="logo-lg">
                                            <img src={CCL_Logo} alt="" height="140" />
                                        </span>
                                    </Link> */}
                                </div>
                            </div>

                            {children}

                            {/* footer links */}
                            {/* {bottomLinks} */}
                        </Card.Body>
                
                    </div>
                </div>
                </Col>
                {/* Auth fluid right content */}
            
               <div className="auth-fluid-right text-center ml-4">
                <Row className='mt-4'>
               <Col lg={1}>
               <span />
               </Col >
               <Col lg={9}>
               <h1>Client <br/> Satisfaction <br/> Review</h1> 
           
               <div className='bottom'>
                <img src={Design} alt=''/>
                <p>Lorem ipsum dolor sit amet, <br/> consectetur adipiscing elit. </p>
                <h6>Adam Smith</h6>
                <p>Web Designer</p>
               </div>
               <img src={Avat} alt="" className='avater'/>
               </Col>
               <Col lg={2}></Col>
               </Row>
                {/* <div className="auth-user-testimonial">
               </div>    */}
                </div>
                </Row>
                </Container>
            </div></Container>
        </>
    );
};

export default AuthLayout;
