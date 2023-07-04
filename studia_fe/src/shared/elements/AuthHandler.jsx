import React from 'react'
import { useStore } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

export const AuthHandler = () => {
    const store = useStore();

    if (store.getState().auth.isAuthenticated) {
        window.location.replace('/app/courses');
    } 
}
