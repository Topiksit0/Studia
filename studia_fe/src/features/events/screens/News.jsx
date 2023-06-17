import { useEffect, React, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../../actions/auth';

import { TimelineButtonHandler, CalendarButtonHandler } from '../components/EventHandlers.jsx'
import { Sidebar } from '../../../shared/elements/Sidebar';
import { Navbar } from '../../../shared/elements/Navbar';

import '../styles/utils.css'

const NewsEvent = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
    const [newsInfo, setNewsInfo] = useState([]);

    useEffect(() => {
        checkAuthenticated();
        load_user();

    }, []);

    useEffect(() => {
        callNewsData();
    }, [user]);


    function callNewsData() {
        if (user) {
            const link = "http://localhost:8000/api/accounts/users/" + user['id'] + "/courses/news/";
            fetch(link)
                .then((res) => res.json())
                .then((data) => {
                    setNewsInfo(data);
                })
                .catch((error) => console.error(error));
        }
    }

    function renderNews(news) {
        return (
            <div>


                <div className='my-5'>
                    <div className='flex mt-4 border-black border rounded p-3 items-center justify-center '>
                        <div className='w-[100px] h-[100px] flex items-center pl-3'>
                            <img src={news.professor_photo} className='rounded' alt="" />
                        </div>
                        <div className='flex flex-col w-1/4 items-center '>
                            <p className='text-blue-500 font-medium text-lg'>{news.title}</p>
                            <p className='font-medium text-base'>{news.professor_name}</p>
                        </div>
                        <div className='container'>
                            <p className='font-medium text-base'>{news.post}</p>
                        </div>
                    </div>
                </div>


            </div>
        )
    }


    return (
        <div className='h-screen w-full bg-white'>
            <Navbar user={user} />

            <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
                <Sidebar section={'events'} />
                <div className='container-fluid h-screen w-full rounded-tl-3xl bg-[#e7eaf886]'>
                    <div className='p-9 px-12 font-bold text-2xl'>
                        <div className='flex'>
                            <div name='maindiv' className='bg-white rounded-xl p-5 mt-3 border border-black w-auto flex-grow'>
                                <h1 className=''>News</h1>
                                <hr className="h-px my-8 bg-black border-0"></hr>
                                {newsInfo.map(renderNews)}
                            </div>
                            <div name='others' className='flex flex-col right-0 ml-6 mr-10'>
                                <CalendarButtonHandler />
                                <TimelineButtonHandler />
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});




export default connect(mapStateToProps, { checkAuthenticated, load_user })(NewsEvent);