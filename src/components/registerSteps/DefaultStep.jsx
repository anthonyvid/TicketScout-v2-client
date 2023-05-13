// hooks
import useClasses from "hooks/useClasses.js";

// Icons
import StoreIcon from "@mui/icons-material/Store";
import CheckIcon from "@mui/icons-material/Check";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

// Constants
import { registerTypes } from "constants/client.constants.js";

// Styles
import { cx } from "@emotion/css";
import defaultStepStyles from "styles/components/registerSteps/DefaultStep.style.js";

const DefaultStep = ({ accountType, setAccountType }) => {
	const userType = accountType === registerTypes.USER;
	const storeType = accountType === registerTypes.ORGANIZATION;

	const classes = useClasses(defaultStepStyles);
	return (
		<>
			<div className={classes.titleWrap}>
				<h1 className={classes.title}>Welcome! Let's Get Started</h1>
				<p className={classes.subtitle}>
					Choose the type of account you are creating
				</p>
			</div>
			<div className={classes.contentWrap}>
				<div
					onClick={() => setAccountType(0)}
					className={cx(classes.box, {
						[classes.selected]: userType,
					})}
				>
					<div
						className={cx(classes.circle, {
							[classes.circleActive]: userType,
						})}
					>
						<CheckIcon
							className={cx({
								[classes.hideCheck]: storeType,
							})}
						/>
					</div>
					<div className={classes.iconBox}>
						<AssignmentIndIcon
							sx={{ fontSize: "26px" }}
							className={classes.icon}
						/>
					</div>
					<div>
						<h2>Employee</h2>
						<p>You are joining a store</p>
					</div>
					<div className={classes.dummy} />
				</div>
				<div
					onClick={() => setAccountType(1)}
					className={cx(classes.box, {
						[classes.selected]: storeType,
					})}
				>
					<div
						className={cx(classes.circle, {
							[classes.circleActive]: storeType,
						})}
					>
						<CheckIcon
							className={cx({
								[classes.hideCheck]: userType,
							})}
						/>
					</div>
					<div className={classes.iconBox}>
						<StoreIcon
							sx={{ fontSize: "26px" }}
							className={classes.icon}
						/>
					</div>
					<div>
						<h2>Store</h2>
						<p>You are a store</p>
					</div>
					<div className={classes.dummy} />
				</div>
			</div>
		</>
	);
};

export default DefaultStep;
