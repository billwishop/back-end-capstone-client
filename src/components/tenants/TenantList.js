import React, {useContext, useEffect, useState, forwardRef} from 'react'
import {TenantContext} from './TenantProvider.js'
import AddBox from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import {Tenant} from './Tenant.js'
import './tenant.css'

export const TenantList = () => {
    const {tenants, getTenants, postTenant, searchTenants} = useContext(TenantContext)

    useEffect(() => {
        getTenants()
    }, [])
    // const icon = {
    //     forwardRef((props, ref) => <Search {...props} ref={ref} />)
    // };
    return (
        <div className="tenant--list">
            <h1 className="tenants--header">Tenants</h1>
             <SearchIcon />
            <input className="tenants-search" 
                onChange={(e)=> {
                    searchTenants(e.target.value)
                }}
                placeholder={'Search'}/>
            <div className="tenants">
                {
                    tenants.map(tenant => <Tenant key={tenant.id} tenant={tenant} />)
                }
            </div>
        </div>
    )
}