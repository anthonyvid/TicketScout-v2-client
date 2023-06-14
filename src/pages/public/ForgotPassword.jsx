import React, { useState } from 'react';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';

// Components
import { Button, InputLabel, TextField } from '@mui/material';
import FlexContainer from '~/components/FlexContainer.jsx';

// Hooks
import useClasses from '~/hooks/useClasses.js';

// Styles
import forgotPasswordStyles from '~/styles/pages/ForgotPassword.style.js';

// Lotties
import lockLottie from '../../assets/lotties/lock.json';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';

// Utils
import { createNotification } from '~/utils/notification.js';
import { isEmail } from '~/utils/helper.js';

// Services
import { forgotPassword } from '~/services/auth.service.js';

// Constants
import { statusCodes } from '~/constants/client.constants.js';

const ForgotPassword = () => {
    const classes = useClasses(forgotPasswordStyles);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const handleReset = async () => {
        try {
            if (isEmail(email)) {
                const response = await forgotPassword(email);
                console.log(response);

                if (response.status !== statusCodes.OK)
                    throw new Error(
                        response.data.message || response.statusText
                    );
            }
        } catch (error) {
            createNotification('error', error.message);
            console.error(error.message);
        }

        createNotification(
            'success',
            'Your reset instructions have been send to your email.'
        );
    };

    return (
        <FlexContainer col page justifyContentCenter alignItemsCenter>
            <div className={classes.wrap}>
                <div className={classes.lottieWrap}>
                    <Lottie
                        animationData={lockLottie}
                        loop={false}
                        play
                        rendererSettings={{
                            preserveAspectRatio: 'xMidYMid slice'
                        }}
                    />
                </div>
                <h1 className={classes.heading}>Forgot Password?</h1>
                <h3 className={classes.subheading}>
                    No worries, we'll send you reset instructions.
                </h3>

                <InputLabel
                    sx={{
                        fontWeight: '600',
                        marginBottom: '-20px',
                        textAlign: 'left'
                    }}
                >
                    Email
                </InputLabel>
                <TextField
                    className={classes.emailInput}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    InputProps={{
                        startAdornment: (
                            <EmailIcon className={classes.emailIcon} />
                        )
                    }}
                />
                <Button
                    onClick={handleReset}
                    className={classes.resetButton}
                    variant="contained"
                >
                    Reset password
                </Button>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/account/login')}
                    className={classes.resetButton}
                    variant="text"
                >
                    Back to login
                </Button>
            </div>
        </FlexContainer>
    );
};

export default ForgotPassword;
