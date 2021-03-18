import React from 'react'
import {Route} from 'react-router-dom'
import { PaymentProvider } from './payments/PaymentProvider'
import { PaymentList } from './payments/PaymentsList'
import { PropertyList } from './properties/PropertyList'
import { PropertyProvider } from './properties/PropertyProvider'
import { TenantList } from './tenants/TenantList'
import { TenantProvider } from './tenants/TenantProvider'
import { TenantForm } from './tenants/TenantForm'

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
                <Route exact path="/tenants/create" render={
                    props => <TenantForm {...props} />
                } />
                <Route exact path="/tenants/edit/:tenant_id(\d+)" render={
                    props => <TenantForm {...props} />
                } />
                <Route path="/tenants" render={
                    props => <TenantList {...props} />
                } />
            </TenantProvider>
            <PropertyProvider>
                <Route exact path="/properties" render={
                    props => <PropertyList {...props} />
                } />
            </PropertyProvider>
        </>
    )
}