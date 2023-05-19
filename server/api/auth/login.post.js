import { getUserByUsername } from "~/server/db/users"
import bcrypt from "bcrypt"
import { generateToken, sendRefreshToken } from "~/server/utils/jwt"
import { userTransformer } from "~/server/transformers/user"
import { createRefreshToken } from "~/server/db/refreshToken"
import { sendError } from "h3"
export default defineEventHandler(async (e) => {
    const body = await readBody(e)

    const { username, password } = body

    if (!username || !password) {
        return sendError(e, createError({
            statusCode: 400,
            statusMessage: 'Invalid params!'
        }))
    }

    // is user regist
    const user = await getUserByUsername(username)
    if (!user) {
        return sendError(e, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid!'
        }))
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return sendError(e, createError({
            statusCode: 400,
            statusMessage: 'Password is not match!'
        }))
    }
    // generate token
    // access token
    // refresh token
    const { accessToken, refreshToken } = generateToken(user)

    // save inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })
    // add http only cookie
    sendRefreshToken(e, refreshToken)

    return {
        access_token: accessToken,
        user: userTransformer(user)
    }
})

