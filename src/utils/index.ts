export const cloneObject = (src: any): any => {
	const dest = Array.isArray(src) ? [...src] : {...src};

	for (let key in dest) {
		const value = dest[key];
		typeof (value) === "object" &&
			value !== null &&
			(dest[key] = cloneObject(value));
	}

	return dest;
};

export const isValid = (value: any): any => (
		value !== undefined &&
		value !== null &&
		value !== NaN &&
		value !== Infinity &&
		value !== -Infinity
);