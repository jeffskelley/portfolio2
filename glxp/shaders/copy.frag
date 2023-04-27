precision highp float;

varying vec2 vUV;

uniform sampler2D tDiffuse;
uniform sampler2D tTexture1;
uniform sampler2D tTexture2;
uniform sampler2D tTexture3;
uniform vec3 uBackgroundColor;

void main() {
  gl_FragColor = texture2D( tDiffuse, vUV );
}