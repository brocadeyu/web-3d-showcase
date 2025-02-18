import * as THREE from 'three'
import '../index'
export default class {
  scene
  camera
  renderer
  cube: THREE.Object3D<THREE.Object3DEventMap> | undefined
  rect
  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene()
    const rect = container.getBoundingClientRect()
    this.rect = rect
    const aspect = rect.width / rect.height
    this.scene.background = new THREE.Color(0x000000)
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: false })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(rect.width, rect.height)

    container.appendChild(this.renderer.domElement)
    this.init()
    window.onresize = () => {
      const rect = container.getBoundingClientRect()
      this.camera.aspect = rect.width / rect.height
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(rect.width, rect.height)
    }
  }
  resizeRendererToDisplaySize() {
    const renderer = this.renderer
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = Math.floor(canvas.clientWidth * pixelRatio)
    const height = Math.floor(canvas.clientHeight * pixelRatio)
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }

    return needResize
  }
  init() {
    this.camera.position.set(0, 0, 20)
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.0))
    const size = 8
    const widthSegments = 2
    const heightSegments = 2
    const depthSegments = 1
    const boxGeometry = new THREE.BoxGeometry(
      size,
      size,
      size,
      widthSegments,
      heightSegments,
      depthSegments,
    )
    const geometry = new THREE.EdgesGeometry(boxGeometry)
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
    this.cube = new THREE.LineSegments(geometry, edgesMaterial)
    this.scene.add(this.cube)

    // const geometry = new THREE.BoxGeometry(10, 10, 10)
    // // 创建线框几何体
    // const wireframe = new THREE.WireframeGeometry(geometry)
    // const material = new THREE.LineBasicMaterial({ color: 0xffffff })
    // this.cube = new THREE.LineSegments(wireframe, material)
    // this.scene.add(this.cube)
  }
  render() {
    // if (this.resizeRendererToDisplaySize()) {
    //   const canvas = this.renderer.domElement
    //   this.camera.aspect = canvas.clientWidth / canvas.clientHeight
    //   this.camera.updateProjectionMatrix()
    // }
    if (this.cube) {
      this.cube.rotation.y += 0.01 // 旋转
    }
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => this.render())
  }
}
