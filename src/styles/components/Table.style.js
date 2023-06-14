import { keyframes } from '@emotion/react';

const flash = keyframes`
    0% {
		filter: brightness(100%);
	}
	25% {
		filter: brightness(90%);
	}
	100% {
		filter: brightness(100%);
	}
`;

const tableStyles = (theme) => ({
    grid: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none'
        },
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none'
        },
        '&.MuiDataGrid-root': {
            // border: "1px solid transparent",
            borderRadius: '15px',
            width: '100%'
        },
        '& .MuiDataGrid-main': {
            boxShadow:
                'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
            backgroundColor: 'white'
        },
        a: {
            color: 'rgba(0, 0, 0, 0.87)'
        },
        '& .MuiDataGrid-footerContainer': {
            boxShadow:
                'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
            backgroundColor: 'white',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px'
        },
        '& .MuiDataGrid-columnHeaders': {
            color: 'black',
            fontSize: '14px'
        }
    },
    emptyTable: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        h2: {},
        p: {
            fontSize: '15px',
            marginTop: '5px',
            marginBottom: '20px',
            color: theme.palette.neutral.main
        }
    },
    highlightedRow: {
        backgroundColor: '#fff',
        filter: 'brightness(100%)',
        animation: `${flash} 2s ease`
    },
    toolbar: {
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
        boxShadow:
            'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .MuiButtonBase-root': {
            color: theme.palette.neutral.main
        },
        '& .MuiIconButton-colorError': {
            color: theme.palette.error.light
        }
    }
});

export default tableStyles;
