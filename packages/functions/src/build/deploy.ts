import * as functions from 'firebase-functions'
import * as path from 'path'
import * as fs from 'fs'
require('isomorphic-fetch')
import { createFirebaseAdminApp } from '../backend'
import { Nuxt, Builder, Generator } from 'nuxt'
import nuxtConfig from './nuxt.config.js'
import getBucket  from './getBucket'
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);


export const deploy = functions.https.onCall(async (data) => {
  const { projectID, slug } = data
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
    .doc(projectID)
    .collection('pages')
    .get()

  const pages = []
  querySnapshot.forEach((doc) => pages.push(doc.data()))

  pages.forEach((page) => {
    const filePath = path.resolve(pagesPath, `${page.name}.vue`)

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

  const nuxt = new Nuxt(nuxtConfig)
  const builder = new Builder(nuxt)
  const generator = new Generator(nuxt, builder)

  await builder.build()
  await generator.generate()

  const bucket = await getBucket(slug)

  const distFiles = await getFiles(distPath)

  await Promise.all(distFiles.map(filePath => {
    const destination = filePath.replace(distPath, '').slice(1)
    return bucket.upload(filePath, {destination})
  }))

  return {
    status: 'ok'
  }
})


async function getFiles(dir: string) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}
