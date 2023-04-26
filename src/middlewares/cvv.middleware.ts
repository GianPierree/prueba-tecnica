export function validateCvv(cvv: number): boolean {
    const long = cvv.toString().length;
    return long >= 3 && long <= 4;
}