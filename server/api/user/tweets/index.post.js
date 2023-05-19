import formidable from "formidable"
import { createTweet } from "~/server/db/tweets"
import { tweetTransformer } from "~/server/transformers/tweet"
import { createMediaFile } from "~/server/db/mediaFiles"
import { uploadToCloudinary } from "~/server/utils/cloudinary"
export default defineEventHandler(async (e) => {
    const form = formidable({})

    const response = await new Promise((res, rej) => {
        form.parse(e.node.req, (err, fields, files) => {
            if (err) {
                rej(err)
            }
            res({ fields, files })
        })
    })

    const { fields, files } = response
    const userId = e.context?.auth?.user?.id

    const tweetData = {
        text: fields.text,
        authorId: userId
    }

    const replyTo = fields.replyTo

    if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') {
        tweetData.replyToId = replyTo
    }

    const tweet = await createTweet(tweetData)

    const filePromises = Object.keys(files).map(async key => {
        const file = files[key]

        const cloudinaryResource = await uploadToCloudinary(file.filepath)


        return createMediaFile({
            url: cloudinaryResource.secure_url,
            providerPublicId: cloudinaryResource.public_id,
            userId: userId,
            tweetId: tweet.id
        })
    })

    await Promise.all(filePromises)


    return {
        tweet: tweetTransformer(tweet)
    }
})