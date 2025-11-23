import "../pageStyle/LoginUser.css"
import { useRef } from 'react'
import useLoginUserHooks from "../hooks/useLoginUserHooks"
export default function LoginUser() {
  
      const emailRef =  useRef<HTMLInputElement | null> (null)
      const passwordRef =  useRef<HTMLInputElement | null> (null)
      const {userSubmit} = useLoginUserHooks()

    return (
    <div className="registerWrapper">
      <form className="form-register" action="register-User" onSubmit={(e) => userSubmit(e,emailRef, passwordRef)}>
        <h1>Login</h1>
        <div className="form-row">
          <div className="form-column">

            <div className="field">
              <label>Email</label>
              <input type="email" ref={emailRef} required/>
            </div>

            <div className="field">
              <label>Password</label>
              <input type="password" ref={passwordRef} required/>
            </div>

            <p>Don't have an account? <a href="/registerUser">Sign up!</a></p>
          </div>
        </div>
        <div className="actions">
          <input className="btn primary" type="submit" value="Enter" />
        </div>
      </form>
    </div>
    )
}