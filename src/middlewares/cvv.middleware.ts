export function validateCvv(cvv: number): boolean {
    const long: number = cvv.toString().length;
    return long >= 3 && long <= 4;
}