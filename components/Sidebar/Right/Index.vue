<template>
    <div class="flex flex-col">
        <!-- Search -->
        <div class="relative m-2">
            <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
                <div class="w-6 h-6">
                    <MagnifyingGlassIcon @click="handleSearch" />
                </div>
            </div>
            <input v-model="search"
                class="flex items-center w-full pl-12 text-sm text-black dark:text-gray-100 
            bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
                type="text" placeholder="#1. US news">
        </div>
        <!-- Preview card: Now -->
        <SidebarRightPreviewCard title="What's happening">
            <SidebarRightPreviewCardItem v-for="what in whatItems" :key="what.whatId">
                <div class="">
                    <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ what.title }}</h2>
                    <p class="text-xs text-gray-400">{{ what.count }}</p>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>
        <!-- Preview card: Who -->
        <SidebarRightPreviewCard title="Who to follow">
            <SidebarRightPreviewCardItem v-for="who in whoItems" :key="who.whoId">
                <div class="flex flex-row items-center justify-between p-2">
                    <div class="flex flex-row">
                        <img class="w-10 h-10 rounded-full" :src="who.image" :alt="who.name">

                        <div class="flex flex-col ml-2">
                            <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ who.name }}</h1>
                            <p class="text-xs text-gray-400">{{ who.handle }}</p>
                        </div>
                    </div>
                    <div class="flex h-full">
                        <button
                            class="px-4 py-2 font-bold text-xs text-white bg-black dark:text-black dark:bg-white rounded-full">Follow</button>
                    </div>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <footer>
            <ul class="mx-2 my-2 text-xs text-gray-500">
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline" @click.prevent="toggleDarkMode">Dark mode</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Privacy</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Cookie</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Ads info</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Accessability</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">More</a>
                </li>
                <li class="inline-block mx-2">
                    © 2023 Twitter, Inc.
                </li>
            </ul>
        </footer>

    </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
const search = ref('')
const emitter = useEmitter()

const whatItems = ref([
    {
        title: 'MTP',
        count: '20.2k Tweets'
    },
    {
        title: '#MakingMyWay',
        count: '16.2k Tweets'
    },
    {
        title: '#GAM',
        count: '22.2k Tweets'
    },
])
const whoItems = ref([
    {
        name: 'MTP',
        handle: '@user231231412',
        image: 'https:/picsum.photos/200/200'
    },
    {
        name: 'Levi',
        handle: '@user231254466',
        image: 'https:/picsum.photos/200/200'
    },
    {
        name: 'Faker',
        handle: '@user234563976',
        image: 'https:/picsum.photos/200/200'
    },
])

function handleSearch() {
    useRouter().push({
        path: '/search',
        query: {
            q: search.value
        }
    })
}

function toggleDarkMode() {
    emitter.$emit('toggleDarkMode')
}
</script>