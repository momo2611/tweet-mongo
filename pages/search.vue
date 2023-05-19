<template>
    <div class="">
        <MainSection title="Search" :loading="loading">

            <Head>
                <Title>Search</Title>
            </Head>

            <TweetListFeed :tweets="searchTweets" />
        </MainSection>
    </div>
</template>
<script setup>
const { getTweets } = useTweet()

const loading = ref(false)
const searchTweets = ref([])
const searchQuery = useRoute().query.q

watch(() => useRoute().fullPath, () => getTweetsSearch())


onBeforeMount(() => {
    getTweetsSearch()
})

async function getTweetsSearch() {
    loading.value = true
    try {
        const { tweets } = await getTweets({
            query: searchQuery
        })
        searchTweets.value = tweets
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}

</script> 