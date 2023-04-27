import { Scene as SceneAbstract } from '~/glxp/abstract/scene'
import {
  Scene,
  OrthographicCamera,
  WebGLRenderTarget,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Color,
  TextureLoader,
  RGBAFormat,
  FloatType,
} from 'three'
import { useMouse } from '~/composables/mouse'

import basicVertexShader from '~/glxp/shaders/default.vert'
import flowmapFragmentShader from '~/glxp/shaders/flowmap.frag'
import mainFragmentShader from '~/glxp/shaders/liquidImage.frag'
import testFrag from '~/glxp/shaders/test.frag'

export class LiquidImageScene extends SceneAbstract {
  load() {
    const ww = window.innerWidth
    const wh = window.innerHeight
    this.renderer.autoClear = false
    this.camera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5)
    this.flowmapScene = new Scene()

    this.camera.position.set(0, 0, 1)
    this.mouse = useMouse()

    /**
     * Render targets
     */

    const tMap = { value: null }
    const targetOptions = {
      depthBuffer: false,
      stencilBuffer: false,
      format: RGBAFormat,
      type: FloatType,
    }
    this.targets = {
      read: new WebGLRenderTarget(ww, wh, targetOptions),
      write: new WebGLRenderTarget(ww, wh, targetOptions),
      // Helper function to ping pong the render targets and update the uniform
      swap: () => {
        const temp = this.targets.read
        this.targets.read = this.targets.write
        this.targets.write = temp
        tMap.value = this.targets.read.texture
      },
    }

    /**
     * Meshes
     */

    const geometry = new PlaneGeometry()
    this.flowmapMaterial = new ShaderMaterial({
      vertexShader: basicVertexShader,
      fragmentShader: flowmapFragmentShader,
      uniforms: {
        tMap,
        uTime: { value: 0.0 },
        uFalloff: { value: 0.1 },
        uDissipation: { value: 0.97 },
        uAlpha: { value: 1.0 },

        uAspect: { value: wh / ww },
        uMouse: { value: { x: this.mouse.x, y: this.mouse.y } },
        uVelocity: { value: { x: 0, y: 0 } },
      },
    })
    const flowmapMesh = new Mesh(geometry, this.flowmapMaterial)
    this.flowmapScene.add(flowmapMesh)

    const mainMaterial = new ShaderMaterial({
      vertexShader: basicVertexShader,
      fragmentShader: mainFragmentShader,
      uniforms: {
        tFlow: tMap,
        tImage: { value: null },
        uImageAspect: { value: null },
        uScreenAspect: { value: wh / ww },
        uFlowStrength: { value: 0.05 },
        uBackgroundColor: { value: new Color(0x7f2b78) },
        uForegroundColor: { value: new Color(0xf9db8a) },
      },
    })
    const mainMesh = new Mesh(geometry, mainMaterial)
    this.scene.add(mainMesh)

    /**
     * Assets
     */
    this.loader = new TextureLoader().load(
      '/assets/img/liquid-image/hello-world.png',
      (texture) => {
        mainMaterial.uniforms.tImage.value = texture
        mainMaterial.uniforms.uImageAspect.value =
          texture.source.data.width / texture.source.data.height
      }
    )

    // call parent class load
    super.load()
  }

  render() {
    const flowmapUniforms = this.flowmapMaterial.uniforms
    flowmapUniforms.uMouse.value = {
      x: this.mouse.x,
      y: this.mouse.y,
    }
    flowmapUniforms.uVelocity.value = {
      x: this.mouse.velocityTweened.x,
      y: this.mouse.velocityTweened.y,
    }

    this.renderer.setRenderTarget(this.targets.write)
    this.renderer.render(this.flowmapScene, this.camera)

    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.camera)

    this.targets.swap()
  }
}
