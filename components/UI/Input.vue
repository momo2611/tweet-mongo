<template>
    <div>
        <label v-if="props.label" class="block pl-3 ml-px text-sm font-medium text-gray-700">
            {{ props.label }}
        </label>
        <div class="mt-1">
            <input :value="props.modelValue" @input="e => emits('update:modelValue', e.target.value)"
                class="block px-4 w-full border-gray-300 rounded-2xl shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                :type="props.type" :placeholder="props.placeholder">
        </div>
    </div>
</template>
<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: null
    }
})
</script>