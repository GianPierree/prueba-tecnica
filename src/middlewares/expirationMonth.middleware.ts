export function validateExpirationMonth(month: string): boolean {
    const long: number = month.length;
    const monthNumber: number = parseInt(month);
    return long === 2 && !isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12;
}