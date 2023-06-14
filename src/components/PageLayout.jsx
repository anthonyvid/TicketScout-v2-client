// Hooks
import { cx } from '@emotion/css';
import useClasses from '~/hooks/useClasses.js';

// Styles
import pageLayoutStyles from '~/styles/components/PageLayout.style.js';

const PageLayout = ({ children, row }) => {
    const classes = useClasses(pageLayoutStyles);
    return (
        <div className={cx(classes.page, { [classes.row]: row })}>
            {children}
        </div>
    );
};

export default PageLayout;
