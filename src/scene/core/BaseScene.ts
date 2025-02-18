import * as THREE from 'three'
interface IBaseScene {
  scene: THREE.Scene
  render: () => void
}
export abstract class BaseScene implements IBaseScene {
  scene: THREE.Scene
  constructor() {
    this.scene = new THREE.Scene()
  }
  abstract render(): void
}
