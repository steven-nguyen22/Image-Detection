import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";
import { Suspense } from "react";

function BasketballHoop() {
  const hoop = useGLTF("./basketball_hoop/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={2} groundColor="black" castShadow />
      {/* <pointLight intensity={15} /> */}
      {/* <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={500}
        castShadow
        shadow-mapSize={1024}
      /> */}
      <ambientLight intensity={1} />
      <directionalLight intensity={1} castShadow position={[2, 10, -20]} />
      <primitive
        object={hoop.scene}
        scale={0.75}
        // y, z, x
        position={[0, -3.5, 0]}
        // rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
}

function HoopCanvas() {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 10, -30], fov: 17 }}
      // camera={{ position: [20, 0, -25], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={true} minAzimuthAngle={Math.PI / 2} />
        <BasketballHoop />
      </Suspense>

      <Preload all />
    </Canvas>
  );
}

export default HoopCanvas;
