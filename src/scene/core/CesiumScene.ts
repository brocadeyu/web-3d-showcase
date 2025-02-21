import BaseScene from './BaseScene'
export default class cesiumScene extends BaseScene {
  viewer: Viewer
  constructor(opt) {
    super(opt)
    this.viewer = new Viewer()
  }
  load(func: () => void) {
    func.call(this)
  }
  dispose() {}
}
