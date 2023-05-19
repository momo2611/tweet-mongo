<template>
    <div class="">
        <MainSection title="Tweet" :loading="loading">

            <Head>
                <Title></Title>
            </Head>

            <TweetDetail :user="user" :tweet="tweet" />
        </MainSection>
    </div>
</template>
<script setup>
const loading = ref(false)
const tweet = ref(null)

const { getTweetById } = useTweet()
const { useAuthUser } = useAuth()
const user = useAuthUser()

watch(() => useRoute().fullPath, () => getTweet())

function getTweetIdFromRoute() {
    return useRoute().params.id
}

async function getTweet() {
    loading.value = true
    try {
        const res = await getTweetById(getTweetIdFromRoute())
        tweet.value = res.tweet
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}
onBeforeMount(() => {
    getTweet()
})
</script>