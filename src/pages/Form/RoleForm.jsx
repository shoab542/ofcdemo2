import React, { useState,useEffect } from 'react';
import { APICore } from '../../helpers/api/apiCore';

import { Row, Col, Card, Button,Form, Alert } from 'react-bootstrap';
import {useHistory, useLocation} from 'react-router-dom';
// components

import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserRole } from '../../redux/actions';

const api = new APICore();



const RoleForm = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const role = location.state;
    const[permission,setPermission] = useState([]);
    const[error,setError] = useState(null);
    const[role_name,setRoleName] = useState('');
    const[role_permission,setRolePermission] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(role){
            api.updatePatch(`/api/groups/${role.id}/`,{'name':role_name,'permissions':role_permission})
            .then(res=>{
                
                if(res.data.success){
                    dispatch(getUserRole());
                    history.push('/app/roles');
                }else{
                    setError(res.data.error)
                    
                }
                
            })
            .catch(err => {
                setError(err)
            })
        }else{
            api.create(`/api/groups/`,{'name':role_name,'permissions':role_permission})
            .then(res=>{
                
                if(res.data.success){
                    dispatch(getUserRole());
                    history.push('/app/roles');
                }else{
                    setError(res.data.error)
                    
                }
                
            })
            .catch(err => {
                setError(err)
            })
        }
        
    }

    const handleChange = (e) =>{
        const isChecked = e.target.checked;
        
        if(isChecked){
            setRolePermission([...role_permission,e.target.value ]);
            
        }else{
            let index = role_permission.findIndex((x) => x === e.target.value)
            role_permission.splice(index,1)
            setRolePermission([...role_permission])
            
        }
    }

    
    
    useEffect(()=>{
        api.get(`/api/permission`,{})
        .then(res=>{
            setPermission(res.data)
        })
        if (role){
            setRoleName(role?.name)
            const permissions = role?.permissions;
            const permissionsCodeName = permissions.map(permission=>{
                return permission.codename
            })
            setRolePermission(permissionsCodeName)
        }
        
        
    },[])
    
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Roles', path: '/app/roles', active: false },
                    { label: 'Add Role', path: '/app/add_role', active: true },
                ]}
                title={'Add Role'}
            />

            
            <Card>
                <Card.Body>
                    
                    
                    
                        <Form onSubmit={handleSubmit}>
                        {error && (
                            <Alert variant="danger" className="my-2">
                                {error}
                            </Alert>
                        )}
                            <Form.Group  className="mb-3" style={{width: '20%'}}>
                                <Form.Label  >
                                    Role Name
                                </Form.Label>
                                <Form.Control type="text" name="name" value={role_name} placeholder="Enter Role Name"   onChange={(e)=>setRoleName(e.target.value)}  required/>
                            </Form.Group>  

                            <Row>
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Contact</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-4'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='view_contact' checked={role_permission.includes('view_contact')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='add_contact' checked={role_permission.includes('add_contact')} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='change_contact' checked={role_permission.includes('change_contact')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='delete_contact' checked={role_permission.includes('delete_contact')} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Service</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-4'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='view_service' checked={role_permission.includes('view_service')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='add_service' checked={role_permission.includes('add_service')} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='change_service' checked={role_permission.includes('change_service')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='delete_service' checked={role_permission.includes('delete_service')} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Invoice</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-4'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='view_invoice' checked={role_permission.includes('view_invoice')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='add_invoice' checked={role_permission.includes('add_invoice')} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='change_invoice' checked={role_permission.includes('change_invoice')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='delete_invoice' checked={role_permission.includes('delete_invoice')} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Repeating Invoice</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-2'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='view_repeatinginvoice' checked={role_permission.includes('view_repeatinginvoice')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='add_repeatinginvoice' checked={role_permission.includes('add_repeatinginvoice')} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='change_repeatinginvoice' checked={role_permission.includes('change_repeatinginvoice')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='delete_repeatinginvoice' checked={role_permission.includes('delete_repeatinginvoice')} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    
                                
                            </Row>
                            <Row>
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Role</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-2'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='view_group' checked={role_permission.includes('view_group')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='add_group' checked={role_permission.includes('add_group')} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='change_group' checked={role_permission.includes('change_group')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='delete_group' checked={role_permission.includes('delete_group')} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>User</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-2'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='view_user' checked={role_permission.includes('view_user')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='add_user' checked={role_permission.includes('add_user')} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='change_user' checked={role_permission.includes('change_user')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='delete_user' checked={role_permission.includes('delete_user')} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Chart of Account</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-2'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='view_chartofaccount' checked={role_permission.includes('view_chartofaccount')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='add_chartofaccount' checked={role_permission.includes('add_chartofaccount')} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='change_chartofaccount' checked={role_permission.includes('change_chartofaccount')} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='delete_chartofaccount' checked={role_permission.includes('delete_chartofaccount')} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Col></Col>
                                
                            </Row>
                            
                            
                            <Link to='/app/roles'>                           
                            <Button  variant="white" type='button'  style={{width:'15%',marginTop: '20px',marginRight: 5}} >
                                Back
                            </Button> 
                            </Link>
                            <Button  variant="primary" type='submit'  style={{width:'15%',marginTop: '20px'}}>
                                Save
                            </Button> 
                            

                        </Form>
                            
                            
                                                    
                </Card.Body>
            </Card>
                       

            
        </>
    );
};

export default RoleForm;