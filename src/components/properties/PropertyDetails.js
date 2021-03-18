import React, {useContext, useEffect, useState, forwardRef} from 'react'
import {PropertyContext} from './PropertyProvider.js'
import AddBox from '@material-ui/icons/AddBox';
import {Property} from './Property.js'
import { Add } from '@material-ui/icons';
import { Lease } from './Lease.js';

export const PropertyDetails = props => {
    const {singleProperty, getSingleProperty} = useContext(PropertyContext)
    const [activeLeases, setLease] = useState([])
    const [inactiveLeases, setInactiveLeases] = useState([])

    useEffect(() => {
        getSingleProperty(parseInt(props.match.params.property_id))
    },[])

    useEffect(() => {
        if (Object.keys(singleProperty).length > 0) { 
        const findLease = singleProperty.lease.filter(l => l.active === true)
        setLease(findLease)
        const findInactiveLeases = singleProperty.lease.filter(l => l.active === false)
        setInactiveLeases(findInactiveLeases)}
    }, [singleProperty])

    return (
        <section className="property--details">
            <h1 className="property--header">{singleProperty.street}</h1>
            <h3>{singleProperty.city}, {singleProperty.state}, {singleProperty.postal_code}</h3>
            <div className="lease--add">
                Add Lease Agreement 
                <Add className="addIcon icon"
                    onClick={()=>{
                        props.history.push(`/properties/${props.match.params.property_id}/lease`)
                    }} />
            </div>
            {Object.keys(singleProperty).length>0&&
            <div className="lease--current">
                {activeLeases.length > 1 ? <h3>Current Leases</h3> :<h3>Current Lease:</h3>}
                {activeLeases.length > 0
                ? activeLeases.map(l => <Lease key={l.id} lease={l} propertyId={l.id} />)   
                : <div>No active leases to display.</div>
                }
            </div>}
            {Object.keys(singleProperty).length>0&&
            <div className="lease--inactive">
                {inactiveLeases.length > 1 ? <h3>Inactive Leases</h3> :<h3>Inactive Lease:</h3>}
                {inactiveLeases.length > 0
                ? inactiveLeases.map(l => <Lease key={l.id} lease={l} propertyId={l.id} />)   
                : <div>No inactive leases to display.</div>
                }
            </div>}

        </section>
    )
}