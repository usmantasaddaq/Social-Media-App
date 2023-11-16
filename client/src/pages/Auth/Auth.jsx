import React, { useEffect, useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getfindAll } from "../../api/UserRequests";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpass: "",
    department: "",
    userType: "teacher"
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [data, setData] = useState(initialState);
  const [loginErrorShow, setLoginErrorShow] = useState('')
  const [signupErrorShow, setSignupErrorShow] = useState('')

  const [confirmPass, setConfirmPass] = useState(true);
  const [confirmPass1, setConfirmPass1] = useState(true);

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleDepartments = async () => {
    const res = await getfindAll()
    setDepartments(res.data)

  };
  // Form Submission
  const handleSubmit = async (e) => {
    setConfirmPass(true);
    e.preventDefault();
    let message = ''
    if (isSignUp) {
      try {
        data.password === data.confirmpass
        ? (
          message = await dispatch(signUp(data, navigate))
          
            
          
        )
        : (
          setConfirmPass(false)
        )
      } finally {
        message.token && setIsSignUp(false)
        setSignupErrorShow(message?.response?.data.message);
      }


    } else {
      const hell = await dispatch(logIn(data, navigate));
      setLoginErrorShow(hell?.response?.data);

      let value = localStorage.getItem("lastname")
      if (value == "wrong password") {
        setConfirmPass1(false);
        localStorage.removeItem("lastname");
      }
    }
  };
  useEffect(() => {
    handleDepartments()
  }, [])


  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>QueryPeer</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          {
            (loginErrorShow !== '' && !isSignUp)?  (<div style={{ color: 'red' }}>
              {
                loginErrorShow
              }
            </div>): null
          }
           {
            (signupErrorShow !== '' &&  isSignUp) ? (<div style={{ color: 'red' }}>
              {
                signupErrorShow
              }
            </div>): null
          }
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
              <select required
                type="text"
                placeholder="User Type"
                className="infoInput"
                name="userType"
                value={data.userType}
                onChange={handleChange}>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>

              </select>
             {
              departments.length > 0 ? 
            ( <select
                type="text"
                placeholder="Department"
                className="infoInput"
                name="department"
                value={data.department}
                onChange={handleChange}>
                {
                  departments.map((val) => (
                    <option value={val.title}>{val.title}</option>
                  ))
                }
              </select>): null}
              {/* <input
                required
                type="text"
                placeholder="Admin Account"
                className="infoInput"
                name="isAdmin"
                value={data.isAdmin}
                onChange={handleChange}
              /> */}
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="email"
              className="infoInput"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>

          {!isSignUp && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
                display: confirmPass1 ? "none" : "block",
              }}
            >
              *Password is incorrect
            </span>
          )}


          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
