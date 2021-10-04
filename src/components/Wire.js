import { Tube } from '@react-three/drei'


export default function Wire () {

    return (
        <Tube>
            <meshBasicMaterial attach="material" color="hotpink" />
        </Tube>
    )
}