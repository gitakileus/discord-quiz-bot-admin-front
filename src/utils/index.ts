export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
};

export const getOrdinal = (n: number) => {
	const ordinals = [
		"First",
		"Second",
		"Third",
		"Fourth",
		"Fifth",
		"Sixth",
		"Seventh",
		"Eighth",
		"Ninth",
		"Tenth",
		"Eleventh",
		"Twelfth",
		"Thirteenth",
		"Fourteenth",
		"Fifteenth",
		"Sixteenth",
		"Seventeenth",
		"Eighteenth",
		"Nineteenth",
		"Twentieth",
	];
	return ordinals[n];
};
