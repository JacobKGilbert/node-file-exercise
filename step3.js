const fs = require('fs')
const axios = require('axios')

let path
let target

function checkForOutAndProcess(text, target) {
  if (target) {
    fs.writeFile(target, text, 'utf8', function (err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`)
        process.exit(1)
      }
    })
  } else {
    console.log(text)
  }
}

function cat(path, target) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`)
      process.exit(1)
    } else {
      checkForOutAndProcess(data, target)
    }
  })
}

async function webCat(url, target) {
  try {
    let resp = await axios.get(url)
    checkForOutAndProcess(resp.data, target)
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`)
    process.exit(1)
  }
}



if (process.argv[2] === '--out') {
  target = process.argv[3]
  path = process.argv[4]
} else {
  path = process.argv[2]
}

if (path.slice(0, 4) === 'http') {
  webCat(path, target)
} else {
  cat(path, target)
}
