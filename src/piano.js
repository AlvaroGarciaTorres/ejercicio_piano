export const musicNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function genPianoKeys() {
    let pianoKeys = [];

    for (let octave = 0; octave <= 8; octave++) {
        const octaveKeys = [];
        for (let musicNote of musicNotes) {
            octaveKeys.push(musicNote + octave);
        }
        if (octave == 0) {
            octaveKeys.splice(0, 9)
        }

        if (octave == 8) {
            octaveKeys.splice(1)
        }
        pianoKeys.push(octaveKeys);
    }
    return pianoKeys;
}


