import React, { useEffect , useState} from 'react';
import { Button, Alert, Form, Container} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Controller } from 'react-hook-form';
import LockIcon from '@mui/icons-material/Lock';

import LockOpenIcon from '@mui/icons-material/LockOpen';
//Form

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Footer from '../../layouts/Footer';



// actions
import { resetAuth, loginUser } from '../../redux/actions';

// store
import { RootState, AppDispatch } from '../../redux/store';

import { useQuery } from '../../hooks';

// components
import { VerticalForm, FormInput } from '../../components';

import AuthLayout from './AuthLayout';


import CCL_Logo from '../../assets/images/ccl.jpg';
import Goog from '../../assets/images/companies/google.png';
import Face from '../../assets/images/companies/facebook.png';



interface UserData {
    email: string;
    password: string;
}

  

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            {/* <p className="text-muted">
                {t("Don't have an account?")}{' '}
                <Link to={'/auth/register'} className="text-muted ms-1">
                    <b>{t('Sign Up')}</b>
                </Link>
            </p> */}
        </footer>
    );
};



const Login = () => {
    
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const { user } = useSelector((state: RootState) => ({
    //     user: state.Auth.user,
    // }));


    const query = useQuery();
    const next = query.get('next');

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, userLoggedIn, user, error } = useSelector((state: RootState) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

  

   
    /*
     * handle form submission
     */
    const onSubmit = (e:any) => {
        e.preventDefault();
        dispatch(loginUser(email,password));
        console.log(email, password);
    };

    const showPasswordHandler =() => {
        setShowPassword(!showPassword);
    }
    
    return (
        <>
            {userLoggedIn || user ? <Redirect to={next ? next : '/'}></Redirect> : null}
         
            
            <AuthLayout bottomLinks={<BottomLink />}>
            
                <div className='d-flex '>
                <h4 className="mt-0 me-2 loginp">{t('Have an Account?')} </h4>
                <a className='loginp' style={{color: "#174778"}} href='/'>Sign Up?</a>
                </div>
                <h1 className="loginh mb-2">Welcome to CCL</h1>

                <p className="loginp mb-4">{t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id at')} <br/> {t('penatibus at sagittis. Elit fermentum, sit odio ullamcorper')} <br/> {t(' lectus facilisis cras vitae. ')}</p>
                
                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                
                   <Link to="/" className="logo logo-dark text-center outline-none">
                                        <span className="logo-lg mb-2">
                                            <img src={CCL_Logo} alt="" height="210px" />
                                        </span>
                                    </Link>

                                    <Link to="/" className="logo logo-light text-center ">
                                        <span className="logo-lg mb-2">
                                            <img src={CCL_Logo} alt="" height="88px" />
                                        </span>
                                    </Link>

                {/* <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                >
                    <FormInput{showPassword ? <VisibilityOff /> : <Visibility />  }
                        label={t('Email')}
                        type="text"
                        name="email"
                        placeholder={t('Enter your Email')}
                        containerClass={'mb-3'}
                    />
                    <FormInput 
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}
                    >
                        <Link to="/auth/forget-password" className="text-muted float-end">
                            <small>{t('Forgot your password?')}</small>
                        </Link>
                    </FormInput>


                    <FormInput label="Remember me" type="checkbox" name="checkbox" containerClass={'mb-3'} />

                    <div className="d-grid mb-0 text-center">
                        <Button style={{"background":'#00a551', 'border':'none'}} type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                    
                </VerticalForm> */}
                
            <form className="form" onSubmit={(e)=>onSubmit(e)} >
             <div className="in" style={{background: "transparent !important"}}>
              <label htmlFor="E-mail">E-mail</label>
              <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter your email number"/>
                <MailOutlineIcon/>
              </div>
              <div className="in" style={{marginBottom: "20px",background: "transparent !important"}} >
              <label htmlFor="E-mail">Password</label>
              <input  onChange={(e)=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
              { showPassword ?
                <LockOpenIcon onClick={()=>setShowPassword(false)}/>:
                <LockIcon onClick={()=>setShowPassword(true)}/>
              
                }
              </div>
              <FormInput label="Remember me" type="checkbox" name="checkbox" containerClass={'mb-3'} />
              <button type="submit" disabled={loading}>
                            {t('Log In')}
                        </button>
            </form>
   
        <div className='d-flex  mt-3  '>
       <img src={Goog} style={{height: "26px" , width: "26px", marginLeft: "150px", marginRight:"20px"}}/>
        <img src={Face} style={{height: "21px" , width: "21px",marginRight: "auto", borderRadius: "3px"}}/>
        </div>
      
            </AuthLayout>
            <Footer/>
        </>
    );
};

export default Login;
