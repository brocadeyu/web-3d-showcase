import cesiumScene from './CesiumScene'

export default class Adaptor {
  cesiumScene
  // threeScene
  functionMap: Record<string, () => void> = {}
  constructor() {
    this.cesiumScene = new cesiumScene()
  }
  getFunctionMap() {}
  handleClickScene(type: string, name: string) {
    const func = this.functionMap[name]
    if (type === 'cesium') {
      this.cesiumScene.load(func)
    } else {
      // this.threeScene.load(func)
    }
  }
}
