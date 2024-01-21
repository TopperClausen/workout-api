import React from 'react';

const Input = ({ placeholder, label, type }) => {
    return (
        <div>
            {label && 
                <label className="px-2"> { label } </label>
            }
            <input 
                className="h-[38px] px-2 border rounded-lg w-full focus:border-blue-600"
                placeholder={placeholder}
                type={type}
            />

        </div>
    )
}

export default Input;