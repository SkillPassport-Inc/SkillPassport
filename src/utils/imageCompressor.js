/**
 * Converts and compresses any uploaded image file (PNG, JPG, JPEG) to a lightweight WebP format.
 * Reduces file sizes by 80-90% to save storage space.
 *
 * @param {File} file - The original image file uploaded by user
 * @param {number} maxWidth - Maximum width boundary for scaling (default 1200px)
 * @param {number} quality - WebP compression quality from 0.1 to 1.0 (default 0.80)
 * @returns {Promise<{ webpDataUrl: string, blob: Blob, originalSizeKB: number, compressedSizeKB: number }>}
 */
export function convertToWebP(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (PNG, JPG, JPEG, WEBP).'));
      return;
    }

    const originalSizeKB = Math.round(file.size / 1024);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Scale down dimensions proportionally if image exceeds maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export as lightweight WebP data URL
        const webpDataUrl = canvas.toDataURL('image/webp', quality);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('WebP compression failed.'));
              return;
            }

            const compressedSizeKB = Math.round(blob.size / 1024);
            resolve({
              webpDataUrl,
              blob,
              originalSizeKB,
              compressedSizeKB,
            });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to render certificate image.'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read certificate file.'));
    reader.readAsDataURL(file);
  });
}
