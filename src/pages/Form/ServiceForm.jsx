import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation, useHistory } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getAllContact } from '../../redux/actions';

const api = new APICore()




const ServiceForm = () => {
    const location = useLocation();
    const history = useHistory();
    const [oldItems, setOldItems] = useState([]);
    const [contactId, setContactId] = useState('');
    const [deletedItems, setDeletedItems] = useState([]);
    // const[isEdit,setIsEdit] = useState(false);
    // const user_role = useSelector((state:RootState)=> state.Role.user_role);
    // const { user } = useSelector((state: RootState) => ({
        //     user: state.Auth.user,
        // }));
        

    const [items, setItems] = useState({
        contact_id: contactId ? contactId : '',
        service_type: '',
        contact_mode: '',
        payment_terms: '',
        tax_rate: '',
        unit_price: ''
    });
    const [newItems, setNewItems] = useState([]);

    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.Contact.all_contact);
    const cloading = useSelector((state) => state.Contact.loading);
    const [rloading, setRloading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const ContactChange = (e) => {
        let items = [...newItems];
        items.forEach((item) => {
            item.contact_id = e.target.value;
        })
        setNewItems(items);
    }

    const onNewItemsChange = (e, index) => {
        let name = e.target.name;
        let items = [...newItems];
        let item = { ...items[index] };
        item[name] = e.target.value;
        items[index] = item;
        setNewItems(items);
    }

    const onOldItemsChange = (e, index) => {
        let name = e.target.name;
        let items = [...oldItems];
        let item = { ...items[index] };
        item[name] = e.target.value;
        items[index] = item;
        setOldItems(items);
    }


    useEffect(() => {
        const state = location.state
        
        if (state) {
            setContactId(state.contactId);
            const allItems = state.services.map((item) => {
                return {
                    id: item.id,
                    contact_id: item.contact_id.id,
                    service_type: item.service_type,
                    contact_mode: item.contact_mode,
                    payment_terms: item.payment_terms,
                    tax_rate: item.tax_rate,
                    unit_price: item.unit_price,
                }
            })
            setOldItems(allItems);
            setItems({ ...items, contact_id: state.contactId })


        } else {
            setNewItems([items])
        }
        dispatch(getAllContact());
    }, [])

    
    const onSubmit = (e) => {
        e.preventDefault();
        setRloading(true);
        setError(null);
        setSuccess(null);
        if(newItems.length > 0){
            api.create(`/api/service/`, newItems)
            .then(res => {

                if (res.data.success) {
                    setSuccess('Data Saved Successfully');
                    setRloading(false);
                    setTimeout(() => {
                        history.push('/app/service')
                    }, 1000);
                } else {
                    setError(res.data.error)
                    setRloading(false);
                }

            })
            .catch(err => {
                setError(err)
            })
        }else{
            setError('Please add at least one item');
        }
        
    }

    const onUpdate = (e) => {
        e.preventDefault();
        setRloading(true);
        setError(null);
        setSuccess(null);
        if(oldItems.length > 0 || newItems.length > 0){
            api.updatePatch(`/api/service/`, { 'updated_items': oldItems, 'new_items': newItems, 'deleted_items': deletedItems })
            .then(res => {

                if (res.data.success) {
                    setSuccess('Data Updated Successfully');
                    setRloading(false);
                    setTimeout(() => {
                        history.push('/app/service')
                    }, 1000);
                    
                } else {
                    setError(res.data.error)
                    setRloading(false);
                }

            })
            .catch(err => {
                setError(err)
            })
        }else{
            setRloading(false)
            setError('You have to add at least one item');
        }
        
    }



    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Service', path: '/app/service', active: false },
                    { label: 'Service Form', path: '/app/service_form', active: true },
                ]}
                title={'Service Form'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {error && (
                                <Alert variant="danger" className="my-2" onClose={() => setError(null)} dismissible>
                                    {error}
                                </Alert>
                            )}
                            {success && (
                                <Alert variant="success" className="my-2" onClose={() => setSuccess(null)} dismissible>
                                    {success}
                                </Alert>
                            )}
                            <Form onSubmit={(e) => { oldItems.length > 0 ? onUpdate(e) : onSubmit(e) }}>

                                <Form.Group className='mb-3' style={{ width: '20%' }}>
                                    <Form.Label >Contact</Form.Label>
                                    {contactId ?

                                        <Form.Select
                                            aria-label="Default select example"
                                            required
                                            onChange={(e) => ContactChange(e)}
                                            disabled={contactId}
                                            value={contactId}
                                        >
                                            {cloading ? <option value="" disabled>Loading...</option> :
                                                <>

                                                    <option value="" disabled>Select Contact ...</option>
                                                    {contacts.length > 0 && contacts?.map((item) => {
                                                        return (
                                                            <option key={'scontact' + item.id} value={item.id} >{item.name}</option>
                                                        )
                                                    })}

                                                </>
                                            }
                                        </Form.Select> :
                                        <Form.Select
                                            aria-label="Default select example"
                                            required
                                            onChange={(e) => ContactChange(e)}
                                            defaultValue=""
                                        >
                                            {cloading ? <option value="" disabled>Loading...</option> :
                                                <>

                                                    <option value="" >Select Contact ...</option>
                                                    {contacts.length > 0 && contacts?.map((item) => {
                                                        return (
                                                            <option key={'scontact' + item.id} value={item.id} >{item.name}</option>
                                                        )
                                                    })}

                                                </>
                                            }
                                        </Form.Select>}

                                </Form.Group>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className='required'>Service Type</th>
                                            <th className='required'>Contact Mode</th>
                                            <th className='required'>Payment Terms</th>
                                            <th className='required'>Govt VAT (%)</th>
                                            <th className='required'>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {oldItems && oldItems.length > 0 && oldItems.map((item, index) => {
                                            return (
                                                <tr key={'tr' + index}>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='text'
                                                                required
                                                                name='service_type'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.service_type}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Select
                                                                aria-label="Default select example"
                                                                required
                                                                name='contact_mode'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.contact_mode}
                                                            >

                                                                <option value="" disabled>Select Contact Mode ...</option>
                                                                <option value="pre-paid" >Pre-Paid</option>
                                                                <option value="post-paid" >Post-Paid</option>

                                                            </Form.Select>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='text'
                                                                required
                                                                name='payment_terms'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.payment_terms}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='tax_rate'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.tax_rate}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='unit_price'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.unit_price}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Link to="#" className="d-flex justify-content-center align-items-center " style={{ backgroundColor: '#1299dd', color: '#fff', height: '30px' }} onClick={() => {
                                                            oldItems.splice(index, 1);
                                                            setOldItems([...oldItems]);
                                                            deletedItems.push(item.id)
                                                        }}>
                                                            <i className="mdi mdi-close"></i>
                                                        </Link>
                                                    </td>
                                                </tr>)
                                        })}
                                        {newItems.length > 0 && newItems.map((item, index) => {
                                            return (
                                                <tr key={'tr' + index}>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='text'
                                                                required
                                                                name='service_type'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item.service_type}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Select
                                                                aria-label="Default select example"
                                                                required
                                                                name='contact_mode'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.contact_mode}
                                                            >

                                                                <option value="" disabled>Select Contact Mode ...</option>
                                                                <option value="pre-paid" >Pre-Paid</option>
                                                                <option value="post-paid" >Post-Paid</option>

                                                            </Form.Select>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='text'
                                                                required
                                                                name='payment_terms'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item.payment_terms}

                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='tax_rate'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item.tax_rate}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='unit_price'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item.unit_price}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Link to="#" className="d-flex justify-content-center align-items-center " style={{ backgroundColor: '#1299dd', color: '#fff', height: '30px' }} onClick={() => {

                                                            newItems.splice(index, 1);
                                                            setNewItems([...newItems])
                                                        }}>
                                                            <i className="mdi mdi-close"></i>
                                                        </Link>
                                                    </td>
                                                </tr>)
                                        })}


                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between">

                                    <Button variant="info" type="button" className="waves-effect waves-light me-1" onClick={() => setNewItems([...newItems, items])}>
                                        Add a new line
                                    </Button>
                                    <div>
                                        <Button variant="success" type="submit" className="waves-effect waves-light me-1" disabled={rloading}>
                                            {rloading ? 'Loading...' : 'Save'}
                                        </Button>
                                        <Link
                                            to='#'
                                            onClick={() => history.goBack()}
                                            className=" btn waves-effect waves-light"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </div>


                            </Form>



                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ServiceForm;
