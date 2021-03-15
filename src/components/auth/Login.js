import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

export const Login = props => {
    const email = React.createRef()
    const password = React.createRef()
    const invalidDialog = React.createRef()


    const handleLogin = e => {
        e.preventDefault()

        return fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: email.current.value,
                password: password.current.value
            })
        })
            .then(r => r.json())
            .then(res => {
                if ('valid' in res && res.valid && 'token' in res) {
                    localStorage.setItem('cc_token', res.token)
                    props.history.push('/')
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section style={{
                        textAlign: "center"
                    }}>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Cross Check</h1>
                    <h2>Please sign in</h2>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <div>
                            <input ref={email} type="email" id="email" className="form-control" 
                                placeholder="Email address" required autoFocus />
                        </div>
                        <div>
                            <input ref={password} type="password" id="password" className="form-control" 
                                placeholder="Password" required />
                        </div>
                        <div>
                            <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section className="link--register" style={{
                        textAlign: "center"
                    }}>
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}