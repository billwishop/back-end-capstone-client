import React, {useContext, useState, useEffect, useRef} from 'react'
import {PropertyContext} from './PropertyProvider'
import {TenantContext} from '../tenants/TenantProvider'

export const LeaseForm = props => {
    const {getSingleProperty, singleProperty, postLease} = useContext(PropertyContext)
    const {tenants, getTenants} = useContext(TenantContext)

    const [lease, setLease] = useState({
        tenant:"",
        lease_start:"",
        lease_end:"",
        rent:""
    })

    const tenant = useRef()
    const lease_start = useRef()
    const lease_end = useRef()
    const rent = useRef()

    // const editMode = props.match.params.hasOwnProperty("lease_id")

    useEffect(() => {
        getTenants()
        .then(getSingleProperty(props.match.params.property_id))
    }, [])


    const handleControlledInputChange = (event) => {
        const newLease = Object.assign({}, lease)          // Create copy
        newLease[event.target.name] = event.target.value    // Modify copy
        setLease(newLease)                                 // Set copy as new state
    }

    const constructLease = () => {
            // POST
            postLease(props.match.params.property_id, {
                tenant: tenant.current.value,
                lease_start: lease_start.current.value,
                lease_end: lease_end.current.value,
                rent: rent.current.value
            })
    }
    console.log(tenants)

    return (
        <form className='Lease--form'>
            <h2>Add Lease</h2>
            <div>
                <select type="text" name="tenant" required autoFocus className="form-control"
                            ref={tenant}
                            onChange={handleControlledInputChange}
                            >
                                <option>Select Tenant</option>
                                {tenants.map(t => {
                                    return (
                                    <option value={t.id} key={t.id}>
                                        {t.full_name}
                                    </option>)
                                })}
                </select>
            </div>
            <div>
                <input type="date" name="lease_start" required autoFocus className="form-control"
                            ref={lease_start}
                            onChange={handleControlledInputChange}
                            />
            </div>
            <div>
            <input type="date" name="lease_end" required autoFocus className="form-control"
                        ref={lease_end}
                        onChange={handleControlledInputChange}
                    />
            </div>
            <div>
            $<input type="text" name="rent" required autoFocus className="form-control"
                        placeholder="Rent" ref={rent}
                        onChange={handleControlledInputChange}
                    />
            </div>
            <button type="cancel"
                onClick={() => {
                    props.history.push(`/properties/${singleProperty.id}`)
                }}
                className="btn btn-primary">
                Cancel
            </button>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructLease()
                    props.history.push(`/properties/${singleProperty.id}`)
                }}
                className="btn btn-primary">
                Save Lease
            </button>
        </form>
    )



    
}