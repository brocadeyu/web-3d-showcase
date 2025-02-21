export default abstract class BaseScene {
  el: HTMLElement
  constructor(target: HTMLElement) {
    this.el = target
  }
  load() {}
  dispose() {}
}
