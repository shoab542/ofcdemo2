import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';

import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
// import classNames from 'classnames';
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrency } from '../../redux/actions';
// import { addCurrency, getCurrency } from '../../../redux/actions';
// import Pagination from '../../../components/CustomPagination';

const api = new APICore();



/* status column render */
// const StatusColumn = ({ row }) => {
//     return (
//         <React.Fragment>
//             <span
//                 className={classNames('badge', {
//                     'bg-soft-success text-success': row.original.is_active === true,
//                     'bg-soft-danger text-danger': row.original.is_active === false,
//                 })}
//             >

//                 {row.original.is_active ?
//                     'active':'inactive'
//                 }
//             </span>
//         </React.Fragment>
//     );
// };



// action column render
// const ActionColumn = withSwal(({ row, swal }) => {
//     /*
//      *   modal handeling
//      */
//     const dispatch = useDispatch();
//     const [show, setShow] = useState(false);
//     const onCloseModal = () => setShow(false);
//     const onOpenModal = () => setShow(true);
    
//     /*
//     handle form submission
//     */
//     const onSubmit = (formData) => {
//         api.update(`/api/currency/${row.original.id}/`,formData)
//         .then(res=>{
            
//             if(res.data.success){
//                 dispatch(getCurrency(6,1))
//             }else{
//                 swal.fire({
//                     title: res.data.error,
//                 }) 
                
//             }
            
//         })
//         .catch(err => {
//             swal.fire({
//                 title: err,
//             })
//         })
//         onCloseModal()
//     };

//     const onDelete = () => {
//         swal.fire({
//                 title: 'Are you sure?',
//                 text: "You won't be able to revert this!",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#28bb4b',
//                 cancelButtonColor: '#f34e4e',
//                 confirmButtonText: 'Yes, delete it!',
//             })
//             .then(function(result){
//                 if(result.value){
//                     api.delete(`/api/currency/${row.original.id}/`)
//                 .then(res=>{
//                     dispatch(getCurrency(6,1))
//                     swal.fire(
//                         'Deleted!',
//                         'Account has been deleted.',
//                         'success'
//                     );            
//                 })
//                 .catch(err => {
//                     swal.fire({
//                         title: err,
//                     }
//                     );
//                 })
//                 }else if(result.dismiss === 'cancel'){
//                     console.log('cancel')
//                 }
//             })        
//     }

//     return (
//         <>
//             <Link to="#" className="action-icon" onClick={()=>onOpenModal(row.original.id)}>
//                 <i className="mdi mdi-square-edit-outline"></i>
//             </Link>
//             <Link to="#" className="action-icon" onClick={()=>onDelete(row.original.id)}>
//                 <i className="mdi mdi-delete"></i>
//             </Link>
//             <CurrencyForm show={show} onHide={onCloseModal} onSubmit={onSubmit} data={row.original} />
//         </>
//     );
// });

const columns = [
    
    
    {
        Header: 'Code',
        accessor: 'code',
        sort: true,
    },
    {
        Header: 'Currency Name',
        accessor: 'currency_name',
        sort: true,
    },
    {
        Header: 'Symbol',
        accessor: 'symbol',
        sort: true,
    },
    
    
];

const Currency = () => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.Currency.currencies);
    // const previous = useSelector(state => state.Currency.previous);
    // const next = useSelector(state => state.Currency.next);
    // const current_page = useSelector(state => state.Currency.current_page);
    // const total_page = useSelector(state => state.Currency.total_page);
    // const active = useSelector(state => state.Currency.active);
    const loading = useSelector(state => state.Currency.loading);
    const error = useSelector(state => state.Currency.error);
    // const [pageSize,setPageSize] = useState(6);

    // const visitPage = (page) => {
    //     dispatch(getCurrency(pageSize,page));
    // };

    // const previous_number = () => {
    //     dispatch(getCurrency(pageSize,previous));
    // };

    // const next_number = () => {
    //     dispatch(getCurrency(pageSize,next));
    // };

    /*
     *   modal handeling
     */
    // const [show, setShow] = useState(false);
    // const onCloseModal = () => setShow(false);
    // const onOpenModal = () => {
    //     setShow(true);
    // }

    /*
    handle form submission
    */
    // const onSubmit = (formData) => {
    //     dispatch(addCurrency(formData));
    //     dispatch(getCurrency(pageSize,1));
    //     onCloseModal();
    // };

    

    // useEffect(()=>{ 
    //     dispatch(getCurrency());
    // },[])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Currency', path: '/app/currency', active: true },
                ]}
                title={'Currency'}
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
                            {/* <Row className="mb-2">
                                <Col sm={4}>
                                    <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{width: '40%'}} onChange={(e)=>{setPageSize(e.target.value);dispatch(getCurrency(e.target.value,current_page))}}>
                                            <option value='6'>6</option>
                                            <option value='10'>10</option>
                                            <option value='15'>15</option>
                                            <option value='20'>20</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        <Button className="btn btn-success mb-2 me-1" onClick={onOpenModal}>
                                        <i className="mdi mdi-plus-circle me-1"></i> Add New
                                        </Button>

                                        
                                    </div>
                                </Col>
                            </Row> */}
                            
                            {loading ? <p>Loading...</p>:
                            <>
                            {currencies?.length > 0 ?
                            <Table
                                columns={columns}
                                data={currencies}
                                pageSize={10}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            :
                            'No currency available!'}</>}
                            {/* <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}
            {/* <CurrencyForm show={show} onHide={onCloseModal} onSubmit={onSubmit} /> */}
            
            
        </>
    );
};

export default Currency;
