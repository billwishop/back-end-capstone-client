import React from 'react'
import {Link} from 'react-router-dom'
import './Register.css'

export const Register = props => {
    const email = React.createRef()
    const password = React.createRef()
    const verifyPassword = React.createRef()
    const passwordDialog = React.createRef()

    const handleRegister = e => {
        e.preventDefault()
        
        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "email": email.current.value,
                "password": password.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })

                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("cc_token", res.token)
                        props.history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{textAlign: "center"}}>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <div>
                        <input ref={email} type="email" name="email" className="form-control"
                            placeholder="Email address" required />
                    </div>
                    <div>
                        <input ref={password} type="password" name="password" className="form-control"
                            placeholder="Password" required />
                    </div>
                    <div>
                        <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control"
                            placeholder="Verify Password" required />
                    </div>
                    <div>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </div>
                </fieldset>
            </form>
            <section className="link--login" style={{
                        textAlign: "center"
                    }}>
                <Link to="/login">Already registered?</Link>
            </section>
        </main>
    )
}