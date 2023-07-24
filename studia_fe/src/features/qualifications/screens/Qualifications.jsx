import { useEffect, React, useState } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
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
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    const transition = { duration: 0.3 };
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

    function RenderGradesFromData(grades) {
        const maxCalificacion = 10; // Reemplaza con el valor máximo posible para la calificación

        // Calcula la opacidad en función de la calificación (por ejemplo, 0.2 para calificación 2 y 1.0 para calificación 10)
        const opacity = Math.max(grades.calificacion / maxCalificacion, 0.35); // Opacidad mínima de 0.2

        const style = {
            backgroundColor: `rgba(59, 130, 246, ${opacity})`, // Azul base de Tailwind CSS
            borderRadius: '0.5rem',
            width: '2rem',
            height: '2rem',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };

        return (
            <div style={style} className='text-sm'>
                {grades.calificacion}
            </div>
        );
    }

    function RenderQualifications(curso_grade) {
        const maxCalificacion = 10; // Reemplaza con el valor máximo posible para la calificación
        let blueValue = 240 - (curso_grade.nota_media_provisional / maxCalificacion) * 190;
        if (blueValue >= 164) {
            blueValue = 155;
        }

        const color = `rgba(${blueValue}, ${blueValue}, 255, 1)`;

        const style = {
            color: color,
        };

        return (
            <div className='flex space-x-6'>
                <div className='bg-white rounded-lg font-medium text-lg py-5 my-2 grid grid-cols-5 w-full flex items-center'>
                    <div className='flex items-center'>
                        <h1 className='font-sans ml-5'>{curso_grade.course_title}</h1>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img className='w-8 h-8 rounded-full' src={curso_grade.professor_photo} alt="" />
                        <p className='text-base font-normal'>{curso_grade.professor_name}</p>
                    </div>
                    <div className='col-span-2 flex space-x-3'>
                        {curso_grade.notas.map(RenderGradesFromData)}
                    </div>
                    <div className='text-right mr-5'>
                        <p className='text-base font-normal'>{curso_grade.last_updated}</p>
                    </div>

                </div>
                <div className=' bg-white rounded-lg text-base font-normal grid grid-cols-1  items-center justify-center text-center py-5 my-2 w-[10rem] '>
                    <p style={style} className='font-bold'>{curso_grade.nota_media_provisional}</p>
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
                        <div className='mt-12'>
                            <div className='grid grid-cols-6 font-normal text-sm pl-6 mb-2'>
                                <p className=''>Course</p>
                                <p className=''>Professor</p>
                                <p className='col-span-2 ml-6'>Grades</p>
                                <p className=' text-right'>Last updated</p>
                                <p className=' text-right mr-12'>Average</p>
                            </div>
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