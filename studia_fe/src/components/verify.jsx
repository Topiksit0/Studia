import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Verify = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);
    let { uid } = useParams();
    let { token } = useParams();
    const navigate = useNavigate();
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

    async function getData(uid, token) {
        try {
            const data = await verify(uid, token);
            setVerified(true);
        } catch (error) {
            console.log(error)
            setVerified(false);
        }
    }

    const verify_account = e => {
        e.preventDefault();
        getData(uid, token)
            .then((data) => console.log(data));
    };

    if (verified) {
        Toast.fire({
            icon: 'success',
            title: 'Account successfully verified'
        })
        navigate("/courses");
    }

    return (
        <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5 bg-gradient-to-r from-indigo-400  to-[#6e66d6]">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden " style={{ maxWidth: '1000px' }} >
                <div className='text-center flex flex-col text-2xl text-black justify-center items-center py-5 '>
                    <img src="https://servischindler.com/wp-content/uploads/2021/10/acomp_cursos.png" alt="" style={{ width: '450px' }} />
                    <h1 className='font-semibold py-9'>Verify your Account</h1>
                    <div className='w-3/5 py-5'>
                        <p className='text-sm'>
                            Thank you for creating an account on our e-learning platform. To complete your registration, please click on the Validate button, whenever you do it, you will have full access to all the courses and features on our platform. We look forward to helping you achieve your learning goals!
                        </p>
                    </div>
                    <button onClick={verify_account} className="my-5 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className=" w-[9rem] py-1.5 text-lg transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Verify
                        </span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default connect(null, { verify })(Verify);