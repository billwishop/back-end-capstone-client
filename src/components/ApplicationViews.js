import React from 'react'
import {Route} from 'react-router-dom'
import { PaymentProvider } from './payments/PaymentProvider'
import { PaymentList } from './payments/PaymentsList'
import { TenantList } from './tenants/TenantList'
import { TenantProvider } from './tenants/TenantProvider'

export const ApplicationViews = () => {
    return (
        <>
            <PaymentProvider>
                <Route exact path="/" render={
                    props => <PaymentList {...props} />
                } />
                {/* <Route exact path="/payments/new">
                    <PaymentList />
                </Route> */}
            </PaymentProvider>
            <TenantProvider>
                <Route exact path="/tenants" render={
                    props => <TenantList {...props} />
                } />
            </TenantProvider>
        </>
    )
}