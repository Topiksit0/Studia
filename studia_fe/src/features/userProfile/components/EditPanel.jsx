import { useEffect, useState, React, useRef } from 'react';
import { Modal, Button, Placeholder } from 'rsuite';
import { FiEdit } from "react-icons/fi";

export const EditPanel = ({ onClose, userProfile }) => {
    const inputRefLandscape = useRef(null);
    const inputRefProfile = useRef(null);
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const [description, setDescription] = useState();
    const [university, setUniversity] = useState();
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const [landscapePhoto, setLandscapePhoto] = useState();

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    function handleEdit() {
        const userData = {
            description: description,
            university: university,
            user_name: username,
            name: name,
            profile_photo: profilePhoto,
            landscape_photo: landscapePhoto,
        };
    }

    function handleProfilePhoto() {
        inputRefProfile.current.click();
    }
    function handleLandscapePhoto() {
        inputRefLandscape.current.click();
    }

    function handleProfilePhotoChange(event) {
        setProfilePhoto(event.target.files[0]);
    }
    function handleLandscapePhotoChange(event) {
        setLandscapePhoto(event.target.files[0]);
    }

    return (
        <div className=' '>
            <Modal backdrop='static' keyboard={false} open={open} onClose={handleClose}>
                <Modal.Header>
                    <button className='w-full' onClick={handleLandscapePhoto}>
                        <input type="file" ref={inputRefLandscape} onChange={handleLandscapePhotoChange} style={{ display: 'none' }} />
                        <div className='flex items-center relative'>

                            {userProfile && (
                                landscapePhoto ? (
                                    <img
                                        src={URL.createObjectURL(landscapePhoto)}
                                        className='w-full h-56 object-cover'
                                        alt=''
                                        style={{ filter: 'brightness(50%)' }}
                                    />
                                ) : (
                                    <img className='w-full h-56 object-cover' style={{ filter: 'brightness(50%)' }} src={userProfile.landscape_photo} alt="" />
                                )
                            )}


                            <div className='absolute flex ml-auto justify-center items-center w-full h-full'>
                                <div className='text-white'>
                                    <FiEdit size={20} />
                                </div>
                            </div>
                        </div>

                    </button>
                    <button className='ml-8' onClick={handleProfilePhoto}>
                        <input type="file" ref={inputRefProfile} onChange={handleProfilePhotoChange} style={{ display: 'none' }} />
                        <div className='flex items-center relative -mt-16'>
                            {userProfile && (
                                profilePhoto ? (
                                    <img
                                        src={URL.createObjectURL(profilePhoto)}
                                        className='shadow-xl rounded-full border-none max-w-120-px'
                                        alt=''
                                        style={{ filter: 'brightness(50%)' }}
                                    />
                                ) : (
                                    <img
                                        className='shadow-xl rounded-full border-none max-w-120-px'
                                        src={userProfile.profile_photo}
                                        alt=''
                                        style={{ filter: 'brightness(50%)' }}
                                    />
                                )
                            )}

                            <div className='absolute top-0 right-0 flex justify-center items-center w-full h-full'>
                                <div className='text-white'>
                                    <FiEdit size={20} />
                                </div>
                            </div>
                        </div>
                    </button>







                </Modal.Header>

                <Modal.Body>
                    <div className='flex flex-col'>
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                            <textarea type="name" id="name" class="shadow-sm resize-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " >
                                {userProfile.name}
                            </textarea>
                        </div>
                        <div class="mb-6">
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                            <textarea type="username" id="username" class="shadow-sm  resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " >
                                {userProfile.user_name}
                            </textarea>
                        </div>
                        <div class="mb-6">
                            <label for="university" class="block mb-2 text-sm font-medium text-gray-900 ">University</label>
                            <textarea id="university" class="shadow-sm resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " >
                                {userProfile.university}
                            </textarea>
                        </div>
                        <div className='mb-6'>
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ">
                                {userProfile.description}
                            </textarea>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="primary">
                        Save Changes
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
