import Logo from "assets/svg/Logo.js";
import useClasses from "hooks/useClasses.js";
import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import sidebarMenuStyles from "styles/components/SidebarMenu.style.js";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { cx } from "@emotion/css";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { setMode, toggleSidebarState } from "reducers/auth/index.js";
import MenuIcon from "@mui/icons-material/Menu";
const SidebarMenu = () => {
	const classes = useClasses(sidebarMenuStyles);
	const navigate = useNavigate();
	const location = useLocation();
	const currentPage = location.pathname.split("/")[2];

	const { user, sidebarState } = useSelector((state) => state.authReducer);

	const dispatch = useDispatch();
	const [activeItem, setActiveItem] = useState(currentPage);
	const [mobileMenuState, setMobileMenuState] = useState(false);

	const generalItems = [
		{
			name: "Dashboard",
			key: "dashboard",
			icon: <DashboardIcon />,
			link: `/${user.storeUrl}/dashboard`,
		},
		{
			name: "Tickets",
			key: "tickets",
			icon: <ConfirmationNumberIcon />,
			link: `/${user.storeUrl}/tickets`,
		},
	];

	return (
		<>
			<div
				className={cx(classes.sidebar, {
					[classes.sidebarClosed]: !sidebarState,
				})}
			>
				<div className={classes.sidebarToggleBG}>
					<div
						className={classes.sidebarToggleWrap}
						onClick={() => {
							dispatch(toggleSidebarState(sidebarState));
						}}
					>
						{!sidebarState ? (
							<KeyboardArrowRightIcon
								className={classes.arrowIcon}
							/>
						) : (
							<KeyboardArrowLeftIcon
								className={classes.arrowIcon}
							/>
						)}
					</div>
				</div>
				<div
					className={cx(classes.logoWrap, {
						[classes.logoWrapSmall]: !sidebarState,
					})}
				>
					<Logo width="50px" height="50px" />
					{sidebarState && <h3>TicketScout</h3>}
				</div>
				<div className={classes.generalWrap}>
					{generalItems.map(({ name, icon, link, key }) => {
						return (
							<div
								key={key}
								className={cx(classes.menuItem, {
									[classes.menuItemSmall]: !sidebarState,
									[classes.activeItem]: activeItem === key,
								})}
								onClick={() => {
									if (activeItem !== key) {
										setActiveItem(key);
										navigate(link);
									}
								}}
							>
								{activeItem === key && (
									<div className={classes.activeIndicator} />
								)}
								{icon}
								{sidebarState && name}
							</div>
						);
					})}
				</div>
			</div>
			{/* <div className={cx(classes.mobileMenuWrap)}>
				<div
					className={classes.menuBtn}
					onClick={() => setMobileMenuState(!mobileMenuState)}
				>
					<MenuIcon />
				</div>
				{mobileMenuState && <div className={classes.mobileMenu}>
                    </div>}
			</div> */}
		</>
	);
};

export default SidebarMenu;
