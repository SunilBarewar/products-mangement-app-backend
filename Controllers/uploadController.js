const fs = require('fs')
const path = require('path')
const deleteImage = (req, res) => {
  const image_name = req.params.imagename;
  try {
    fs.unlinkSync(path.join(__dirname, `../public/images/${image_name}`));
    return res.status(200).send('Successfully! Image has been Deleted');
  } catch (err) {
    return res.status(400).send(err);
  }

}

const uploadImage = (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  deleteImage,
  uploadImage
}