import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Tenant = ({ tenant }) => {
    // state variable to hold active lease to display current address
    const [home, setHome] = useState(null)
    
    
    useEffect(() => {
        // determines if the tenant has an associated property
        // if so, the property is found and set to be used in the jsx return
        if (tenant.rented_property != null) {
            const leased_property = tenant.rented_property.find(home => home.active=true)
            setHome(leased_property)
        } 
    }, [tenant])
    
    return (

        <section className="tenant">
            <h3 className="tenant--name">
                <Link to={`/tenants/${tenant.id}`}>
                    { tenant.full_name }
                </Link>
            </h3>
            <div className="tenant--phone">
                { tenant.phone_number }
            </div>
            <div className="tenant--email">
                { tenant.email }
            </div>
            {home != null &&
            <div className="tenant--address">
                <Link to={`/properties/${home.rented_property.id}`}>
                    { home.rented_property.street }
                </Link>
            </div>}
        </section>
        )
}