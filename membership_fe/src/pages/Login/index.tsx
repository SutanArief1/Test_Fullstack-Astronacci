import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import "./index.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface GoogleJwtPayload {
  email: string;
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  console.log(formData, 'formData');

  const navigate = useNavigate();

  const handleLoginByEmail = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", formData);
      console.log(response, 'response');
      

      if (response && response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/");
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleGoogleLoginSuccess = async (response: any) => {
    const token = response.credential;
  
    const decodedToken = jwtDecode<GoogleJwtPayload>(token);
  
    const email = decodedToken.email;
  
    try {
      const dbResponse = await axios.get(`http://localhost:3000/users/email/${email}`);
  
      const userFromDb = dbResponse.data;
  
      const combinedUserProfile = {
        ...decodedToken,
        role: userFromDb.role,
        otherInfo: userFromDb.otherInfo,
      };
  
      console.log("Combined User Profile:", combinedUserProfile);
  
      localStorage.setItem("access_token", token);
      localStorage.setItem("user_profile", JSON.stringify(combinedUserProfile));
      navigate("/");
    } catch (error) {
      console.error("Error fetching user from database:", error);
    }
  };

  const handleFacebookLogin = async (response: any) => {
    try {
      const res = await axios.post('http://localhost:3000/auth/facebook-login', {
        accessToken: response.accessToken,
      });
  
      if (res.data) {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('user_profile', JSON.stringify(res.data.user));
        navigate('/');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoginByEmail();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className="bg-slate-300 flex justify-center items-center h-screen">
      <div className="border p-10 w-1/4 rounded-lg bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <p className="text-5xl font-bold mb-8">Login</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div className="form_input-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="Email" id="email" name="email" placeholder="Email" onChange={handleInputChange} className="input-label" />
            </div>
            <div className="form_input-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" name="password" placeholder="Password" onChange={handleInputChange} className="input-label" />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg mt-4 mb-2 w-full">Login</button>
          <p className="mb-5">Don't have an account yet? <a href="/register" className="text-blue-500">Create account</a></p>
          <p className="my-3 text-center">--- or ---</p>
          <div className="flex flex-col gap-4">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <FacebookLogin
              appId="1125848248480823"
              onSuccess={handleFacebookLogin}
              onFail={(error) => {
                console.log('Login Failed!', error);
              }}
              onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
              }}
              style={{
                backgroundColor: '#4267b2',
                color: '#fff',
                fontSize: '16px',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '4px',
              }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login