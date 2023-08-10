import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

const {firstname, lastname, email, password, passwordConfirm} = formData

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
        <FaUser /> Register
      </h1>
      <p>Create your account</p>
    </section>

    <secction className="form">
      <form>
        <div className="form-group">
          <input 
          type="text" 
          className='form-control'
          id='firstname'
          placeholder="Enter Your First Name" 
          name="firstname" 
          value={firstname} 
          onChange={onChange} 
          />
        </div>
        <div className="form-group">
          <input
          type="text"
          className='form-control'
          id='lastname'
          placeholder="Enter Your Last Name"
          name="lastname"
          value={lastname}
          onChange={onChange}
          />
        </div>
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
        <div className="form-group">
          <input
          type="password"
          className='form-control'
          id='passwordConfirm'
          placeholder="Confirm Your Password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-block">Register</button>
      </form>
    </secction>
  </>
)
}

export default Register;