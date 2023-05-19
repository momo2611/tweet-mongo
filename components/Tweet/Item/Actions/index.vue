<template>
    <div class="flex items-center justify-around w-full">

        <TweetItemActionsIcon color="blue" @on-click="emits('onCommentClick')" :size="size">
            <template v-slot:icon="{ classes }">
                <ChatBubbleLeftEllipsisIcon :class="classes" />
            </template>

            <template v-slot:default v-if="showStats">
                {{ props.tweet.repliesCount }}
            </template>
        </TweetItemActionsIcon>

        <TweetItemActionsIcon color="green" :size="size">
            <template v-slot:icon="{ classes }">
                <ArrowPathIcon :class="classes" />
            </template>

            <template v-slot:default v-if="showStats">
                {{ generateRanNum() }}
            </template>
        </TweetItemActionsIcon>

        <TweetItemActionsIcon color="red" :size="size">
            <template v-slot:icon="{ classes }">
                <HeartIcon :class="classes" />
            </template>

            <template v-slot:default v-if="showStats">
                {{ generateRanNum() }}
            </template>
        </TweetItemActionsIcon>

        <TweetItemActionsIcon color="yellow" :size="size">
            <template v-slot:icon="{ classes }">
                <ShareIcon :class="classes" />
            </template>

            <template v-slot:default v-if="showStats">
                {{ generateRanNum() }}
            </template>
        </TweetItemActionsIcon>

    </div>
</template>
<script setup>
import { ChatBubbleLeftEllipsisIcon, ArrowPathIcon, HeartIcon, ShareIcon } from "@heroicons/vue/24/outline"

const emits = defineEmits(['onCommentClick'])


const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    compact: {
        type: Boolean,
        default: false
    },
})

const showStats = computed(() => props.compact)
const size = computed(() => props.compact ? 5 : 8)

function generateRanNum() {
    return Math.floor(Math.random() * 100)
}

</script>