import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAsset } from 'use-asset'

export default function Noodle({ url, y = 200, space = 1.8, width = 0.05, height = 0.5, obj = new THREE.Object3D(), ...props }) {
    const ref = useRef()
    // use-asset is the library that r3f uses internally for useLoader. It caches promises and
    // integrates them with React suspense. You can use it as-is with or without r3f.
    const { gain, context, update, data } = useAsset(() => createAudio(url), url)
    useEffect(() => {
        // Connect the gain node, which plays the audio
        gain.connect(context.destination)
        // Disconnect it on unmount
        return () => gain.disconnect()
    }, [gain, context])

    useFrame((state) => {
        let avg = update()
        // Distribute the instanced planes according to the frequency daza
        for (let i = 0; i < data.length; i++) {
            obj.position.set(i * width * space - (data.length * width * space) / 2, data[i] / y, 0)
            obj.updateMatrix()
            ref.current.setMatrixAt(i, obj.matrix)
        }
        // Set the hue according to the frequency average
        ref.current.material.color.setHSL(avg / 500, 0.75, 0.75)
        ref.current.instanceMatrix.needsUpdate = true
    })
    return (
        <instancedMesh castShadow ref={ref} args={[null, null, data.length]} {...props}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
    )
}

async function createAudio(url) {

    // Fetch audio data and create a buffer source
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    const context = new (window.AudioContext || window.webkitAudioContext)()
    const source = context.createBufferSource()
    source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res))
    source.loop = true

    // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
    // which makes it too awkward for a little demo since you need to load the async data first

    source.start(0)

    // Create gain node and an analyser
    const gain = context.createGain()
    const analyser = context.createAnalyser()
    analyser.fftSize = 64
    source.connect(analyser)
    analyser.connect(gain)

    // The data array receive the audio frequencies
    const data = new Uint8Array(analyser.frequencyBinCount)
    console.log(data)
    return {
        context,
        source,
        gain,
        data,

        // This function gets called every frame per audio source
        update: () => {
            analyser.getByteFrequencyData(data)
            // Calculate a frequency average
            return (data.avg = data.reduce((prev, cur) => prev + cur / data.length, 0))
        },
    }
}
