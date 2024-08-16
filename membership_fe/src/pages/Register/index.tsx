import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "Bronze",
  })

  console.log(formData), 'formData';
  

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users", formData)

      return {
        success: true,
        message: response.data.message,
        data: response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setFormData({
        ...formData,
        role: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleRegister()
    navigate('/login')
  }

  return (
    <div className="bg-slate-300 flex justify-center items-center h-screen">
      <div className="border p-10 w-1/4 rounded-lg bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <p className="text-5xl font-bold mb-8">Register</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="form_input-group">
              <label htmlFor="fullname" className="form-label">Fullname</label>
              <input type="text" id="fullname" name="fullname" placeholder="Fullname" onChange={handleInputChange} className="input-label" />
            </div>
            <div className="form_input-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" name="email" placeholder="Email" onChange={handleInputChange} className="input-label" />
            </div>
            <div className="form_input-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" name="password" placeholder="Password" onChange={handleInputChange} className="input-label" />
            </div>
            <div className="form_input-group">
              <label className="form-label">Choose Role</label>
              <div className="flex gap-2 items-center">
                <input type="radio" id="bronze" name="role" value="bronze" className="input-label mx-2" onChange={handleInputChange} defaultChecked />
                <label htmlFor="bronze">Bronze</label>
              </div>
              <div className="flex gap-2 items-center">
                <input type="radio" id="silver" name="role" value="Silver" className="input-label mx-2" onChange={handleInputChange} />
                <label htmlFor="silver">Silver</label>
              </div>
              <div className="flex gap-2 items-center">
                <input type="radio" id="platinum" name="role" value="Platinum" className="input-label mx-2" onChange={handleInputChange} />
                <label htmlFor="platinum">Platinum</label>
              </div>
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg mt-4 mb-2 w-full">Register</button>
          <p className="mb-5">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
          <p className="my-3 text-center">--- or ---</p>
          <div className="flex flex-col gap-4">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <div>
              <FacebookLogin
                appId="1088597931155576"
                style={{
                  backgroundColor: '#4267b2',
                  color: '#fff',
                  fontSize: '16px',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '4px',
                  width: '100%',
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register