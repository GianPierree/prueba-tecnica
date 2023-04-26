import { APIGatewayProxyHandler, APIGatewayEvent } from 'aws-lambda';
import { client } from './databases/config'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    let message: string
    let token: string

    try {
        if (event.body !== null && event.body !== undefined) {
            const body = JSON.parse(event.body);
            token = body.token
            let result: string | null = await showToken(token)
            if(result === null || result === undefined) throw { code: "ERROR_INVALID_TOKEN", message: 'El token no existe o expiró.' }
            return {
                statusCode: 200,
                body: JSON.stringify({
                    code: 'SUCCESS',
                    email: JSON.parse(result).email,
                    card_number: JSON.parse(result).card_number,
                    expiration_year: JSON.parse(result).expiration_year,
                    expiration_month: JSON.parse(result).expiration_month,
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

async function showToken(key: string): Promise<string | null> {
    await client.connect();
    let result: string | null = await client.get(key);
    if(result === null || result === undefined) throw { code: "ERROR_INVALID_TOKEN", message: 'El token no existe o expiró.' }
    await client.disconnect();
    return result;
}