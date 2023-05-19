import { removeRefreshToken } from "~/server/db/refreshToken"
import { sendRefreshToken } from "~/server/utils/jwt"
export default defineEventHandler(async (e) => {
    try {
        const cookies = useCookie(e)
        const refreshToken = cookies.refresh_token

        // remove refresh token
        removeRefreshToken(refreshToken)
    } catch (error) {

    }
    sendRefreshToken(e, null)
    return {
        message: 'Done'
    }
})