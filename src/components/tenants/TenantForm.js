import React, {useContext, useState, useEffect, useRef} from 'react'
import {TenantContext} from './TenantProvider'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export const TenantForm = props => {
    const {singleTenant, getSingleTenant, setSingleTenant, updateTenant, postTenant} = useContext(TenantContext)

    // State variable to control when the modal will appear
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        // <form className='tenant--form'>
        //     <h2>{editMode ? "Update Tenant" : "Add Tenant"}</h2>
        //     <div>
        //         <input type="text" name="full_name" required autoFocus className="form-control"
        //                     placeholder="Tenant name" ref={full_name}
        //                     defaultValue={editMode ?singleTenant.full_name :tenant.full_name}
        //                     onChange={handleControlledInputChange}
        //                     />
        //     </div>
        //     <div>
        //     <input type="text" name="phone_number" required autoFocus className="form-control"
        //                 placeholder="Phone number" ref={phone_number}
        //                 defaultValue={editMode ?singleTenant.phone_number :tenant.phone_number}
        //                 onChange={handleControlledInputChange}
        //             />
        //     </div>
        //     <div>
        //     <input type="text" name="email" required autoFocus className="form-control"
        //                 placeholder="Email" ref={email}
        //                 defaultValue={editMode ?singleTenant.email :tenant.email}
        //                 onChange={handleControlledInputChange}
        //             />
        //     </div>
        //     <button type="cancel"
        //         onClick={evt => {
        //             props.history.push("/tenants")
        //             setSingleTenant({})
        //         }}
        //         className="btn btn-primary">
        //         Cancel
        //     </button>
        //     <button type="submit"
        //         onClick={evt => {
        //             evt.preventDefault()
        //             constructTenant()
        //             props.history.push("/tenants")
        //         }}
        //         className="btn btn-primary">
        //         {editMode ? "Save Updates" : "Add Tenant"}
        //     </button>
        // </form>
        <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle id="form-dialog-title">{editMode ? "Update Tenant" : "Add Tenant"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            name="full_name"
            ref={full_name}
            fullWidth
            defaultValue={editMode ?singleTenant.full_name :tenant.full_name}
            onChange={handleControlledInputChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            name="phone_number"
            name={phone_number}
            fullWidth
            defaultValue={editMode ?singleTenant.phone_number :tenant.phone_number}
            onChange={handleControlledInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            name="email"
            ref={email}
            fullWidth
            defaultValue={editMode ?singleTenant.email :tenant.email}
            onChange={handleControlledInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
              props.history.push("/tenants")
          }} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
          {editMode ? "Save Updates" : "Add Tenant"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )



    
}