import React from 'react'
import './styles/login.css'

const login = () => {
    return (
        <div class="">
            <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>


            <style>@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')</style>

            <div class="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">


                <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden " style={{ maxWidth: '1000px' }} >

                    <div className='absolute bg-gray-400 shadow-lg transform sm:skew-y-0 sm:rounded-3xl -translate-x-[4%]  translate-y-[12%] -z-10 sm:w-2/4 sm:h-2/4'>

                    </div>
                    <div className="md:flex w-full ">
                        <div className="hidden md:block w-1/2 bg-image py-10 px-10 relative ">

                            <div className='flex justify-center'>
                                <div className='absolute top-36 w-2/4   '>
                                    <h1 className='text-white font-medium text-4xl '>Welcome back!</h1>
                                    <p className='text-white py-3 '>You can sign in to access with your existing account.</p>
                                </div>
                            </div>


                            <div className='absolute bottom-7 inset-x-0 flex flex-col items-center'>
                                <p className='text-white text-sm text-center' >In case you do not have an account already</p>
                                <button className="my-5  w-2/5   p-1 mb-2 mr-2 text-sm font-medium text-gray-900 
                                rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4">
                                    <span className="block w-full max-w-xs mx-auto py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-semibold" >
                                        Register an Account
                                    </span>
                                </button>
                            </div>

                        </div>
                        <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">

                                <h1 class="font-bold text-3xl text-gray-900">Login</h1>
                                <p>Enter your information to register</p>
                            </div>

                            <div>

                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <label for="" class="text-xs font-semibold px-1">Email</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input type="email" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="marc9@alumnes.ub.edu" />
                                        </div>
                                    </div>
                                </div>

                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-12 relative">

                                        <label for="" class="text-xs font-semibold px-1">Password</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <input type="password" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />

                                        </div>
                                        <a href="" className='absolute  right-0  right-0'>  <p className='  text-xs my-3 mr-4 '>Forgot password?</p> </a>
                                    </div>
                                </div>
                                <div class="flex justify-center pt-7 mb-5">
                                    <div class="w-full px-3 sm:ml-8 mb-5">
                                        <button className="  w-full max-w-xs mx-auto  inline-flex  p-1 mb-2 mr-2 text-sm font-medium text-gray-900 
                                rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4">
                                            <span className="block w-full max-w-xs mx-auto py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-semibold" >
                                                Login
                                            </span>
                                        </button>

                                    </div>
                                </div>

                                <div className='flex flex-col text-center items-center'>
                                    <p className='text-xs'>or connect with social media</p>
                                    <div class="google-btn my-5">
                                        <div class="google-icon-wrapper">
                                            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                                        </div>
                                        <p class="btn-text"><b>Sign in with google</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default login

/*
 <button class="block w-full max-w-xs mx-auto  hover:bg-indigo-700 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 my-5 font-semibold">Login</button>
*/