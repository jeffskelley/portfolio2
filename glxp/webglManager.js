import { WebGLRenderer } from 'three'

import { useWebGLStore } from '~/store/webgl'

import { HomepageScene } from '~/glxp/scenes/homepage'
import { LiquidImageScene } from '~/glxp/scenes/liquidImage'

// FPO
import { CubeScene } from '~/glxp/scenes/cube'
import { BallScene } from '~/glxp/scenes/ball'
import { PyramidScene } from '~/glxp/scenes/pyramid'

export class WebGLManager {
  constructor() {
    this.renderer = new WebGLRenderer({
      antialias: true,
    })
    this.scenes = {
      homepage: new HomepageScene(this.renderer),
      cube: new CubeScene(this.renderer),
      ball: new BallScene(this.renderer),
      pyramid: new PyramidScene(this.renderer),
      liquid: new LiquidImageScene(this.renderer),
    }
    this.activeScene = null
  }

  init(container) {
    this.webglStore = useWebGLStore()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(this.renderer.domElement)
    this.webglStore.isInitialized = true
    this.render.bind(this)()

    window.addEventListener('resize', this.resize.bind(this))
  }

  loadScene(slug) {
    return this.scenes[slug].load()
  }

  activateScene(slug) {
    if (this.activeScene) {
      this.deactivateScene(slug)
    }
    this.activeScene = this.scenes[slug]
  }

  deactivateScene(slug) {
    this.activeScene.kill()
    this.activeScene = null
  }

  resize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    this.activeScene?.resize()
  }

  render(time) {
    requestAnimationFrame(this.render.bind(this))

    if (this.activeScene) {
      this.activeScene.render(time)
    }
  }
}
