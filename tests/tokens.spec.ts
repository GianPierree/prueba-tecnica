import axios, { AxiosRequestConfig } from 'axios';

const url = 'http://localhost:3000/tokens';
const headers = { Authorization: 'Bearer pk_test_Rscc1245wErT' };
const data = {
    email: 'gian0291@gmail.com',
    card_number: 4111111111111111,
    cvv: 123,
    expiration_year: '2024',
    expiration_month: '09'
}

const config: AxiosRequestConfig = {
    headers: headers
};

describe('Tokens', () => {
    it('debe devolver un mensaje de token creado correctamente', async () => {

        const result = await axios.post(url, data, config);

        expect(result.status).toBe(200);
        expect(result.data.code).toBe('SUCCESS');
        expect(result.data.message).toBe('Token creado correctamente')
        expect(result.data).toHaveProperty('token')
    });
});



