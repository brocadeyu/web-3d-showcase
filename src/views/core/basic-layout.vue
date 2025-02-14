<script setup lang="ts"></script>
<template>
  <div class="flex min-h-full flex-1 select-none overflow-x-hidden">
    <div
      class="min-h-full w-[224px] flex-1 flex-col-center bg-[white] relative px-3 py-5 lg:flex-initial lg:px-4"
    ></div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <div></div>
      <div></div>
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
