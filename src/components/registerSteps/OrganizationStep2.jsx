import { cx } from "@emotion/css";
import useClasses from "hooks/useClasses.js";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OrganizationStep2Styles from "styles/components/registerSteps/OrganizationStep2.style.js";
import { planTypes } from "constants/register.constants.js";
import { planInfo } from "constants/register.constants.js";
const OrganizationStep2 = ({ setSubscriptionType, subscriptionType }) => {
	const classes = useClasses(OrganizationStep2Styles);
	return (
		<>
			<div className={classes.titleWrap}>
				<h1 className={classes.title}>Plans & Pricing</h1>
				<p className={classes.subtitle}>
					Choose the type of plan for your store
				</p>
			</div>
			<div className={classes.contentWrap}>
				<Subscription
					setSubscriptionType={setSubscriptionType}
					subscriptionType={subscriptionType}
					type={planTypes.BASIC}
				/>
				<Subscription
					setSubscriptionType={setSubscriptionType}
					subscriptionType={subscriptionType}
					type={planTypes.STANDARD}
				/>
				<Subscription
					setSubscriptionType={setSubscriptionType}
					subscriptionType={subscriptionType}
					type={planTypes.PRO}
				/>
			</div>
		</>
	);
};

const Subscription = ({ setSubscriptionType, subscriptionType, type }) => {
	const classes = useClasses(OrganizationStep2Styles);
	return (
		<div
			onClick={() => setSubscriptionType(type)}
			className={cx(classes.box, {
				[classes.selected]: subscriptionType === type,
			})}
		>
			<div
				className={cx(classes.circle, {
					[classes.circleActive]: subscriptionType === type,
				})}
			>
				<CheckIcon
					className={cx({
						[classes.hideCheck]: subscriptionType !== type,
					})}
				/>
			</div>
			<h2>{planInfo[type].name}</h2>
			<div className={classes.perkWrap}>
				{planInfo[type].perks.map((perk, i) => {
					return (
						<div key={i} className={classes.perkItem}>
							<CheckCircleOutlineIcon
								className={classes.perkIcon}
							/>
							<p>{perk}</p>
						</div>
					);
				})}
			</div>
			<div className={classes.priceWrap}>
				<h3>{planInfo[type].price}</h3>
				{type !== planTypes.BASIC && <p>CAD/month</p>}
			</div>
		</div>
	);
};

export default OrganizationStep2;
