import React, {useContext, useEffect, useState, forwardRef} from 'react'
import {TenantContext} from './TenantProvider.js'
import AddBox from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import {Tenant} from './Tenant.js'
import './tenant.css'
import { Add } from '@material-ui/icons';

export const TenantList = props => {
    const {tenants, getTenants, searchTenants} = useContext(TenantContext)

    useEffect(() => {
        getTenants()
    }, [])

    return (
        <div className="tenant--list">
            <h1 className="tenants--header">Tenants</h1>
            <SearchIcon className="searchIcon icon"/> 
            <input className="tenants-search" 
                onChange={(e)=> {
                    searchTenants(e.target.value)
                }}
                placeholder={'Search'}/>
            <AddBox className="addIcon icon" 
                onClick={()=> {
                    props.history.push("/tenants/create")
                }} />
            <div className="tenants">
                {
                    tenants.map(tenant => <Tenant key={tenant.id} tenant={tenant} />)
                }
            </div>
        </div>
    )
}