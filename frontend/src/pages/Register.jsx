import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    licenseNumber: '',
    nationalId: '',
    contactNumber: '',
    email: '',
    homeAddress: '',
    licenseExpiryDate: '',
    password: '',
    password_confirmation: ''
  })

const { firstName, lastName, licenseNumber, nationalId, contactNumber, email, homeAddress, licenseExpiryDate, password, password_confirmation} = formData

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
          id='firstName'
          placeholder="Enter Your First Name" 
          name="firstName" 
          value={firstName} 
          onChange={onChange} 
          />
        </div>
        <div className="form-group">
          <input
          type="text"
          className='form-control'
          id='lastName'
          placeholder="Enter Your Last Name"
          name="lastName"
          value={lastName}
          onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
          type="text"
          className='form-control'
          id='licenseNumber'
          placeholder="Enter Your License Number"
          name="licenseNumber"
          value={licenseNumber}
          onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
          type="text"
          className='form-control'
          id='nationalId'
          placeholder="Enter Your National ID"
          name="nationalId"
          value={nationalId}
          onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
          type="text"
          className='form-control'
          id='contactNumber'
          placeholder="Enter Your Contact Number"
          name="contactNumber"
          value={contactNumber}
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
          type="text"
          className='form-control'
          id='homeAddress'
          placeholder="Enter Your Home Address"
          name="homeAddress"
          value={homeAddress}
          onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
          type="date"
          className='form-control'
          id='licenseExpiryDate'
          placeholder="Enter Your License Expiry Date"
          name="licenseExpiryDate"
          value={licenseExpiryDate}
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
          id='password_confirmation'
          placeholder="Confirm Your Password"
          name="password_confirmation"
          value={password_confirmation}
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