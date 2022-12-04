import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import userSaga from './user/saga';
import roleSaga from './roles/saga';
import contactSaga from './contact/saga';
import locationSaga from './location/saga';
import serviceSaga from './service/saga';
import invoiceSaga from './invoice/saga';
import repeatingInvoiceSaga from './repeating-invoice/saga';
import currencySaga from './currency/saga';
import chartAccountSaga from './chart-account/saga';



export default function* rootSaga() {
    yield all([authSaga(), layoutSaga(), userSaga(),roleSaga(),contactSaga(),locationSaga(),serviceSaga(),invoiceSaga(),currencySaga(),chartAccountSaga(),repeatingInvoiceSaga()]);
}
