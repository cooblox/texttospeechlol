document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const voiceSelect = document.getElementById('voiceSelect');
    const speakButton = document.getElementById('speakButton');
    const darkModeToggle = document.getElementById('darkModeToggle');

    let voices = [];

    function populateVoiceList() {
        voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    speakButton.addEventListener('click', () => {
        const text = textInput.value;
        const selectedVoiceName = voiceSelect.value;
        const utterance = new SpeechSynthesisUtterance(text);

        voices.forEach(voice => {
            if (voice.name === selectedVoiceName) {
                utterance.voice = voice;
            }
        });

        speechSynthesis.speak(utterance);
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
