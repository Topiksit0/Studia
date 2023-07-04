import { useEffect, React, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../../actions/auth';


import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/accordion'

import { Sidebar } from '../../../shared/elements/Sidebar';
import { Navbar } from '../../../shared/elements/Navbar';

const Qualifications = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
    const [qualifications, setQualifications] = useState([]);

    useEffect(() => {
        checkAuthenticated();
        load_user();

    }, []);

    useEffect(() => {
        callQualificationsData();
    }, [user]);


    function callQualificationsData() {

        if (user) {
            const link = "http://localhost:8000/api/accounts/users/" + user['id'] + "/qualifications/";
            fetch(link)
                .then((res) => res.json())
                .then((data) => {
                    setQualifications(data);
                })
                .catch((error) => console.error(error));
        }
    }


    function RenderQualifications(curso_grade) {
        return (
            <div className='border border-black bg-white rounded my-6 py-6'>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <div className='' >
                                <h2 className='text-lg font-medium   ml-4'>
                                    <AccordionIcon className=' ' />
                                    {curso_grade.curso_title}

                                </h2>
                            </div>
                        </AccordionButton>
                        <AccordionPanel>
                            <div className='flex flex-col mt-4'>
                                {curso_grade.notas.map(RenderQualificationsNotas)}
                            </div>

                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>

        )
    }

    function RenderQualificationsNotas(notas) {
        return (
            <div className='px-12'>
                <div className='container flex py-2 my-2 px-6 rounded space-x-7 bg-indigo-100'>
                    <p className='font-normal text-base flex w-1/4'>{notas.descripcion}</p>

                    <div className='w-1/4 justify-center text-center items-center flex'>
                        <span className="bg-indigo-600 text-indigo-200 text-xs font-medium  w-[3rem] py-0.5 rounded ">{notas.calificacion}</span>
                    </div>




                    <p className='font-normal text-base flex w-1/4 overflow-hidden overflow-ellipsis whitespace-nowrap'>{notas.comentarios}</p>
                    <p className=' font-bold text-base flex w-1/4 text-center justify-end'>{notas.ponderacion}</p>
                </div>
            </div>

        )
    }


    return (
        <div className='h-screen w-full bg-white'>
            <Navbar user={user} />
            <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
                <Sidebar section={'qualifications'} />
                <div className='container-fluid h-screen w-full rounded-tl-3xl bg-[#e7eaf886] '>
                    <div className='p-9 px-12 font-bold text-2xl'>
                        <h2>Qualifications</h2>
                        <div className='mt-8'>
                            {qualifications.map(RenderQualifications)}
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




export default connect(mapStateToProps, { checkAuthenticated, load_user })(Qualifications);