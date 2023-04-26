export function validateTokenAuth(tokenAuth: string): boolean {
    const secret: Array<string> = tokenAuth.split("_");
    const pk: Array<string> = tokenAuth.split(" ");
    const long: number = pk[1].length;
    
    return long <= 20 && secret[1] === 'test';
}