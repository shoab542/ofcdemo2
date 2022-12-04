import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getInvoiceDetails } from '../../redux/actions';
import { isNumber } from '@amcharts/amcharts4/core';
import { withSwal } from 'react-sweetalert2';

const api = new APICore()




const InvoiceDetails = withSwal(({swal}) => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [invoiceId, setInvoiceId] = useState({});
    const invoiceDetails = useSelector(state => state.Invoice.invoice_details);
    const loading = useSelector(state => state.Invoice.loading);
    const user_role = useSelector((state) => state.Role.user_role);
    const scurrency = useSelector(state => state.Currency.selectedCurrency);

    useEffect(() => {
        const state = location.state
        
        setInvoiceId(parseInt(state));
        
        
    }, [])

    

    useEffect(() => {
        if(isNumber(invoiceId)){
            dispatch(getInvoiceDetails(invoiceId))
        }
        
    }, [invoiceId])

    const onDelete = () => {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Yes, delete it!',
        })
            .then(function (result) {
                if (result.value) {
                    // dispatch(deleteContact(row.original.id))
                    api.delete(`/api/invoice/${invoiceId}/`)
                        .then(res => {
                            history.push('/app/invoice');
                            swal.fire(
                                'Deleted!',
                                'Invoice has been deleted.',
                                'success'
                            );
                        })
                        .catch(err => {
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {

                }
            })
    }

    const sendEmail = () => {
        const data = {
            "contact_id":invoiceDetails?.contact_id?.id,
            "invoice_id":invoiceId,
        }
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Yes, Send email!',
        })
            .then(function (result) {
                if (result.value) {
                    // dispatch(deleteContact(row.original.id))
                    api.create(`/api/send-email/`, data)
                        .then(res => {
                            // dispatch(getInvoice(10, 1));
                            swal.fire(
                                'Sent!',
                                'Email has been Sent.',
                                'success'
                            );
                        })
                        .catch(err => {
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {

                }
            })
    }
    
    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Invoice', path: '/app/invoice', active: false },
                    { label: 'Invoice Details', path: '/app/invoice_details', active: true },
                ]}
                title={'Invoice Details'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {loading ? <p>Loading...</p> :
                            <>
                            <Row className="mb-2">
                                <Col sm={4}>
                                    
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        {user_role.includes('change_invoice') ?
                                            invoiceDetails?.status !== 'approve' &&
                                            <Link to={{ pathname: '/app/invoice_form', state: invoiceId }} className="btn btn-success me-2" >
                                                <i className="mdi mdi-square-edit-outline me-1"></i>Edit
                                            </Link> :
                                            ''
                                        }

                                        {user_role.includes('delete_invoice') ?
                                            invoiceDetails?.status !== 'approve' &&
                                            <Link to="#" className="btn btn-danger me-2" onClick={() => onDelete()}>
                                                <i className="mdi mdi-delete me-1"></i>Delete
                                            </Link> :
                                            ''
                                        }

                                        {invoiceDetails?.status === "approve" ?
                                            <Link to="#" className="btn btn-info me-2" onClick={() => sendEmail()}>
                                                <i className="mdi mdi-email me-1"></i>Mail
                                            </Link> :
                                            ''
                                        }
                                    </div>
                                </Col>
                            </Row>
                            <Form>
                                <div className='mb-4'>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col}>
                                            <Form.Label >Contact</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.contact_id?.name}
                                            >

                                            </Form.Control>

                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Invoice No</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.invoice_no}
                                            >

                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label >Date</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Due Date</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.due_date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Reference</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.reference}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Tax Type</Form.Label>

                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.tax_type}
                                            >
                                            </Form.Control>


                                        </Form.Group>
                                    </Row>



                                </div>
                                <Form.Label>Items:</Form.Label>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Discount %</th>
                                            <th>Account</th>
                                            <th>Tax Rate %</th>

                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                            { invoiceDetails?.items?.length > 0 && invoiceDetails.items.map((item, index)=>{
                                                return (
                                                    <tr key={'tr'+ index}>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.item}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.description}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.qty}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.unit_price}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.discount}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group as={Col}>

                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.account_id.account_name}
                                                                >

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.tax_rate}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>

                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.total_amount}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                    </tr>

                                                )
                                            })}
                                        

                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between">
                                    <div></div>
                                    <div >
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Subtotal (discount {scurrency?.symbol} {invoiceDetails?.discount} )</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {invoiceDetails?.sub_total}</p>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total Tax</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {invoiceDetails?.total_tax}</p>
                                        </div>

                                        <hr></hr>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {invoiceDetails?.total_amount}</p>
                                        </div>
                                        <hr></hr><hr></hr>
                                    </div>
                                </div>

                            </Form>
                            </>
                          }


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
});
export default InvoiceDetails;
