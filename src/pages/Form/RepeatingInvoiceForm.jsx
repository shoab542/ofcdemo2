import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns'
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getAllContact, getChartAccount, getContactService, getRepeatingInvoiceDetails } from '../../redux/actions';


const api = new APICore()




const RepeatingInvoiceForm = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.Contact.all_contact);
    const accounts = useSelector((state) => state.ChartAccount.accounts);
    const cloading = useSelector((state) => state.Contact.loading);
    const chloading = useSelector((state) => state.ChartAccount.loading);
    const [rloading, setRloading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const [oldItems, setOldItems] = useState([]);
    const repeating_invoice_details = useSelector((state) => state.RepeatingInvoice.repeating_invoice_details);
    const contact_services = useSelector((state) => state.Service.contact_services);
    const [contactId, setContactId] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceId, setInvoiceId] = useState(null);
    const [date, setDate] = useState('');
    const [due_date, setDueDate] = useState('');
    const [repeat_date, setRepeatDate] = useState('');
    const [reference, setReference] = useState('');
    const [currency, setCurrency] = useState('1');
    const scurrency = useSelector(state => state.Currency.selectedCurrency);
    const [tax_type, setTaxType] = useState('inclusive');
    const [sub_total, setSubTotal] = useState('');
    const [discount, setDiscount] = useState('');
    const [total_tax, setTotalTax] = useState('');
    const [status, setStatus] = useState('draft');
    const [total_amount, setTotalAmount] = useState('');
    const [deletedItems, setDeletedItems] = useState([]);
    const [taxGroup, setTaxGroup] = useState({});

    const [items, setItems] = useState({
        item: '',
        description: '',
        qty: 1,
        unit_price: 0,
        discount: 0,
        account_id: null,
        tax_rate: 0,
        tax_amount: 0,
        sub_total: 0,
        total_amount: 0
    });
    const [newItems, setNewItems] = useState([]);

    const onContactChange = (e) => {
        setNewItems([])
        setContactId(e.target.value);
        dispatch(getContactService(e.target.value));
    }
    useEffect(() => {
        let tempData = [];
        if (contact_services.length > 0) {

            contact_services?.forEach((item) => {
                tempData.push(
                    {
                        item: item.service_type,
                        description: '0',
                        qty: 1,
                        unit_price: item.unit_price,
                        discount: '0',
                        account_id: '',
                        tax_rate: item.tax_rate,
                        tax_amount: (tax_type === 'inclusive' ?
                            ((((1 * item.unit_price) * (item.tax_rate && parseInt(item.tax_rate))) / (100 + (item.tax_rate && parseInt(item.tax_rate)))).toFixed(2))
                            : tax_type === 'exclusive' ?
                                (((1 * item.unit_price) / 100) * (item.tax_rate && parseInt(item.tax_rate)))
                                : 0
                        ),
                        sub_total: 1 * item.unit_price,
                        total_amount: 1 * item.unit_price
                    })


            })
            setNewItems(tempData);

        } else {
            setNewItems([items])
        }


    }, [contact_services])

    const onNewItemsChange = (e, index) => {
        let name = e.target.name;
        let items = [...newItems];
        let item = { ...items[index] };
        item[name] = e.target.value;
        if (name === 'qty' || name === 'unit_price' || name === 'discount' || name === 'tax_rate') {

            item['sub_total'] = parseFloat(item['qty'] !== '' ? item['qty'] : 0) * parseFloat(item['unit_price'] !== '' ? item['unit_price'] : 0)
            item['sub_total'] -= ((parseFloat(item['sub_total']) * parseFloat(item['discount'] !== '' ? item['discount'] : 0)) / 100)

            if (tax_type === 'inclusive') {
                item['tax_amount'] = parseFloat((parseFloat(item['sub_total']) * parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0)) / (100 + parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0)))
            } else if (tax_type === 'exclusive') {
                item['tax_amount'] = parseFloat((parseFloat(item['sub_total']) / 100) * parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0))
            } else {
                item['tax_amount'] = 0
            }

            item['total_amount'] = parseFloat((item['sub_total']))
        }
        items[index] = item;
        setNewItems(items);
    }

    const onOldItemsChange = (e, index) => {
        let name = e.target.name;
        let items = [...oldItems];
        let item = { ...items[index] };
        item[name] = e.target.value;
        if (name === 'qty' || name === 'unit_price' || name === 'discount' || name === 'tax_rate') {

            item['sub_total'] = parseFloat(item['qty'] !== '' ? item['qty'] : 0) * parseFloat(item['unit_price'] !== '' ? item['unit_price'] : 0)
            item['sub_total'] -= ((parseFloat(item['sub_total']) * parseFloat(item['discount'] !== '' ? item['discount'] : 0)) / 100)

            if (tax_type === 'inclusive') {
                item['tax_amount'] = parseFloat((parseFloat(item['sub_total']) * parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0)) / (100 + parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0)))
            } else if (tax_type === 'exclusive') {
                item['tax_amount'] = parseFloat((parseFloat(item['sub_total']) / 100) * parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0))
            } else {
                item['tax_amount'] = 0
            }

            item['total_amount'] = parseFloat((item['sub_total']))
        }
        items[index] = item;
        setOldItems(items);
    }

    useEffect(() => {
        const groupOfTax = {}
        let total_discount = 0
        let total_subTotal = 0.00
        let total_taxAmount = 0
        newItems.forEach((item) => {
            total_discount += parseFloat((parseFloat(item.sub_total) / 100) * parseFloat(item.discount));
            total_subTotal += parseFloat(item.total_amount);

            var item_tax_amount = 0;
            if (tax_type === 'inclusive') {
                item_tax_amount = parseFloat((parseFloat(item.sub_total) * parseFloat(item.tax_rate !== '' ? item.tax_rate : 0)) / (100 + parseFloat(item.tax_rate !== '' ? item.tax_rate : 0)))
            } else if (tax_type === 'exclusive') {
                item_tax_amount = parseFloat((parseFloat(item.sub_total) / 100) * parseFloat(item.tax_rate !== '' ? item.tax_rate : 0))
            } else {
                item_tax_amount = 0
            }
            total_taxAmount += parseFloat(item_tax_amount);

            if ((item.tax_rate).toString() in groupOfTax) {
                groupOfTax[(item.tax_rate).toString()] += parseFloat(parseFloat(item_tax_amount).toFixed(2));
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(groupOfTax[(item.tax_rate).toString()]).toFixed(2))
            }
            else {
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(item_tax_amount).toFixed(2));
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(groupOfTax[(item.tax_rate).toString()]).toFixed(2))
            }

        })


        oldItems.forEach((item) => {
            total_discount += parseFloat((parseFloat(item.sub_total) / 100) * parseFloat(item.discount));
            total_subTotal += parseFloat(item.total_amount);

            var item_tax_amount = 0;
            if (tax_type === 'inclusive') {
                item_tax_amount = parseFloat((parseFloat(item.sub_total) * parseFloat(item.tax_rate !== '' ? item.tax_rate : 0)) / (100 + parseFloat(item.tax_rate !== '' ? item.tax_rate : 0)))
            } else if (tax_type === 'exclusive') {
                item_tax_amount = parseFloat((parseFloat(item.sub_total) / 100) * parseFloat(item.tax_rate !== '' ? item.tax_rate : 0))
            } else {
                item_tax_amount = 0
            }
            total_taxAmount += parseFloat(item_tax_amount);
            
            if ((item.tax_rate).toString() in groupOfTax) {
                groupOfTax[(item.tax_rate).toString()] += parseFloat(parseFloat(item_tax_amount).toFixed(2));
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(groupOfTax[(item.tax_rate).toString()]).toFixed(2))
            }
            else {
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(item_tax_amount).toFixed(2));
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(groupOfTax[(item.tax_rate).toString()]).toFixed(2))
            }


        })
        setDiscount(parseFloat(parseFloat(total_discount).toFixed(2)));
        setSubTotal(parseFloat(parseFloat(total_subTotal).toFixed(2)));
        setTotalTax(parseFloat(parseFloat(total_taxAmount).toFixed(2)));
        let totalAmount = parseFloat(parseFloat(parseFloat(total_subTotal) + (tax_type === 'exclusive' && parseFloat(total_taxAmount))).toFixed(2));
        setTotalAmount(totalAmount)
        setTaxGroup(groupOfTax)
    }, [newItems, oldItems, tax_type])

    useEffect(() => {
        const state = location.state
        dispatch(getAllContact());
        dispatch(getChartAccount());
        if (state) {
            dispatch(getRepeatingInvoiceDetails(state));
            setInvoiceId(state);
            setNewItems([]);

        } else {
            setNewItems([items]);
            setOldItems([]);
            setInvoiceId(null);
        }

    }, [])

    useEffect(() => {
        if (invoiceId) {
            setNewItems([]);
            setInvoiceNo(repeating_invoice_details?.invoice_no);
            setContactId(repeating_invoice_details?.contact_id?.id);
            setTaxType(repeating_invoice_details?.tax_type);
            setDate(repeating_invoice_details?.date);
            setDueDate(repeating_invoice_details?.due_date);
            setRepeatDate(repeating_invoice_details?.repeat_date);
            setReference(repeating_invoice_details?.reference);
            setStatus(repeating_invoice_details?.status);
            if (repeating_invoice_details?.items?.length > 0) {
                const allItems = repeating_invoice_details.items.map((item) => {
                    return {
                        id: item.id,
                        item: item.item,
                        description: item.description,
                        qty: item.qty,
                        unit_price: item.unit_price,
                        discount: item.discount,
                        account_id: item.account_id.id,
                        tax_rate: item.tax_rate,
                        tax_amount: item.tax_amount,
                        sub_total: item.sub_total,
                        total_amount: item.total_amount
                    }

                });
                setOldItems(allItems)
            }

        }

    }, [repeating_invoice_details])


    // console.log("newItems", newItems)
    // console.log("oldItems", oldItems)
    const onSubmit = (e) => {
        e.preventDefault();
        setRloading(true);
        setError(null);
        setSuccess(null);
        if(newItems.length > 0){
            api.create(`/api/repeating-invoice/`, { 'invoice_no': invoiceNo, 'contact_id': contactId, 'date': date, 'due_date': due_date, 'repeat_date': repeat_date, 'reference': reference, 'currency': currency, 'tax_type': tax_type, 'sub_total': sub_total, 'discount': discount, 'total_tax': total_tax, 'status': status, 'total_amount': total_amount, 'items': newItems })
            .then(res => {

                if (res.data.success) {
                    setSuccess('Data Saved Successfully');
                    setRloading(false);
                    setTimeout(() => {
                        history.push('/app/repeating_invoice')
                    }, 2000);
                } else {
                    setError(res.data.error)

                }

            })
            .catch(err => {
                setError(err)
                setRloading(false);
            })
        }else{
            setError('Please add at least one service');
        }
        
    }

    const onUpdate = (e) => {
        e.preventDefault();
        setRloading(true);
        setError(null);
        setSuccess(null);
        if(newItems.length > 0 || oldItems.length > 0){
            api.updatePatch(`/api/repeating-invoice/${invoiceId}/`, { 'invoice_no': invoiceNo, 'contact_id': contactId, 'date': date, 'due_date': due_date, 'repeat_date': repeat_date, 'reference': reference, 'currency': currency, 'tax_type': tax_type, 'sub_total': sub_total, 'discount': discount, 'total_tax': total_tax, 'status': status, 'total_amount': total_amount, 'items': oldItems, 'new_items': newItems, 'deleted_items': deletedItems })
            .then(res => {

                if (res.data.success) {
                    setSuccess('Data Updated Successfully');
                    setRloading(false);
                    setTimeout(() => {
                        history.push('/app/repeating_invoice')
                    }, 2000);
                } else {
                    setError(res.data.error)
                    setRloading(false)
                }

            })
            .catch(err => {
                setError(err)
            })
        }else{
            setRloading(false)
            setError('You have to add at least one service');
        }
        
    }

    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Repeating Invoice', path: '/app/repeating_invoice', active: false },
                    { label: 'Repeating Invoice Form', path: '/app/repeating_invoice_form', active: true },
                ]}
                title={'Repeating Invoice Form'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {!rloading && error && (
                                <Alert variant="danger" className="my-2" onClose={() => setError(null)} dismissible>
                                    {error}
                                </Alert>
                            )}
                            {!rloading && success && (
                                <Alert variant="success" className="my-2" onClose={() => setSuccess(null)} dismissible>
                                    {success}
                                </Alert>
                            )}
                            <Form onSubmit={(e) => { oldItems.length > 0 ? onUpdate(e) : onSubmit(e) }}>
                                <div className='mb-4'>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Contact</Form.Label>

                                            <Form.Select
                                                aria-label="Default select example"
                                                disabled={invoiceId ? true : false}
                                                required
                                                onChange={(e) => onContactChange(e)}
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
                                            </Form.Select>

                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Invoice No</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='invoice_no'
                                                onChange={(e) => setInvoiceNo(e.target.value)}
                                                defaultValue={invoiceId && repeating_invoice_details?.invoice_no}
                                            >

                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Day<small style={{fontSize:"10px", color:"grey"}}> (Every Month)</small> </Form.Label>
                                            <Form.Control
                                                type='number'
                                                required
                                                name='date'
                                                max='31'
                                                min='1'
                                                onChange={(e) => setDate(e.target.value)}
                                                defaultValue={invoiceId && repeating_invoice_details?.date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Due Day<small style={{ fontSize: "10px", color: "grey" }}> (Every Month)</small> </Form.Label>
                                            <Form.Control
                                                type='number'
                                                required
                                                max='31'
                                                min='1'
                                                name='due_date'
                                                onChange={(e) => setDueDate(e.target.value)}
                                                defaultValue={invoiceId && repeating_invoice_details?.due_date}
                                            >



                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Repeat Day <small style={{ fontSize: "10px", color: "grey" }}> (Every Month)</small> </Form.Label>
                                            <Form.Control
                                                type='number'
                                                required
                                                max='31'
                                                min='1'
                                                name='repeat_date'
                                                onChange={(e) => setRepeatDate(e.target.value)}
                                                defaultValue={invoiceId && repeating_invoice_details?.repeat_date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Reference</Form.Label>
                                            <Form.Control
                                                type='text'
                                                
                                                name='reference'
                                                onChange={(e) => setReference(e.target.value)}
                                                defaultValue={invoiceId && repeating_invoice_details?.reference}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Tax Type</Form.Label>

                                            <Form.Select
                                                aria-label="Default select example"
                                                required
                                                onChange={(e) => setTaxType(e.target.value)}
                                                value={tax_type}
                                            >
                                                <option value="inclusive">Inclusive</option>
                                                <option value="exclusive">Exclusive</option>
                                                <option value="no_tax">No Tax</option>
                                            </Form.Select>

                                        </Form.Group>
                                    </Row>



                                </div>
                                <Form.Label>Items:</Form.Label>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className='required'>Item</th>
                                            <th>Description</th>
                                            <th className='required'>Quantity</th>
                                            <th className='required'>Unit Price</th>
                                            <th>Discount %</th>
                                            <th className='required'>Account</th>
                                            <th>Tax Rate %</th>

                                            <th>Total</th>

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
                                                                name='item'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.item}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                as='textarea'
                                                                rows='1'
                                                                
                                                                name='description'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.description}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='qty'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.qty}
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
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                
                                                                name='discount'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.discount}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group as={Col}>


                                                            <Form.Select
                                                                aria-label="Default select example"
                                                                required
                                                                name='account_id'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.account_id}
                                                            >
                                                                {chloading ? <option value="" disabled>Loading...</option> :
                                                                    <>

                                                                        <option value="" disabled>Select Chart Account ...</option>
                                                                        {accounts.length > 0 && accounts?.map((item) => {
                                                                            return (
                                                                                <option key={'aco' + item.id} value={item.id} >{item.account_name}</option>
                                                                            )
                                                                        })}

                                                                    </>
                                                                }
                                                            </Form.Select>

                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                
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
                                                                readOnly={true}
                                                                value={item?.total_amount}
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
                                                                name='item'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.item}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                as='textarea'
                                                                rows='1'
                                                                
                                                                name='description'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.description}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='qty'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.qty}
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
                                                                value={item?.unit_price}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                
                                                                name='discount'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.discount}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group as={Col}>


                                                            <Form.Select
                                                                aria-label="Default select example"
                                                                required
                                                                name='account_id'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.account_id}
                                                            >
                                                                {chloading ? <option value="" disabled>Loading...</option> :
                                                                    <>

                                                                        <option value="">Select Chart Account ...</option>
                                                                        {accounts.length > 0 && accounts?.map((item) => {
                                                                            return (
                                                                                <option key={'acn' + item.id} value={item.id} >{item.account_name}</option>
                                                                            )
                                                                        })}

                                                                    </>
                                                                }
                                                            </Form.Select>

                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                
                                                                name='tax_rate'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.tax_rate}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>

                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                readOnly={true}
                                                                value={item?.total_amount}
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
                                {/* <Card key={'tr2'+index}>
                                        <Card.Header>
                                            <div className='d-flex justify-content-between'>
                                                <p>item: {++itemCount}</p>
                                                <Link to="#" className="d-flex justify-content-center align-items-center " style={{backgroundColor: '#1299dd',color: '#fff',height:'30px',width:'30px'}} onClick={()=>{newItems.splice(index,1)}}>
                                                    <i className="mdi mdi-close"></i>
                                                </Link>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                        <Row className='mb-3'>
                                        
                                        <Form.Group as={Col}>
                                            <Form.Label >Item:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='item'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.item}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                                                                
                                        <Form.Group as={Col}>
                                            <Form.Label >Quantity:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='qty'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.qty}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Unit Price:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='unit_price'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.unit_price}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Discount:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='discount'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.discount}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        </Row>
                                        <Row className='mb-3'>
                                        <Form.Group as={Col}>
                                            <Form.Label >Chart Account:</Form.Label>                                                    
                                            <Form.Select
                                                aria-label="Default select example"
                                                required 
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                                                    
                                            >
                                                {chloading ? <option value="" disabled>Loading...</option>: 
                                                <>
                                                
                                                    <option value="" disabled>Select Chart Account ...</option>  
                                                    {accounts.length > 0 && accounts?.map((item)=>{
                                                        return(
                                                            <option key={'aco'+item.id} value={item.id} >{item.account_name}</option>
                                                        )
                                                    })} 
                                                
                                                </>
                                                }
                                            </Form.Select>                                        
                                            
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Tax Rate:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='tax_rate'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.tax_rate}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Tax Amount:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='tax_amount'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.tax_amount}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Sub Total:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='sub_total'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.sub_total}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        </Row>
                                        <Row>
                                        

                                        <Form.Group as={Col} xs={6}>
                                            <Form.Label >Description:</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                required
                                                name='description'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.description}
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                        <Form.Label >Total Amount:</Form.Label>
                                        <Form.Control
                                            type='text'
                                            required
                                            name='total_amount'
                                            onChange={(e)=>onNewItemsChange(e,index)}
                                            defaultValue={item?.total_amount}
                                        >

                                        </Form.Control>
                                    </Form.Group>
                                        <Form.Group as={Col}>

                                        </Form.Group>
                                        </Row>
                                        </Card.Body>
                                        
                                        
                                    </Card>                                    */}
                                <div className="d-flex justify-content-between">

                                    <Link to="#" className="btn-primary waves-effect waves-light" onClick={() => setNewItems([...newItems, items])} style={{ maxHeight: '25px', padding: '3px' }}>
                                        Add a new line
                                    </Link>
                                    <div >
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Subtotal</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {sub_total}</p>
                                        </div>
                                        {/* {newItems?.map((item)=>{
                                                if(item.tax_rate > 0)
                                                return(

                                                <div className="d-flex justify-content-between">
                                                    <p style={{fontSize: '20px'}}>Total Tax {item.tax_rate}%</p>
                                                    <p style={{fontSize: '20px',paddingLeft: '50px'}}>{item.tax_amount}</p>
                                                </div>
                                                )
                                            })} */}
                                        {/* {oldItems?.map((item)=>{
                                                if(item.tax_rate > 0)
                                                return (
                                                <div className="d-flex justify-content-between" >
                                                    <p style={{fontSize: '20px'}}>Total Tax {item.tax_rate}%</p>
                                                    <p style={{fontSize: '20px',paddingLeft: '50px'}}>{item.tax_amount}</p>
                                                </div>
                                                )
                                            })} */}
                                        {Object.entries(taxGroup).map(item => {
                                            if (item[0] > 0) {
                                                return (
                                                    <div className="d-flex justify-content-between" >
                                                        <p style={{ fontSize: '20px' }}>Total Tax {item[0]}%</p>
                                                        <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {item[1]}</p>

                                                    </div>)
                                            }
                                        })}
                                        <hr></hr>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {total_amount}</p>
                                        </div>
                                        <hr></hr><hr></hr>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">

                                    <Button variant="info" type="submit" className="waves-effect waves-light me-1" >
                                        Save
                                    </Button>
                                    <div>
                                        <Button variant="success" type="submit" className="waves-effect waves-light me-1" disabled={rloading} onClick={() => setStatus('approve')}>
                                            {rloading ? 'Loading...' : 'Approve'}
                                        </Button>
                                        <Link
                                            to='#'
                                            onClick={() => history.goBack()}
                                            className=" btn btn-secondary waves-effect waves-light"
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

export default RepeatingInvoiceForm;
