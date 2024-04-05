import { decodeJwt, SignJWT, JWTPayload } from 'jose';

const secret = new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2');

export function setStorageToken(token: string, remember: boolean) {
    if (remember) {
        localStorage.setItem('token', token);
        return;
    }
    sessionStorage.setItem('token', token);
}

export async function getStorageToken() {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) return null;

    const decodedToken = decodeJwt(token);

    if (decodedToken.exp) {
        const expirationDate = new Date(decodedToken.exp);

        const remainingTime = expirationDate.getTime() - new Date().getTime();

        if (remainingTime < 0) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            return null;
        }

        const isLocalStorage = !!localStorage.getItem('token');
        const refreshInterval = isLocalStorage
            ? parseInt(process.env.LOCAL_REFRESH || '0')
            : parseInt(process.env.SESSION_REFRESH || '0');

        if (refreshInterval > remainingTime) {
            const expirationTime = isLocalStorage ? process.env.LOCAL_EXPIRATION : process.env.SESSION_EXPIRATION;

            token = await createToken(decodedToken, parseInt(expirationTime || '0'));
            setStorageToken(token, isLocalStorage);
        }
    }

    return token;
}

export function clearStorageToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
}

export async function createToken(payload: JWTPayload, expirationTime: number) {
    const alg = 'HS256';

    return await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setExpirationTime(new Date().getTime() + expirationTime)
        .sign(secret);
}
