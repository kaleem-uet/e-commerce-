import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { registerStart, registerSucess, registerFailure } from '../redux/registerRedux';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled{
    color:green;
    cursor:not-allowed;
  }
`;

const Register = () => {
  const { isFetching, error } = useSelector((state) => state.register);
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch();
const handleClick= async(e)=>{
  e.preventDefault();

  console.log(username,email,password);
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      username: username,
      email: email,
      password: password
    });
    console.log("userdata", res.data);
    
    dispatch(registerSucess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }

}

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="username" type="text" onChange={(e) =>setusername(e.target.value)} />
          <Input placeholder="email" type="email" onChange={(e) =>setemail(e.target.value)} />
          <Input placeholder="password" type="password"  onChange={(e) =>setpassword(e.target.value)} />
          {/* <Input placeholder="confirm password"  /> */}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            <Link to="/login">
            <span style={{color:"blue", fontWeight:"bold"}}> Login </span>
            </Link>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching} >CREATE</Button>
          
        </Form>
        <span>
          {
            !error? "failed to register":""
          }
          </span>
  
      </Wrapper>
    </Container>
  );
};

export default Register;
