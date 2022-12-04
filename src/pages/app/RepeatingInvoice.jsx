import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import { Row, Col, Card, Form, Alert, Tab, Nav} from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRepeatingInvoice } from '../../redux/actions';
import Pagination from '../../components/CustomPagination';



// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const api = new APICore();




export const StatusColumn = withSwal(({ row, swal }) => {
    /*
     *   modal handeling
     */
    const dispatch = useDispatch();
    const user_role = useSelector((state) => state.Role.user_role);

    /*
    handle form submission
    */
    const draftsOptions =
        <>
            <option selected={row.original.status === 'draft'} value='draft'>Draft</option>
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
        </>

    const approvesOptions =
        <>
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
        </>


    var dropDown = (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Form.Select style={{ width: '70%' }} onChange={(e) => handleShow(row, e)}>
            {row.original.status === "draft" ? (draftsOptions) : null}
            {row.original.status === "approve" ? (approvesOptions) : null}
        </Form.Select>
    </div>)

    const handleShow = (row, e) => {
        const value = e.target.value;
        const data = {
            "status": value
        }
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Yes, change it!',
        })
            .then(function (result) {

                if (result.value) {
                    api.update(`/api/change-repeating-invoice-status/?id=${row.original.id}`, data)
                        .then(res => {
                            if (res) {
                                swal.fire(
                                    'Updated!',
                                    'Repeating Invoice Status has been Updated.',
                                    'success'
                                );
                            }
                            else {
                                swal.fire(
                                    'Updated!',
                                    'Repeating Invoice Status has not Updated.',
                                    'warning'
                                );
                            }
                            // setTimeout(() => {
                            //     refreshPage();
                            // }, 600);
                            dispatch(getRepeatingInvoice(10, 1));
                        })
                        .catch(err => {
                            console.log('err', err)
                            dispatch(getRepeatingInvoice(10, 1));
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {
                    dispatch(getRepeatingInvoice(10, 1));
                }
            })
            .catch(err => {
                console.log('swal fire err', err)
            })
    };

    return (
        <>
            {dropDown}

        </>
    );
});



const columns = [
    {
        Header: 'Invoice No',
        accessor: 'invoice_no',
        sort: true,
    },
    {
        Header: 'Contact',
        accessor: 'contact_id.name',
        sort: true,
    },
    {
        Header: 'Day',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Due Day',
        accessor: 'due_date',
        sort: true,
    },
    {
        Header: 'Repeat Day',
        accessor: 'repeat_date',
        sort: true,
    },
    {
        Header: 'Tax Type',
        accessor: 'tax_type',
        sort: true,
    },
    {
        Header: 'Sub Total',
        accessor: 'sub_total',
        sort: true,
    },
    {
        Header: 'Discount',
        accessor: 'discount',
        sort: true,
        Cell: (row) => {
            return <div>{(row.row.original.discount).toFixed(2)}</div>;
        }
    },
    {
        Header: 'Total Tax',
        accessor: 'total_tax',
        sort: true,
    },
    {
        Header: 'Total Amount',
        accessor: 'total_amount',
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn,
    },
    
    
];

const RepeatingInvoice = () => {
    const dispatch = useDispatch();
    const [filteredIncoices,setFilteredInvoices] = useState([]);
    const invoices = useSelector(state => state.RepeatingInvoice.repeating_invoices);
    const previous = useSelector(state => state.RepeatingInvoice.previous);
    const next = useSelector(state => state.RepeatingInvoice.next);
    const current_page = useSelector(state => state.RepeatingInvoice.current_page);
    const total_page = useSelector(state => state.RepeatingInvoice.total_page);
    const active = useSelector(state => state.RepeatingInvoice.active);
    const user_role = useSelector((state)=> state.Role.user_role);
    const loading = useSelector(state => state.RepeatingInvoice.loading);
    const error = useSelector(state => state.RepeatingInvoice.error);
    const [pageSize,setPageSize] = useState(10);
    const [activePage, setActivePage] = useState('all');

    /*
     *   modal handeling
     */
  

    const visitPage = (page) => {
        dispatch(getRepeatingInvoice(pageSize,page));
    };

    const previous_number = () => {
        dispatch(getRepeatingInvoice(pageSize,previous));
    };

    const next_number = () => {
        dispatch(getRepeatingInvoice(pageSize,next));
    };

    /*
    handle form submission
    */
    
    const onClickEvent = (value) => {
        if (value === 'all') {
            setActivePage('all');
            setFilteredInvoices(invoices)
        } else if (value === 'draft') {
            setActivePage('draft');
            setFilteredInvoices(invoices.filter((item) => item.status === 'draft'))

        }else if (value === 'approve') {
            setActivePage('approve');
            setFilteredInvoices(invoices.filter((item) => item.status === 'approve'))
        }
        else {
            setFilteredInvoices(invoices)
        }
    }
    

    useEffect(()=>{ 
        dispatch(getRepeatingInvoice(pageSize,1));   
    },[pageSize])

    useEffect(()=>{
        setFilteredInvoices(invoices);
        setActivePage('all');
    },[invoices])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Repeating Invoice', path: '/app/repeating_invoice', active: false },
                ]}
                title={`Repeating Invoice`}
            />
            <Tab.Container defaultActiveKey="all">
                <Nav as="ul" variant="tabs">                    
                    <Nav.Item as="li" key='all'>
                        <Nav.Link active={activePage === "all"} className="cursor-pointer" href="#" eventKey='all' onClick={() => onClickEvent('all')}>
                            All
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key='draft'>
                        <Nav.Link active={activePage === "draft"} className="cursor-pointer" href="#" eventKey='draft' onClick={() => onClickEvent('draft')}>
                            Draft
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key='approve'>
                        <Nav.Link active={activePage === "approve"} className="cursor-pointer" href="#" eventKey='approve' onClick={() => onClickEvent('approve')}>
                            Approved
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

               
            </Tab.Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                        {!loading && error && (
                            <Alert variant="danger" className="my-2">
                                {error}
                            </Alert>
                        )}
                            <Row className="mb-2">
                                <Col sm={4}>
                                    <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{width: '40%'}} onChange={(e)=>{setPageSize(e.target.value);getRepeatingInvoice(pageSize,1)}}>
                                            <option value='10'>10</option>
                                            <option value='15'>20</option>
                                            <option value='20'>30</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        { user_role.includes('add_repeatinginvoice') ?
                                            <Link className="btn btn-success mb-2 me-1" to='/app/repeating_invoice_form'>
                                            <i className="mdi mdi-plus-circle me-1"></i> Add
                                            </Link>:
                                            <>
                                            </>
                                        }
                                        
                                        
  
                                    </div>
                                </Col>
                            </Row>
                            
                            {loading ? <p>Loading...</p>:
                            <>
                            {filteredIncoices.length > 0 ?
                            <>
                            <Table
                                columns={columns}
                                data={filteredIncoices}
                                pageSize={pageSize}
                                isSortable={true}
                                isDetails = {true}
                                pathName = '/app/repeating_invoice_details'
                                pagination={false}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/>
                            </>
                            :
                            'No data available!'}</>}
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}
            
            
            
            
            
        </>
    );
};

export default RepeatingInvoice;
