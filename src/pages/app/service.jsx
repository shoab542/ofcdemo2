import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import { Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
// components
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getContactService } from '../../redux/actions';



// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const api = new APICore();


// // action column render
// const ActionColumn = withSwal(({ row, swal }) => {
//     /*
//      *   modal handeling
//      */
//     const dispatch = useDispatch();
//     const user_role = useSelector((state)=> state.Role.user_role);
    

//     /*
//     handle form submission
//     */
//     const onSubmit = (formData) => {
        
//         api.updatePatch(`/api/service/${row.original.id}/`,formData)
//         .then(res=>{
            
//             if(res.data.success){
                
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
//                     // dispatch(deleteContact(row.original.id))
//                     api.delete(`/api/service/${row.original.id}/`)
//                 .then(res=>{
                    
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
                    
//                 }
//             })        
//     }

//     return (
//         <>

//             { user_role.includes('change_service') ?
//                 <Link to="#" className="action-icon" >
//                     <i className="mdi mdi-square-edit-outline"></i>
//                 </Link>:
//                 <Link to="#" className="action-icon"  style={{pointerEvents: 'none'}}>
//                     <i className="mdi mdi-square-edit-outline"></i>
//                 </Link>
//             }
            
//             { user_role.includes('delete_service') ?
//                 <Link to="#" className="action-icon" onClick={()=>onDelete()}>
//                     <i className="mdi mdi-delete"></i>
//                 </Link>:
//                 <Link to="#" className="action-icon" style={{pointerEvents: 'none'}}>
//                     <i className="mdi mdi-delete"></i>
//                 </Link>
//             }
            
//         </>
//     );
// });

const columns = [
    
    {
        Header: 'Contact',
        accessor: 'contact_id.name',
        sort: true,
    },
    {
        Header: 'Service Type',
        accessor: 'service_type',
        sort: true,
    },
    {
        Header: 'Contact Mode',
        accessor: 'contact_mode',
        sort: true,
    },
    {
        Header: 'Payment Terms',
        accessor: 'payment_terms',
        sort: true,
    },
    {
        Header: 'Tax Rate',
        accessor: 'tax_rate',
        sort: true,
    },
    {
        Header: 'Unit Price',
        accessor: 'unit_price',
        sort: true,
    },
    
];

const Service = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [contact,setContact] = useState({});
    const services = useSelector(state => state.Service.contact_services);
    // const previous = useSelector(state => state.Service.previous);
    // const next = useSelector(state => state.Service.next);
    // const current_page = useSelector(state => state.Service.current_page);
    // const total_page = useSelector(state => state.Service.total_page);
    // const active = useSelector(state => state.Service.active);
    const user_role = useSelector((state)=> state.Role.user_role);
    const loading = useSelector(state => state.Service.loading);
    const error = useSelector(state => state.Service.error);
    const [pageSize,setPageSize] = useState(10);
    /*
     *   modal handeling
     */
  

    // const visitPage = (page) => {
    //     dispatch(getService(pageSize,page));
    // };

    // const previous_number = () => {
    //     dispatch(getService(pageSize,previous));
    // };

    // const next_number = () => {
    //     dispatch(getService(pageSize,next));
    // };

    /*
    handle form submission
    */
    


    useEffect(()=>{ 
        const state = location.state;
        setContact(state);
        dispatch(getContactService(state.id));   
    },[pageSize])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Service', path: '/app/service', active: false },
                    { label: 'Contact Service', path: '/app/service_by_contact', active: true },
                ]}
                title={`Service of ${contact.name}`}
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
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{width: '40%'}} onChange={(e)=>{setPageSize(e.target.value)}}>
                                            <option value='10'>10</option>
                                            <option value='15'>20</option>
                                            <option value='20'>30</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        { user_role.includes('change_service') ?
                                            <Link className="btn btn-info mb-2 me-1" to={{pathname:'/app/service_form',state: {'services':services,'contactId':contact.id}}}>
                                            <i className="mdi mdi-pencil me-1"></i> Edit
                                            </Link>:
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
                            {services.length > 0 ?
                            <>
                            <Table
                                columns={columns}
                                data={services}
                                pageSize={pageSize}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            {/* <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/> */}
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

export default Service;
