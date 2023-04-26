export function validateExpirationYear(year: string): boolean {
    const long = year.length;
    const yearNumber = parseInt(year);
    const yearCurrent = new Date().getFullYear();
    const yearMax = yearCurrent + 5;
    return long <= 4 && !isNaN(yearNumber) && yearNumber >= yearCurrent && yearNumber <= yearMax;
}