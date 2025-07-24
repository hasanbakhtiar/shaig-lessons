const fs = require('fs');
const { path } = require('path');

const deleteSingleOldImage = (imagePath) => {
  const fullImagePath = path.join(imagePath);
  fs.unlink(fullImagePath, (err) => {
    if (err) {
      console.log('An error occurred while deleting the image', err);
    } else {
      console.log('Old image deleted successfully');
    }
  });
};
module.exports = {deleteSingleOldImage};
