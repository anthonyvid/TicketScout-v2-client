import PropTypes from "prop-types";

// Components
import {
	Sparklines,
	SparklinesBars,
	SparklinesCurve,
	SparklinesLine,
	SparklinesReferenceLine,
	SparklinesSpots,
} from "react-sparklines";

// Hooks
import useClasses from "hooks/useClasses.js";

// Styles
import graphStyles from "styles/components/Graph.style.js";

const Graph = ({
	data,
	color,
	refLineType,
	hideRefLine,
	type,
	xAxisLabels,
	limit,
	width,
	height,
	margin,
}) => {
	const classes = useClasses(graphStyles);
	const getGraphType = () => {
		switch (type) {
			case "line":
				return <SparklinesLine color={color} />;
			case "curve":
				return <SparklinesCurve color={color} />;
			case "bar":
				return <SparklinesBars color={color} />;
		}
	};

	return (
		<>
			<Sparklines
				data={data}
				limit={limit}
				width={width}
				height={height}
				margin={margin}
			>
				{getGraphType()}
				{!hideRefLine && (
					<SparklinesReferenceLine
						type={refLineType}
						style={{
							stroke: color,
							strokeOpacity: "0.75",
							strokeDasharray: "2, 2",
						}}
					/>
				)}
				<SparklinesSpots spotColors={{ 0: color }} />
			</Sparklines>
			{xAxisLabels && (
				<div className={classes.xAxis}>
					{data.map((value, index) => (
						<div key={index}>{xAxisLabels[index]}</div>
					))}
				</div>
			)}
		</>
	);
};

Graph.defaultProps = {
	refLineType: "mean",
	hideRefLine: false,
	curve: false,
	type: "line",
};

Graph.propTypes = {
	data: PropTypes.array.isRequired,
	xAxisLabels: PropTypes.array,
	color: PropTypes.string,
	refLineType: PropTypes.oneOf(["mean", "median", "min", "max"]),
	type: PropTypes.oneOf(["line", "curve", "bar"]),
	hideRefLine: PropTypes.bool,
	curve: PropTypes.bool,
	limit: PropTypes.number,
	width: PropTypes.string,
	height: PropTypes.string,
	margin: PropTypes.number,
};

export default Graph;
