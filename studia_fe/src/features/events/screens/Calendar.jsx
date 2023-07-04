import { useEffect, React, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../../actions/auth';

import 'rsuite/dist/rsuite-no-reset.min.css';

import { Sidebar } from '../../../shared/elements/Sidebar';
import { Navbar } from '../../../shared/elements/Navbar';
import { NewsButtonHandler, TimelineButtonHandler } from '../components/EventHandlers.jsx'

import { Calendar, Whisper, Popover, Badge, Modal, Input, Button, Form } from 'rsuite';
import '../styles/utils.css'


const CalendarEvent = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleTitleChange = (value) => {
        setTitle(value);
    };

    const handleDateChange = (value) => {
        setDate(value);
    };

    const [events, setEventList] = useState(
        [
            {
                title: "Programación 1: Primea entrega tarea 2", time: new Date(2023, 6, 21)
            },
            {
                title: "Programación 1: peer review geometría en el espacio", time: new Date(2023, 6, 28)
            }
            ,
            {
                title: "Historia del Cine: peer review trabajo cine", time: new Date(2023, 6, 28)
            }
            ,
            {
                title: "Historia del Cine: Primera entrega 'efectos de camara'", time: new Date(2023, 6, 23)
            }
            ,
            {
                title: "Historia del Cine: Planifica el trabajo 'efectos de camara'", time: new Date(2023, 6, 10)
            }
        ]
    );

    const handleOpen = value => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    function handleAddEvent() {
        const newEvents = [...events];
        newEvents.push({
            title: title,
            time: new Date(date)
        });
        setEventList(newEvents)
    }

    function getTodoList(date) {
        return events.filter((item) => {
            return (
                item.time.getFullYear() === date.getFullYear() &&
                item.time.getMonth() === date.getMonth() &&
                item.time.getDate() === date.getDate()
            );
        });
    }


    function renderCell(date) {
        const list = getTodoList(date);
        const displayList = list.filter((item, index) => index < 2);

        if (list.length) {
            const moreCount = list.length - displayList.length;
            const moreItem = (
                <li>
                    <Whisper
                        placement="top"
                        trigger="click"
                        speaker={
                            <Popover>
                                {list.map((item, index) => (
                                    <p key={index}>
                                        <strong>{item.title}</strong>
                                    </p>
                                ))}
                            </Popover>
                        }
                    >
                        <a>{moreCount} more</a>
                    </Whisper>
                </li>
            );

            return (
                <ul className="calendar-todo-list">
                    {displayList.map((item, index) => (
                        <li className='font-medium' key={index}>
                            <Badge /> {item.title}
                        </li>
                    ))}
                    {moreCount ? moreItem : null}
                </ul>
            );
        }

        return null;
    }

    useEffect(() => {
        checkAuthenticated();
        load_user();

    }, []);

    return (
        <div className='h-screen w-full bg-white'>
            <Navbar user={user} />

            <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
                <Sidebar section={'events'} />
                <div className='container-fluid h-screen w-full rounded-tl-3xl bg-[#e7eaf886]'>
                    <div className='p-9 px-12 font-bold text-2xl'>
                        <div className='flex'>
                            <div name='maindiv' className='bg-white rounded-xl p-5 mt-3 border border-black w-auto flex-grow '>
                                <div className='flex'>
                                    <h1 className=''>Calendar</h1>
                                    <button onClick={() => handleOpen()} className='ml-auto bg-indigo-300 mr-3 font-medium rounded text-base px-3'>Add event</button>

                                    <Modal size='sm' open={open} onClose={handleClose}>
                                        <Modal.Header>
                                            <Modal.Title>Add Event</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Group >
                                                <Form.ControlLabel>Title</Form.ControlLabel>
                                                <Input value={title} onChange={handleTitleChange} />
                                            </Form.Group >
                                            <Form.Group >
                                                <Form.ControlLabel>Date</Form.ControlLabel>
                                                <Input type='date' value={date} onChange={handleDateChange} />
                                            </Form.Group >
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={handleClose} appearance="subtle">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleAddEvent} appearance="primary">
                                                Add Event
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>

                                <div className='font-normal'>
                                    <Calendar bordered renderCell={renderCell} />
                                </div>

                            </div>
                            <div name='others' className='flex flex-col right-0 ml-6 mr-10'>
                                <TimelineButtonHandler />
                                <NewsButtonHandler />
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




export default connect(mapStateToProps, { checkAuthenticated, load_user })(CalendarEvent);