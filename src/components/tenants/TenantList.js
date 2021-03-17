import React, {useContext, useEffect, useState, forwardRef} from 'react'
import {TenantContext} from './TenantProvider.js'
import { Link, useHistory } from "react-router-dom"
import AddBox from '@material-ui/icons/AddBox';
import {Tenant} from './Tenant.js'

export const TenantList = () => {
    const history = useHistory()
    const {tenants, getTenants, postTenant} = useContext(TenantContext)

    // Fetches tenants and sets the state variable in the provider
    useEffect(() => {
        getTenants()
    }, [])
    
    return (
        <div className="tenant--list">
            <div className="tenants">
                {
                    tenants.map(tenant => <Tenant key={tenant.id} tenant={tenant} />)
                }
            </div>
        </div>
    )
}