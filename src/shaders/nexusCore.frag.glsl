uniform float uTime;
uniform vec3 uColor;
uniform float uIntensity;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDirection), 0.0), 2.5);

  float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + vPosition.y * 5.0);

  vec3 finalColor = uColor * (0.55 + pulse * 0.35);
  finalColor += uColor * fresnel * uIntensity;

  gl_FragColor = vec4(finalColor, 0.92);
}
