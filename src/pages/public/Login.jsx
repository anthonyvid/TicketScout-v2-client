import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Services
import { login } from '~/services/auth.service.js';

// Utils
import { createNotification } from '~/utils/notification.js';

// Hooks
import useClasses from '~/hooks/useClasses.js';

// Reducers
import { setLogin } from '~/reducers/auth/index.js';

// Components
import FlexContainer from '~/components/FlexContainer.jsx';
import { Button, CircularProgress } from '@mui/material';
import TextInput from '~/components/TextInput.jsx';

// Icons
import Logo from '~/assets/svg/Logo.jsx';

// Constants
import { loginSchema, statusCodes } from '~/constants/client.constants.js';

// Styles
import loginStyles from '~/styles/pages/Login.style.js';

const Login = () => {
    const classes = useClasses(loginStyles);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);
    const [searchParams, setSearchParams] = useSearchParams();
    const isMobile = width <= 768;

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    const {
        control,
        handleSubmit,
        reset,
        setFocus,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange',
        resolver: yupResolver(loginSchema)
    });

    const sendLoginRequest = useCallback(
        async (data) => {
            setLoading(true);
            try {
                const response = await login(data);

                if (response.status !== statusCodes.OK) {
                    setFocus('email');
                    if (response.data.key === 'no_account') reset();
                    throw new Error(
                        response.data.message || response.statusText
                    );
                }
                reset();
                dispatch(
                    setLogin({
                        user: response.data.user,
                        token: response.data.token
                    })
                );
                navigate(`/${response.data.user.storeUrl}/dashboard`);
            } catch (error) {
                createNotification('error', error.message);
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        },
        [loading]
    );

    useEffect(() => {
        const from = searchParams.get('from');
        const email = searchParams.get('email');

        if (from === 'checkout') {
            createNotification(
                'info',
                'Your account has been created and your current plan is Basic.'
            );
            searchParams.delete('from');
        }

        if (email) {
            setValue('email', email);
            searchParams.delete('email');
        }
        setSearchParams(searchParams);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return (
        <FlexContainer page justifyContentCenter alignItemsCenter col>
            <form
                onSubmit={handleSubmit(sendLoginRequest)}
                className={classes.loginFormWrap}
            >
                <FlexContainer
                    gap="15px"
                    justifyContentCenter
                    alignItemsCenter
                    col
                >
                    <div className={classes.logoWrap}>
                        <Logo />
                    </div>
                    <div>
                        <h1 className={classes.heading}>
                            <strong>Account Log In</strong>
                        </h1>
                        <h3 className={classes.subheading}>
                            Welcome back! Please enter your details.
                        </h3>
                    </div>
                    <TextInput
                        staticLabel
                        autoFocus={!isMobile}
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        control={control}
                        errors={errors}
                    />
                    <TextInput
                        altLabel
                        staticLabel
                        fullWidth
                        peekPassword
                        label="Password"
                        name="password"
                        type="password"
                        control={control}
                        errors={errors}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        className={classes.submitBtn}
                    >
                        {loading ? <CircularProgress /> : 'Submit'}
                    </Button>
                </FlexContainer>
                <div className={classes.signUp}>
                    Dont have an account yet? &nbsp;&nbsp;
                    <Link tabIndex="-1" to="/account/register">
                        Sign up
                    </Link>
                </div>
            </form>
        </FlexContainer>
    );
};

export default Login;
