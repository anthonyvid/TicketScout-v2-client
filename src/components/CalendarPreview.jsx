// Icons
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

// Utils
import { getCurrentDate } from '~/utils/helper.js';

// Hooks
import useClasses from '~/hooks/useClasses.js';

// Styles
import calendarPreviewStyles from '~/styles/components/CalendarPreview.style.js';

const CalendarPreview = () => {
    const classes = useClasses(calendarPreviewStyles);
    return (
        <div className={classes.calendarPreview}>
            <CalendarMonthOutlinedIcon className={classes.calendarIcon} />
            <p className={classes.date}>{getCurrentDate()}</p>
        </div>
    );
};

export default CalendarPreview;
