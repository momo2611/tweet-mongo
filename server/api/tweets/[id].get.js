import { getTweetById } from "~/server/db/tweets"
import { tweetTransformer } from "~/server/transformers/tweet"

export default defineEventHandler(async (e) => {
    const { id } = e.context.params

    const tweet = await getTweetById(id, {
        include: {
            author: true,
            mediaFile: true,
            replyTo: {
                include: {
                    author: true
                }
            },
            replies: {
                include: {
                    mediaFile: true,
                    author: true,
                    replyTo: {
                        include: {
                            author: true
                        }
                    }
                }
            }
        }
    })

    return {
        tweet: tweetTransformer(tweet)
    }
})