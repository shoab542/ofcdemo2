import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import User from './user/reducers';
import Role from './roles/reducers';
import Contact from './contact/reducers';
import Location from './location/reducers';
import Service from './service/reducers';
import Invoice from './invoice/reducers';
import RepeatingInvoice from './repeating-invoice/reducers';
import Currency from './currency/reducers';
import ChartAccount from './chart-account/reducers';


export default combineReducers({
    Auth,
    Layout,
    User,
    Role,
    Contact,
    Location,
    Service,
    Invoice,
    RepeatingInvoice,
    Currency,
    ChartAccount,

    
});
