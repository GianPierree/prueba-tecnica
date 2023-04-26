export function validateExpirationMonth(month: string): boolean {
    const long = month.length;
    const monthNumber = parseInt(month);
    return long === 2 && !isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12;
}