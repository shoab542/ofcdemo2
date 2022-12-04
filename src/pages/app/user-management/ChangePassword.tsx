import React,{ useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import { APICore } from '../../../helpers/api/apiCore';
// components
import PageTitle from '../../../components/PageTitle';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/actions';

const api = new APICore();

const ChangePassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const[old_password,setOldPassword] = useState('');
    const[new_password,setNewPassword] = useState('');
    const[confirm_password,setConfirmPassword] = useState('');
    const[error,setError] = useState(null);

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        api.update(`/api/change_password`,{'old_password':old_password,'new_password':new_password})
            .then(res=>{
                
                if(res.data.success){
                    history.push('/auth/logout');
                }else{
                    
                   setError(res.data.error) 
                }
                
            })
            .catch(err => {
                setError(err);
            })
    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'My Profile', path: '/app/my-profile', active: true },
                ]}
                title={'My Profile'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={2}>
                                    <Link to='/app/my-profile'>
                                    <Button variant="white"  style={{width:'100%',fontWeight: '100 !important', textAlign: 'start',marginBottom: '8px',border: 'none'}}>
                                        <FeatherIcon icon="user" size={15} className="me-2"/>My Profile
                                    </Button> 
                                    </Link>

                                    <Link to='/app/change_password'>
                                    <Button variant="primary"  style={{width:'100%',fontWeight: '100 !important', textAlign: 'start'}}>
                                        <FeatherIcon icon="lock" size={15} className="me-2"/>Change Password
                                    </Button> 
                                    </Link>
                                </Col>
                                <Col sm={10} style={{display: 'flex',justifyContent: 'center'}}>
                                    
                                    <Form style={{width: '50%'}} onSubmit={(e)=>handleSubmit(e)}>
                                        {error && (
                                            <Alert variant="danger" className="my-2">
                                                {error}
                                            </Alert>
                                        )}
                                            
                                        <Form.Group  className="mb-3">
                                            <Form.Label  >
                                                Old Password
                                            </Form.Label>
                                            <Form.Control type="password" name="old_password" value={old_password}  placeholder="Enter Old Password"   size='lg' onChange={(e)=>setOldPassword(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group  className="mb-3">
                                            <Form.Label  >
                                                New Password
                                            </Form.Label>
                                            <Form.Control type="password" name="new_password" value={new_password}  placeholder="Enter New Password"   size='lg' onChange={(e)=>setNewPassword(e.target.value)}/>
                                            {new_password.length > 0 && new_password.length < 4 && <p style={{color: 'red'}}>Password must be minimum 4 characters</p>}
                                        </Form.Group>
                                        <Form.Group  className="mb-3">
                                            <Form.Label  >
                                                Confirm Password
                                            </Form.Label>
                                            <Form.Control type="password" name="confirm_password" value={confirm_password}  placeholder="Confirm Password"   size='lg' onChange={(e)=>setConfirmPassword(e.target.value)}/>
                                            {confirm_password.length > 0 && new_password !== confirm_password && <p style={{color: 'red'}}>Password not match</p>}
                                        </Form.Group>                                            
                                            
                                        {old_password.length === 0 || new_password.length < 4 || confirm_password.length < 4 ?
                                        <Button  variant="primary" type='submit'  style={{width:'35%',marginTop: '20px'}} disabled>
                                            Save
                                        </Button> :
                                        <Button  variant="primary" type='submit'  style={{width:'35%',marginTop: '20px'}} >
                                            Save
                                        </Button>}
                                        
                                        

                                    </Form>               
                                </Col>
                            </Row>   
                                      
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ChangePassword;
