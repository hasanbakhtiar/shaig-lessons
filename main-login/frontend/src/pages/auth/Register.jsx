
import axios from 'axios';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const registerForm = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/register', {
      fullname: fullnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }).then(res => console.log(res)
    ).catch(err => console.log(err))
  }

  return (
    <>
      <div className="d-flex align-items-center justify-conent-center flex-column">
        <h2 className="my-5 alert alert-success col-3 text-center">Register</h2>
        <div className="col-3">
          <form onSubmit={registerForm}>

            <div className="mb-3">
              <label className="form-label">Fullname</label>
              <input type="text" className="form-control" ref={fullnameRef} />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" ref={emailRef} />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" ref={passwordRef} />
            </div>

            <button type="submit" className="btn btn-warning">Register</button>
            <br />
            <Link to="/"> Login now</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register