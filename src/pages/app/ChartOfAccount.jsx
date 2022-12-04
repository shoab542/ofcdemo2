import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import ChartOfAccountForm from '../Form/ChartOfAccountForm';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';
// components
import classNames from 'classnames';
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addChartOfAccount, getChartAccount, setChartOfAccountErrorAlert, setChartOfAccountSuccessAlert } from '../../redux/actions';
import Pagination from '../../components/CustomPagination';

const api = new APICore();


// action column render
const ActionColumn = withSwal(({ row, swal }) => {
    /*
     *   modal handeling
     */
    const dispatch = useDispatch();
    const user_role = useSelector((state)=> state.Role.user_role);
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => { dispatch(setChartOfAccountErrorAlert('')); setShow(true) };

    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        api.updatePatch(`/api/account/${row.original.id}/`,{'account_name':formData['account_name'],'code':formData['code'],'account_type':formData['account_type'],'details':formData['details'],'transaction_type':formData['transaction_type']})
        .then(res=>{
            
            if(res.data.success){
                dispatch(getChartAccount(6,1));
                dispatch(setChartOfAccountSuccessAlert('User Updated Successfully'));
                onCloseModal()
                setTimeout(() => {
                    dispatch(setChartOfAccountSuccessAlert(''));
                }, 2000)
            } else {

                dispatch(setChartOfAccountErrorAlert(res.data.error));
            }
            
        })
        .catch(err => {
            dispatch(setChartOfAccountErrorAlert(err));
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
            .then(function(result){
                if(result.value){
                    api.delete(`/api/account/${row.original.id}/`)
                    .then(res=>{
                        if (res?.data?.success){
                            dispatch(getChartAccount(6,1));
                            swal.fire(
                                'Deleted!',
                                'Account has been deleted.',
                                'success'
                            );            
                        }
                        else{
                            swal.fire(
                                'Delete Unsuccessful!',
                                res?.data?.error,
                                'error'
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

            {user_role.includes('change_chartofaccount') ?
                <Link to="#" className="action-icon" onClick={()=>onOpenModal()}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>:
                <Link to="#" className="action-icon"  style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
            }
            
            {user_role.includes('delete_chartofaccount') ?
                <Link to="#" className="action-icon" onClick={()=>onDelete()}>
                    <i className="mdi mdi-delete"></i>
                </Link>:
                <Link to="#" className="action-icon" style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-delete"></i>
                </Link>
            }
            <ChartOfAccountForm show={show} onHide={onCloseModal} onSubmit={onSubmit} chartOfAccount={row.original}/>
        </>
    );
});

const columns = [
    {
        Header: 'Name',
        accessor: 'account_name',
        sort: true,
        className: 'table-user',
    },
    {
        Header: 'Code',
        accessor: 'code',
        sort: true,
    },
    {
        Header: 'Account Type',
        accessor: 'account_type',
        sort: true,
    },
    {
        Header: 'Details',
        accessor: 'details',
        sort: true
    },
    {
        Header: 'Transaction Type',
        accessor: 'transaction_type',
        sort: true,
    },
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        Cell: ActionColumn,
    },
];

const ChartOfAccounts = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.ChartAccount.accounts);
    const previous = useSelector(state => state.ChartAccount.previous);
    const next = useSelector(state => state.ChartAccount.next);
    const current_page = useSelector(state => state.ChartAccount.current_page);
    const total_page = useSelector(state => state.ChartAccount.total_page);
    const active = useSelector(state => state.ChartAccount.active);
    const user_role = useSelector((state)=> state.Role.user_role);
    const loading = useSelector(state => state.ChartAccount.loading);
    const error = useSelector(state => state.ChartAccount.error);
    const success = useSelector(state => state.ChartAccount.success);
    const [pageSize,setPageSize] = useState(6);
    /*
     *   modal handeling
     */
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => { dispatch(setChartOfAccountErrorAlert('')); setShow(true) };

    const visitPage = (page) => {
        dispatch(getChartAccount(pageSize,page));
    };

    const previous_number = () => {
        dispatch(getChartAccount(pageSize,previous));
    };

    const next_number = () => {
        dispatch(getChartAccount(pageSize,next));
    };

    useEffect(() => {
        if (success!==''){
            onCloseModal();
        }
            dispatch(getChartAccount(pageSize, 1));
            setTimeout(() => {
                dispatch(setChartOfAccountSuccessAlert(''));
            }, 2000)
        
    }, [success])

    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        dispatch(addChartOfAccount({'account_name':formData['account_name'],'code':formData['code'],'account_type':formData['account_type'],'details':formData['details'],'transaction_type':formData['transaction_type']}));
    };


    useEffect(()=>{ 
        dispatch(getChartAccount(pageSize,1));   
    },[pageSize])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Chart Of Accounts', path: '/app/chart_of_accounts', active: true },
                ]}
                title={'Chart Of Account'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                        {!loading && success && (
                            <Alert variant="success" className="my-2" onClose={() => dispatch(setChartOfAccountSuccessAlert(''))} dismissible>
                            {success}
                        </Alert>
                        )}
                            <Row className="mb-2">
                                <Col sm={4}>
                                    <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{ width: '40%' }} onChange={(e) => { setPageSize(e.target.value); dispatch(getChartAccount(e.target.value,current_page))}}>
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
                            {accounts.length > 0 ?
                            <Table
                                columns={columns}
                                data={accounts}
                                pageSize={pageSize}
                                isSortable={true}
                                pagination={false}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            :
                            'No Chart Of Account available!'}</>}
                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}
            
            <ChartOfAccountForm show={show} onHide={onCloseModal} onSubmit={onSubmit}/>
            
            
            
        </>
    );
};

export default ChartOfAccounts;
