import { Color } from 'three'
import defaultVert from '~/glxp/shaders/default.vert'
import compositeFrag from '~/glxp/shaders/composite.frag'

export const compositeShader = {
  uniforms: {
    tDiffuse: { value: null },
    tTexture1: { value: null },
    tTexture2: { value: null },
    tTexture3: { value: null },
    uBackgroundColor: { value: new Color(0x000000) },
  },

  vertexShader: defaultVert,
  fragmentShader: compositeFrag,
}
