import PropTypes from 'prop-types';

// Hooks
import useClasses from '~/hooks/useClasses.js';

// Components
import FlexContainer from './FlexContainer.jsx';

// Styles
import headerStyles from '~/styles/components/Header.style.js';

const Header = ({}) => {
    const classes = useClasses(headerStyles);
    return <FlexContainer styles={classes.headerContainer}></FlexContainer>;
};

Header.defaultProps = {
    showLogo: true,
    showMenu: false,
    showRegister: false,
    showLogin: false
};

Header.propTypes = {
    showLogo: PropTypes.bool,
    showMenu: PropTypes.bool,
    showRegister: PropTypes.bool,
    showLogin: PropTypes.bool
};

export default Header;
