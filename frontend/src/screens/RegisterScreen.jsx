import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [licenseExpiryDate, setLicenseExpiryDate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
    };

  return (
    <FormContainer>
        <h1>Driver Registration</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='firstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='lastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='licenseNumber'>
                <Form.Label>License Number</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your license number'
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='nationalId'>
                <Form.Label>National ID</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your national ID (e.g 123456/10/1)'
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='contactNumber'>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your contact number (e.g 0977123456)'
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='homeAddress'>
                <Form.Label>Home Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your home address'
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='licenseExpiryDate'>
                <Form.Label>License Expiry Date</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter License Expiration Date'
                    value={licenseExpiryDate}
                    onChange={(e) => setLicenseExpiryDate(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-2'>
                Register
            </Button>

            <Row className='py-3'>
                <Col>
                    Already Registered? <Link to='/login'>Sign in</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen;