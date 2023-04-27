import {
  WebGLRenderTarget,
  MathUtils,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  Group,
} from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer'
import { RenderPass } from 'three/addons/postprocessing/RenderPass'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass'
import { compositeShader } from '~/glxp/shaders/compositeShader'

import { gsap } from 'gsap'

import { Scene } from '~/glxp/abstract/scene'
import { CubeScene } from '~/glxp/scenes/cube'
import { BallScene } from '~/glxp/scenes/ball'
import { PyramidScene } from '~/glxp/scenes/pyramid'
// import { UIScene } from '~/glxp/scenes/ui'

import { DripPlane } from '~/glxp/entities/dripPlane'

import { useUIStore } from '~/store/ui'
import { useMouse } from '~/composables/mouse'

const CONFIG = {
  rotationRange: {
    x: MathUtils.degToRad(45),
    y: MathUtils.degToRad(45),
  },
}

export class HomepageScene extends Scene {
  load() {
    const uiStore = useUIStore()
    const dpr = window.devicePixelRatio

    this.renderer.autoClear = false

    /**
     * UI Scene
     */
    // this.ui = new UIScene()
    // this.ui.load()

    /**
     * Subscenes
     */

    this.subscenes = {
      cube: {
        texture: new WebGLRenderTarget(
          window.innerWidth * dpr,
          window.innerHeight * dpr
        ),
        scene: new CubeScene(),
      },
      ball: {
        texture: new WebGLRenderTarget(
          window.innerWidth * dpr,
          window.innerHeight * dpr
        ),
        scene: new BallScene(),
      },
      pyramid: {
        texture: new WebGLRenderTarget(
          window.innerWidth * dpr,
          window.innerHeight * dpr
        ),
        scene: new PyramidScene(),
      },
    }

    Object.values(this.subscenes).forEach((subscene) => {
      subscene.scene.load()
    })

    /**
     * Main scene initialization
     */
    this.camera.position.z = 0.5

    /**
     * Entities
     */
    this.planes = new Group()

    this.planeGroup = new Group()
    this.mouseTransformationGroup = new Group()
    this.tiltGroup = new Group()
    this.planeFront = new Mesh(
      new PlaneGeometry(),
      new MeshBasicMaterial({ color: 0xff0000 })
    )
    this.planeBack = new DripPlane().mesh
    this.planeBack.rotation.y = MathUtils.degToRad(180)
    this.mouseTransformationGroup.add(this.planeFront)
    this.mouseTransformationGroup.add(this.planeBack)
    this.tiltGroup.add(this.mouseTransformationGroup)
    this.planeGroup.add(this.tiltGroup)
    this.planes.add(this.planeGroup)

    this.planeGroup2 = new Group()
    this.mouseTransformationGroup2 = new Group()
    this.tiltGroup2 = new Group()
    this.plane2 = new Mesh(
      new PlaneGeometry(),
      new MeshBasicMaterial({ color: 0xff0000 })
    )
    this.mouseTransformationGroup2.add(this.plane2)
    this.tiltGroup2.add(this.mouseTransformationGroup2)
    this.planeGroup2.add(this.tiltGroup2)
    this.planeGroup2.position.y = -1.1
    this.planeGroup2.visible = false
    this.planes.add(this.planeGroup2)

    this.scene.add(this.planes)

    /**
     * Hero timeline
     */
    const heroTimeline = gsap
      .timeline({ paused: true })
      .to(this.camera.position, {
        z: 2.5,
        ease: 'power2.in',
      })
      .to(
        this.planeGroup.position,
        {
          y: -0.35,
          ease: 'power2.in',
        },
        0
      )
    watchEffect(() => {
      heroTimeline.progress(uiStore.sections.hero.exitProgress)
    })

    /**
     * Section 1 timeline
     */
    const section1Timeline = gsap
      .timeline({ paused: true })
      .to(this.planeGroup.rotation, {
        y: MathUtils.degToRad(180),
        ease: 'power2.inOut',
      })
      .to(
        this.planeGroup.position,
        {
          y: 0,
          ease: 'power2.in',
        },
        0
      )
      .to(
        this.camera.position,
        {
          z: 0.5,
          ease: 'power2.in',
        },
        0
      )
    watchEffect(() => {
      section1Timeline.progress(uiStore.sections['section-1'].exitProgress)
    })

    /**
     * Section 2 timeline
     */
    const section2Timeline = gsap
      .timeline({ paused: true })
      .to(this.planeBack.material.uniforms.uProgress, {
        value: 1,
        ease: 'power2.inOut',
      })
    watchEffect(() => {
      section2Timeline.progress(uiStore.sections['section-2'].exitProgress)
    })

    /**
     * Section 3 timeline
     */
    const section3Timeline = gsap
      .timeline({ paused: true })
      .to(this.planeGroup2, { visible: true, duration: 0.01 }) // .set is causing issues
      .to(
        this.camera.position,
        {
          z: 0.75,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        this.planes.position,
        {
          y: 0.5,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        this.tiltGroup.rotation,
        {
          x: MathUtils.degToRad(-15),
          y: MathUtils.degToRad(15),
          ease: 'power2.out',
          duration: 0.5,
        },
        0
      )
      .to(
        this.tiltGroup2.rotation,
        {
          x: MathUtils.degToRad(-15),
          y: MathUtils.degToRad(15),
          ease: 'power2.out',
          duration: 0.5,
        },
        0
      )
    watchEffect(() => {
      section3Timeline.progress(uiStore.sections['section-3'].exitProgress)
    })

    /**
     * Section 4 timeline
     */
    const section4Timeline = gsap
      .timeline({ paused: true })
      .to(this.planes.position, {
        y: 1.1,
        ease: 'power2.inOut',
      })
      .to(
        this.camera.position,
        {
          z: 0.5,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        this.tiltGroup2.rotation,
        {
          x: 0,
          y: 0,
          ease: 'power2.in',
          duration: 0.5,
        },
        0
      )
    watchEffect(() => {
      section4Timeline.progress(uiStore.sections['section-4'].enterProgress)
    })

    /**
     * Mouse
     */

    const mouse = useMouse()
    this.mouseEased = reactive({ x: 0, y: 0 })
    let mouseTween

    watchEffect(() => {
      mouseTween?.kill()
      mouseTween = gsap.to(this.mouseEased, {
        x: mouse.y - 0.5,
        y: mouse.x - 0.5,
        duration: 0.5,
        ease: 'power2.out',
      })
    })

    /**
     * Composer
     */
    this.composer = new EffectComposer(this.renderer)
    this.compositePass = new ShaderPass(compositeShader)

    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.composer.addPass(this.compositePass)

    /**
     * Call load() of parent class
     */

    super.load()
  }

  render(time) {
    this.update(time)

    /**
     * Mouse interactions
     */
    const positionConstraint = MathUtils.smoothstep(
      this.camera.position.z,
      0.5,
      1.5
    )
    const rotation = {
      x: this.mouseEased.x * CONFIG.rotationRange.y * positionConstraint,
      y: this.mouseEased.y * CONFIG.rotationRange.x * positionConstraint,
    }
    this.mouseTransformationGroup.rotation.x = rotation.x
    this.mouseTransformationGroup.rotation.y = rotation.y
    this.mouseTransformationGroup2.rotation.x = rotation.x
    this.mouseTransformationGroup2.rotation.y = rotation.y

    /**
     * Render subscenes to textures
     */
    Object.values(this.subscenes).forEach(({ texture, scene }) => {
      scene.update(time)
      this.renderer.setRenderTarget(texture)
      this.renderer.clear()
      this.renderer.render(scene.scene, scene.camera)
    })

    /**
     * Composite subscenes
     */
    this.compositePass.uniforms.tTexture1.value =
      this.subscenes.cube.texture.texture
    this.compositePass.uniforms.tTexture2.value =
      this.subscenes.ball.texture.texture
    this.compositePass.uniforms.tTexture3.value =
      this.subscenes.pyramid.texture.texture
    this.composer.render()

    // this.renderer.setRenderTarget(null)
    // this.renderer.clearDepth()
    // this.renderer.render(this.ui.scene, this.ui.camera)
  }
}
