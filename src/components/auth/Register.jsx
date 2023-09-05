import "../../custom.scss"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useState } from "react";
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async() => {
    if (userName != null && password != null) {
      const newUser = await registerUser(userName, password);
      navigate("/login");
      console.log(newUser);
    }

  }
  return (

    <div className='validation_form'>
        <InputGroup hasValidation>
        <InputGroup.Text>User</InputGroup.Text>
        <Form.Control onChange={(e) => {
          setUserName(e.target.value);
          //console.log(userName);

        }} type="text" required isInvalid />
        <Form.Control.Feedback type="invalid">
            Please choose a username.
        </Form.Control.Feedback>

        <InputGroup.Text>Password</InputGroup.Text>
        <Form.Control onChange={(e) => {
          setPassword(e.target.value);
        }} type="password" required isInvalid />
        <Form.Control.Feedback type="invalid">
            Please choose a password.
        </Form.Control.Feedback>


        </InputGroup>
        <button className="submit_button" onClick={()=> {
          login();
        }}>Submit</button>

    </div>


  );
}
