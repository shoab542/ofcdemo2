import React,{ useEffect, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { APICore } from '../../helpers/api/apiCore';
// components
import PageTitle from '../../components/PageTitle';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from './AuthLayout';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';

const api = new APICore();

const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            {/* <p className="text-muted">
                {t("Don't have an account?")}{' '}
                <Link to={'#'} className="text-muted ms-1">
                    <b>{t('Sign Up')}</b>
                </Link>
            </p> */}
        </footer>
    );
};

const PasswordReset = (props:any) => {
    const history = useHistory();
    const[new_password,setNewPassword] = useState('');
    const[confirm_password,setConfirmPassword] = useState('');
    const[error,setError] = useState(null);
    const { t } = useTranslation();
    
    const qString = queryString.parse(props.location.search);
    
    const handleSubmit = (e:any) =>{
        e.preventDefault();
        try{
            api.create(`/api/password_reset/confirm/`,{'token':qString.token,'password':new_password})
            .then((res:any)=>{
                
                history.push('/auth/password_reset_success');        
            })
            .catch(err => {
                setError(err)
            })
        }
        catch(error:any){
            setError(error);
        }
        
    }
    return (
        <AuthLayout bottomLinks={<BottomLink />}>
                <div className="">
                    
                    <h3>{t('Reset your password')}</h3>
                    <Form  onSubmit={(e)=>handleSubmit(e)}>
                                        {error && (
                                            <Alert variant="danger" className="my-2">
                                                {error}
                                            </Alert>
                                        )}
                                            
                                       
                                        <Form.Group  className="mb-3">
                                            <Form.Label  >
                                                New Password
                                            </Form.Label>
                                            <Form.Control type="password" name="new_password" value={new_password}  placeholder="Enter New Password"   size='lg' onChange={(e)=>setNewPassword(e.target.value)} required/>
                                            
                                        </Form.Group>
                                        <Form.Group  className="mb-3">
                                            <Form.Label  >
                                                Confirm Password
                                            </Form.Label>
                                            <Form.Control type="password" name="confirm_password" value={confirm_password}  placeholder="Confirm Password"   size='lg' onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                                            {confirm_password.length > 0 && new_password !== confirm_password && <p style={{color: 'red'}}>Password not match</p>}
                                        </Form.Group>                                            
                                            
                                        <div className='d-flex justify-content-between'>
                                            {new_password !== confirm_password ?
                                            <Button  variant="primary" type='submit'  style={{width:'40%',marginTop: '20px'}} disabled>
                                                Save
                                            </Button> :
                                            <Button  variant="primary" type='submit'  style={{width:'40%',marginTop: '20px'}} >
                                                Save
                                            </Button>}
                                            <Link to="/auth/login" className="btn btn-primary waves-effect waves-light" style={{width:'40%',marginTop: '20px'}}>
                                                {t('Back to Home')}{' '}
                                            </Link>
                                        </div>
                                        
                                        
                                        

                                    </Form>               
                    
                </div>
            </AuthLayout>
    );
};

export default PasswordReset;
