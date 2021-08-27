const fs = require('fs')
const path = process.argv[2]

function cat(path) {
  fs.readFile(`${path}`, 'utf8', (err, data) => {
    if (err) {
      // handle possible error
      console.error(`Error reading ${path}: ${err}`)
      // kill the process and tell the shell it errored
      process.exit(1)
    }
    // otherwise success
    console.log(`${data}`)
  })
}

cat(path)