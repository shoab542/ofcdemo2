import React from 'react';
import {Card, Row, Col, ProgressBar } from 'react-bootstrap';

// componets

const CompanyDues = () => {
    return (
        <>
            <Card>
                <Card.Body>
                    

                    <h4 className="header-title">Company Dues</h4>
                    
                    <div className="mt-4">
                        <h6 className="text-uppercase">
                            Shuvo Software LTD <span className="float-end">10%</span>
                        </h6>

                        <ProgressBar
                            now={10}
                            className="progress m-0"
                            label="10%"
                            // visuallyHidden
                            variant="qorum"
                        />
                    </div>

                    <div className="mt-4">
                        <h6 className="text-uppercase">
                            Nasir Software LTD <span className="float-end">20%</span>
                        </h6>

                        <ProgressBar
                            now={20}
                            className="progress m-0"
                            label="20%"
                            // visuallyHidden
                            variant="qorum"
                        />
                    </div>

                    <div className="mt-4">
                        <h6 className="text-uppercase">
                            Titas Software LTD <span className="float-end">30%</span>
                        </h6>

                        <ProgressBar
                            now={30}
                            className="progress m-0"
                            label="30%"
                            // visuallyHidden
                            variant="qorum"
                        />
                    </div>

                    <div className="mt-4">
                        <h6 className="text-uppercase">
                            Anik Software LTD <span className="float-end">40%</span>
                        </h6>

                        <ProgressBar
                            now={40}
                            className="progress m-0"
                            label="40%"
                            // visuallyHidden
                            variant="qorum"
                        />
                    </div>

                    <div className="mt-4 mb-1">
                        <h6 className="text-uppercase">
                            Shojib Software LTD <span className="float-end">50%</span>
                        </h6>

                        <ProgressBar
                            now={50}
                            className="progress m-0"
                            label="50%"
                            // visuallyHidden
                            variant="qorum"
                        />
                    </div>

                    
                </Card.Body>
            </Card>
        </>
    );
};

export default CompanyDues;
