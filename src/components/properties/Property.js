import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {PropertyContext} from './PropertyProvider'

export const Property = ({ property }) => {
    const {getSingleProperty, deleteProperty} = useContext(PropertyContext)
    const history = useHistory()
    return (
        <section className="property">
            <h3 className="property--street">
                <Link to={`/properties/${property.id}`}>
                    {property.street}
                </Link>
            </h3>
            <div className="property--city">
                {property.city}, {property.state}, {property.postal_code}
            </div>
            <EditIcon className="editIcon icon" 
                onClick={()=> {
                    getSingleProperty(property.id)
                    .then(history.push(`/properties/edit/${property.id}`))
                }} />
            <DeleteIcon className="deleteIcon icon" 
                onClick={()=> {
                    deleteProperty(property.id)
                }} />
        </section>
    )
}