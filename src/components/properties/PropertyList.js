import React, {useContext, useEffect, useState, forwardRef} from 'react'
import {PropertyContext} from './PropertyProvider.js'
import AddBox from '@material-ui/icons/AddBox';
import {Property} from './Property.js'

export const PropertyList = () => {
    const {properties, getProperties, postProperty} = useContext(PropertyContext)

    useEffect(() => {
        getProperties()
    }, [])

    return (
        <div className="property--list">
            <h1 className="properties--header">Properties</h1>
            <div className="properties">
                {
                    properties.map(property => <Property key={property.id} property={property} />)
                }
            </div>
        </div>
    )
}