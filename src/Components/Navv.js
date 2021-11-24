import React from 'react'
import { Box } from '@mui/system'
import { AppBar, IconButton, Toolbar,Typography } from '@mui/material'
import {Link} from 'react-router-dom';
import './Nav.css'
export const Navv = (props) => {
    return (
       <>
          <Box sx={{flexGrow:1}}>
                   <AppBar position="static">
                       <Toolbar className='tools'>
                           <IconButton size="large" >
                            <span className='dash'>Dashboard</span>
                           </IconButton>&nbsp; &nbsp;&nbsp; &nbsp;
                           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                             <Link to='/home' style={{textDecoration:'none',color:'black'}} >Home</Link> &nbsp; &nbsp;&nbsp; &nbsp;
                             
                             
                             
                            </Typography>
                       </Toolbar>
                   </AppBar>
                </Box> 
       
        </>
      
    )
}
