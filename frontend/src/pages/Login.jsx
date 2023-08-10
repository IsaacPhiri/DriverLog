import { useState } from 'react'
import { FaUser } from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Login
        </h1>
        <p>Sign into your account</p>
      </section>

      <secction className="form">
        <form>
          <div className="form-group">
            <input
              type="email"
              className='form-control'
              id='email'
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className='form-control'
              id='password'
              placeholder="Enter Your Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-block">Login</button>
        </form>
      </secction>
    </>
  )
}

export default Login;