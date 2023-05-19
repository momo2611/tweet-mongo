<template>
    <div class="space-y-4 mb-4">
        <UIInput label="Username" placeholder="@starwar2331" v-model="data.username" />

        <UIInput type="password" label="Password" placeholder="*******" v-model="data.password" />

        <div>
            <button @click="handleLogin" :disabled="isButtonDisabled"
                class="text-gray-800 dark:text-white dark:hover:bg-slate-800 hover:bg-gray-300">Login</button>
        </div>
    </div>
</template>
<script setup>

const data = reactive({
    username: '',
    password: '',
    loading: false
})
async function handleLogin() {
    const { login } = useAuth()

    data.loading = true
    try {
        await login({
            username: data.username,
            password: data.password
        })
    } catch (error) {
        console.log(error);
    } finally {
        data.loading = false
    }
}

const isButtonDisabled = computed(() => {
    return (!data.username || !data.password) || (data.loading)
})
</script>
<style scoped>
button {
    width: 300px;
    height: 40px;
    background-color: #fff;
    outline: none;
    font-weight: bold;
    border: 1px solid rgb(211, 210, 210);
    border-radius: 20px;
    justify-content: center;
}
</style>