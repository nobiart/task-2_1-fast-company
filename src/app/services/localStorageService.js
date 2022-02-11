const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id';

export const setTokens = ({ refreshToken, idToken, localId, expiresIn = 3600 }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};

export const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_KEY);
};

export const getTokenExpiresDate = () => {
    return localStorage.getItem(EXPIRES_KEY);
};

export const getUserId = () => {
    return localStorage.getItem(USERID_KEY);
};

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId
};

export default localStorageService;
