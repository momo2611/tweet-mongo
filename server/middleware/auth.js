import UrlPattern from "url-pattern"
import { getUserById } from "../db/users"
import { decodeAccessToken } from "../utils/jwt"
import { sendError } from "h3"
export default defineEventHandler(async (e) => {
    const endpoints = [
        '/api/auth/user',
        '/api/user/tweets',
        '/api/tweets',
        '/api/tweets/:id',
    ]

    const isHandleByMiddleware = endpoints.some(endpoint => {
        const pattern = new UrlPattern(endpoint)

        return pattern.match(e.node.req.url)
    })

    if (!isHandleByMiddleware) {
        return
    }
    const token = e.node.req.headers['authorization']?.split(' ')[1]
    const decoded = decodeAccessToken(token)

    if (!decoded) {
        return sendError(e, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized!'
        }))
    }

    try {
        const userId = decoded.userId
        const user = await getUserById(userId)

        e.context.auth = { user }

    } catch (error) {
        return
    }
})