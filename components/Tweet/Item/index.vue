<template>
    <div>

        <TweetItemHeader :tweet="props.tweet" />

        <div :class="tweetBodyWrapper">
            <p class="flex-shrink font-medium text-gray-800 w-auto dark:text-white" :class="textSize">
                {{ props.tweet.text }}
            </p>

            <div class="flex my-3 mr-2 border-2 rounded-2xl" v-for="image in tweet.mediaFile" :key="image.id"
                :class="twitterBorderColor">
                <img :src="image.url" class="w-full rounded-2xl" />
            </div>

            <div class="mt-2" v-if="!props.hideActions">
                <TweetItemActions :tweet="props.tweet" :compact="props.compact" @on-comment-click="handleCommentClick" />
            </div>
        </div>
    </div>
</template>
<script setup>
const { twitterBorderColor } = useTailwindConfig()
const emitter = useEmitter()
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    compact: {
        type: Boolean,
        default: false
    },
    hideActions: {
        type: Boolean,
        default: false
    }
})

const tweetBodyWrapper = computed(() => props.compact ? 'ml-16' : 'ml-2 mt-4')
const textSize = computed(() => props.compact ? 'text-base' : 'text-2xl')

function handleCommentClick() {
    emitter.$emit('replyTweet', props.tweet)
}
</script>