import { keyframes } from "@emotion/react";

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const flash = keyframes`
  0% {
		filter: brightness(100%);
	}

	50% {
		filter: brightness(90%);
	}

	100% {
		filter: brightness(100%);
	}
`;

const tableStyles = (theme) => ({
	grid: {
		"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
			outline: "none",
		},
		"&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
			outline: "none",
		},
		"&.MuiDataGrid-root": {
			// border: "1px solid transparent",
			// borderRadius: "15px",
		},
		"& .MuiDataGrid-main": {
			// boxShadow:
			// 	"rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
			// backgroundColor: "white",
		},
	},
	highlightedRow: {
		// backgroundColor: "#fff",
		filter: "brightness(100%)",

		animation: `${flash} 2s ease`,
		// animation: `${bounce} 2s ease`,
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default tableStyles;
