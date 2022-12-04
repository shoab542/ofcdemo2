import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import ContactForm from '../Form/ContactForm';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addContact,deleteContact,getContact, setContactErrorAlert, setContactSuccessAlert } from '../../redux/actions';
import ReactExport from "react-export-excel";
import Pagination from '../../components/CustomPagination';
import { getCountry } from '../../redux/location/actions';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const api = new APICore();


// action column render
const ActionColumn = withSwal(({ row, swal }) => {
    /*
     *   modal handeling
     */
    const dispatch = useDispatch();
    const country = useSelector(state => state.Location.country);
    const user_role = useSelector((state)=> state.Role.user_role);
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => setShow(true);

    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        
        api.updatePatch(`/api/contact/${row.original.id}/`,formData)
        .then(res=>{
            
            if(res.data.success){
                dispatch(getContact(10,1));
            }else{
                swal.fire({
                    title: res.data.error,
                }) 
                
            }
            
        })
        .catch(err => {
            swal.fire({
                title: err,
            })
        })
        onCloseModal()
    };

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
            .then(function(result){
                if(result.value){
                    // dispatch(deleteContact(row.original.id))
                    api.delete(`/api/contact/${row.original.id}/`)
                .then(res=>{
                    dispatch(getContact(10,1))
                    if(res.data.success){
                        swal.fire(
                            'Deleted!',
                            'Account has been deleted.',
                            'success'
                        ); 
                    }else{
                        swal.fire(
                            'Error',
                            res.data.error,
                            'warning'
                        
                        );
                    }
                               
                })
                .catch(err => {
                    swal.fire({
                        title: err,
                    }
                    );
                })
                }else if(result.dismiss === 'cancel'){
                    console.log('cancel')
                }
            })        
    }

    return (
        <>
            <Link to={{ pathname: '/app/contact_details', state: row.original.id }} className="action-icon" >
                <i className="mdi mdi-eye"></i>
            </Link>

            { user_role.includes('change_contact') ?
                <Link to="#" className="action-icon" onClick={()=>onOpenModal()}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>:
                <Link to="#" className="action-icon"  style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
            }
            
            { user_role.includes('delete_contact') ?
                <Link to="#" className="action-icon" onClick={()=>onDelete()}>
                    <i className="mdi mdi-delete"></i>
                </Link>:
                <Link to="#" className="action-icon" style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-delete"></i>
                </Link>
            }
            {
                show?
                <ContactForm show={show} onHide={onCloseModal} onSubmit={onSubmit} contact={row.original} countries={country}/>
                :null
            }
        </>
    );
});

const columns = [
    
    {
        Header: 'Name',
        accessor: 'name',
        sort: true,
    },
    {
        Header: 'Client Id',
        accessor: 'client_id',
        sort: true,
    },
    {
        Header: 'Contact Type',
        accessor: 'contact_type',
        sort: true,
    },
    {
        Header: 'Contact Person',
        accessor: 'contact_person',
        sort: true,
    },
    {
        Header: 'Phone',
        accessor: 'phone',
        sort: true,
    },
    {
        Header: 'Email',
        accessor: 'email',
        sort: true,
    },
    {
        Header: 'City',
        accessor: 'city.name',
        sort: true,
    },
    {
        Header: 'country',
        accessor: 'country.name',
        sort: true,

    },
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        Cell: ActionColumn,
    },
];

const Contact = () => {
    const dispatch = useDispatch();
    const contact = useSelector(state => state.Contact.contact);
    const country = useSelector(state => state.Location.country);
    const previous = useSelector(state => state.Contact.previous);
    const next = useSelector(state => state.Contact.next);
    const current_page = useSelector(state => state.Contact.current_page);
    const total_page = useSelector(state => state.Contact.total_page);
    const active = useSelector(state => state.Contact.active);
    const user_role = useSelector((state)=> state.Role.user_role);
    const loading = useSelector(state => state.Contact.loading);
    const success = useSelector(state => state.Contact.success);
    const [pageSize,setPageSize] = useState(10);

    /*
     *   modal handeling
     */
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => {dispatch(setContactErrorAlert(''));setShow(true)};

    const visitPage = (page) => {
        dispatch(getContact(pageSize,page));
    };

    const previous_number = () => {
        dispatch(getContact(pageSize,previous));
    };

    const next_number = () => {
        dispatch(getContact(pageSize,next));
    };

    /*
    handle form submission
    */

    useEffect(()=>{
        if(success !== ''){
            onCloseModal();
        }
        
        setTimeout(()=>{
            dispatch(setContactSuccessAlert(''));
        },2000)
    },[success])

    const onSubmit = (formData) => {
        dispatch(addContact(formData));
        
    };


    useEffect(()=>{ 
        dispatch(getContact(pageSize,1));
        dispatch(getCountry());   
    },[pageSize])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Contact', path: '/app/contact', active: true },
                ]}
                title={'Contact'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            
                            {!loading  && success && (
                                <Alert variant="success" className="my-2" onClose={() => dispatch(setContactSuccessAlert(''))} dismissible>
                                {success}
                            </Alert>
                            )}
                            <Row className="mb-2">
                                <Col sm={4}>
                                    <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{width: '40%'}} onChange={(e)=>{setPageSize(e.target.value);dispatch(getContact(e.target.value,current_page))}}>
                                            <option value='10'>10</option>
                                            <option value='15'>20</option>
                                            <option value='20'>30</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        { user_role.includes('add_contact') ?
                                            <Button className="btn btn-success mb-2 me-1" onClick={onOpenModal}>
                                            <i className="mdi mdi-plus-circle me-1"></i> Add New
                                            </Button>:
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
                            
                            {loading ? <p>Loading...</p>:
                            <>
                            {contact.length > 0 ?
                            <>
                            <Table
                                columns={columns}
                                data={contact}
                                pageSize={pageSize}
                                isSortable={true}
                                pagination={false}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/>
                            </>
                            :
                            'No user available!'}</>}
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}
            
            <ContactForm show={show} onHide={onCloseModal} onSubmit={onSubmit} countries={country}/>
            
            
            
        </>
    );
};

export default Contact;
