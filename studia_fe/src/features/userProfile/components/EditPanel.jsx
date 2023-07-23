import { useState, React, useRef } from 'react';
import { Modal, Button } from 'rsuite';
import Swal from 'sweetalert2';
import { FiEdit } from "react-icons/fi";
import axios from 'axios';

import '../styles/userStyles.css';

export const EditPanel = ({ onClose, userProfile, uid }) => {

    const inputRefLandscape = useRef(null);
    const inputRefProfile = useRef(null);
    const [open, setOpen] = useState(true);
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


    async function handleUploadImage(file) {
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post('http://localhost:8000/api/accounts/users/upload_image/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response.data.image_url);
                return response.data.image_url;
            } catch (error) {
                console.error('Error al cargar la imagen:', error);
                return null;
            }
        } else {
            console.warn('No se ha seleccionado una imagen.');
            return null;
        }
    }



    async function handleEdit() {
        let profilePhotoUrlPromise = null;
        let landscapePhotoUrlPromise = null;

        if (profilePhoto) {
            profilePhotoUrlPromise = handleUploadImage(profilePhoto);
        }
        if (landscapePhoto) {
            landscapePhotoUrlPromise = handleUploadImage(landscapePhoto);
        }

        const [profilePhotoUrl, landscapePhotoUrl] = await Promise.all([
            profilePhotoUrlPromise,
            landscapePhotoUrlPromise,
        ]);

        console.log(profilePhotoUrl, landscapePhotoUrl)
        const userData = {
            description: description,
            university: university,
            user_name: username,
            name: name,
            profile_photo: profilePhotoUrl,
            landscape_photo: landscapePhotoUrl,
        };

        fetch(`http://localhost:8000/api/accounts/users/${uid}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (response.ok) {
                    Toast.fire({
                        icon: 'success',
                        text: 'Changes saved.',
                        title: 'Success!'
                    })
                } else {
                    response.text().then(errorMessage => {
                        Toast.fire({
                            icon: 'error',
                            text: errorMessage,
                            title: 'Error!'
                        });
                    });
                }
            })
            .catch(error => {
                Toast.fire({
                    icon: 'error',
                    text: 'Something went wrong.' + error,
                    title: 'Error!'
                })
            });

        resetValues();
        setOpen(false);
        onClose();
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


    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };
    const handleChangeUniversity = (event) => {
        setUniversity(event.target.value);
    }
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }
    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const resetValues = () => {
        setDescription("");
        setUniversity("");
        setUsername("");
        setName("");
        setLandscapePhoto("");
        setProfilePhoto("");
    };

    return (
        <div>
            <Modal backdrop='static' data-dismiss="modal" keyboard={false} open={open} onClose={handleClose} >
                <Modal.Header closeButton="false" >
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
                <Modal.Body className='!overflow-y-hidden' >
                    <div className='flex flex-col '>
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                            <textarea onChange={handleChangeName} type="name" id="name" class="shadow-sm resize-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " >
                                {userProfile.name}
                            </textarea>
                        </div>
                        <div class="mb-6">
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                            <textarea onChange={handleChangeUsername} type="username" id="username" class="shadow-sm  resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " >
                                {userProfile.user_name}
                            </textarea>
                        </div>
                        <div class="mb-6">
                            <label for="university" class="block mb-2 text-sm font-medium text-gray-900 ">University</label>
                            <textarea onChange={handleChangeUniversity} id="university" class="shadow-sm resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " >
                                {userProfile.university}
                            </textarea>
                        </div>
                        <div className='mb-6'>
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                            <textarea onChange={handleChangeDescription} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ">
                                {userProfile.description}
                            </textarea>
                        </div>

                    </div>
                </Modal.Body>
                <div className='mt-4'>
                    <Modal.Footer className=''>
                        <Button onClick={handleEdit} appearance="primary" >
                            Save Changes
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </div>

            </Modal>
        </div>
    )
}
