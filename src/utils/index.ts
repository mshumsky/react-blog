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

export const queryParamsToObject = (hash: string): {[key: string]: any;} => {
	const result: {[key: string]: any;} = {};
	const cleanHash: string = hash = hash.trim().replace(/[#?]/ig, "");

	cleanHash.split("&").forEach((param: string) => {
		if (!param) return;
		const haveEqual: number = param.indexOf("=");
		if (haveEqual < 0)
			result[param] = true;
		else {
			const split: Array<string> = param.split("=");
			let value: any;
			try {value = JSON.parse(split[1]);}
			catch (err) {value = split[1];}
			result[split[0]] = value;
		}
	});

	return result;
};

export const stringifyMatch = (src: any, dst: any) => JSON.stringify(src) === JSON.stringify(dst);