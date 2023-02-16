import FlexContainer from "components/FlexContainer.jsx";
import { statusCodes } from "constants/statusCodes.constants.js";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setLogin } from "reducers/auth/index.js";
import { checkoutSuccess } from "services/stripe.service.js";
import checkoutSuccessStyles from "styles/pages/CheckoutSuccess.style.js";
import { createNotification } from "utils/notification.js";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import checkoutSuccessLottie from "../../assets/lotties/checkoutSuccess.json";
import checkoutErrorLottie from "../../assets/lotties/checkoutError.json";
import Lottie from "react-lottie-player";
import { Button, Skeleton } from "@mui/material";

const CheckoutSuccess = () => {
	const [user, setUser] = useState({});
	const [token, setToken] = useState(null);
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const classes = useClasses(checkoutSuccessStyles);
	const navigate = useNavigate();

	const handleToDashboard = () => {
		if (Object.keys(user).length < 1 || !user || !token) return;

		dispatch(
			setLogin({
				user,
				token,
			})
		);
	};

	useEffect(() => {
		async function getUser() {
			try {
				const response = await checkoutSuccess(
					searchParams.get("session_id")
				);
				console.log(response);

				if (response.status !== statusCodes.OK)
					throw new Error(
						response.data.message || response.statusText
					);

				setUser(response.data.user);
				setToken(response.data.token);
			} catch (error) {
				setUser(null);
				console.log(error.message);
				createNotification("error", error.message);
				console.error(error.message);
			}
		}

		if (Object.keys(user).length < 1 && searchParams.get("session_id")) {
			getUser();
		}
	}, []);

	if (!user) {
		return (
			<FlexContainer
				col
				page
				justifyContentCenter
				alignItemsCenter
				styles={classes.parent}
			>
				<div className={classes.errLottieWrap}>
					<Lottie
						animationData={checkoutErrorLottie}
						loop={false}
						play
						rendererSettings={{
							preserveAspectRatio: "xMidYMid slice",
						}}
					/>
				</div>
				<div className={classes.textWrap}>
					<h1 className={classes.failHeader}>
						We've Encountered an Issue
					</h1>
					<p className={classes.description}>
						Dont worry, your payment has been processed and is
						successful. Our systems are experiencing issues at the
						moment.
					</p>
					<Button
						className={classes.button}
						onClick={() =>
							navigate("/account/login", { replace: true })
						}
						variant="contained"
					>
						Back to Login
					</Button>
				</div>
			</FlexContainer>
		);
	}

	if (user && Object.keys(user).length < 1) {
		return (
			<FlexContainer
				col
				page
				justifyContentCenter
				alignItemsCenter
				styles={classes.parent}
			>
				<div className={classes.lottieWrap}>
					<Skeleton
						animation="wave"
						variant="circular"
						width={150}
						height={150}
					/>
				</div>
				<div className={classes.textWrap}>
					<Skeleton
						animation="wave"
						variant="rounded"
						height={40}
						style={{ width: "100%" }}
					/>
					<p className={classes.description}>
						<Skeleton
							animation="wave"
							variant="rounded"
							height={20}
							style={{ width: "80%", marginTop: "15px" }}
						/>
					</p>
					<Skeleton
						animation="wave"
						variant="rounded"
						height={60}
						style={{ width: "100%" }}
					/>
				</div>
			</FlexContainer>
		);
	}

	return (
		<FlexContainer
			col
			page
			justifyContentCenter
			alignItemsCenter
			styles={classes.parent}
		>
			<div className={classes.lottieWrap}>
				<Lottie
					animationData={checkoutSuccessLottie}
					loop={false}
					play
					rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
				/>
			</div>
			<div className={classes.textWrap}>
				<h1 className={classes.successHeader}>Payment Successful</h1>
				<p className={classes.description}>
					Your payment has been processed! Continue to your dashboard
					below.
				</p>
				{token ? (
					<Button
						endIcon={<ArrowRightAltIcon />}
						className={classes.button}
						onClick={handleToDashboard}
						variant="contained"
					>
						To Dashboard
					</Button>
				) : (
					<Button
						className={classes.button}
						onClick={() =>
							navigate("/account/login", { replace: true })
						}
						variant="contained"
					>
						Login
					</Button>
				)}
			</div>
		</FlexContainer>
	);
};

export default CheckoutSuccess;
