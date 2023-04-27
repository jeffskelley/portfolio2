import {
  PlaneGeometry,
  MeshBasicMaterial,
  ShaderMaterial,
  Mesh,
  Color,
  Vector2,
} from 'three'
import defaultVert from '~/glxp/shaders/default.vert'
import dripFrag from '~/glxp/shaders/dripTransition.frag'

export class DripPlane {
  constructor() {
    // todo: needs resize function
    const dpr = window.devicePixelRatio
    this.geometry = new PlaneGeometry()
    this.material = new ShaderMaterial({
      vertexShader: defaultVert,
      fragmentShader: dripFrag,
      uniforms: {
        uColor1: { value: new Color(0x00ff00) },
        uColor2: { value: new Color(0x0000ff) },
        uProgress: { value: 0 },
        uViewportSize: {
          value: new Vector2(window.innerWidth * dpr, window.innerHeight * dpr),
        },
      },
    })
    this.mesh = new Mesh(this.geometry, this.material)
  }
}
