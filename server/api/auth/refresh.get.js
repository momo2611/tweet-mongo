import { sendError } from "h3"
import { getRefreshTokenByToken } from "~/server/db/refreshToken"
import { decodeRefreshToken, generateToken } from "~/server/utils/jwt"
import { getUserById } from "~/server/db/users"
export default defineEventHandler(async (e) => {
    const cookies = parseCookies(e)
    const refreshToken = cookies.refresh_token

    if (!refreshToken) {
        return sendError(e, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid!'
        }))
    }

    const rToken = await getRefreshTokenByToken(refreshToken)
    if (!rToken) {
        return sendError(e, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is expired!'
        }))
    }

    const token = decodeRefreshToken(refreshToken)

    try {
        const user = await getUserById(token.userId)
        const { accessToken } = generateToken(user)
        return { access_token: accessToken }
    } catch (error) {
        return sendError(e, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong!'
        }))
    }
})