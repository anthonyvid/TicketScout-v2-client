import { styled } from '@mui/material';
import UploadIcon from '~/assets/svg/UploadIcon.jsx';
import useClasses from '~/hooks/useClasses.js';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const fileInputStyles = (theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        color: theme.palette.neutral.dark,
        fontSize: '16px',
        height: '200px',
        border: '1px dashed',
        borderRadius: '10px',
        fontWeight: '700',
        textAlign: 'center',
        borderColor: theme.palette.neutral.mediumMain,
        transition: '0.2s ease-in-out',

        '&:hover': {
            transition: '0.3s ease-in-out',
            cursor: 'pointer',
            backgroundColor: `${theme.palette.neutral.light}`,
            borderColor: `${theme.palette.primary.main}80`
        }
    }
});

const FileInput = ({ onDropHandler }) => {
    const classes = useClasses(fileInputStyles);
    const onDrop = (files) => onDropHandler(files);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    const LinkText = styled('span')(({ theme }) => ({
        color: theme.palette.primary.main,
        textDecoration: 'underline'
    }));
    const InfoText = styled('small')(({ theme }) => ({
        fontSize: '13px',
        marginTop: '2px',
        color: theme.palette.neutral.main,
        fontWeight: 500
    }));

    return (
        <div
            {...getRootProps({
                className: classes.container
            })}
        >
            <input {...getInputProps()} />
            <UploadIcon />
            <p style={{ marginTop: '15px' }}>
                Drop your file here, or <LinkText>Browse</LinkText>
            </p>
            <InfoText>Maximum file size 50mb</InfoText>
        </div>
    );
};

export default FileInput;
