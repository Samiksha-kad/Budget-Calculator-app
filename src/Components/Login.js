import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import SocialButton from './SocialButton'
const URL = "http://localhost:3001/calci"
var mailformat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
var passformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const bcrypt = require('bcryptjs') //encryption
export const Login = () => {
    const navigate = useNavigate()// to navigate to other page
    const [values, setValues] = useState({
        email: "",//input field
        password: ""//input field
    })

    const [login, setlogin] = useState([])//to take data of values and push in json and local storage
    const [login1, setlogin1] = useState({})//to take data of values and push in json and local storage
    const [flag, setflag] = useState(false)//for login 
    const [errors, setErrors] = useState({})//for errors

    const [isSubmit, setisSubmit] = useState(false)//to check errors

    const handler = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })//to take values from input field
    }

    const handleSocialLogin =async (user) => {
        // console.log(user);
        // console.log(login);
        let temp = []
       await axios.get(URL)
            .then(res => {
                try{
                    debugger
                    console.log("res.data",res.data);
                    temp = [...res.data]
                    // setlogin([...res.data);
                    setlogin(JSON.parse(JSON.stringify(res.data)))
                    setlogin1(res.data[0])
                    console.log("login1",login1)

                }
                catch(e){
                    console.log("error",e)
                }
            })
            console.log("login",login);
            console.log("temp",temp);
            // setlogin([...temp])
            // console.log("login",login);
       
        
        let userlogin= temp.find(x=>x.email===user._profile.email)
        let userIndex = temp.indexOf(userlogin)
        // console.log("userlogin:",userlogin)
        console.log("userIndex:",userIndex)
        //userindex = -1 new login in else 

        if(userIndex +1){//+1
            console.log("in if")
            localStorage.setItem('mycart',JSON.stringify(temp[userIndex]));
            setflag(true)//1
        }
        else{
            //0 (-1+1)
            
            console.log('in else')
            let formData = {
                fname: user._profile.firstName,
                lname: user._profile.lastName,
                uername: user._profile.id,
                email: user._profile.email,
                password: 'socialLogin',
                totalbudget:0,
                balance:0,
                budget:[]
              };
              axios.post(URL,formData)
            localStorage.setItem('mycart',JSON.stringify(formData));
            
            setflag(true)
        }
        
};

const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
//   const refresh = () => {
//         axios.get(URL)
//             .then(res => {
//                 console.log("refres",res.data)
//                 setlogin(res.data)
//             })
//     }

    const submit = (event) => {
        event.preventDefault();
        setErrors(validate(values))
        setisSubmit(true)
        var data = false;
        // refresh()

        login.forEach(user => {
            const doesPasswordMatch = bcrypt.compareSync(values.password, user.password)//gives boolean value
            console.log(values.password, doesPasswordMatch);
            console.log(values.email,values.password)
            if (user.email === values.email && doesPasswordMatch) {
                let arr = user
                if (localStorage.getItem('mycart') !== undefined) {
                    localStorage.setItem('mycart', JSON.stringify(arr))
                }

                alert('login succesfully');
                setflag(true)

                data = true;
                return

            }

        });
        if (data !== true) {
            alert('Email id or password is incorrect');
            setflag(false)
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.email) {
            errors.email = "Email required";
        }
        else if (!mailformat.test(values.email)) {
            errors.email = "invalid email";
        }

        if (!values.password) {
            errors.password = "password required"; 
        }
        else if (!passformat.test(values.password)) {
            errors.password = "invalid password";
        }

        return errors;


    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            console.log("values in errors use effect:",values)
        }
    }, [errors])
    return (
        <div>
            <div className="section">
                <div className="contentBx1">
                    <div className="formBx1">
                        <h2>Login</h2>
                        <form >
                            <div className="inputBx1">
                                <span>Email</span>
                                <input
                                    type="email"
                                    placeholder="Email "
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={values.email}
                                    onChange={handler}
                                ></input>
                                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                            </div>
                            <div className="inputBx1">
                                <span>Password</span>
                                <input
                                    type="password"
                                    placeholder="password "
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    value={values.password}
                                    onChange={handler}
                                ></input>
                                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                            </div>

                            <div className="inputBx1">
                                <button type="submit" value="submit"
                                    id="submit" onClick={submit}>Log in</button>
                                <br></br>

                            </div>

                            <div className="inputBx">
                                Don't have account?
                                <Link to='/register' style={{ color: '#c91e63' }} >Sign up</Link>
                            </div>

                        </form>
                        <h3 className="heading12">Login with social media</h3>
                        <SocialButton 
                                provider="google"
                                appId="494171520829-7trpf6tldvrf2shq6ucfcsbums8difqn.apps.googleusercontent.com"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                                
                                style={{
                                    color:"white",
                                    padding:"5px",                            
                                    borderRadius:"20px",
                                    backgroundColor:"#f13684"
                                    }}>
                              
                                  
                                Continue With Google
                                </SocialButton>
                       
                    </div>
                </div>
                <div className="imgBx1">
                    <img src="bg.jpg" alt="bg"></img>
                </div>
            </div>



            {flag ? navigate('/home') : null}
        </div>
    )
}


