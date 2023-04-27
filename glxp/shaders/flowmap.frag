uniform sampler2D tMap;
uniform float uFalloff;
uniform float uDissipation;
uniform float uAspect;
uniform float uAlpha;
uniform vec2 uMouse;
uniform vec2 uVelocity;

varying vec2 vUV;

float velocityStrength = 1000.0;

void main() {
  vec4 color = texture2D(tMap, vUV) * uDissipation;
  vec2 cursor = vUV - vec2(uMouse.x, 1.0 - uMouse.y);
  cursor.x /= uAspect;

  vec3 stamp = vec3(
    uVelocity * velocityStrength,
    1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0)
  );
  float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;
  color.rgb = mix(color.rgb, stamp, falloff);
  gl_FragColor = color;
  gl_FragColor.a = 1.0;
}
