import './App.css';

// File: App.js

import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

function App() {
  const [emotion, setEmotion] = useState('');

  const handleImageUpload = (imageData) => {
    console.log('Image data:', imageData);
    // Prepare the pixel data to be sent
    const width = imageData.width;
    const height = imageData.height;
    const rgbArray = [];

    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4; // Multiply by 4 for RGBA values
        row.push([
          imageData.data[index],     // R
          imageData.data[index + 1], // G
          imageData.data[index + 2], // B
          // imageData.data[index + 3] // Alpha channel, typically not needed for RGB
        ]);
      }
      rgbArray.push(row);
    }

    const payload = {
      image: rgbArray,
      width: width,
      height: height
    };
  
    fetch('http://localhost:8080/detect-emotion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setEmotion(data); // Assuming the response has an 'emotion' field
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
 

  return (
    <div className="App" style={styles.app}>
      <h1 style={styles.header}>What's in your selfie</h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      {emotion && (
        <div style={styles.emotionBox}>
          Emotion: {emotion}
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: '#FAFAFA', // Off-white background
    backgrounImage: 'url("/Users/shilpa/greatlearning/capstone/emotion-detector-app/public/background.png")', // Background image
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  header: {
    color: '#333', // Dark text for better contrast
    marginBottom: '20px'
  },
  emotionBox: {
    marginTop: '20px',
    padding: '10px 20px',
    border: '1px solid #DDD',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    height: '50px',
    TextAlign: 'center',
    fontSize: '40px',
    FontFace: 'Proxima Nova',
    color: '#333',
    width: '70%',
  }
};

export default App;
