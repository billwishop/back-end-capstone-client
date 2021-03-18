import React, {useContext, useState, useEffect, useRef} from 'react'
import {PropertyContext} from './PropertyProvider'

export const PropertyForm = props => {
    const {properties, singleProperty, getProperties, getSingleProperty,
        updateProperty, deleteProperty, postProperty, setSingleProperty} = useContext(PropertyContext)
    
    const [property, setProperty] = useState({
        street:"",
        city:"",
        state:"",
        postal_code:""
    })

    const street = useRef()
    const city = useRef()
    const state = useRef()
    const postal_code = useRef()
    
    const editMode = props.match.params.hasOwnProperty("property_id")

    useEffect(() => {
        if (editMode){
            getSingleProperty(parseInt(props.match.params.property_id))
        }
    }, [])

    const handleControlledInputChange = (event) => {
        const newProperty = Object.assign({}, property)          // Create copy
        newProperty[event.target.name] = event.target.value    // Modify copy
        setProperty(newProperty)                                 // Set copy as new state
    }

    const constructProperty = () => {
        if (editMode) {
            // PUT
            updateProperty({
                id: singleProperty.id,
                street: street.current.value,
                city: city.current.value,
                state: state.current.value,
                postal_code: postal_code.current.value
            }) .then(setSingleProperty({}))
        } else {
            // POST
            postProperty({
                street: property.street,
                city: property.city,
                state: property.state,
                postal_code: property.postal_code
            })
        }
    }


    return (
        <form className='property--form'>
            <h2>{editMode ? "Update Property" : "Add Property"}</h2>
            <div>
                <input type="text" name="street" required autoFocus className="form-control"
                            placeholder="Street" ref={street}
                            defaultValue={editMode ?singleProperty.street :property.street}
                            onChange={handleControlledInputChange}
                            />
            </div>
            <div>
            <input type="text" name="city" required autoFocus className="form-control"
                        placeholder="City" ref={city}
                        defaultValue={editMode ?singleProperty.city :property.city}
                        onChange={handleControlledInputChange}
                    />
            </div>
            <div>
            <input type="text" name="state" required autoFocus className="form-control"
                        placeholder="State" ref={state}
                        defaultValue={editMode ?singleProperty.state :property.state}
                        onChange={handleControlledInputChange}
                    />
            </div>
            <div>
            <input type="text" name="postal_code" required autoFocus className="form-control"
                        placeholder="Postal Code" ref={postal_code}
                        defaultValue={editMode ?singleProperty.postal_code :property.postal_code}
                        onChange={handleControlledInputChange}
                    />
            </div>
            <button type="cancel"
                onClick={() => {
                    props.history.push("/properties")
                    setSingleProperty({})
                }}
                className="btn btn-primary">
                Cancel
            </button>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructProperty()
                    props.history.push("/properties")
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Add Property"}
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