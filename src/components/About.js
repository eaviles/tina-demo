
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function About() {
    return (
        <Grid
            container
            rowSpacing={3}
        >
            <Grid container item>
                <Typography
                    variant="h1">
                    The Longest Hum
                </Typography>
            </Grid>
            <Grid container item xs={12}>
                <Typography
                    variant="body1">
                    The Longest Hum is an interactive voice work by Tina Stefanou with Patrick Hase and Alisa Blakeney. It was sown together with voices, codes, stringy bits and a desire to create the longest humming action in the Universe.
                </Typography>
            </Grid>
            <Grid container item xs={12}>
                <Typography
                    variant="body1">
                    The hum is a gentle, musically democratic and direct way to interact with both human and the more-than-human. Hums are utterances found in the voice of humans, machines, and non-human species, as well as sonic artefacts found within the botanical world, and planetary rotation. It is an utterance that challenges the logical isolation of the English language – it is pre-speech, subterranean, pre-linguistic, pre-enunciative and within it exists pure potential. It acts as a conduit between sound relationships that connect the human experience to sounds found outside of it. Creating a living, resonating texture, this work will communicate a sonic experience of location and connectedness for participants.
                </Typography>
            </Grid>
            <Grid container item xs={12}>
                <Typography
                    variant="body1">
                    We love your hums; all you need to do is record it on your phone, upload the recording and add your postcode. The hum can be from your voice, or the voice of your fridge, dog or thunderstorm. This will then enter a collective hum which will run and stretch for 21 years. Why 21 years you might ask?
                </Typography>
            </Grid>
            <Grid container item xs={12}>
                <Typography
                    variant="body1">
                    Honouring The Spirit of 21 and an affirmative fuck you to divisive narratives, we are creating a real time humming capsule full of curiosity and thick relational webs, as we head further into all sorts of changes. How will our humming shift over the next 21 years? How will technology develop? How will we retell stories of hum’s past?
                </Typography>
            </Grid>
        </Grid>
    )
}