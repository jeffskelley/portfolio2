precision highp float;

uniform sampler2D tFlow;
uniform sampler2D tImage;

uniform float uImageAspect;
uniform float uScreenAspect;
uniform float uFlowStrength;
uniform vec3 uBackgroundColor;
uniform vec3 uForegroundColor;

varying vec2 vUV;

float imageWidth = 0.6; // percentage of screen

void main() {
  vec3 flow = texture2D(tFlow, vUV).rgb;
  
  // Use flow to adjust the uv lookup of a texture
  vec2 uv = vUV;
  uv += flow.xy * vec2(-1.0, 1.0) * uFlowStrength; // distort
  uv /= imageWidth; // resize to 0.6
  uv -= imageWidth * 0.5; // center
  uv.y *= uScreenAspect * uImageAspect; // fix aspect ratio
  uv.y += (1.0 - uImageAspect * uScreenAspect) * 0.5; // more centering
  float value = texture2D(
    tImage,
    uv
  ).r;
  vec3 imageRGB = mix(uForegroundColor, uBackgroundColor, value);
  gl_FragColor.rgb = imageRGB;
  gl_FragColor.a = 1.0;
}