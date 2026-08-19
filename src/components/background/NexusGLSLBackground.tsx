import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(
      sin(dot(p, vec2(127.1, 311.7))) *
      43758.5453123
    );
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(
      mix(a, b, f.x),
      mix(c, d, f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 centered = uv - 0.5;

    float aspect =
      uResolution.x /
      max(uResolution.y, 1.0);

    centered.x *= aspect;

    float distanceFromCenter =
      length(centered);

    float time = uTime * 0.08;

    vec2 flowUv = centered * 2.2;

    flowUv.x +=
      sin(flowUv.y * 1.8 + time) * 0.18;

    flowUv.y +=
      cos(flowUv.x * 1.5 - time) * 0.12;

    float cloud =
      fbm(
        flowUv +
        vec2(
          time * 0.35,
          -time * 0.18
        )
      );

    float centerGlow =
      1.0 -
      smoothstep(
        0.0,
        0.82,
        distanceFromCenter
      );

    float coreGlow =
      1.0 -
      smoothstep(
        0.0,
        0.42,
        distanceFromCenter
      );

    float orbit =
      sin(
        atan(centered.y, centered.x) * 7.0 +
        distanceFromCenter * 18.0 -
        uTime * 0.35
      );

    orbit =
      smoothstep(0.55, 1.0, orbit);

    vec3 deepBlue =
      vec3(0.005, 0.012, 0.055);

    vec3 violet =
      vec3(0.22, 0.055, 0.65);

    vec3 cyan =
      vec3(0.015, 0.35, 0.95);

    vec3 color = deepBlue;

    color +=
      violet *
      cloud *
      centerGlow *
      0.28;

    color +=
      cyan *
      coreGlow *
      0.16;

    color +=
      violet *
      orbit *
      0.10;

    float edgeFade =
      1.0 -
      smoothstep(
        0.35,
        0.82,
        distanceFromCenter
      );

    color *=
      edgeFade * 0.92 +
      0.08;

    gl_FragColor =
      vec4(color, 1.0);
  }
`

function ShaderPlane() {
  const materialRef =
    useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (!materialRef.current) {
      return
    }

    materialRef.current.uniforms.uTime.value =
      state.clock.elapsedTime

    materialRef.current.uniforms.uResolution.value.set(
      state.size.width,
      state.size.height,
    )
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uResolution: {
            value: new THREE.Vector2(1, 1),
          },
        }}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

export default function NexusGLSLBackground() {
  return (
    <div
      aria-hidden="true"
      data-testid="nexus-glsl-background"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#030712',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 1],
          fov: 75,
          near: 0.1,
          far: 10,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
