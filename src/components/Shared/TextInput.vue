<template>
  <input
    type="text"
    :value="modelValue"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
// use defineEmits to define the events that the component can emit
const emit = defineEmits(['update:modelValue'])

const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
