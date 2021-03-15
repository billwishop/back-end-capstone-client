import React from 'react'
import {Route} from 'react-router-dom'
import { PaymentProvider } from './payments/PaymentProvider'
import { PaymentList } from './payments/PaymentsList'

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
        </>
    )
}