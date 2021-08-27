const axios = require('axios')
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

async function webCat(url) {
  try {
    res = await axios.get(`${url}`)
    console.log(res.data)
  } 
  catch (err) {
    console.log(`Error reading ${url}: ${err}`)
    process.exit(1)
  }
}

if (path.slice(0, 4) === 'http') {
  webCat(path)
}
else {
  cat(path)
}

