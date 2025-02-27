export default class {
  viewer = null
  constructor() {
    console.log('cesium sceneInit')
    this.viewer = new GeoVis.Earth('sceneContainer')
    const baseImageUrl = '/img/{z}/{x}/{y}.png'
    const layer = new GeoVis.TileLayer(baseImageUrl).addTo(this.viewer.layers)
    window.earth = this.viewer
    window.earth.scene.postProcessStages.fxaa.enabled = true
  }
  dispose() {
    console.log('dispose')
  }
}
