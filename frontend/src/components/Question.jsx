import React, { useEffect } from 'react';

function Question(props) {

    return (
        <div className="text-[#34384F] font-bold text-3xl font-serif border px-2 py-4 bg-white rounded-lg mx-10 my-4"  >
            {props.question}
        </div>
    );
}

export default Question;