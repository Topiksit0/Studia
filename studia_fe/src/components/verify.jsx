import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Verify = ({verify, match }) => {
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        navigate("/courses");
    }

    return (
        <div class="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5 bg-gradient-to-r from-indigo-400  to-[#6e66d6]">
            <div className='rounded-lg bg-white'>
                <h1>Verifica la cuenta: </h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'                  
                >
                    Verify
                </button>
            </div>
        </div>
    )
}

export default connect(null, { verify })(Verify);