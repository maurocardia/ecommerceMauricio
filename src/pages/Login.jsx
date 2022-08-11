import axios from 'axios';
import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { useForm,  } from "react-hook-form"
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const submit=(data)=>{
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login",data)
        .then(res=>{
            navigate("/")
            localStorage.setItem('token',res.data.data.token)
        })
        .catch(error =>{
            if(error.response.status===404){
                alert("user Invalid")
            }
            console.log(error.response)
        })
        reset({
            email:"",
            password:""
        })
    }
    return (
        <div>
            <h1>login</h1>

            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            </div>


            );
};

            export default Login;