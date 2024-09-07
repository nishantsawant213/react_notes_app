import React ,{useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'


const SignUp = () =>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    


    const handleSingUp =  async(e)=>{
        e.preventDefault();
        if (!name) {
            setError("Please Enter Name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please Enter Valid Email address");
            return;
        }
        if (!password) {
            setError("Please Enter Password");
            return;
        }

        setError("");   
        
        try {
            const response = await axiosInstance.post("/create-account", {
                email: email,
                password: password,
                fullName: name
            })
            
            if(response.data && response.data.error){
                setError(response.data.message)
                return;
            }

            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken)
                navigate('/dashboard')
            }

        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("An unexpected error occured");
            }
        }
        
    }
    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mt-28'>
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleSingUp}>
                        <h4 className='text-2xl mb-7'>SingUp</h4>
                        <input type="text" className="input-box" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                        
                        <input type="text" className="input-box" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />

                        <PasswordInput 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button className='btn-primary' type='submit' value={password} onChange={(e) => { setPassword(e.target.value) }}  > Create Account </button>


                        <p className='text-sm text-center mt-4'> Already have an account? {""}
                            <Link to="/login" className="font-medium text-primary underline"> Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp