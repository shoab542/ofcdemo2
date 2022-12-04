import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { APICore } from '../../helpers/api/apiCore';

// components
import PageTitle from '../../components/PageTitle';

const api = new APICore();


// invoice component
const PublicInvoice = () => {
    
        
    const [invoice_details,setInvoiceDetails] = useState({});
    const urlParams = new URLSearchParams(window.location.search);
    let unique_id = urlParams.get('unique_id');
    
    useEffect(()=>{
        api.get(`/api/public-invoice?unique_id=${unique_id}`)
        .then(res => {
            console.log(res)
            if(res.data.success){
                setInvoiceDetails(res.data.result)
            }
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    return (
        <React.Fragment>
            <div className='m-2'>
            <PageTitle
                breadCrumbItems={[
                   
                ]}
                title={'Public Invoice'}
                
            />
            </div>
            

            <Row >
                <Col>
                    <Card>
                        <Card.Body>
                            

                            

                       
                                

                            <Row className="mt-3">
                                <Col sm={6}>
                                <div >
                                        <p>
                                            <strong>Contact : </strong>{' '}
                                            <span > &nbsp;&nbsp;&nbsp; {invoice_details?.contact_id?.name} </span>
                                        </p>
                                        <p>
                                            <strong>Invoice No : </strong>{' '}
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.invoice_no}</span>
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Date : </strong>
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.date}</span>
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Due Date : </strong>
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.due_date}</span>
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Reference : </strong>
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.reference}</span>
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Tax Type : </strong>
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.tax_type}</span>
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <h6>Address</h6>
                                    <address>
                                        {invoice_details?.contact_id?.city?.name}, {invoice_details?.contact_id?.country?.name}
                                        <br />
                                        {invoice_details?.contact_id?.email}
                                    </address>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <div className="table-responsive">
                                        <table className="table mt-4 table-centered">
                                        <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item</th>
                                                    <th >Quantity</th>
                                                    <th >Unit Price</th>
                                                    <th >Discount</th>
                                                    <th >Account</th>
                                                    <th >Tax Rate</th>
                                                    <th className="text-end">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(invoice_details.items || []).map((item, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>
                                                            <td>
                                                                <b>{item.item}</b> <br />
                                                                {item.description}
                                                            </td>
                                                            <td>{item.qty}</td>
                                                            <td>{item.unit_price}</td>
                                                            <td>{item.discount}</td>
                                                            <td>{item.account_id.account_name}</td>
                                                            <td>{item.tax_rate}</td>
                                                            <td className="text-end">{item.total_amount}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    
                                </Col>
                                <Col sm={6}>
                                    <div className="float-end">
                                        <p>
                                            <b>Sub-total:</b> <span className="float-end">{invoice_details.sub_total}</span>
                                        </p>
                                        <p>
                                            <b>Total Tax:</b>{' '}
                                            <span className="float-end"> &nbsp;&nbsp;&nbsp; {invoice_details.total_tax}</span>
                                        </p>
                                        <h3>{invoice_details.total_amount}</h3>
                                    </div>
                                    <div className="clearfix"></div>
                                </Col>
                            </Row>

                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PublicInvoice;
