import React from 'react';
import PropTypes from 'prop-types';

const PowerpointIcon = (props) => {
    return (
        <svg
            viewBox="0 0 96 96"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            style={{
                width: props.width,
                height: props.height,
                ...props.styles
            }}
        >
            <path
                fill="white"
                stroke="#979593"
                d="M67.1716 7H27c-1.1046 0-2 .8954-2 2v78c0 1.1046.8954 2 2 2h58c1.1046 0 2-.8954 2-2V26.8284c0-.5304-.2107-1.0391-.5858-1.4142L68.5858 7.5858C68.2107 7.2107 67.702 7 67.1716 7z"
            />
            <path
                fill="white"
                stroke="#979593"
                d="M67 7v18c0 1.1046.8954 2 2 2h18"
            />
            <path fill="#F5BA9D" d="M62 34c8.2843 0 15 6.7157 15 15H62V34z" />
            <path
                fill="#C8C6C4"
                d="M77 51c0 10.0264-8.6799 18.0255-18.9355 16.8929-7.7951-.8609-14.0964-7.1622-14.9574-14.9573C41.9744 42.68 49.9736 34 60 34v17h17zm2 25H34c-.5522 0-1 .4477-1 1s.4478 1 1 1h45c.5522 0 1-.4477 1-1s-.4478-1-1-1zm0-5H34c-.5522 0-1 .4477-1 1s.4478 1 1 1h45c.5522 0 1-.4477 1-1s-.4478-1-1-1z"
            />
            <path
                fill="#C43E1C"
                d="M12 74h32c2.2091 0 4-1.7909 4-4V38c0-2.2091-1.7909-4-4-4H12c-2.2091 0-4 1.7909-4 4v32c0 2.2091 1.7909 4 4 4z"
            />
            <path
                fill="white"
                d="M29.8541 42c2.9554 0 5.2196.6626 6.7895 1.9849C38.2145 45.3081 39 47.2246 39 49.7332c0 1.6109-.3888 3.0433-1.1653 4.2971-.7765 1.2548-1.8814 2.2299-3.3134 2.9262C33.0892 57.6518 31.429 58 29.5426 58H24.999v9H20V42h9.8541zm-4.855 12h3.9666c1.5464 0 2.7144-.3491 3.5051-1.0453.7897-.6972 1.1841-1.715 1.1841-3.0536 0-2.6004-1.5133-3.9011-4.5416-3.9011h-4.1142v8z"
            />
        </svg>
    );
};

PowerpointIcon.defaultProps = {
    width: '45px',
    height: '45px'
};

PowerpointIcon.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
};

export default PowerpointIcon;
