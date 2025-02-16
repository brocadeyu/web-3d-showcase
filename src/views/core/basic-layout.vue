<script setup lang="ts"></script>
<template>
  <div class="flex min-h-full flex-1 select-none overflow-x-hidden">
    <div
      class="min-h-full w-[224px] flex-1 flex-col-center relative px-3 py-5 lg:flex-initial lg:px-4"
      style="
        background: linear-gradient(to right, #3e3e3e, #131313);
        border-right: 1px solid #2f2f2f;
      "
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
