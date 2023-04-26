export function validateExpirationYear(year: string): boolean {
    const long: number = year.length;
    const yearNumber: number = parseInt(year);
    const yearCurrent: number = new Date().getFullYear();
    const yearMax: number = yearCurrent + 5;
    return long <= 4 && !isNaN(yearNumber) && yearNumber >= yearCurrent && yearNumber <= yearMax;
}