# Devanagari Text-to-Speech Web Application

A simple web application that converts Devanagari text to speech using the Web Speech API. This application supports text-to-speech functionality for Nepali  languages.

## Features

- Text-to-speech conversion for Devanagari script
- Multiple language support (Nepali, Hindi)
- Play/Pause/Resume/Stop controls
- Voice selection options
- Real-time status updates
- Error handling and recovery


## Prerequisites

- Browser with Web Speech API support



## Project Structure

```
devanagari-tts/
├── index.html
├── styles.css
├── index.js
└── README.md
```

## Usage

1. Open `index.html` in a supported web browser
2. Type or paste Devanagari text in the text area
3. Select a voice from the dropdown menu (if available)
4. Use the control buttons:
   - बोलुस (Speak): Start text-to-speech
   - रोकनुस (Pause): Pause the speech
   - जारी रखनुस (Resume): Continue paused speech
   - बंद गर्नुस (Stop): Stop the speech



## Known Issues

1. Voice Availability
   - Nepali voice support varies by system
   - Falls back to Hindi voices if Nepali unavailable
  

2. Interruption Handling
   - Speech may be interrupted when switching tabs
   - Implemented retry mechanism for interrupted speech

## Troubleshooting

1. No voice options available:
   - Ensure your system has required language packs installed
   - Try using Chrome or Edge browser
   - Check if your system supports text-to-speech

2. Speech stops unexpectedly:
   - Try refreshing the page
   - Ensure stable internet connection
   - Try with shorter text segments

3. Voice quality issues:
   - Try different voice options
   - Update your browser
   - Check system language settings

## Development

### Dependencies
- No external dependencies
- Uses native Web Speech API

### Key Components

1. Speech Synthesis:
```javascript
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = 'ne-Deva';  // Language setting
```

2. Voice Selection:
```javascript
speechSynthesis.getVoices().forEach(voice => {
    // Voice filtering and selection logic
});
```

3. Error Handling:
```javascript
utterance.onerror = (event) => {
    // Error handling logic
};
```
![image](https://github.com/user-attachments/assets/fdf5b961-20a5-4a78-a598-2a2af062715a)

![speaking](https://github.com/user-attachments/assets/a6f00bda-a188-49ac-9a96-eef91eda206c)




