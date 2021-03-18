import React, {useContext, useState, useEffect, useRef} from 'react'
import {TenantContext} from './TenantProvider'

export const TenantForm = props => {
    const {singleTenant, getSingleTenant, setSingleTenant, updateTenant, postTenant} = useContext(TenantContext)

    // for edit mode - a new tenant will be constructed 
    // and set before being passed into updateTenant()
    const [tenant, setTenant] = useState({
        phone_number:"",
        email:"",
        full_name:""
    })

    const full_name = useRef()
    const phone_number = useRef()
    const email = useRef()

    const editMode = props.match.params.hasOwnProperty("tenant_id")

    useEffect(() => {
        if (editMode){
            getSingleTenant(parseInt(props.match.params.tenant_id))
        }
    }, [])


    const handleControlledInputChange = (event) => {
        const newTenant = Object.assign({}, tenant)          // Create copy
        newTenant[event.target.name] = event.target.value    // Modify copy
        setTenant(newTenant)                                 // Set copy as new state
    }

    const constructTenant = () => {
        if (editMode) {
            // PUT
            updateTenant({
                id: singleTenant.id,
                phone_number: phone_number.current.value,
                email: email.current.value,
                full_name: full_name.current.value
            }) .then(setSingleTenant({}))
        } else {
            // POST
            postTenant({
                phone_number: tenant.phone_number,
                email: tenant.email,
                full_name: tenant.full_name
            })
        }
    }

    return (
        <form className='tenant--form'>
            <h2>{editMode ? "Update Tenant" : "Add Tenant"}</h2>
            <div>
                <input type="text" name="full_name" required autoFocus className="form-control"
                            placeholder="Tenant name" ref={full_name}
                            defaultValue={editMode ?singleTenant.full_name :tenant.full_name}
                            onChange={handleControlledInputChange}
                            />
            </div>
            <div>
            <input type="text" name="phone_number" required autoFocus className="form-control"
                        placeholder="Phone number" ref={phone_number}
                        defaultValue={editMode ?singleTenant.phone_number :tenant.phone_number}
                        onChange={handleControlledInputChange}
                    />
            </div>
            <div>
            <input type="text" name="email" required autoFocus className="form-control"
                        placeholder="Email" ref={email}
                        defaultValue={editMode ?singleTenant.email :tenant.email}
                        onChange={handleControlledInputChange}
                    />
            </div>
            <button type="cancel"
                onClick={evt => {
                    props.history.push("/tenants")
                    setSingleTenant({})
                }}
                className="btn btn-primary">
                Cancel
            </button>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructTenant()
                    props.history.push("/tenants")
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Add Tenant"}
            </button>
            {/* {editMode ? ""
                :<button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructTenant()
                    props.history.push("/tenants/create")
                }}
                className="btn btn-primary">
                Save + Add Another
            </button>} */}
        </form>
    )



    
}