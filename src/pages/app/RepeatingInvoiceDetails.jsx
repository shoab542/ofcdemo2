import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getRepeatingInvoiceDetails } from '../../redux/actions';
import { withSwal } from 'react-sweetalert2';

const api = new APICore()




const RepeatingInvoiceDetails = withSwal(({ swal }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [invoiceId, setInvoiceId] = useState({});
    const user_role = useSelector((state) => state.Role.user_role);
    const repeating_invoice_details = useSelector((state) => state.RepeatingInvoice.repeating_invoice_details);
    const loading = useSelector(state => state.Invoice.loading);
    const scurrency = useSelector(state => state.Currency.selectedCurrency);


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
                    api.delete(`/api/repeating_invoice/${invoiceId}/`)
                        .then(res => {
                            history.push('/app/repeating_invoice');
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

    useEffect(() => {
        const state = location.state
        setInvoiceId(state);
    }, [])

    useEffect(() => {
        dispatch(getRepeatingInvoiceDetails(invoiceId))
    }, [invoiceId])

    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Repeating Invoice', path: '/app/repeating_invoice', active: false },
                    { label: 'Repeating Invoice Details', path: '/app/repeating_invoice_details', active: true },
                ]}
                title={'Repeating Invoice Details'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={4}>
                                    
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        {user_role.includes('change_repeatinginvoice') ?
                                            repeating_invoice_details?.status !== 'approve' &&
                                            <Link to={{ pathname: '/app/repeating_invoice_form', state: invoiceId }} className="btn btn-success me-2" >
                                                <i className="mdi mdi-square-edit-outline me-1"></i>Edit
                                            </Link> :
                                            ''
                                        }

                                        {user_role.includes('delete_repeatinginvoice') ?
                                        repeating_invoice_details?.status !== 'approve' &&
                                            <Link to="#" className="btn btn-danger me-2" onClick={() => onDelete()}>
                                                <i className="mdi mdi-delete me-1"></i>Delete
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
                                                defaultValue={repeating_invoice_details?.contact_id?.name}
                                            >

                                            </Form.Control>

                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Invoice No</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={repeating_invoice_details?.invoice_no}
                                            >

                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label >Date</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={repeating_invoice_details?.date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Due Date</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={repeating_invoice_details?.due_date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Repeat Date</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={repeating_invoice_details?.repeat_date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Reference</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={repeating_invoice_details?.reference}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Tax Type</Form.Label>

                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={repeating_invoice_details?.tax_type}
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
                                        {repeating_invoice_details && repeating_invoice_details.items ?  <>
                                            {repeating_invoice_details.items.map((item, index)=>{
                                                return (<>
                                                    <tr key={'tr'+ index}>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    defaultValue={item.item}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    defaultValue={item.description}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    defaultValue={item.qty}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    defaultValue={item.unit_price}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    defaultValue={item.discount}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group as={Col}>

                                                                <Form.Control
                                                                    readOnly={true}
                                                                    defaultValue={item.account_id.account_name}
                                                                >

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    defaultValue={item.tax_rate}
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

                                                </>)
                                            })}
                                        </>: null}

                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between">
                                    <div></div>
                                    <div >
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Subtotal (discount {scurrency?.symbol} {repeating_invoice_details?.discount} )</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {repeating_invoice_details?.sub_total}</p>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total Tax</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {repeating_invoice_details?.total_tax}</p>
                                        </div>

                                        <hr></hr>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {repeating_invoice_details?.total_amount}</p>
                                        </div>
                                        <hr></hr><hr></hr>
                                    </div>
                                </div>

                            </Form>



                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
});
export default RepeatingInvoiceDetails;
