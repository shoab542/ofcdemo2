import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// components
import AuthLayout from './AuthLayout';



/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('2018 - ' + new Date().getFullYear() + ' © UBold theme by')}{' '}
                <Link to="#" className="text-muted">
                    {t('Coderthemes')}
                </Link>
            </p>
        </footer>
    );
};

const PasswordResetSuccess = (state:any) => {
    const { t } = useTranslation();
    return (
        <>
            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="text-center">
                    
                    <h3>{t('Success !')}</h3>
                    <p className="text-muted font-14 mt-2">
                        {t('Password has been Reseted Successfully')}
                        {/* <b>{state.location.state.email} </b> */}
                    </p>
                    <Link to="/auth/login" className="btn w-100 btn-primary waves-effect waves-light mt-3">
                        {t('Back to Home')}{' '}
                    </Link>
                </div>
            </AuthLayout>
        </>
    );
};

export default PasswordResetSuccess;
