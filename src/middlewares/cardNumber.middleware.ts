export function validateCardNumber(cardNumber: number): boolean {
    const long: number = cardNumber.toString().length;
    if (long < 13 || long > 16) {
        return false;
    }

    let sum: number = 0;
    let double: boolean = false;

    for (let i = long - 1; i >= 0; i--) {
        let digit: number = Number(cardNumber.toString().charAt(i));

        if (double) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        double = !double;
    }

    return sum % 10 == 0;
}