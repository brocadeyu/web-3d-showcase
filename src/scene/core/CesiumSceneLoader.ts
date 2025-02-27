import { startProgress, stopProgress } from '@/utils/nprogress'

export default class {
  viewer = null
  constructor() {
    // console.log('cesium sceneInit')
    // this.viewer = new GeoVis.Earth('sceneContainer')
    // const baseImageUrl = '/img/{z}/{x}/{y}.png'
    // const layer = new GeoVis.TileLayer(baseImageUrl).addTo(this.viewer.layers)
    // window.earth = this.viewer
    // window.earth.scene.postProcessStages.fxaa.enabled = true
    // const helper = new GeoVis.EventHelper()
    // startProgress()
    // const RemoveCallback = helper.add(earth.scene.globe.tileLoadProgressEvent, (event) => {
    //   if (event === 0) {
    //     console.log('【cesium】:onload')
    //     setTimeout(() => {
    //       // setShow(true);
    //       stopProgress()
    //       RemoveCallback()
    //     }, 800)
    //   }
    // })
  }
  async init() {
    return new Promise((resolve) => {
      console.log('cesium sceneInit')
      this.viewer = new GeoVis.Earth('sceneContainer')
      const baseImageUrl = '/img/{z}/{x}/{y}.png'
      const layer = new GeoVis.TileLayer(baseImageUrl).addTo(this.viewer.layers)
      window.earth = this.viewer
      window.earth.scene.postProcessStages.fxaa.enabled = true
      const helper = new GeoVis.EventHelper()
      startProgress()
      const maskEl = document.getElementById('mask')
      if (maskEl) {
        maskEl.style.zIndex = '9'
      }

      const RemoveCallback = helper.add(earth.scene.globe.tileLoadProgressEvent, (event) => {
        if (event === 0) {
          console.log('【cesium】:onload')
          setTimeout(() => {
            // setShow(true);
            stopProgress()
            if (maskEl) {
              maskEl.style.zIndex = '-1'
            }
            resolve('')
            RemoveCallback()
          }, 800)
        }
      })
    })
  }
  dispose() {
    console.log('dispose')
  }
}
