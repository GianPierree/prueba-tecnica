import { APIGatewayProxyHandler, APIGatewayEvent } from 'aws-lambda';
import { validateEmail } from './middlewares/email.middleware';
import { validateCardNumber } from './middlewares/cardNumber.middleware';
import { validateCvv } from './middlewares/cvv.middleware';
import { validateExpirationMonth } from './middlewares/expirationMonth.middleware';
import { validateExpirationYear } from './middlewares/expirationYear.middleware';
import { generateToken } from './helpers/generateToken';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {

    let email: string
    let card_number: number
    let cvv: number
    let expiration_year: string
    let expiration_month: string
    let message: string
    let token: string

    try {
        if (event.body !== null && event.body !== undefined) {
            const body = JSON.parse(event.body);
            email = body.email
            card_number = body.card_number
            cvv = body.cvv
            expiration_year = body.expiration_year
            expiration_month = body.expiration_month

            token = await createToken(email, card_number, cvv, expiration_year, expiration_month)

            return {
                statusCode: 200,
                body: JSON.stringify({
                    email,
                    card_number,
                    cvv,
                    expiration_year,
                    expiration_month,
                    token
                }),
            };
        } else {
            throw { code: "ERROR_INVALID_BODY", message: 'Petición invalida.' }
        }
    } catch (e) {
        message = e.message
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: e.code,
                message
            }),
        };
    }
};

function createToken(email: string, card_number: number, cvv: number, expiration_year: string, expiration_month: string) {
    
    if (!validateEmail(email)) throw { code: "ERROR_INVALID_EMAIL", message: 'Correo invalido.' }
    if (!validateCardNumber(card_number)) throw { code: "ERROR_INVALID_CARD_NUMBER", message: 'Número de tarjeta invalido.' }
    if (!validateCvv(cvv)) throw { code: "ERROR_INVALID_CVV", message: 'CVV invalido.' }
    if (!validateExpirationMonth(expiration_month)) throw { code: "ERROR_INVALID_EXPIRATION_MONTH", message: 'Mes de expiración invalido.' }
    if (!validateExpirationYear(expiration_year)) throw { code: "ERROR_INVALID_EXPIRATION_YEAR", message: 'Año de expiración invalido.' }

    const token: string = generateToken()
    
    return token
}