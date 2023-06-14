import React from 'react';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Constants
import { Button } from '@mui/material';
import FlexContainer from '~/components/FlexContainer.jsx';

// Lotties
import notFoundLottie from '../../assets/lotties/notFound.json';

// Styles
import notFoundStyles from '~/styles/pages/NotFound.style.js';

// Hooks
import useClasses from '~/hooks/useClasses.js';

const NotFound = () => {
    const classes = useClasses(notFoundStyles);
    const navigate = useNavigate();

    let { token, user } = useSelector((state) => state.authReducer);

    return (
        <FlexContainer col page justifyContentCenter alignItemsCenter>
            <div className={classes.lottieWrap}>
                <Lottie
                    animationData={notFoundLottie}
                    loop
                    play
                    rendererSettings={{
                        preserveAspectRatio: 'xMidYMid slice'
                    }}
                />
            </div>
            <div className={classes.textWrap}>
                <h1 className={classes.heading}>Oops!</h1>
                <h2>You've found a page that doesn't exist</h2>
            </div>
            {user && token ? (
                <Button
                    onClick={() => navigate(`/${user.storeUrl}/dashboard`)}
                    className={classes.button}
                    variant="contained"
                >
                    Home
                </Button>
            ) : (
                <Button
                    onClick={() => navigate('/account/login')}
                    className={classes.button}
                    variant="contained"
                >
                    Login
                </Button>
            )}
        </FlexContainer>
    );
};

export default NotFound;
