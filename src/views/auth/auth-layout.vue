<script lang="ts" setup>
import logo from '@/assets/logo.svg'
</script>

<template>
  <div class="flex min-h-full flex-1 select-none overflow-x-hidden">
    <!-- <RouterView /> -->
    <!-- 头部 Logo 和应用名称 -->
    <div class="absolute left-0 top-0 z-10 flex flex-1">
      <div
        class="text-foreground lg:text-foreground ml-4 mt-4 flex flex-1 items-center sm:left-6 sm:top-6"
      >
        <img :alt="'appName'" :src="logo" class="mr-2" width="42" />
        <p class="text-xl font-medium text-white">
          {{ '爱通告' }}
        </p>
      </div>
    </div>
    <!-- 系统介绍 -->
    <div class="relative hidden w-0 flex-1 lg:block">
      <div class="bg-background-deep absolute inset-0 h-full w-full dark:bg-[#070709]">
        <div class="login-background absolute left-0 top-0 size-full"></div>
        <div class="flex-col-center -enter-x mr-20 h-full">
          <img :alt="'appName'" :src="logo" class="animate-float h-64 w-2/5" />

          <!-- <SloganIcon v-else :alt="appName" class="animate-float h-64 w-2/5" /> -->
          <div class="text-1xl text-white text-foreground mt-6 font-sans lg:text-2xl">
            {{ 'pageTitle' }}
          </div>
          <div class="dark:text-muted-foreground text-white mt-2">
            {{ 'pageDescription' }}
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧认证面板 -->
    <div
      class="min-h-full w-[34%] flex-1 flex-col-center bg-[#14161a] relative px-6 py-10 lg:flex-initial lg:px-8"
    >
      <RouterView v-slot="{ Component, route }">
        <Transition appear mode="out-in" name="slide-right">
          <KeepAlive :include="['Login']">
            <component
              :is="Component"
              :key="route.fullPath"
              class="enter-x mt-6 w-full sm:mx-auto md:max-w-md"
            />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped>
.login-background {
  background: linear-gradient(154deg, #07070915 30%, #006be633, #07070915 64%);
  filter: blur(100px);
}
.dark {
  .login-background {
    background: linear-gradient(154deg, #07070915 30%, #006be633, #07070915 64%);
    filter: blur(100px);
  }
}
</style>
