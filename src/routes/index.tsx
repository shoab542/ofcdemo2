import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Contact from '../pages/app/Contact';
import ContactDetails from '../pages/app/ContactDetails';

import ChangePassword from '../pages/app/user-management/ChangePassword';
import RoleForm from '../pages/Form/RoleForm';
import PasswordReset from '../pages/auth/PasswordReset';
import PasswordResetSuccess from '../pages/auth/PasswordResetSuccess';

// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';
import Service from '../pages/app/service';
import ServiceForm from '../pages/Form/ServiceForm';
import ContactCard from '../pages/app/ContactCard';
import Invoice from '../pages/app/invoice';
import InvoiceForm from '../pages/Form/InvoiceForm';
import InvoiceDetails from '../pages/app/InvoiceDetails';
import RepeatingInvoiceDetails from '../pages/app/RepeatingInvoiceDetails';
import RepeatingInvoiceForm from '../pages/Form/RepeatingInvoiceForm';
import RepeatingInvoice from '../pages/app/RepeatingInvoice';
import PublicInvoice from '../pages/app/PublicInvoice';
import CompanySettings from '../pages/app/CompanySettings';
import ChartOfAccount from '../pages/app/ChartOfAccount';
import Currency from '../pages/app/Currency';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Register = React.lazy(() => import('../pages/auth/Register'));

  
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

//apps
const MyProfile = React.lazy(() => import('../pages/app/user-management/MyProfile'));
const Users = React.lazy(() => import('../pages/app/user-management/Users'));
const Role = React.lazy(() => import('../pages/app/user-management/Role'));



//others
const SearchResults = React.lazy(() => import('../pages/other/SearchResults/'));
const Error404Alt = React.lazy(() => import('../pages/error/Error404Alt'));
const Error500Two = React.lazy(() => import('../pages/error/Error500Two'));




export interface RoutesProps {
    path: RouteProps['path'];
    name?: string;
    component?: RouteProps['component'];
    route?: any;
    exact?: RouteProps['exact'];
    icon?: string;
    header?: string;
    roles?: string[];
    children?: RoutesProps[];
}

// root routes
const rootRoute: RoutesProps = {
    path: '/',
    exact: true,
    component: () => <Root />,
    route: Route,
};

// dashboards
const dashboardRoutes: RoutesProps = {
    path: '/dashboard',
    name: 'Dashboards',
    component: Dashboard,
    route: PrivateRoute,
};

//apps
const AppRoutes = {
    path: '/app',
    name: 'App',
    route: PrivateRoute,
    
    children: [
        
        {
            path: '/app/my-profile',
            name: 'My Profile',
            component: MyProfile,
            route: PrivateRoute,
        },
        {
            path: '/app/change_password',
            name: 'Change Password',
            component: ChangePassword,
            route: PrivateRoute,
        },
        {
            path: '/app/add_role',
            name: 'Add Role',
            component: RoleForm,
            route: PrivateRoute,
        },
        {
            path: '/app/users',
            name: 'Users',
            component: Users,
            route: PrivateRoute,
        },
        {
            path: '/app/roles',
            name: 'Roles',
            component: Role,
            route: PrivateRoute,
        },
        {
            path: '/app/contact',
            name: 'Contact',
            component: Contact,
            route: PrivateRoute,
        },
        {
            path: '/app/contact_details',
            name: 'Contact Details',
            component: ContactDetails,
            route: PrivateRoute,
        },
        {
            path: '/app/service',
            name: 'Service',
            component: ServiceForm,
            route: PrivateRoute,
        },
        {
            path: '/app/service_by_contact',
            name: 'Service',
            component: Service,
            route: PrivateRoute,
        },
        {
            path: '/app/service_form',
            name: 'Service Form',
            component: ServiceForm,
            route: PrivateRoute,
        },
        {
            path: '/app/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
        },
        {
            path: '/app/invoice_form',
            name: 'Invoice Form',
            component: InvoiceForm,
            route: PrivateRoute,
        },
        {
            path: '/app/repeating_invoice',
            name: 'Repeating Invoice',
            component: RepeatingInvoice,
            route: PrivateRoute,
        },
        {
            path: '/app/repeating_invoice_form',
            name: 'Repeating Invoice Form',
            component: RepeatingInvoiceForm,
            route: PrivateRoute,
        },
        {
            path: '/app/invoice_details',
            name: 'Invoice Details',
            component: InvoiceDetails,
            route: PrivateRoute,
        },
        
        {
            path: '/app/repeating_invoice_details',
            name: 'Repeating Invoice Details',
            component: RepeatingInvoiceDetails,
            route: PrivateRoute,
        },
        {
            path: '/app/company_settings',
            name: 'Company Settings',
            component: CompanySettings,
            route: PrivateRoute,
        },
        {
            path: '/app/chart_of_accounts',
            name: 'Chart Of Account',
            component: ChartOfAccount,
            route: PrivateRoute,
         },
         {
            path: '/app/currency',
            name: 'Currency',
            component: Currency,
            route: PrivateRoute,
        },
        
        
    ],
};

// pages
const extrapagesRoutes = {
    path: '/pages',
    name: 'Pages',
    children: [
        
        {
            path: '/pages/serach-results',
            name: 'Search Results',
            component: SearchResults,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-404-alt',
            name: 'Error - 404-alt',
            component: Error404Alt,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-500',
            name: 'Error - 500',
            component: Error500Two,
            route: PrivateRoute,
        }
    ],
};


// auth
const authRoutes: RoutesProps[] = [
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/public_invoice',
        name: 'public invoice',
        component: PublicInvoice,
        route: Route,
    },
    // {
    //     path: '/auth/register',
    //     name: 'Register',
    //     component: Register,
    //     route: Route,
    // },
    {
        path: '/auth/confirm',
        name: 'Confirm',
        component: Confirm,
        route: Route,
    },
    {
        path: '/auth/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/auth/password_reset',
        name: 'Password Reset',
        component: PasswordReset,
        route: Route,
    },
    {
        path: '/auth/password_reset_success',
        name: 'Forget Password',
        component: PasswordResetSuccess,
        route: Route,
    },
    
    
];



// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
    let flatRoutes: RoutesProps[] = [];

    routes = routes || [];
    routes.forEach((item: RoutesProps) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes,extrapagesRoutes,AppRoutes];
const publicRoutes = [...authRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
