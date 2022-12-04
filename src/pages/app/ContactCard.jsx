import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';


// components

import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getContact } from '../../redux/actions';
// import ReactExport from "react-export-excel";
import Pagination from '../../components/CustomPagination';



// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const api = new APICore();



const ContactCard = () => {
    const dispatch = useDispatch();
    const contact = useSelector(state => state.Contact.contact);
    const previous = useSelector(state => state.Contact.previous);
    const next = useSelector(state => state.Contact.next);
    const current_page = useSelector(state => state.Contact.current_page);
    const total_page = useSelector(state => state.Contact.total_page);
    const total_object = useSelector(state => state.Contact.total_object);
    const active = useSelector(state => state.Contact.active);
    const user_role = useSelector((state) => state.Role.user_role);
    const loading = useSelector(state => state.Contact.loading);
    const error = useSelector(state => state.Contact.error);
    const [pageSize, setPageSize] = useState(10);


    const visitPage = (page) => {
        dispatch(getContact(pageSize, page));
    };

    const previous_number = () => {
        dispatch(getContact(pageSize, previous));
    };

    const next_number = () => {
        dispatch(getContact(pageSize, next));
    };

    /*
    handle form submission
    */



    useEffect(() => {
        dispatch(getContact(pageSize, 1));
    }, [pageSize])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Service', path: '/app/service', active: true },
                ]}
                title={'Service'}
            />

            <div class='Container'>
                {!loading && error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                <Row className="mb-2">
                    <Col sm={4}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <span className='me-2'>Show:</span>
                            <Form.Select style={{ width: '40%' }} onChange={(e) => { setPageSize(e.target.value); dispatch(getContact(e.target.value, current_page)) }}>
                                <option value='10'>10</option>
                                <option value='15'>20</option>
                                <option value='20'>30</option>
                            </Form.Select>
                        </div>
                    </Col>

                    <Col sm={8}>
                        <div className="text-sm-end mt-2 mt-sm-0">
                            {user_role.includes('add_service') ?
                                <Link className="btn btn-success mb-2 me-1" to='/app/service_form'>
                                    <i className="mdi mdi-plus-circle me-1"></i> Add New
                                </Link> :
                                <>
                                </>
                            }

                            {/* <ExcelFile element={<Button className="btn btn-dark mb-2">Export</Button>}>
                                        <ExcelSheet data={bo_accounts} name="BO Accounts">
                                            <ExcelColumn label="Reference No" value="reference_no"/>
                                            <ExcelColumn label="BO Id" value="bo_id"/>
                                            <ExcelColumn label="Holder" value="holder"/>
                                            <ExcelColumn label="Balance" value="balance"/>                                                
                                            <ExcelColumn label="Currency" value={(col)=> col.currency.short_key}/>                                                
                                        </ExcelSheet>
                                    </ExcelFile> */}
                        </div>
                    </Col>
                </Row>

            </div>

            {loading ? <p>Loading...</p> :
                <>
                    {contact.length > 0 ?
                        <Row >{
                            contact.map((item) => {
                                return (

                                    <Col key={item.id} md={6} xl={3}>
                                        <Link to={{ pathname: '/app/service_by_contact', state: item }}>
                                            <Card>
                                                <Card.Header style={{ backgroundColor: "#0c5cad", color: "white" }}>
                                                    <div style={{ fontSize: "15px" }}>
                                                        <p style={{ marginBottom: '0px !important', textAlign: "center", fontWeight: "bold" }}>{item.name} ({item.client_id})</p>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>

                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        <h5>Email: </h5>
                                                        <p style={{ marginTop: '15px', marginLeft: '20px', marginRight: '15px' }}>{item.email ? item.email : "Not Set Yet"}</p>

                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        <h5 class='me-2'>Phone:</h5>
                                                        <p style={{ marginTop: '15px', marginLeft: '20px', marginRight: '15px' }}>{item.phone ? item.phone : "Not Set Yet"}</p>
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        <h5 class='me-2'>Total Service:</h5>
                                                        <p style={{ marginTop: '15px', marginLeft: '20px', marginRight: '15px' }}>{item.total_services}</p>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>


                                )
                            })
                        }
                        </Row>
                        :
                        'No Account available!'}</>}
            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active} />



        </>
    );
};

export default ContactCard;
