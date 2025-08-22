export const ruFormat = new Intl.NumberFormat('ru-RU', {});

export function formatDecimalNumber(number: number): string {
	return number.toString().replace('.', ',');
}

/**
 * Deeply compares two objects by their properties
 * @param obj1 - First object to compare
 * @param obj2 - Second object to compare
 * @returns true if objects are deeply equal, false otherwise
 */
export function deepEqual(obj1: any, obj2: any): boolean {
	// Handle null/undefined cases
	if (obj1 === obj2) return true;
	if (obj1 == null || obj2 == null) return false;

	// Check if both are objects
	if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

	// Handle Date objects
	if (obj1 instanceof Date && obj2 instanceof Date) {
		return obj1.getTime() === obj2.getTime();
	}

	// Handle Array objects
	if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
	if (Array.isArray(obj1)) {
		if (obj1.length !== obj2.length) return false;
		for (let i = 0; i < obj1.length; i++) {
			if (!deepEqual(obj1[i], obj2[i])) return false;
		}
		return true;
	}

	// Handle regular objects
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) return false;

	for (const key of keys1) {
		if (!keys2.includes(key)) return false;
		if (!deepEqual(obj1[key], obj2[key])) return false;
	}

	return true;
}
