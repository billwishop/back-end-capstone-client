import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {PropertyContext} from './PropertyProvider'

export const Lease = ({lease, propertyId}) => {
    const {deleteLease} = useContext(PropertyContext)
    return (
        <div className="lease--card">
            <div className="lease-dates">Date range: {lease.lease_start} - {lease.lease_end}</div>
            <div className="lease-rent">Rent: ${lease.rent}</div>
            <div className="lease-tenant">
                Tenant: <Link to={`/tenants/${lease.tenant.id}`}>
                        {lease.tenant.full_name}
                        </Link>
            </div>
            <DeleteIcon className="deleteIcon icon"
                onClick={()=> {
                    deleteLease(propertyId, lease.id)
                }} />
        </div>
    )
}