import { Scene as ThreeScene, PerspectiveCamera } from 'three'

export class Scene {
  constructor(renderer) {
    this.scene = new ThreeScene()
    this.camera = new PerspectiveCamera()
    this.renderer = renderer
    this.isLoaded = false
    this.resize()
  }

  load() {
    this.isLoaded = true
  }

  update() {}

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  render(time) {
    this.update(time)
    this.renderer.render(this.scene, this.camera)
  }

  kill() {}
}
