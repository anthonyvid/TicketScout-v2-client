import useClasses from "hooks/useClasses.js";
import React from "react";
import OtpCodeStyles from "styles/components/OtpCode.style.js";
const OtpInput = ({ code, setCode }) => {
	const classes = useClasses(OtpCodeStyles);
	const handleChange = (element, index) => {
		if (isNaN(element.value)) return false;

		setCode((code) => [
			...code.map((data, i) => (i === index ? element.value : data)),
		]);

		if (element.nextSibling) element.nextSibling.focus();
	};

	const onPaste = (e) => {
		const pastedCode = e.clipboardData
			.getData("text/plain")
			.split("")
			.slice(0, code.length);

		if (pastedCode.every((element) => !isNaN(element))) setCode(pastedCode);
	};

	const handleKeyDown = (e, index) => {
		if (e.key == "Backspace") {
			if (e.target.value) {
				e.target.value = "";
				setCode((code) => [
					...code.map((data, i) => (i === index ? "" : data)),
				]);
				return;
			}

			if (e.target.previousElementSibling) {
				e.target.previousElementSibling.focus();
				e.preventDefault();
			}
		}

		if (e.key == "ArrowLeft" && e.target.previousElementSibling) {
			e.target.previousElementSibling.focus();
		}
		if (e.key == "ArrowRight" && e.target.nextSibling) {
			e.target.nextSibling.focus();
		}
	};

	return (
		<>
			{code.map((data, i) => {
				return (
					<input
						className={classes.codeInput}
						type="text"
						maxLength="1"
						key={i}
						value={data}
						onPaste={onPaste}
						autoFocus={i === 0}
						onChange={(e) => handleChange(e.target, i)}
						onFocus={(e) => e.target.select()}
						onKeyDown={(e) => handleKeyDown(e, i)}
					/>
				);
			})}
		</>
	);
};

export default OtpInput;
