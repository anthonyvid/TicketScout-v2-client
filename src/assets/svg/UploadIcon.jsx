import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

const UploadIcon = (props) => {
    const Path = styled('path')(({ theme }) => ({
        fill: theme.palette.neutral.dark
    }));

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{
                width: props.width,
                height: props.height,
                ...props.styles
            }}
        >
            <Path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13Z" />
            <Path d="M5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Z" />
            <Path d="M13,19a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21Z" />
            <Path d="M22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
        </svg>
    );
};

UploadIcon.defaultProps = {
    width: '45px',
    height: '45px'
};

UploadIcon.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string
};
export default UploadIcon;
