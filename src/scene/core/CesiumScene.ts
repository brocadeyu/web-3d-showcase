import { loadCesiumScenes } from '..'
export default class cesiumScene {
  viewer = null
  constructor() {
    this.viewer = new GeoVis.Earth('sceneContainer')
    const baseImageUrl = '/img/{z}/{x}/{y}.png'
    const layer = new GeoVis.TileLayer(baseImageUrl).addTo(this.viewer.layers)
    window.earth = this.viewer
    window.earth.scene.postProcessStages.fxaa.enabled = true
  }
  load(func: () => void) {
    func.call(this)
  }
  dispose() {}
}
