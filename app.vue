<template>
  <div :class="{ 'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">

      <UILoadingPage v-if="isAuthLoading" />

      <!-- app -->
      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- Left side bar -->
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft :user="user" @on-tweet="handleOpenTweetModal" @on-logout="handleUserLogOut" />
            </div>
          </div>
          <!-- Main content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>
          <!-- Right side bar -->
          <div class=" hidden col-span-12 md:block md:col-span-3 xs-col-span-1 xl:col-span-4">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>

        </div>
      </div>

      <AuthPage v-else />

      <UIModal :isOpen="postTweetModal" @on-close="handleModalClose">
        <TweetForm :replyTo="replyTweet" showReply :user="user" @onSuccess="handleFormSuccess" />
      </UIModal>

    </div>
  </div>
</template>


<script setup>
const darkMode = ref(false)
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweet()
const isAuthLoading = useAuthLoading()
const user = useAuthUser()

const postTweetModal = usePostTweetModal()
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet)
})
emitter.$on('toggleDarkMode', () => darkMode.value = !darkMode.value)

onBeforeMount(() => {
  initAuth()
})

function handleFormSuccess(tweet) {
  closePostTweetModal()

  navigateTo({
    path: `/status/${tweet.id}`
  })
}

function handleModalClose() {
  closePostTweetModal()
}

function handleOpenTweetModal() {
  openPostTweetModal(null)
}

function handleUserLogOut() {
  logout()
}

</script>