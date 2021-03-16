import React from 'react'
import {useState} from 'react'

export const PaymentContext = React.createContext()

export const PaymentProvider = props => {
    const [payments, setPayments] = useState([])
    const [singlePayment, setSinglePayment] = useState([])
    const [paymentTypes, setPaymentTypes] = useState([])
    const [tableTenants, setTableTenants] = useState([])
    
    const getPayments = () => {
        return fetch("http://localhost:8000/payments", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then(setPayments)
    }

    const searchPayments = searchTerm => {
        return fetch(`http://localhost:8000/payments?keyword=${searchTerm}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        // .then(r => r.json())
        .then(r => r.json())
        .then(setPayments)
    }

    const getSinglePayment = id => {
        return fetch(`http://localhost:8000/payments/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then(setSinglePayment)
    } 

    const postPayment = payment => {
        return fetch("http://localhost:8000/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            },
            body: JSON.stringify(payment)
        })
        .then(getPayments)
    }

    const updatePayment = payment => {
        return fetch(`http://localhost:8000/payments/${payment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            },
            body: JSON.stringify(payment)
        })
        .then(getPayments)
    }

    const deletePayment = id => {
        return fetch(`http://localhost:8000/payments/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(getPayments)
    }

    const getPaymentTypes = () => {
        return fetch("http://localhost:8000/paymenttypes", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then((r) => {
            const res = JSON.parse(r)
            setPaymentTypes(res)})
    }

    const getTableTenants = () => {
        return fetch("http://localhost:8000/tenants?table=true", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then((r) => {
            const res = JSON.parse(r)
            setTableTenants(res)})
        // .then(r => r.json())
        // .then(setTableTenants)
    }

    return (
        <PaymentContext.Provider value={{payments, setPayments, singlePayment, setSinglePayment,
                                            getPayments, searchPayments, getSinglePayment, 
                                            postPayment, updatePayment, deletePayment,
                                            paymentTypes, getPaymentTypes, getTableTenants, tableTenants}}>
            {props.children}
        </PaymentContext.Provider>
    )
}