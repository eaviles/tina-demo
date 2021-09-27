import { Tube } from '@react-three/drei';
import * as THREE from 'three'

export default function Wire() {

    class CustomSinCurve extends THREE.Curve {

        constructor(scale = 1) {
            super();
            this.scale = scale;
        }

        getPoint(t, optionalTarget = new THREE.Vector3()) {

            const tx = t * 3 - 1.5;
            const ty = Math.sin(2 * Math.PI * t);
            const tz = 0;

            return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);

        }

    }

    const path = new CustomSinCurve(4);
    return (
        <>
            <mesh>
                <boxBufferGeometry />
                <meshPhongMaterial />
                <Tube args={[path]}>
                    <meshPhongMaterial attach="material" color="#808080" />
                </Tube>

            </mesh>
            <ambientLight args={[0x000000]} intensity={0.1} />
            <directionalLight position={[0, 0, 5]} intensity={0.5} />
        </>
    )
}