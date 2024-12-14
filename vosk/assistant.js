const { Model, Recognizer } = require('vosk');
const fs = require('fs');
const { spawn } = require('child_process');
const record = require('node-record-lpcm16');

// Load the Vosk model
const modelPath = 'model'; // Path to your downloaded model
const model = new Model(modelPath);
const recognizer = new Recognizer(model, 16000);

// Start recording audio from the microphone
const mic = record.start({
  sampleRate: 16000,
  threshold: 0, // Silence threshold
  recordProgram: 'rec', // Try also "arecord" or "sox"
});

// Pipe the microphone input to the recognizer
mic.pipe(recognizer);

recognizer.on('result', (result) => {
  const text = result.text;
  console.log(`You said: ${text}`);

  // Here, you can add logic to respond to specific commands
  if (text.includes('hello')) {
    console.log('Hello! How can I assist you today?');
  } else if (text.includes('weather')) {
    console.log('Fetching the weather report for you...');
    // Add weather fetching logic here
  } else if (text.includes('exit')) {
    console.log('Goodbye!');
    mic.unpipe(recognizer);
    record.stop();
  }
});

recognizer.on('error', (err) => {
  console.error('Recognition error:', err);
});

mic.on('error', (err) => {
  console.error('Microphone error:', err);
});

console.log('Listening...');

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('Exiting...');
  mic.unpipe(recognizer);
  record.stop();
  process.exit();
});
