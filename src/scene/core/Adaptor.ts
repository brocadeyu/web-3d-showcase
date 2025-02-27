import CesiumSceneLoader from './CesiumSceneLoader'
import ThreeSceneLoader from './ThreeSceneLoader'

type SceneType = 'cesium' | 'three'

interface SceneInfo {
  name: string
  type: SceneType
  loadFn: () => void
  unloadFn?: () => void
}

export default class Adaptor {
  cesiumCore: CesiumSceneLoader | undefined
  threeCore: ThreeSceneLoader | undefined
  functionMap: Record<string, SceneInfo> = {}
  currentScene: Pick<SceneInfo, 'type' | 'unloadFn'> | undefined
  triggerScene(sceneName: string) {
    const scene = this.functionMap[sceneName] as SceneInfo

    //是否存在上一个场景，存在销毁重置 反复创建场景的问题？
    if (this.currentScene) {
      const { type, unloadFn } = this.currentScene
      if (unloadFn) {
        unloadFn()
      }
      if (this.currentScene.type !== scene.type) {
        this.destroySceneLoader(type)
      }
    }
    //执行当前环境
    const { type, loadFn } = scene
    this.initSceneLoader(type)
    loadFn()
    this.setCurrentScene(scene)
  }
  destroySceneLoader(type: SceneType) {
    if (type === 'cesium') {
      this.cesiumCore?.dispose()
      this.cesiumCore = undefined
    }
    if (type === 'three') {
      // this.threeCore.dispose()
    }
  }
  initSceneLoader(type: SceneType) {
    if (type === 'cesium') {
      if (!this.cesiumCore) {
        this.cesiumCore = new CesiumSceneLoader()
      }
    }
    if (type === 'three') {
      // this.threeCore.init()
    }
  }
  setCurrentScene(scene: SceneInfo) {
    this.currentScene = scene
  }
  async loadCesiumSceneList() {
    const modules = import.meta.glob('../scenes/cesium/*.ts', { eager: true })
    const sceneNameList: string[] = []
    for (const path in modules) {
      const mod = modules[path] as {
        name: string
        load: () => void
        unload?: () => void
      }
      this.functionMap[mod.name] = {
        type: 'cesium',
        name: mod.name,
        loadFn: mod.load,
        ...(mod.unload ? { unloadFn: mod.unload } : {}),
      }
      sceneNameList.push(mod.name)
    }
    return sceneNameList
  }
}
