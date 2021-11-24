import React, { useState, useEffect } from 'react'
import './Register.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
var mailformat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
var passformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const bcrypt = require('bcryptjs')
const URL = "http://localhost:3001/calci"
export const Register = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        fname: "",
        lname: "",
        username: "",
        email: "",
        password: "",
        confpassword: ''
    })

    const [errors, setErrors] = useState({})

    const [isSubmit, setisSubmit] = useState(false)

    const handler = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })
    }

    const submit = (event) => {
        event.preventDefault();
        setErrors(null)
        //setErrors(validate(values))
        let tempe=validate(values)
        console.log(errors)
        console.log(tempe.length)
        //alert("Regsitered Successfully")
        if(tempe.length===0){
            console.log("hii")
            alert("Regsitered Successfully")
       setisSubmit(true)
        const hashPass = bcrypt.hashSync(values.password, bcrypt.genSaltSync());
           if (isSubmit) {
                
                let formData = { password: hashPass, email: values.email, fname: values.fname, lname: values.lname, username: values.username,balance:0,totalbudget:0,budget: [] };
                axios.post(URL,formData)
                alert("Regsitered Successfully")
                axios.get(URL)
                .then(res=>console.log(res.data))
                navigate('/')
                
            }
        }
           
        }
    

    const validate = (values) => {
        const e =[];
        const err={};
       // console.log(errors)
        if (!values.fname) {
            e.push({fname:"first name required"})
            err.fname = "first name required";
        }
        if (!values.lname) {
            e.push({lname:"Last name require"})
             err.lname = "Last name required";
        }
        if (!values.username) {
            e.push({name:"Last name require"})
           err.username = "username  required";
        }
        if (!values.email) {
            e.push({email:"Last name require"})
            err.email = "Email required";
        }
        else if (!mailformat.test(values.email)) {
            e.push({email:"Last name require"})
            err.email = "invalid email";
        }

        if (!values.password) {
            e.push({password:"Last name require"})
            err.password = "password required";
        }
        else if (!passformat.test(values.password)) {
            e.push({password:"Last name require"})
            err.password = "invalid password";
        }
        if (!values.confpassword) {
            e.push({confpassword:"Last name require"})
            err.confpassword = "confpassword required";
        }
        else if (values.password !== values.confpassword) {
            e.push({confpassword:"Last name require"})
            err.confpassword = "password and confpassword must be the same"
        }
        setErrors(err)
        console.log(err)
        return e;


    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            console.log(values)
        }
    }, [errors])
    return (
        <section className="container-fluid Forms">
            <div className="imgBx">
                <img src="bg1.jpeg" alt="bg"></img>
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <h2>Sign Up</h2>
                    <form onSubmit={submit}>
                        <div className="inputBx">
                            <span htmlFor="inputName" className="form-label"> First Name</span>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="fname"
                                id="fname"
                                className="form-control"
                                value={values.fname}
                                onChange={handler}
                            ></input>
                            {errors.fname && <p style={{ color: 'red' }}>{errors.fname}</p>}
                        </div>
                        <div className="inputBx">
                            <span htmlFor="inputLastName" className="form-label">Last Name</span>
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lname"
                                id="lname"
                                className="form-control"
                                value={values.lname}
                                onChange={handler}
                            ></input>
                            {errors.lname && <p style={{ color: 'red' }}>{errors.lname}</p>}

                        </div>

                        <div className="inputBx">
                            <span htmlFor="inputUserName" className="form-label">User Name</span>
                            <input
                                type="text"
                                placeholder="UserName "
                                name="username"
                                className="form-control"
                                id="username"
                                value={values.username}
                                onChange={handler}
                            ></input>
                            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}


                        </div>
                        <div className="inputBx">
                            <span htmlFor="inputEmail4" className="form-label">Email</span>
                            <input
                                type="email"
                                placeholder="Email "
                                name="email"
                                className="form-control"
                                id="email"
                                value={values.email}
                                onChange={handler}
                            ></input>
                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                        </div>
                        <div className="inputBx">
                            <span htmlFor="inputPassword4" className="form-label">Password</span>
                            <input
                                type="password"
                                placeholder="password "
                                name="password"
                                id="password"
                                className="form-control"
                                value={values.password}
                                onChange={handler}
                            ></input>
                            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                        </div>
                        <div className="inputBx">
                            <span htmlFor="Cpass" className="form-label">Confirm Password</span>
                            <input
                                type="password"
                                placeholder="Confirm password "
                                className="form-control"
                                name="confpassword"
                                id="confpassword"
                                value={values.confpassword}
                                onChange={handler}
                            ></input>
                            {errors.confpassword && <p style={{ color: 'red' }}>{errors.confpassword}</p>}

                        </div>


                        <div className="remember">
                            <input className="form-check-input" type="checkbox" id="gridCheck" />
                            <span htmlFor="gridCheck">
                                I agree with all Terms and Conditions.
                            </span>
                        </div>

                        <div className="inputBx">

                         <button type="submit" value="submit"
                                id="submit" >Sign up</button>
                            <br></br>
                            Already Register?

                            <p> <Link to='/' style={{ color: '#c91e63' }} >Log in</Link></p>

                        </div>
                    </form>
                </div>
            </div>
        </section>





    )
}