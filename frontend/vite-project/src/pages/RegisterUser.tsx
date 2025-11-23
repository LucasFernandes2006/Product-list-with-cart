import "../pageStyle/RegisterUser.css"
import { useRef } from 'react'
import useRegisterUserHooks from "../hooks/useRegisterUserHooks"

export default function RegisterUser() {

    
      const nameRef =  useRef<HTMLInputElement | null> (null)
      const emailRef =  useRef<HTMLInputElement | null> (null)
      const dateRef =  useRef<HTMLInputElement | null> (null)
      const passwordRef =  useRef<HTMLInputElement | null> (null)
     const {userSubmit} = useRegisterUserHooks()

    return (
    <div className="registerWrapper">
      <form className="form-register" action="register-User" onSubmit={(e) => userSubmit(e, nameRef, emailRef, dateRef, passwordRef)}>
        <p className="arrow-left"><a href="/">&larr;</a></p>
        <h1>Register</h1>
        <div className="form-row">
          <div className="form-column">
            <div className="field">
              <label>Name</label>
              <input type="text" ref={nameRef} required/>
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" ref={emailRef} required/>
            </div>
            <div className="field">
              <label>Date of birth</label>
              <input type="date" ref={dateRef} required/>
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" ref={passwordRef} required/>
            </div>
          </div>
        </div>
        <div className="actions">
          <input className="btn primary" type="submit" value="Create Account" />
        </div>
      </form>
    </div>
    )
}