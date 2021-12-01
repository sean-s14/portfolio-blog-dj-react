/**
 * This function checks your local storage for access & refresh tokens.
 * @param {string} [access_token_name="access_token"] The name in local storage for your access token
 * @param {string} [refresh_token_name="refresh_token"] The name in local storage for your refresh token
 * @return {boolean} True if both tokens found, otherwise false.
 */
export const IsAuthenticated: () => boolean = (access_token_name: string = "access_token", refresh_token_name: string = "refresh_token") => {
    const access_token: string | null = localStorage.getItem(access_token_name) || null;
    const refresh_token: string | null = localStorage.getItem(refresh_token_name) || null;

    if (access_token !== null && refresh_token !== null) {
        return true
    } else {
        return false
    }
}