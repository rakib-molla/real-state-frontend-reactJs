import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const {updateUser} = useContext(AuthContext)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    setLoading(true);
    e.preventDefault();
    setError('');
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await apiRequest.post('/auth/login',{
        email,  password
      })

      updateUser(res?.data);
       
       if(res?.data){
        navigate('/profile');
       }

    } catch (err) {
      
      setError(err?.response?.data?.message)
    }finally{
      setLoading(false);
    }

  };
  
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="email" min={3} max={10} type="text" placeholder="Email" />
          <input name="password" min={6} max={10} type="password" placeholder="Password" />
          <button disabled={loading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
