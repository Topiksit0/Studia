import React from 'react'
import { FiSettings } from 'react-icons/fi';
export const SettingsBreadcrumb = ({ index }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">

                    <p className="inline-flex  items-center text-sm font-medium text-gray-700 hover:text-blue-600 cursor-default">
                        <span className='px-3'>
                            <FiSettings />
                        </span>
                        Settings
                    </p>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <p className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 cursor-default">{index}</p>
                    </div>
                </li>
            </ol>
        </nav>

    )
}
