precision highp float;

varying vec2 vUV;

uniform sampler2D tDiffuse;
uniform sampler2D tTexture1;
uniform sampler2D tTexture2;
uniform sampler2D tTexture3;
uniform vec3 uBackgroundColor;

void main() {
  vec4 mask = texture2D(tDiffuse, vUV);
  vec4 texture1 = texture2D(tTexture1, vUV);
  vec4 texture2 = texture2D(tTexture2, vUV);
  vec4 texture3 = texture2D(tTexture3, vUV);
  vec4 composite = vec4(uBackgroundColor, 1.0);

  composite = mix(composite, texture1, mask.r);
  composite = mix(composite, texture2, mask.g);
  composite = mix(composite, texture3, mask.b);

  gl_FragColor = composite;
}