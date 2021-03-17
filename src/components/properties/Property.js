import React from 'react'
import {Link} from 'react-router-dom'

export const Property = ({ property }) => {
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
        </section>
    )
}