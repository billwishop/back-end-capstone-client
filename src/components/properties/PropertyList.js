import React, {useContext, useEffect, useState, forwardRef} from 'react'
import {PropertyContext} from './PropertyProvider.js'
import AddBox from '@material-ui/icons/AddBox';
import {Property} from './Property.js'
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import './properties.css'


export const PropertyList = (props) => {
    const {properties, getProperties, postProperty} = useContext(PropertyContext)

    useEffect(() => {
        getProperties()
    }, [])

    return (
        <div className="property--list">
            <div className="property--header">
                <div className="property--label">Properties</div>
                <div className="property--searchAdd">
                    <Input
                        className="search propertySearch"
                        startAdornment={
                            <SearchIcon className="searchIcon icon"/> 
                        }
                        onChange={(e)=> {
                            // searchProperty(e.target.value) 
                            // write provider function and back-end query
                            console.log(e.target.value)
                        }}
                        placeholder={' Search'}
                        autoFocus={true}
                        />
                    <AddBox className="addIcon icon"
                        onClick={()=> {
                            props.history.push("/properties/create")
                        }} />
                </div>
            </div>
            <div className="property">
                {
                    properties.map(property => <Property key={property.id} property={property} />)
                }
            </div>
        </div>
    )
}