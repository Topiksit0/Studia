import React from 'react'
import { useNavigate } from 'react-router-dom';

const Page404Screen = () => {
    const navigate = useNavigate();

    return (
        <div class="lg:px-24  md:px-44 px-4 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-0 gap-16 h-screen bg-white ">
            <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div class="relative pb-36">
                    <div class="absolute ">
                        <div class="">
                            <h1 class="my-2 text-gray-800 font-bold text-3xl">
                                Looks like you've found the
                                doorway to the great nothing.
                            </h1>
                            <p class="my-2 text-gray-800 text-lg">Sorry about that! Please visit our hompage to get where you need to go.</p>
                            <div className='flex lg:justify-start justify-center'>
                                <button onClick={() => navigate('/')} class="sm:w-full mt-36 lg:w-auto my-2 border rounded justify-center md py-4 px-8 text-center bg-indigo-600 text-white 
                            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me there!</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                    </div>
                </div>
            </div>
            <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
        </div>

    )
}

export default Page404Screen