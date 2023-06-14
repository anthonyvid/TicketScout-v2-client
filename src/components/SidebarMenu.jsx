import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// Icons
import Logo from '~/assets/svg/Logo.jsx';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

// Hooks
import useClasses from '~/hooks/useClasses.js';

// Styles
import { cx } from '@emotion/css';
import sidebarMenuStyles from '~/styles/components/SidebarMenu.style.js';

// Reducers
import { toggleSidebarState } from '~/reducers/auth/index.js';
import { Tooltip } from '@mui/material';

const SidebarMenu = () => {
    const classes = useClasses(sidebarMenuStyles);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPage = location.pathname.split('/')[2];

    const { user, sidebarState } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();
    const [activeItem, setActiveItem] = useState(currentPage);

    const generalItems = [
        {
            name: 'Dashboard',
            key: 'dashboard',
            icon: <DashboardIcon />,
            link: `/${user.storeUrl}/dashboard`
        },
        {
            name: 'Tickets',
            key: 'tickets',
            icon: <ConfirmationNumberIcon />,
            link: `/${user.storeUrl}/tickets`
        }
    ];

    return (
        <>
            <div
                className={cx(classes.sidebar, {
                    [classes.sidebarClosed]: !sidebarState
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
                            <Tooltip position="left" arrow title="expand">
                                <KeyboardArrowRightIcon
                                    className={classes.arrowIcon}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip position="left" arrow title="contract">
                                <KeyboardArrowLeftIcon
                                    className={classes.arrowIcon}
                                />
                            </Tooltip>
                        )}
                    </div>
                </div>
                <div
                    className={cx(classes.logoWrap, {
                        [classes.logoWrapSmall]: !sidebarState
                    })}
                >
                    <Logo width="40px" height="40px" />
                    {sidebarState && <h3>TicketScout</h3>}
                </div>
                <div className={classes.generalWrap}>
                    {generalItems.map(({ name, icon, link, key }) => {
                        return (
                            <Tooltip
                                title={!sidebarState ? name : ''}
                                position="left"
                                arrow
                                key={key}
                            >
                                <div
                                    key={key}
                                    className={cx(classes.menuItem, {
                                        [classes.menuItemSmall]: !sidebarState,
                                        [classes.activeItem]: activeItem === key
                                    })}
                                    onClick={() => {
                                        if (activeItem !== key) {
                                            setActiveItem(key);
                                            navigate(link);
                                        }
                                    }}
                                >
                                    {activeItem === key && (
                                        <div
                                            className={classes.activeIndicator}
                                        />
                                    )}
                                    {icon}
                                    {sidebarState && name}
                                </div>
                            </Tooltip>
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
