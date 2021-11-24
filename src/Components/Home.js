import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './Dashboard.css'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router';
import { Navv } from './Navv';

import { Box, Grid, styled, Paper, Table, TextField, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import { Card, CardGroup } from 'react-bootstrap';

const regForName = RegExp(/^[a-zA-Z]/);
export const Home = () => {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const budgetRef = useRef(0)//budget value
    const TitleRef = useRef('')//title value
    const AmountRef = useRef(0)//amount value

    const [data, setData] = useState({});
    const [userdata, setuserdata] = useState([]);//to pass array of title and amount
    const [index, setindex] = useState(0);

    const [budgetdisplay, setbudgetdisplay] = useState(0)
    const [expensesdisplay, setexpensesdisplay] = useState(0)
    const [balance, setbalance] = useState(0)

    const [toggleBtn, settoggleBtn] = useState(true)

    const add = () => {//adding through budget
        const user = JSON.parse(localStorage.getItem('mycart'))
        const bud = parseFloat(budgetRef.current.value);
        if (bud > 0) {
            user.totalbudget = parseFloat(user.totalbudget + bud)
            user.balance = user.balance + bud
            localStorage.setItem('mycart', JSON.stringify(user))
            budgetRef.current.value = ""
        }
        else {
            alert("Budget Should be more than Zero")
        }
        refresh()
    }

    const AddExpense = () => {
        const user = JSON.parse(localStorage.getItem('mycart'))
        const usertitle = TitleRef.current.value
        const useramount = parseFloat(AmountRef.current.value)
        if (usertitle != null && regForName.test(usertitle)) {
            const saving = expensesdisplay + useramount
            console.log(expensesdisplay,saving,useramount,user.balance,budgetdisplay)
            if (useramount > 0) {
                if (saving <= budgetdisplay) {
                    const expense = { title: usertitle, amount: useramount }
                    user.budget = [...user.budget, expense]

                    localStorage.setItem('mycart', JSON.stringify(user))
                    TitleRef.current.value = ""
                    AmountRef.current.value = ""
                }
                else {
                    alert('balance is less')
                }


            }
            else {
                alert("Budget Should be more than Zero")
            }
        }
        else {
            alert("Please enter correct title")
        }
        refresh()
    }

    const deletes = (index) => {
        const user = JSON.parse(localStorage.getItem('mycart'))
        const bool = window.confirm("Do You really want to delele this?")
        if (bool === true) {
            user.budget.splice(index, 1)
            // setData({ ...user });
            localStorage.setItem('mycart', JSON.stringify(user));

        }
        const user1 = JSON.parse(localStorage.getItem('mycart'))
        const userd = user1.budget
        setuserdata([...userd])
        refresh()
    }
    useEffect(() => {
        if (localStorage.getItem('mycart') !== undefined) {
            console.log('samiksha')
            refresh()
        }
    }, [])

    const refresh = () => {

        const user1 = JSON.parse(localStorage.getItem('mycart'))
        const userd = user1.budget //array
        setuserdata([...userd])
        setbudgetdisplay(user1.totalbudget)
        let exp = 0
        user1.budget.map(ele =>
            exp = ele.amount + parseFloat(exp)
        )
        user1.balance = user1.totalbudget - exp
        setexpensesdisplay(exp)
        setbalance(user1.totalbudget - exp)
        localStorage.setItem('mycart', JSON.stringify(user1))


    }




    const update = (index, ele) => {//table
        console.log(ele)

        TitleRef.current.value = ele.title
        AmountRef.current.value = ele.amount
        settoggleBtn(false)
        setindex(index)
    }

    const updatedata = () => {//on edit
        let user = JSON.parse(localStorage.getItem('mycart'));
        let temp = user.budget
        console.log(temp)
        temp[index].title = TitleRef.current.value
        temp[index].amount = parseInt(AmountRef.current.value)
        console.log(temp)
        user.budget = temp
        settoggleBtn(true)

        localStorage.setItem('mycart', JSON.stringify(user))
        setuserdata([...user.budget])
        TitleRef.current.value = null
        AmountRef.current.value = null
        refresh()

    }

    const logout = () => {
        let data = JSON.parse(localStorage.getItem('mycart'))
        console.log(data,"login")
        axios.put(`http://localhost:3001/calci/${data.id}`, data)
        localStorage.removeItem('mycart');

    }

    return (
        <>

            {localStorage.getItem('mycart') === undefined &&
                <Navigate to="/"></Navigate>}
            <div>
                <Navv />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    height: 600,
                                    borderRadius: '10px',
                                },
                            }}
                        >
                            <Item>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} style={{ marginTop: '50px' }}>
                                        <Grid>
                                            <h4> Budget Details</h4>
                                            <TextField
                                                type="number"

                                                inputRef={budgetRef}
                                                label="Enter Budget"

                                            ></TextField>

                                            <Button
                                                type="submit"
                                                fullWidth
                                                value="Add"
                                                variant="contained"
                                                onClick={add}
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Add
                                            </Button>
                                        </Grid>
                                        <h4> Details</h4>



                                        <TextField
                                            autoComplete="given-name"
                                            required
                                            type="text"
                                            fullWidth
                                            inputRef={TitleRef}
                                            label="Enter your Expense Title here.."
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            className="head"
                                            type="number"
                                            fullWidth
                                            inputRef={AmountRef}
                                        
                                            label="Enter your Expense Amount here.."
                                        ></TextField>
                                    </Grid>
                                </Grid>
                                <br />
                                {
                                    toggleBtn ?
                                        <Button
                                            type="submit"
                                            fullWidth
                                            value="Add"
                                            variant="contained"
                                            onClick={AddExpense}
                                            sx={{ mt: 3, mb: 2 }}
                                        >

                                            Add
                                        </Button>
                                        :
                                        <Button
                                            type="submit"
                                            fullWidth
                                            value="Edit"
                                            variant="contained"
                                            onClick={updatedata}
                                            sx={{ mt: 3, mb: 2 }}
                                        >

                                            Edit
                                        </Button>

                                }
                            </Item>
                        </Grid>
                        <Grid item xs={9}>
                            <Item>


                                <h4 className='head'>
                                    Welcome {JSON.parse(localStorage.getItem('mycart')).fname} ({JSON.parse(localStorage.getItem('mycart')).email} ) </h4>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        '& > :not(style)': {
                                            m: 1,
                                            width: 1000,
                                            borderRadius: '10px',
                                        },
                                    }}
                                >

                                    <Paper elevation={0} />
                                    <Paper />
                                    <Paper elevation={10} style={{ backgroundColor: 'white' }}>
                                        <h4 style={{padding:"10px" }} >Category Details</h4>
                                        <CardGroup>
                                            <Card>

                                                <Card.Body>
                                                    <Card.Title>BUDGET</Card.Title>
                                                    <Card.Img variant="top"
                                                        src="budget.jfif" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

                                                    <Card.Text>
                                                        <h1 style={{ color: 'green' }}>
                                                            
                                                            $ {budgetdisplay}</h1>

                                                    </Card.Text>
                                                </Card.Body>

                                            </Card>
                                            <Card>

                                                <Card.Body>
                                                    <Card.Title>EXPENSES</Card.Title>
                                                    <Card.Img variant="top"
                                                        src="expences.jfif" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

                                                    <Card.Text>
                                                        <h1 style={{ color: 'green' }}>
                                                            $ {expensesdisplay}</h1>

                                                    </Card.Text>
                                                </Card.Body>

                                            </Card>
                                            <Card>

                                                <Card.Body>
                                                    <Card.Title>BALANCE</Card.Title>
                                                    <Card.Img variant="top" src="balance.jfif" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

                                                    <Card.Text>
                                                        <h1 style={{ color: 'green' }}>
                                                            $ {balance}</h1>
                                                    </Card.Text>
                                                </Card.Body>

                                            </Card>
                                        </CardGroup>



                                        <TableContainer component={Paper} className="container" style={{ marginTop: '20px', padding: '10px' }}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow style={{ background: '#007acc' }}>
                                                        <TableCell>ID</TableCell>
                                                        <TableCell align="right">Expense Title</TableCell>
                                                        <TableCell align="right">Expense Value</TableCell>
                                                        <TableCell align="right"> Action </TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {userdata.length ?
                                                        userdata.map((exp, index) =>
                                                            <TableRow
                                                                key={index}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                style={{ background: '#ccebff' }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {index}
                                                                </TableCell>
                                                                <TableCell align="right">{exp.title}</TableCell>
                                                                <TableCell align="right">{exp.amount}</TableCell>
                                                                <TableCell align="right">
                                                                    <button className="btn btn-danger" onClick={() => { deletes(index) }}>Delete</button> &nbsp;
                                                                    <button className="btn btn-warning text-white" onClick={() => { update(index, exp) }}>Update</button>


                                                                </TableCell>

                                                            </TableRow>
                                                        )
                                                        :
                                                        <p>No Task</p>}

                                                </TableBody>

                                            </Table>

                                        </TableContainer>



                                    </Paper>

                                </Box>
                            </Item>
                            <Item>

                                <Link to="/"><button className="logout" onClick={logout}>Logout </button></Link>

                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>






        </>
    )
}
