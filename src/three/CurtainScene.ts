import * as THREE from "three";
import { gsap } from "gsap";

const curtainVertexShader = `
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uVal;
  uniform vec2 uMouse;
  uniform float uTime;

  mat2 scale(vec2 uv, float t) {
    return mat2(
      cos(t), -sin(t),
      sin(t), cos(t)
    );
  }

  vec2 getCoverUv(vec2 uv, vec2 resolution, vec2 imageResolution) {
    vec2 ratio = vec2(
      min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
      min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  void main() {
    vUv = getCoverUv(uv, uImageResolution, uResolution);
    vec3 pos = position;
    pos.xy = scale(pos.xy, uVal) * pos.xy;
    vec2 s = sign(uMouse);
    float c = s.y * (1.0 - s.x * (1.0 + uMouse.x * uMouse.y)) * 0.5 - 0.5;
    float k = (((uMouse.x + uMouse.y) * 25.0 + 30.0) * (pos.x + 1.0) / (2.0 * sin(1.5707 + c * pos.x))) * 0.14;
    pos.y -= exp(-2.0 * pow(pos.x + ((-uMouse.x) * (uMouse.y)), 2.0)) * (1.0 - uVal) * k;
    pos.y = clamp(pos.y, -0.5, 100.0);
    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const curtainFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColor;
  uniform float uDirection;
  varying vec2 vUv;

  float circle(vec2 uv, vec2 circlePosition, float radius) {
    return 1.0 - smoothstep(0.0, radius, distance(circlePosition, uv));
  }

  float elevation(float radius, float intensity) {
    return 1.0 + circle(uv, (uMouse * 0.5) + 0.5, radius) * intensity;
  }

  void main() {
    vec2 newUv = vUv;
    newUv *= elevation(0.2, 0.7);
    vec4 finalColor = vec4(1.0, 1.0, 1.0, 1.0);
    finalColor = texture2D(uTexture, newUv);
    float angle = uTime;
    mat2 rotate = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 rotatedUv = rotate * (newUv - vec2(0.5)) + vec2(0.5);
    vec4 color = finalColor;
    if (uDirection == 0.0) {
      vec2 centeredUv = newUv - vec2(0.5);
      float angleRot = atan(centeredUv.y, centeredUv.x);
      float radius = length(centeredUv);
      float feather = smoothstep(0.35, 0.5, radius);
    }
    vec2 uv = vUv;
    uv -= 0.5;
    float dist = length(uv);
    color.a *= smoothstep(0.5, 0.499, dist);
    gl_FragColor = color;
    if (uDirection == 0.0) {
      vec2 centeredUv = newUv - vec2(0.5);
      float angleRot = atan(centeredUv.y, centeredUv.x);
      float radius = length(centeredUv);
      float feather = smoothstep(0.35, 0.5, radius);
      gl_FragColor.a = feather;
    }
  }
`;

function createTexture(color: string): THREE.Texture {
  const c = new THREE.Color(color);
  const data = new Uint8Array([c.r * 255, c.g * 255, c.b * 255]);
  const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBFormat);
  texture.needsUpdate = true;
  return texture;
}

export class CurtainScene {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private materials: THREE.ShaderMaterial[] = [];
  private clock: THREE.Clock;
  private mouse = { x: 0, y: 0 };
  private animId: number | null = null;
  private onComplete: () => void;

  constructor(canvas: HTMLCanvasElement, onComplete: () => void) {
    this.onComplete = onComplete;
    this.clock = new THREE.Clock();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const fovRad = (this.camera.fov * Math.PI) / 180;
    const height = this.camera.position.z * Math.tan(fovRad / 2) * 2;
    const width = height * this.camera.aspect;

    const geometry = new THREE.PlaneGeometry(1, 1, 30, 30);

    const configs = [
      { texture: createTexture("#1e1b4b"), direction: -1, color: [0.118, 0.106, 0.294] as [number, number, number] },
      { texture: createTexture("#0f172a"), direction: 0, color: [0.059, 0.086, 0.165] as [number, number, number] },
      { texture: createTexture("#1e1b4b"), direction: 1, color: [0.118, 0.106, 0.294] as [number, number, number] },
    ];

    configs.forEach((config, i) => {
      const material = new THREE.ShaderMaterial({
        vertexShader: curtainVertexShader,
        fragmentShader: curtainFragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
        glslVersion: THREE.GLSL3,
        uniforms: {
          uTexture: { value: config.texture },
          uResolution: { value: new THREE.Vector2(width, height) },
          uImageResolution: { value: new THREE.Vector2(1, 1) },
          uVal: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uTime: { value: 0 },
          uColor: { value: new THREE.Vector3(...config.color) },
          uDirection: { value: config.direction },
        },
      });
      this.materials.push(material);

      const mesh = new THREE.Mesh(geometry, material);
      const meshWidth = width / 3;
      mesh.scale.set(meshWidth, height, 1);
      mesh.position.x = (i - 1) * meshWidth;
      this.scene.add(mesh);
    });

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.tick = this.tick.bind(this);

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("resize", this.handleResize);

    this.tick();
    this.startReveal();
  }

  private handleMouseMove(e: MouseEvent) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  private handleTouchMove(e: TouchEvent) {
    this.mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
  }

  private handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const fovRad = (this.camera.fov * Math.PI) / 180;
    const height = this.camera.position.z * Math.tan(fovRad / 2) * 2;
    const width = height * this.camera.aspect;

    this.materials.forEach((mat) => {
      mat.uniforms.uResolution.value.set(width, height);
    });
  }

  private startReveal() {
    this.materials.forEach((mat) => {
      gsap.to(mat.uniforms.uVal, {
        value: 1,
        duration: 1.2,
        delay: 0.2,
        ease: "expo.out",
        onComplete: () => {
          if (mat === this.materials[this.materials.length - 1]) {
            this.dispose();
            this.onComplete();
          }
        },
      });
    });
  }

  private tick() {
    this.animId = requestAnimationFrame(this.tick);
    const elapsedTime = this.clock.getElapsedTime();

    this.materials.forEach((mat, i) => {
      mat.uniforms.uTime.value = elapsedTime;
      const mult = i === 1 ? 1 : 3;
      mat.uniforms.uMouse.value.x += (this.mouse.x - mat.uniforms.uMouse.value.x) * 0.06 * mult;
      mat.uniforms.uMouse.value.y += (this.mouse.y - mat.uniforms.uMouse.value.y) * 0.06 * mult;
    });

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
    }
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("touchmove", this.handleTouchMove);
    window.removeEventListener("resize", this.handleResize);
    this.materials.forEach((mat) => {
      mat.dispose();
    });
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }
    });
    this.renderer.dispose();
  }
}
