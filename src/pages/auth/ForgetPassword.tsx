import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { APICore } from '../../helpers/api/apiCore';

// components
import { VerticalForm, FormInput } from '../../components';

import AuthLayout from './AuthLayout';

const api = new APICore();

interface UserData {
    email: string;
}

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('Back to')}{' '}
                <Link to={'/auth/login'} className="text-muted ms-1">
                    <b>{t('Log in')}</b>
                </Link>
            </p>
        </footer>
    );
};

const ForgetPassword = () => {
    
    const { t } = useTranslation();
    const history = useHistory();
    const[error,setError] = useState(null);

    

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter email')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        try{
            api.create(`/api/password_reset/`,{email:formData['email']})
            .then((res:any)=>{
                  
                history.push({pathname:'/auth/confirm',state:{email:formData['email']}});        
            })
            .catch((err:any) => {
                console.log(err)
            })
        }
        catch(error:any){
            console.log(error)
        }
        
        
        
    };

    return (
        <>
            <AuthLayout bottomLinks={<BottomLink />}>
                <h4 className="mt-0">{t('Recover Password')}</h4>
                <p className="text-muted mb-4">
                    {t("Enter your email address and we'll send you an email with instructions to reset your password")}
                </p>

                

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                
                    <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                        <FormInput
                            label={t('Email')}
                            type="email"
                            name="email"
                            placeholder={t('Enter your email')}
                            containerClass={'mb-3'}
                        />

                        <div className="mb-0 text-center d-grid">
                            <Button variant="primary" type="submit" >
                                {t('Reset Password')}
                            </Button>
                        </div>
                    </VerticalForm>
                
            </AuthLayout>
        </>
    );
};

export default ForgetPassword;
