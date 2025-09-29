
import axios from "axios";
import { useRef, useState } from "react";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const formSubmited = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/v1/login', {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }, {
      headers: {
        'fynode-access': 'd832767809bb1a62ceb8168aa4c18072',
      }
    }).then(res => console.log(res.data.data.token))
  }
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <h1 className="my-5">Login form</h1>
      <div className="col-5">
        < form onSubmit={formSubmited}>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" ref={emailRef} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" ref={passwordRef} />
          </div>
          <button type="submit" className="btn btn-warning">Login</button>
        </form>
      </div >
    </div >
  )
}

export default Login
