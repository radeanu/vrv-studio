export const ruFormat = new Intl.NumberFormat('ru-RU', {});

export function formatDecimalNumber(number: number): string {
	return number.toString().replace('.', ',');
}
