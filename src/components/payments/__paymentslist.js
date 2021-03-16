// import React, {useContext, useEffect, useState, forwardRef} from 'react'
// import {PaymentContext} from './PaymentProvider.js'
// import MaterialTable from "material-table"
// import { Link, useHistory } from "react-router-dom"
// import AddBox from '@material-ui/icons/AddBox';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
// import Clear from '@material-ui/icons/Clear';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';
// import Edit from '@material-ui/icons/Edit';
// import FilterList from '@material-ui/icons/FilterList';
// import FirstPage from '@material-ui/icons/FirstPage';
// import LastPage from '@material-ui/icons/LastPage';
// import Remove from '@material-ui/icons/Remove';
// import SaveAlt from '@material-ui/icons/SaveAlt';
// import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';
// import { CakeSharp } from '@material-ui/icons';

// export const PaymentList = () => {
//     const history = useHistory()
//     const [pt_object, setPT] = useState({})
//     const [data, setData] = useState([])
//     const [columns, setColumns] = useState([])
//     const {payments, paymentTypes, getPaymentTypes, singlePayment, getPayments, searchPayments, getSinglePayment, 
//         postPayment, updatePayment, deletePayment} = useContext(PaymentContext)
    
//     useEffect(() => {
//         getPayments()
//         .then(getPaymentTypes)
//         .then(() => {
//             // placing the id as keys and the label as values in an object
//             // to be passed to the table
//             const id_label_obj = {}
//         for (const pt of paymentTypes) {
//             id_label_obj[pt.id] = pt.label
//         }
//         console.log(Object.keys(id_label_obj).length)
//         setPT(id_label_obj)
        
//         })
//     }, [])

//     console.log(paymentTypes)


//     useEffect(() => {
//         setData(payments.map(p => (
//             {
//                 date: p.date,
//                 full_name: <Link to={`/tenants/${p.tenant.id}`}>{p.tenant.full_name}</Link>,
//                 amount: '$'+p.amount,
//                 ref_num: p.ref_num,
//                 type: p.payment_type.id
//             }
//             )))
//     }, [payments])

//     useEffect(() => {
//         const newColumns = [
//             {title: 'Date', field: 'date'},
//             {title: 'Name', field: 'full_name'},
//             {title: 'Payment', field: 'amount'},
//             {title: 'Ref #', field: 'ref_num'},
//             {title: 'Type', field: 'type', lookup: pt_object,}
//         ]
//         setColumns(newColumns)
//     }, [pt_object])

//     console.log(pt_object)
//     console.log(typeof paymentTypes)


    

//     const tableIcons = {
//         Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//         Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//         Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//         Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//         DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//         Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//         Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//         Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//         FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//         LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//         NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//         PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
//         ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//         Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//         SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//         ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//         ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
//     };

    


//     return (
//         <div className="payment--list">
//             <MaterialTable title="Payments" 
//                 columns={columns}
//                 data={data}
//                 icons={tableIcons}
//                 editable={{
//                     onRowAdd: payment => 

//                         console.log(payment)

                    
//                 }}
//                 />
//         </div>
//     )
    
    
// }