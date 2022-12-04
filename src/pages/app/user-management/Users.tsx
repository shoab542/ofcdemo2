import React, { useEffect, useState } from 'react';
import { APICore } from '../../../helpers/api/apiCore';
import UserForm from '../../Form/UserForm';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';
import config from '../../../config';
// components
import classNames from 'classnames';
import Table from '../../../components/Table';
import PageTitle from '../../../components/PageTitle';
import NoImage from '../../../assets/images/no_image.jpg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, getRoles, getUser, setUserErrorAlert, setUserSuccessAlert } from '../../../redux/actions';
import { RootState } from '../../../redux/store';
import Pagination from '../../../components/CustomPagination';




const api = new APICore();

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    groups: any;
    is_active: boolean;
}


// basic info column render
const BasicInfoColumn = ({ row }:any) => {
    return (
        <>
            {row.original.profile_image !== null ?
            <img src={config.API_URL+row.original.profile_image} alt='' className="me-2 rounded-circle" />:
            <img src={NoImage} alt='' className="me-2 rounded-circle" />}
            <Link to="#" className="text-body fw-semibold">
                {row.original.first_name}{' '}{row.original.last_name}
            </Link>
        </>
    );
};

/* status column render */
const StatusColumn = ({ row }:any) => {
    return (
        <React.Fragment>
            <span
                className={classNames('badge', {
                    'bg-soft-success text-success': row.original.is_active === true,
                    'bg-soft-danger text-danger': row.original.is_active === false,
                })}
            >

                {row.original.is_active ?
                    'active':'inactive'
                }
            </span>
        </React.Fragment>
    );
};



// action column render
const ActionColumn = withSwal(({ row, swal }:any) => {
    /*
     *   modal handeling
     */
    const dispatch = useDispatch();
    const user_role = useSelector((state:RootState)=> state.Role.user_role);
    const roles = useSelector((state:RootState) => state.Role.roles);
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => {dispatch(setUserErrorAlert(''));setShow(true)};

    /*
    handle form submission
    */
    const onSubmit = (formData:FormData) => {
        api.updatePatch(`/api/users/${row.original.id}/`,{'first_name':formData['first_name'],'last_name':formData['last_name'],'email':formData['email'],'phone':formData['phone'],'groups':[parseInt(formData['groups'])],'is_active':formData['is_active']})
        .then(res=>{
            console.log(res.data.error)
            if(res.data.success){
                
                dispatch(setUserSuccessAlert('User Updated Successfully'));
                onCloseModal()
                setTimeout(()=>{
                    dispatch(setUserSuccessAlert(''));
                },2000)
            }else{
                
                dispatch(setUserErrorAlert(res.data.error));
                
                
            }
            
        })
        .catch(err => {
            dispatch(setUserErrorAlert(err));
            
        })
       
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
            .then(function(result:any){
                if(result.value){
                    api.delete(`/api/users/${row.original.id}/`)
                .then(res=>{
                    dispatch(getUser(6,1));
                    swal.fire(
                        'Deleted!',
                        'Account has been deleted.',
                        'success'
                    );            
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

            { user_role.includes('change_user') ?
                <Link to="#" className="action-icon" onClick={()=>onOpenModal()}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>:
                <Link to="#" className="action-icon"  style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
            }
            
            { user_role.includes('delete_user') ?
                <Link to="#" className="action-icon" onClick={()=>onDelete()}>
                    <i className="mdi mdi-delete"></i>
                </Link>:
                <Link to="#" className="action-icon" style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-delete"></i>
                </Link>
            }
            <UserForm show={show} onHide={onCloseModal} onSubmit={onSubmit} user={row.original} cgroups={roles}/>
        </>
    );
});

const columns = [
    {
        Header: 'Name',
        accessor: 'basic_info',
        sort: true,
        Cell: BasicInfoColumn,
        className: 'table-user',
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
        Header: 'Role',
        accessor: 'groups[0].name',
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn
    },
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        Cell: ActionColumn,
    },
];

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((state:RootState) => state.User.users);
    const previous = useSelector((state:RootState) => state.User.previous);
    const next = useSelector((state:RootState) => state.User.next);
    const current_page = useSelector((state:RootState) => state.User.current_page);
    const total_page = useSelector((state:RootState) => state.User.total_page);
    const active = useSelector((state:RootState) => state.User.active);
    const roles = useSelector((state:RootState) => state.Role.roles);
    const user_role = useSelector((state:RootState)=> state.Role.user_role);
    const loading = useSelector((state:RootState) => state.User.loading);
    const success = useSelector((state:RootState) => state.User.success);
    

    const [pageSize,setPageSize] = useState(6);
  

    /*
     *   modal handeling
     */
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => {dispatch(setUserErrorAlert(''));setShow(true)};

    const visitPage = (page:number) => {
        dispatch(getUser(pageSize,page));
    };

    const previous_number = () => {
        dispatch(getUser(pageSize,previous));
    };

    const next_number = () => {
        dispatch(getUser(pageSize,next));
    };

    /*
    handle form submission
    */

    useEffect(()=>{

        if(success !== ''){
            onCloseModal();
        }
            dispatch(getUser(pageSize,1));
            setTimeout(()=>{
                dispatch(setUserSuccessAlert(''));
            },2000)
    },[success])
    
    const onSubmit = (formData:FormData) => {

        dispatch(addUser({'first_name':formData['first_name'],'last_name':formData['last_name'],'email':formData['email'],'password':formData['password'],'phone':formData['phone'],'groups':[parseInt(formData['groups'])],'is_active':formData['is_active']}));
        
        
    };


    useEffect(()=>{ 
        dispatch(getUser(pageSize,1));   
        dispatch(getRoles(null,null));
    },[pageSize])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Users', path: '/app/users', active: true },
                ]}
                title={'Users'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                        {!loading  && success && (
                            <Alert variant="success" className="my-2" onClose={()=>dispatch(setUserSuccessAlert(''))}  dismissible>
                                {success}
                            </Alert>
                        )}
                            <Row className="mb-2">
                                <Col sm={4}>
                                    <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{width: '40%'}} onChange={(e:any)=>{setPageSize(e.target.value);dispatch(getUser(e.target.value,current_page))}}>
                                            <option value='6'>6</option>
                                            <option value='10'>10</option>
                                            <option value='15'>15</option>
                                            <option value='20'>20</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        { user_role.includes('add_user') ?
                                            <Button className="btn btn-success mb-2 me-1" onClick={onOpenModal}>
                                            <i className="mdi mdi-plus-circle me-1"></i> Add New
                                            </Button>:
                                            <>
                                            </>
                                        }
                                      
  
                                    </div>
                                </Col>
                            </Row>
                            
                            {loading ? <p>Loading...</p>:
                            <>
                            {users.length > 0 ?
                            <Table
                                columns={columns}
                                data={users}
                                pageSize={pageSize}
                                isSortable={true}
                                pagination={false}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            :
                            'No user available!'}</>}
                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}
            
            <UserForm show={show} onHide={onCloseModal} onSubmit={onSubmit} cgroups={roles} />
            
            
            
        </>
    );
};

export default Users;
