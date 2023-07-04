import React from 'react'

export const Nothing404 = () => {
    return (
        <div className='py-7 flex flex-col items-center justify-center'>
            <img className='opacity-50' src="https://liferay-support.zendesk.com/hc/article_attachments/360032795211/empty_state.gif" alt="" />
            <h2 className='py-3 font-medium text-gray-400'>Wow, such empty</h2>
        </div>
    )
}
