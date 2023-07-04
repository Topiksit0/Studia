import React, { useState } from 'react'
import '../styles/login.css'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { connect, useStore } from 'react-redux'
import { login } from '../../../actions/auth'

const Login = ({ login }) => {

    const navigate = useNavigate();
    const store = useStore();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const Swal = require('sweetalert2')
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        getData(email, password)
            .then((data) => console.log(data));
    };

    async function getData(email, password) {
        try {
            const data = await login(email, password)

        } catch (error) {
            console.log(error)

        }

        if (store.getState().auth.isAuthenticated) {
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })
            navigate("/app/courses");
        }
    }

    return (
        <div className="">


            <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>


            <style>@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')</style>

            <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5 bg-gradient-to-r from-indigo-400  to-[#6e66d6]">


                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden  " style={{ maxWidth: '1000px' }} >
                    <div className='absolute li bg-gray-100 shadow-lg transform sm:skew-y-0 sm:rounded-3xl -z-0 -translate-x-[9%]  translate-y-[14%] sm:w-[26rem] sm:h-[30rem] '>

                    </div>

                    <div className="md:flex w-full z-50">

                        <div className="hidden md:block w-1/2 bg-image py-10 px-10 relative z-50">
                            <div className='w-[2rem]'>
                                <a href="/">
                                    <BsFillArrowLeftSquareFill size={30} style={{ cursor: "pointer", color: "rgba(255, 255, 255, 1)" }} />
                                </a>
                            </div>



                            <div className='flex justify-center'>
                                <div className='absolute top-48 w-2/4   '>
                                    <h1 className='text-white font-medium text-4xl '>Welcome back!</h1>
                                    <p className='text-white py-3 '>You can sign in to access with your existing account.</p>
                                </div>
                            </div>


                            <div className='absolute bottom-7 inset-x-0 flex flex-col items-center'>
                                <p className='text-white text-sm text-center text-xs' >In case you do not have an account already</p>
                                <Link to="/auth/register" className="my-3 bg-white text-gray-800 font-bold rounded border-b-2 border-indigo-400  transition-all hover:border-indigo-400 hover:bg-indigo-400 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span className="">Register</span>

                                </Link>
                            </div>

                        </div>
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10 z-50">
                            <div className="text-center mb-10">

                                <h1 className="font-bold text-3xl text-gray-900">Login</h1>
                                <p>Enter your information</p>
                            </div>

                            <div>

                                <div className="flex -mx-3 z-50">
                                    <div className="w-full px-3 mb-5 z-50">
                                        <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input
                                                type="email"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                placeholder="marc9@alumnes.ub.edu"
                                                name='email'
                                                value={email}
                                                onChange={e => onChange(e)}
                                                required />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12 relative">

                                        <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <input
                                                type="password"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                placeholder="************"
                                                name='password'
                                                value={password}
                                                onChange={e => onChange(e)}
                                                minLength='8'
                                                required />

                                        </div>
                                        <a href="" className='absolute  right-0  right-0'>  <p className='  text-xs my-3 mr-4 '>Forgot password?</p> </a>
                                    </div>
                                </div>
                                <div className="flex justify-center pt-7 mb-5">
                                    <div className="w-full sm:ml-8 mb-5 text-center sm:pr-8">
                                        <button onClick={handleSubmit} className=" inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                            <span className=" w-[13rem] py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Login
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className='flex flex-col text-center items-center'>
                                    <p className='text-xs'>or connect with social media</p>
                                    <button type="button" className="my-5 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                        Sign in with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated

});

export default connect(mapStateToProps, { login })(Login);

