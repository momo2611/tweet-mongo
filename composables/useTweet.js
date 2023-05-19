export default () => {
    const usePostTweetModal = () => useState('post_tweet_modal', () => false)
    const useReplyTweet = () => useState('reply_tweet', () => null)

    const closePostTweetModal = () => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = false
    }

    const setReplyTo = (tweet) => {
        const replyTweet = useReplyTweet()
        replyTweet.value = tweet
    }

    const openPostTweetModal = (tweet = null) => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = true

        setReplyTo(tweet)
    }

    const postTweet = (formData) => {
        const form = new FormData()

        form.append('text', formData.text)
        form.append('replyTo', formData.replyTo)

        formData.mediaFiles.forEach((mediaFile, index) => {
            form.append('media_file_' + index, mediaFile)
        });

        return useFetchApi('/api/user/tweets', {
            method: 'POST',
            body: form
        })
    }
    const getTweets = (params = {}) => {
        return new Promise(async (res, rej) => {
            try {
                const response = await useFetchApi('/api/tweets', {
                    method: 'GET',
                    params
                })
                res(response)
            } catch (error) {
                rej(error)
            }
        })
    }

    const getTweetById = (tweetId) => {
        return new Promise(async (res, rej) => {
            try {
                const response = await useFetchApi(`/api/tweets/${tweetId}`, {
                    method: 'GET'
                })
                res(response)
            } catch (error) {
                rej(error)
            }
        })
    }

    return {
        postTweet,
        getTweets,
        getTweetById,
        closePostTweetModal,
        openPostTweetModal,
        usePostTweetModal,
        useReplyTweet
    }
}