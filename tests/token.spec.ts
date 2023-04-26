import axios from 'axios';

const url = 'http://localhost:3000/token';
const data = {
    token: '96477f06-8291-4',
}

describe('Token', () => {
    it('debe devolver los datos del token', async () => {

        const result = await axios.post(url, data);

        expect(result.status).toBe(200);
        expect(result.data.code).toBe('SUCCESS');
        expect(result.data).toHaveProperty('email')
        expect(result.data).toHaveProperty('card_number')
        expect(result.data).toHaveProperty('expiration_year')
        expect(result.data).toHaveProperty('expiration_month')
    });
});



