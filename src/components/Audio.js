import React, { useEffect, useState } from "react";
import Loader from "./Loader.js";

export default function Audio() {
    const [fileNames, setFileNames] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://longesthum.xyz/api/gethums")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    setFileNames(data);
                }
            })
            .catch(console.log)
            .finally(() => setLoading(false))
    }, []);

    const Audio = (props) => {
        return (
            <audio
                controls
                src={props.src}>
                Your browser does not support the
                <code>audio</code> element.
            </audio>
        )
    }

    return (
        <>
            <h1>Hums</h1>
            {loading && <Loader />}
            <ul>
                {fileNames && fileNames.map(fileName=> <li><Audio src={`https://thelongesthumstore.sgp1.digitaloceanspaces.com/${fileName.fileName}`} /></li> )}
            </ul>
        </>
    )
}