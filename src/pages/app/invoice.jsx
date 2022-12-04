import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import { Row, Col, Card, Form, Alert, Tab, Nav } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoice } from '../../redux/actions';
import Pagination from '../../components/CustomPagination';



// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const api = new APICore();

const refreshPage = () => {
    window.location.reload();
}



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
            <option selected={row.original.status === 'waiting'} value='waiting'>Waiting</option>
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
        </>

    const waitingsOptions =
        <>
            <option selected={row.original.status === 'waiting'} value='waiting'>Waiting</option>
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
        </>

    const approvesOptions =
        <>
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
            <option selected={row.original.status === 'paid'} value='paid'>Paid</option>
        </>

    const paidsOptions =
        <>
            <option disabled selected={row.original.status === 'paid'} value='paid'>Paid</option>
        </>

    var dropDown = (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Form.Select style={{ width: '70%' }} onChange={(e) => handleShow(row, e)}>
            {row.original.status === "draft" ? (draftsOptions) : null}
            {row.original.status === "waiting" ? (waitingsOptions) : null}
            {row.original.status === "approve" ? (approvesOptions) : null}
            {row.original.status === "paid" ? (paidsOptions) : null}
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
                    api.update(`/api/change-invoice-status/?id=${row.original.id}`, data)
                        .then(res => {
                            if (res) {
                                swal.fire(
                                    'Updated!',
                                    'Invoice Status has been Updated.',
                                    'success'
                                );
                            }
                            else {
                                swal.fire(
                                    'Updated!',
                                    'Invoice Status has not Updated.',
                                    'warning'
                                );
                            }
                            // setTimeout(() => {
                            //     refreshPage();
                            // }, 600);
                            dispatch(getInvoice(10, 1));
                        })
                        .catch(err => {
                            console.log('err', err)
                            dispatch(getInvoice(10, 1));
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {
                    dispatch(getInvoice(10, 1));
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
        Header: 'Date',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Due Date',
        accessor: 'due_date',
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


const Invoice = () => {
    const dispatch = useDispatch();
    const [filteredIncoices, setFilteredInvoices] = useState([]);
    const invoices = useSelector(state => state.Invoice.invoices);
    const previous = useSelector(state => state.Invoice.previous);
    const next = useSelector(state => state.Invoice.next);
    const current_page = useSelector(state => state.Invoice.current_page);
    const total_page = useSelector(state => state.Invoice.total_page);
    const active = useSelector(state => state.Invoice.active);
    const user_role = useSelector((state) => state.Role.user_role);
    const loading = useSelector(state => state.Invoice.loading);
    const error = useSelector(state => state.Invoice.error);
    const [pageSize, setPageSize] = useState(10);
    const [activePage, setActivePage] = useState('all');
    /*
     *   modal handeling
     */

    const visitPage = (page) => {
        dispatch(getInvoice(pageSize, page));
    };

    const previous_number = () => {
        dispatch(getInvoice(pageSize, previous));
    };

    const next_number = () => {
        dispatch(getInvoice(pageSize, next));
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

        } else if (value === 'approval') {
            setActivePage('approval');
            setFilteredInvoices(invoices.filter((item) => item.status === 'waiting'))

        } else if (value === 'approve') {
            setActivePage('approve');
            setFilteredInvoices(invoices.filter((item) => item.status === 'approve'))

        } else if (value === 'paid') {
            setActivePage('paid');
            setFilteredInvoices(invoices.filter((item) => item.status === 'paid'))

        }
        // else if(value === 'repeating'){
        //     setFilteredInvoices(invoices)
        // }
        else {
            setFilteredInvoices(invoices)
        }
    }


    useEffect(() => {
        dispatch(getInvoice(pageSize, 1));
    }, [pageSize])

    useEffect(() => {
        setFilteredInvoices(invoices);
        setActivePage('all');
    }, [invoices])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Invoice', path: '/app/invoice', active: false },
                ]}
                title={`Invoice`}
            />
            <Tab.Container>
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
                    <Nav.Item as="li" key='approval'>
                        <Nav.Link active={activePage === "approval"} className="cursor-pointer" href="#" eventKey='approval' onClick={() => onClickEvent('approval')}>
                            Awaiting Approval
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key='approve'>
                        <Nav.Link active={activePage === "approve"} className="cursor-pointer" href="#" eventKey='approve' onClick={() => onClickEvent('approve')}>
                            Awaiting Payment
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key='paid'>
                        <Nav.Link active={activePage === "paid"} className="cursor-pointer" href="#" eventKey='paid' onClick={() => onClickEvent('paid')}>
                            Paid
                        </Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item as="li" key='repeating'>
                        <Nav.Link className="cursor-pointer" href="#" eventKey='repeating' onClick={()=>onClickEvent('repeating')}>
                           Repeating
                        </Nav.Link>
                    </Nav.Item>                         */}
                </Nav>

                {/* <Tab.Content>
                    <Tab.Pane eventKey='trading'  key='trading'>
                        <Trading />
                    </Tab.Pane>                        
                    <Tab.Pane eventKey='transaction'  key='transaction'>
                        <Transaction />
                    </Tab.Pane>                        
                    <Tab.Pane eventKey='dividend'  key='dividend'>
                        <Dividend />
                    </Tab.Pane>                        
                    <Tab.Pane eventKey='dump_box'  key='dump_box'>
                        <DumpBox />
                    </Tab.Pane>                        
                </Tab.Content> */}
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
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{ width: '40%' }} onChange={(e) => { setPageSize(e.target.value); getInvoice(pageSize, 1) }}>
                                            <option value='10'>10</option>
                                            <option value='15'>20</option>
                                            <option value='20'>30</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        {user_role.includes('add_invoice') ?
                                            <Link className="btn btn-success mb-2 me-1" to='/app/invoice_form'>
                                                <i className="mdi mdi-plus-circle me-1"></i> Add
                                            </Link> :
                                            <>
                                            </>
                                        }

                                        {/* <ExcelFile element={<Button className="btn btn-light mb-2">Export</Button>}>
                                            <ExcelSheet data={users} name="Users">
                                                <ExcelColumn label="Name" value="name"/>
                                                <ExcelColumn label="Phone" value="phone"/>
                                                <ExcelColumn label="Email" value="email"/>
                                                <ExcelColumn label="Role" value={(col)=> col.groups[0].name}/>                                            
                                            </ExcelSheet>
                                        </ExcelFile> */}

                                    </div>
                                </Col>
                            </Row>

                            {loading ? <p>Loading...</p> :
                                <>
                                    {filteredIncoices.length > 0 ?
                                        <>
                                            <Table
                                                columns={columns}
                                                data={filteredIncoices}
                                                pageSize={pageSize}
                                                isSortable={true}
                                                isDetails = {true}
                                                pathName = '/app/invoice_details'
                                                pagination={false}
                                                isSearchable={true}
                                                tableClass="table-nowrap table-hover"
                                                searchBoxClass=""
                                            />
                                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active} />
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

export default Invoice;
