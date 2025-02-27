<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import Adaptor from '@/scene/core/Adaptor'

const adaptor = shallowRef<Adaptor>()
const sceneList = ref<string[]>([])

onMounted(async () => {
  adaptor.value = new Adaptor()
  await initSceneMenus()
})
const initSceneMenus = async () => {
  if (adaptor.value) {
    const scenes = await adaptor.value.loadCesiumSceneList()
    sceneList.value = scenes
  }
}

const handleClickItem = (i: string) => {
  adaptor.value?.triggerScene(i)
}
</script>
<template>
  <div class="flex min-h-full select-none overflow-x-hidden bg-black">
    <div
      class="min-h-full w-[224px] flex-1 flex-col-start relative px-3 py-5 lg:flex-initial lg:px-4 box-border"
      style="
        /* background: linear-gradient(to right, #3e3e3e, #131313); */
        background-color: #27272a80;
        border-right: 1px solid #27272a;
      "
    >
      <div
        class="leftBtn"
        v-for="(item, index) in sceneList"
        @click="handleClickItem(item)"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <div
      class="hidden lg:flex flex-col"
      style="
        width: calc(100vw - 224px - 40px);
        height: calc(100vh - 40px);
        margin: 20px;
        border-radius: 6px;
        background-color: #27272a80;
        border: 1px solid #27272a;
        box-sizing: border-box;
      "
      id="sceneContainer"
    ></div>
  </div>
</template>
<style scoped>
.leftBtn {
  border: 1px solid gray;
  margin-top: 5px;
  border-radius: 3px;
  box-sizing: border-box;
  padding-left: 10px;
  color: white;
}
</style>
