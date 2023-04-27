precision highp float;

varying vec2 vUV;

uniform vec2 uViewportSize;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uProgress;

#include /node_modules/lygia/generative/snoise.glsl;
#define PI 3.1415926538

float DRIP_FREQUENCY = 15.0;
float DRIP_MULTIPLIER = 1.0;
float WAVE_MULTIPLIER = 3.0;
float MAX_AMPLITUDE = 0.05;

void main() {
  vec2 uv = gl_FragCoord.xy / uViewportSize;
  float reach = sin(uProgress * PI);
  float nv = snoise(vec2(uv.x * DRIP_FREQUENCY, 1.0)) * DRIP_MULTIPLIER;
  float wave = sin(uv.x * PI * 2.0) * WAVE_MULTIPLIER;
  vec3 color = mix(uColor1, uColor2, step(1.0 - uv.y + (wave + nv) * MAX_AMPLITUDE * reach, uProgress));
  gl_FragColor = vec4(color, 1.0);
}