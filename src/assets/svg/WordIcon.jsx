import React from 'react';
import PropTypes from 'prop-types';
const WordIcon = (props) => {
    return (
        <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            style={{
                width: props.width,
                height: props.height,
                ...props.styles
            }}
        >
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <defs>
                    <linearGradient
                        id="a"
                        x1="4.494"
                        y1="-1712.086"
                        x2="13.832"
                        y2="-1695.914"
                        gradientTransform="translate(0 1720)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#2368c4"></stop>
                        <stop offset="0.5" stopColor="#1a5dbe"></stop>
                        <stop offset="1" stopColor="#1146ac"></stop>
                    </linearGradient>
                </defs>
                <title>file_type_word</title>
                <path
                    d="M28.806,3H9.705A1.192,1.192,0,0,0,8.512,4.191h0V9.5l11.069,3.25L30,9.5V4.191A1.192,1.192,0,0,0,28.806,3Z"
                    fill="#41a5ee"
                ></path>
                <path
                    d="M30,9.5H8.512V16l11.069,1.95L30,16"
                    fill="#2b7cd3"
                ></path>
                <path
                    d="M8.512,16v6.5L18.93,23.8,30,22.5V16Z"
                    fill="#185abd"
                ></path>
                <path
                    d="M9.705,29h19.1A1.192,1.192,0,0,0,30,27.809h0V22.5H8.512v5.309A1.192,1.192,0,0,0,9.705,29Z"
                    fill="#103f91"
                ></path>
                <path
                    d="M16.434,8.2H8.512V24.45h7.922a1.2,1.2,0,0,0,1.194-1.191V9.391A1.2,1.2,0,0,0,16.434,8.2Z"
                    style={{ opacity: 0.1, isolation: 'isolate' }}
                ></path>
                <path
                    d="M15.783,8.85H8.512V25.1h7.271a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.783,8.85Z"
                    style={{ opacity: 0.2, isolation: 'isolate' }}
                ></path>
                <path
                    d="M15.783,8.85H8.512V23.8h7.271a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.783,8.85Z"
                    style={{ opacity: 0.2, isolation: 'isolate' }}
                ></path>
                <path
                    d="M15.132,8.85H8.512V23.8h6.62a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.132,8.85Z"
                    style={{ opacity: 0.2, isolation: 'isolate' }}
                ></path>
                <path
                    d="M3.194,8.85H15.132a1.193,1.193,0,0,1,1.194,1.191V21.959a1.193,1.193,0,0,1-1.194,1.191H3.194A1.192,1.192,0,0,1,2,21.959V10.041A1.192,1.192,0,0,1,3.194,8.85Z"
                    fill="url(#a)"
                ></path>
                <path
                    d="M6.9,17.988c.023.184.039.344.046.481h.028c.01-.13.032-.287.065-.47s.062-.338.089-.465l1.255-5.407h1.624l1.3,5.326a7.761,7.761,0,0,1,.162,1h.022a7.6,7.6,0,0,1,.135-.975l1.039-5.358h1.477l-1.824,7.748H10.591L9.354,14.742q-.054-.222-.122-.578t-.084-.52H9.127q-.021.189-.084.561c-.042.249-.075.432-.1.552L7.78,19.871H6.024L4.19,12.127h1.5l1.131,5.418A4.469,4.469,0,0,1,6.9,17.988Z"
                    fill="#fff"
                ></path>
            </g>
        </svg>
    );
};

WordIcon.defaultProps = {
    width: '45px',
    height: '45px'
};

WordIcon.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
};

export default WordIcon;
