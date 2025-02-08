<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div @keydown.enter.prevent="handleSubmit">
    <div class="mb-7 sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="text-foreground mb-3 text-3xl text-white font-bold leading-9 tracking-tight lg:text-4xl"
      >
        {{ '欢迎回来 👋🏻' }}
      </h2>

      <p class="text-muted-foreground lg:text-md text-sm">
        <span class="text-muted-foreground text-white">
          {{ '请输入您的账户信息以开始管理您的项目' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const handleSubmit = () => {
  console.log('handleSubmit')
}
</script>
