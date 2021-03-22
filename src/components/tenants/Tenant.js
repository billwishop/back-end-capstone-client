import React, { useEffect, useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {TenantContext} from './TenantProvider'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export const Tenant = ({ tenant }) => {
    const {getSingleTenant, deleteTenant} = useContext(TenantContext)
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    // state variable to hold active lease to display current address
    const [home, setHome] = useState(null)

    const history = useHistory()
    
    useEffect(() => {
        // determines if the tenant has an associated property
        // if so, the property is found and set to be used in the jsx return
        if (tenant.rented_property != null) {
            const leased_property = tenant.rented_property.find(home => home.active=true)
            setHome(leased_property)
        } 
    }, [tenant])

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            padding: '1em',
            backgroundColor: '#E0E0E0',
            boxShadow: '0px 5px 15px rgba(0,0,0,0.2)'
        },
        title: {
            fontSize: 14,
            paddingLeft: '1em'
        },
        pos: {
            paddingLeft: '1em'
        },
        pos2: {
            paddingLeft: '1em',
            marginTop: '15px'
        },
        options: {
            marginTop: '0'
        }
    });

    const classes = useStyles()
    
    return (

    <Card className={`card ${classes.root}`} variant='outlined'>
        <CardHeader
            title={
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    <Link to={`/tenants/${tenant.id}`}>
                        { tenant.full_name }
                    </Link>
                </Typography>
            }
            action={
                <IconButton aria-label="settings">
                <MoreVertIcon onClick={(e)=>{
                    setExpanded(!expanded)
                }}/>

                {/* <div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <EditIcon className={`editIcon icon ${classes.pos2}`}   
                onClick={()=> {
                getSingleTenant(tenant.id)
                .then(history.push(`/tenants/edit/${tenant.id}`))
                }} />
                <DeleteIcon className={`deleteIcon icon ${classes.pos2}`}  
                onClick={()=> {
                deleteTenant(tenant.id)
                }} />
                </Collapse> 
                </div> */}
                </IconButton>
            }
        />
        <div className='tenant--options'>
            <div>
            <Typography className={classes.pos} component='h2'>
                { tenant.phone_number }
            </Typography>
            <Typography className={classes.pos}>
                { tenant.email }
            </Typography>
            </div>
            <div className={classes.options}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <EditIcon className={`editIcon icon ${classes.pos2}`}   
                    onClick={()=> {
                    getSingleTenant(tenant.id)
                    .then(history.push(`/tenants/edit/${tenant.id}`))
                    }} />
                    <DeleteIcon className={`deleteIcon icon ${classes.pos2}`}  
                    onClick={()=> {
                    deleteTenant(tenant.id)
                    }} />
                    </Collapse> 
            </div>
        </div>
        <Divider className={classes.pos2} />
        {home != null 
                ?   
                    <Typography className={classes.pos2}>
                        <Link to={`/properties/${home.rented_property.id}`}>
                            { home.rented_property.street }
                        </Link>
                    </Typography>
                :   
                    <Typography className={classes.pos2}>
                        <div>No associated properties</div>
                    </Typography>
                }

        {/* <EditIcon className={`editIcon icon ${classes.pos2}`}   
            onClick={()=> {
                getSingleTenant(tenant.id)
                .then(history.push(`/tenants/edit/${tenant.id}`))
            }} />
        <DeleteIcon className={`deleteIcon icon ${classes.pos2}`}  
            onClick={()=> {
                deleteTenant(tenant.id)
            }} /> */}
        
        {/* <CardActions disableSpacing>
            <IconButton
                className='icon expandIcon'
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
        </CardActions> */}

    </Card>
        )
}