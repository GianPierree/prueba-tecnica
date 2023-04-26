export function validateCardNumber(cardNumber: number): boolean {
    const long = cardNumber.toString().length;
    if (long < 13 || long > 16) {
        return false;
    }

    let sum = 0;
    let double = false;

    for (let i = long - 1; i >= 0; i--) {
        let digit = Number(cardNumber.toString().charAt(i));

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