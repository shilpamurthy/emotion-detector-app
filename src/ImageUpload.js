// File: ImageUpload.js

// ImageUpload.js

import React, { useState } from 'react';

function ImageUpload({ onImageUpload }) {

  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            if (imageData && imageData.data) {
              onImageUpload(imageData);
            } else {
              console.error('Failed to get image data');
            }
          } else {
            console.error('Failed to get canvas context');
          }
        };
        img.src = event.target.result;
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-container" style={styles.container}>
      <input type="file" onChange={handleImageChange} accept="image/*" style={styles.input} />
      {previewUrl && <img src={previewUrl} alt="Preview" style={styles.preview} />}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  input: {
    margin: '10px 0',
  },
  preview: {
    marginTop: '10px',
    maxHeight: '300px',
    maxWidth: '100%',
    borderRadius: '8px'
  }
};

export default ImageUpload;

