<script setup lang="ts">
import SceneManager from '@/scene/core/SceneManager'
import { onMounted, ref } from 'vue'
import { loadCesiumScenes } from '@/scene'
import { sleep } from '@/utils'
import { nextTick } from 'vue'
import Adaptor from '@/scene/core/Adaptor'
onMounted(async () => {
  nextTick(() => {
    // const scene = new SceneManager(document.getElementById('three') as HTMLElement)
    // await sleep(200)
    // scene.render()
    const adaptor = new Adaptor()
  })

  const scenes = await loadCesiumScenes()
  const list: string[] = []
  Object.keys(scenes).forEach((i) => {
    list.push(i)
  })
  sceneList.value = list
})
const sceneList = ref<string[]>([])
const handleClickItem = async (i) => {
  const scenes = await loadCesiumScenes()
  const func = scenes[i]
  if (func) {
    func()
  }
}
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
      class="relative hidden w-0 flex-1 lg:block"
      style="background-color: black"
      id="mapContainer"
    >
      <!-- <div></div>
      <div></div>
      <div>
        <RouterView />
      </div> -->
    </div>
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
