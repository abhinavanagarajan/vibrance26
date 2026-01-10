import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars, View, Preload } from '@react-three/drei';
import Hero3D from '../canvas/Hero3D';

const Experience: React.FC = () => {
    return (
        <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas
                gl={{ antialias: true, alpha: true }}
                eventSource={document.getElementById('root')!}
                eventPrefix="client"
            >
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} color="#bc13fe" intensity={2} />
                <pointLight position={[-10, -10, -10]} color="#00f3ff" intensity={2} />

                <Suspense fallback={null}>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Hero3D />
                    <View.Port />
                    <Preload all />
                </Suspense>

                {/* <Environment preset="night" /> */}
            </Canvas>
        </div>
    );
};

export default Experience;
