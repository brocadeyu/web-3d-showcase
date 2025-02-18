<script setup lang="ts">
import SceneManager from '@/scene/core/SceneManager'
import { onMounted, ref } from 'vue'
import { loadScenes } from '@/scene'
onMounted(async () => {
  const scene = new SceneManager(document.getElementById('three') as HTMLElement)
  scene.render()
  const scenes = await loadScenes()
  const list: string[] = []
  Object.values(scenes).forEach((i) => {
    list.push(i.sceneName)
  })
  sceneList.value = list
})
const sceneList = ref<string[]>([])
</script>
<template>
  <div class="flex min-h-full flex-1 select-none overflow-x-hidden">
    <div
      class="min-h-full w-[224px] flex-1 flex-col-start relative px-3 py-5 lg:flex-initial lg:px-4"
      style="
        background: linear-gradient(to right, #3e3e3e, #131313);
        border-right: 1px solid #2f2f2f;
      "
    >
      <div v-for="(item, index) in sceneList" :key="index">{{ item }}</div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block" style="background-color: black" id="three">
      <!-- <div></div>
      <div></div>
      <div>
        <RouterView />
      </div> -->
    </div>
  </div>
</template>
