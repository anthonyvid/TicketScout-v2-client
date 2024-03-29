import { Fragment, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

// Components
import CustomDialog from './CustomDialog.jsx';

import { Button, Divider, IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Hooks
import useClasses from '~/hooks/useClasses.js';

// Styles
import uploadFileDialogStyles from '~/styles/components/UploadFileDialog.style.js';
// Utils
import { bytesToMegabytes } from '~/utils/helper.js';
// Constants

// Services

import FileInput from './FileInput.jsx';
import WordIcon from '~/assets/svg/WordIcon.jsx';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PhotoIcon from '~/assets/svg/PhotoIcon.jsx';
import ExcelIcon from '~/assets/svg/ExcelIcon.jsx';
import VideoIcon from '~/assets/svg/VideoIcon.jsx';
import PowerpointIcon from '~/assets/svg/PowerpointIcon.jsx';
import { saveModalData } from '~/reducers/modal.js';

const UploadFileDialog = ({ isOpen, handleClose }) => {
    const classes = useClasses(uploadFileDialogStyles);
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();

    const handleFileDropped = useCallback((files) => {
        if (files?.length) {
            setFiles((previousFiles) => [
                ...previousFiles,
                ...files.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ]);
        }
    }, []);

    const removeFile = (name) => {
        setFiles((files) => files.filter((file) => file.name !== name));
    };

    const getTypeIcon = (type) => {
        switch (type) {
            // word doc
            case 'word':
                return <WordIcon />;
            case 'excel':
                return <ExcelIcon />;
            case 'powerpoint':
                return <PowerpointIcon />;
            case 'jpeg':
                return <PhotoIcon />;
            case 'png':
                return <PhotoIcon />;
            case 'svg':
                return <PhotoIcon />;
            case 'pdf':
                return <PhotoIcon />;
            case 'mp3':
                return <VideoIcon />;
            case 'mp4':
                return <VideoIcon />;
            case 'mov':
                return <VideoIcon />;
            default:
                return <InsertDriveFileIcon style={{ fontSize: '46px' }} />;
        }
    };

    const formatFileNameType = (type) => {
        switch (type) {
            case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'word';
            case 'svg+xml':
                return 'svg';
            case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return 'excel';
            case 'vnd.openxmlformats-officedocument.presentationml.presentation':
                return 'powerpoint';
            default:
                return type;
        }
    };

    return (
        <CustomDialog
            isOpen={isOpen}
            handleClose={handleClose}
            title={'Upload Files'}
        >
            <form
                onSubmit={(e) => e.preventDefault()}
                className={classes.formWrap}
            >
                <FileInput onDropHandler={handleFileDropped} />
                <h3 className={classes.subheading}>Uploaded Files</h3>
                {files.length < 1 ? (
                    <p>No files uploaded.</p>
                ) : (
                    files.map(({ name, size, type }, i) => {
                        type = formatFileNameType(type.split('/')[1]);

                        return (
                            <Fragment key={i}>
                                <div className={classes.filePreview}>
                                    {getTypeIcon(type)}
                                    <div style={{ marginLeft: '15px' }}>
                                        <h4>{name.split('.')[0]}</h4>
                                        <div className={classes.fileDetailWrap}>
                                            <h5>{type}</h5>
                                            <FiberManualRecordIcon
                                                sx={{ fontSize: '7px' }}
                                            />
                                            <h5>{bytesToMegabytes(size)}</h5>
                                        </div>
                                    </div>
                                    <IconButton
                                        onClick={() => removeFile(name)}
                                        sx={{ marginLeft: 'auto' }}
                                        aria-label="delete"
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </div>
                                {files.length > 1 && i < files.length - 1 ? (
                                    <Divider />
                                ) : null}
                            </Fragment>
                        );
                    })
                )}
                <Button
                    onClick={() => {
                        dispatch(saveModalData(files));
                    }}
                    fullWidth
                    variant="contained"
                >
                    Add
                </Button>
            </form>
        </CustomDialog>
    );
};

export default UploadFileDialog;
