export function formatDate(day: Date) {
	return day.toISOString().slice(0, 10);
}
