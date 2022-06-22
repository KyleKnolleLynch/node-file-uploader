const path = require('path')

const fileExtLimiter = allowedExtArray => {
  return (req, res, next) => {
    const files = req.files

    const fileExtensions = []

    for (let file in files) {
      fileExtensions.push(path.extname(files[file].name))
    }

    //  Are the file extensions allowed
    const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
          ',',
          ', '
        )

      return res.status(422).json({ status: 'error', message })
    }

    next()
  }
}

module.exports = fileExtLimiter
