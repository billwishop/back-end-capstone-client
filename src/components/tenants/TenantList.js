import React, {useContext, useEffect, useState, forwardRef} from 'react'
import {TenantContext} from './TenantProvider.js'
import AddBox from '@material-ui/icons/AddBox';
import {Tenant} from './Tenant.js'

export const TenantList = () => {
    const {tenants, getTenants, postTenant} = useContext(TenantContext)

    useEffect(() => {
        getTenants()
    }, [])
    
    return (
        <div className="tenant--list">
            <h1 className="tenants--header">Tenants</h1>
            <div className="tenants">
                {
                    tenants.map(tenant => <Tenant key={tenant.id} tenant={tenant} />)
                }
            </div>
        </div>
    )
}