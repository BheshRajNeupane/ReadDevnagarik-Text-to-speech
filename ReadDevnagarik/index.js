document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('text');
    const speakButton = document.getElementById('speak');
    const pauseButton = document.getElementById('pause');
    const resumeButton = document.getElementById('resume');
    const stopButton = document.getElementById('stop');
    const voiceSelect = document.getElementById('voice-select');
    const statusDiv = document.getElementById('status');
    
    // reference to the SpeechSynthesis controller
    let speechSynthesis = window.speechSynthesis;

    console.log("speechSynthesis" , speechSynthesis);
    console.log("voices" , speechSynthesis.getVoices());
    
    let voices = [];

    
    // Initialize voices
    function loadVoices() {
        // retrieve a list of the voices available on the client's device
        voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = '<option value="">भाषा...</option>';
  
        voices.forEach((voice, index) => {
            // Filter for '' voices or keep all voices as fallback
            if ( 
                voice.lang.includes('ne-NP') || 
                voice.lang.includes('ne-Deva') || 
                voice.lang.includes('NP')
             
            ) {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            }
        });
    }

    // Load voices when they're ready
    // voiceschange-->  event is fired when the list of SpeechSynthesisVoice objects that would be returned by the SpeechSynthesis.getVoices() has changed
    
 
    speechSynthesis.onvoiceschanged = loadVoices;

    // Initial load attempt
    loadVoices();

    function speak() {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }

        const text = textArea.value.trim();
        if (!text) {
            updateStatus('कृपया केहि  टेक्स्ट लेखनुहोस।');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        console.log("utterance" , utterance);
        // console.log("selectedVoice" ,voiceSelect.value);

        // Set selected voice if any
        const selectedVoice = voiceSelect.value;
        if (selectedVoice !== '') {
            utterance.voice = voices[parseInt(selectedVoice)];
            // console.log("utterance.voice" , utterance.voice);
            
        }
      // Chorme doesn't supported 'ne-Deva' ,'ne-NP','ne-IN'? Edge  has supported 
        utterance.lang = 'ne-Deva';

        // utterance.lang = 'ne-IN';
        // utterance.lang = 'hi-IN';
        // utterance.lang = 'ne-NP';
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => {
            updateStatus('बोलिरछ...');
            updateButtons(true);
        };

        utterance.onend = () => {
            updateStatus('समाप्त।');
            updateButtons(false);
        };

        utterance.onerror = (event) => {
            console.log("Speech Error:", {
                type: event.error,
                time: event.elapsedTime,
                text: event.utterance.text
            });

            switch (event.error) {
                case 'interrupted':
                    //Try again
                    handleInterruptedSpeech(utterance);
                  
                    break;
                case 'canceled' :
                    updateStatus(' रद्द गरियो');
                    break; 
            
                default:
                    updateStatus('त्रुटि: ' + event.error);
                    break;
            }
            
           
            updateButtons(false);
        };

        speechSynthesis.speak(utterance);
    }

    function updateStatus(message) {
        statusDiv.textContent = message;
    }

    function updateButtons(isSpeaking) {
        speakButton.disabled = isSpeaking;
        pauseButton.disabled = !isSpeaking;
        resumeButton.disabled = !isSpeaking;
        stopButton.disabled = !isSpeaking;
    }

    // Helper function to handle interrupted speech
    function handleInterruptedSpeech(utterance) {
        const retryCount = utterance.retryCount || 0;
        if (retryCount < 3) {
            utterance.retryCount = retryCount + 1;
            console.log(`Retrying speech, attempt ${utterance.retryCount}`);
            setTimeout(() => {
                speechSynthesis.speak(utterance);
            }, 100);
        } else {
            updateStatus('पुन: प्रयास असफल भयो');
        }
    }


    // Event listeners
    speakButton.addEventListener('click', speak);
    
    pauseButton.addEventListener('click', () => {
        speechSynthesis.pause();
        updateStatus('रोक्किरछ');
    });

    resumeButton.addEventListener('click', () => {
        speechSynthesis.resume();
        updateStatus('जारी छ...');
    });

    stopButton.addEventListener('click', () => {
        speechSynthesis.cancel();
        updateStatus('बन्द');
        updateButtons(false);
    });

    // Initial button states
    updateButtons(false);

})