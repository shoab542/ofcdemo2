import React, { useEffect, useState } from 'react';
import { APICore } from '../../../helpers/api/apiCore';
import { Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';
// components

import Table from '../../../components/Table';
import PageTitle from '../../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../../../redux/actions';
import Pagination from '../../../components/CustomPagination';

const api = new APICore();




// basic info column render
const BasicInfoColumn = ({ row }) => {
    return (
        <>
            <Link to="#" className="text-body fw-semibold">
                {row.original.name}
            </Link>
        </>
    );
};




// action column render
const ActionColumn = withSwal(({ row, swal }) => {
    const dispatch = useDispatch();
    const user_role = useSelector((state)=> state.Role.user_role);
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
                    api.delete(`/api/groups/${row.original.id}/`)
                .then(res=>{
                    dispatch(getRoles(10,1));
                    swal.fire(
                        'Deleted!',
                        'Item has been deleted.',
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
            { user_role.includes('change_group') ?
                <Link to={{pathname: '/app/add_role', state: row.original }} className="action-icon" >
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>:
                <Link to="#" className="action-icon" style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
            }
            
            { user_role.includes('delete_group') ?
                <Link to="#" className="action-icon" onClick={()=>onDelete(row.original.id)}>
                    <i className="mdi mdi-delete"></i>
                </Link>:
                <Link to="#" className="action-icon" style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-delete"></i>
                </Link>
            }
            
            
            
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
        Header: 'Action',
        accessor: 'action',
        sort: false,
        Cell: ActionColumn,
    },
];

const Role = () => {
    const dispatch = useDispatch();
    const roles = useSelector(state => state.Role.roles);
    const previous = useSelector(state => state.Role.previous);
    const next = useSelector(state => state.Role.next);
    const current_page = useSelector(state => state.Role.current_page);
    const total_page = useSelector(state => state.Role.total_page);
    const active = useSelector(state => state.Role.active);
    const loading = useSelector(state => state.Role.loading);
    const error = useSelector(state => state.Role.error);
    const user_role = useSelector((state)=> state.Role.user_role);

    const [pageSize, setPageSize] = useState(6);

    const visitPage = (page) => {
        dispatch(getRoles(pageSize,page));
    };

    const previous_number = () => {
        dispatch(getRoles(pageSize,previous));
    };

    const next_number = () => {
        dispatch(getRoles(pageSize,next));
    };

    useEffect(()=>{
        dispatch(getRoles(pageSize,1));       
        
    }, [pageSize])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Roles', path: '/app/roles', active: true },
                ]}
                title={'Roles'}
            />

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
                                        <span className='me-2'>Short By:</span>
                                        <Form.Select style={{width: '40%'}} onChange={(e)=>setPageSize(e.target.value)}>
                                            <option value='6'>6</option>
                                            <option value='10'>10</option>
                                            <option value='15'>15</option>
                                            <option value='20'>20</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        { user_role.includes('add_group') ?
                                            <Link to='/app/add_role'>
                                            <Button className="btn btn-success mb-2 me-1" >
                                            <i className="mdi mdi-plus-circle me-1"></i> Add New
                                            </Button>
                                            </Link>:
                                            ""
                                        }
            
                                    </div>
                                </Col>
                            </Row>
                            
                            {loading ? <p>Loading...</p>:
                            <>
                            {roles.length > 0 ?
                            <Table
                                columns={columns}
                                data={roles}
                                pageSize={pageSize}
                                isSortable={true}
                                pagination={false}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            :
                            'No role available!'}</>}
                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            
            
            
        </>
    );
};

export default Role;
