import React from 'react';
import './ButtonNice.css'

function ButtonNice ({text}) {
    return (
        <div className='buttonNice'>
            <button>
                <div id="g"></div>{text}<div id="d"></div>
            </button>
        </div>

    );
};

export default ButtonNice;