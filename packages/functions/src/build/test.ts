import * as functions from 'firebase-functions'
import * as path from 'path'
import * as fs from 'fs'
require('isomorphic-fetch')
import { createFirebaseAdminApp } from '../backend'
import { Nuxt, Builder, Generator } from 'nuxt'
import { firebaseAdmin } from '../config'
import nuxtConfig from './nuxt.config.js'
const execSync = require('child_process').execSync
import * as zlib from 'zlib'
import * as crypto from 'crypto'
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export const test = functions.https.onCall(async (data) => {
  const firebaseAdmin = await createFirebaseAdminApp()
  const nuxtPath = path.resolve('/tmp', './nuxt')
  const pagesPath = path.resolve(nuxtPath, './pages')
  const distPath = path.resolve(nuxtPath, './dist')

  if (!fs.existsSync(nuxtPath)) {
    fs.mkdirSync(nuxtPath)
  }

  if (!fs.existsSync(pagesPath)) {
    fs.mkdirSync(pagesPath)
  }

  const querySnapshot = await firebaseAdmin
    .firestore()
    .collection('projects')
    .doc('7mgD6u0ttGD6ZzIvUxtb')
    .collection('pages')
    .get()

  const pages = []
  querySnapshot.forEach((doc) => pages.push(doc.data()))

  pages.forEach((page) => {
    const filePath = path.resolve(pagesPath, `${page.name}.vue`)

    console.log(filePath)

    const data = `
  <template>
      ${page.template}
  </template>

  <script>
      ${page.script}
  </script>

  <style>
      ${page.style}
  </style>
  `

    fs.writeFileSync(filePath, data)
  })

  // console.log(nuxtConfig)

  const nuxt = new Nuxt(nuxtConfig)
  const builder = new Builder(nuxt)
  const generator = new Generator(nuxt, builder)

  console.log('before generate')

  await builder.build()
  await generator.generate()

  const token = await getAccessToken()

  const { name } = await createVersion(token)
  const namePieces = name.split('/')
  const versionID = namePieces[namePieces.length-1]

  const files = await getFiles(distPath)


  const filesHashes = await Promise.all(
    files.map(async (filePath) => {
      const file = filePath.replace(distPath, '')
      
      const { ext } = path.parse(filePath)

      if (ext === '.') {
        return null;
      }

      const fileStat = fs.lstatSync(filePath)
      const isDirectory = fileStat.isDirectory()

      if (isDirectory) {
        return null
      }

      const { filePath: zippedFilePath, sha } = await hashFile(filePath)

      console.log({
        zippedFilePath, sha, file
      });
      

      return {
        file,
        filePath: zippedFilePath,
        sha
    })
  
  

  const filesRequest = filesHashes.reduce((acc, obj) => {
    if (!obj) {
      return acc
    }

    console.log('path', obj.file);
    
    
    return {
      ...acc,
      [obj.file]: obj.sha
    }
  }, {})

  
  const { uploadRequiredHashes, uploadUrl } = await populateFiles(token, versionID, {files: filesRequest})

  await Promise.all(filesHashes.filter(f =>  f && uploadRequiredHashes && uploadRequiredHashes.includes(f.sha)).map(file => {
    const buffer = fs.readFileSync(file.filePath)
    return uploadFile(token, uploadUrl, file.sha, buffer)
  }))

   await finalizeVersion(token, versionID);
  const res = await releaseVersion(token, versionID);

  console.log(res);
  

  return {
    status: 'ok'
  }
})

const { google } = require('googleapis')
function getAccessToken() {
  return new Promise(function(resolve, reject) {
    var key = firebaseAdmin
    var jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/firebase.hosting'],
      null
    )
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        reject(err)
        return
      }
      resolve(tokens.access_token)
    })
  })
}

async function createVersion(token) {
  const res = await fetch(
    'https://firebasehosting.googleapis.com/v1beta1/sites/yoplabidule/versions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )

  return res.json()
}

async function populateFiles(token, versionID, files) {
  const res = await fetch(
    `https://firebasehosting.googleapis.com/v1beta1/sites/yoplabidule/versions/${versionID}:populateFiles`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        files
      )
    }
  )

  return res.json()
}

async function hashFile(filePath: string) {
  // prep our own file that we're uploading
  const hasher = crypto.createHash('sha256')
  const gzipper = zlib.createGzip({ level: 9 })
  const zippedFilePath = `${filePath}.gz`
  var wstream = fs.createWriteStream(`${filePath}.gz`);

  var zipstream = fs.createReadStream(filePath).pipe(gzipper)
  zipstream.pipe(wstream)
  zipstream.pipe(hasher)

  return new Promise(function(resolve, reject) {
    zipstream.on('end', function() {
      const sha = hasher.read().toString('hex')
      resolve({sha, filePath: zippedFilePath })
    })
    zipstream.on('error', reject)
  })
}

async function uploadFile(token: string, uploadURL: string,  fileHash:string, fileBody: any) {
    const res = await fetch(
    `${uploadURL}/${fileHash}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/octet-stream'
      },
      body: fileBody
    }
  )

  console.log('uploadFile', fileHash, res.status);
  
}

async function finalizeVersion(token: string, versionID: string) {
   const res = await fetch(
    `https://firebasehosting.googleapis.com/v1beta1/sites/yoplabidule/versions/${versionID}?update_mask=status`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'FINALIZED'
      })
    }
  )

  return res.json()
}

async function getFiles(dir: string) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

async function releaseVersion(token: string, versionID: string) {
  const res = await fetch(
    `https://firebasehosting.googleapis.com/v1beta1/sites/yoplabidule/releases?versionName=sites/yoplabidule/versions/${versionID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )

  return res.json()
}