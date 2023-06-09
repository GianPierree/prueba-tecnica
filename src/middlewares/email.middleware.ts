export function validateEmail(email: string): boolean {
    const expresionRegular: RegExp = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.es)$/i;;
    return expresionRegular.test(email) && email.length <= 100;
}