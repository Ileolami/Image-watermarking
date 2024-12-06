import sharp from 'sharp';

export const main = async (params) => {
  // Fetch the image URL from the request parameters
  const imageUrl = params.imageUrl;
  
  // Add a watermark text to the image
  const watermarkText = "Your Brand";
  
  try {
    // Fetch the image and apply watermark using Sharp
    const imageBuffer = await sharp(imageUrl)
      .resize(500)  // Resize image for better performance
      .composite([{
        input: Buffer.from(`<svg><text x="10" y="40" font-size="40" fill="white">${watermarkText}</text></svg>`),
        gravity: 'southeast'
      }])
      .toBuffer();

    // Return the processed image as a base64 string
    const base64Image = imageBuffer.toString('base64');
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    return { error: 'Error processing image' };
  }
};