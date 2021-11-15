export function genPianoKeys() {
    const musicNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    let pianoKeys = [];

    for (let octave = 0; octave <= 8; octave++) {
        for (let musicNote of musicNotes) {
            pianoKeys.push(musicNote + octave);
        }
    }
    pianoKeys = pianoKeys.slice(9).slice(0, 88);

    return pianoKeys;
}


