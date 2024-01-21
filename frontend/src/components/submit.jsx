import React from 'react';

const Submit = ({ text, onClick }) => {
    return (
        <button
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            onClick={() => onClick()}
        >
            { text || "Save" }
        </button>
    )
}

export default Submit;