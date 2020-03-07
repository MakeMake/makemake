const path = require('path')
const fs = require('fs')

const CWD = path.resolve(__dirname, '..')
const CONFIG = process.argv[2]
const CONFIG_PATH = path.resolve(CWD, `./config/${CONFIG}`)

const WEB_CONFIG = path.resolve(CONFIG_PATH, 'config.web.ts')
const FUNCTIONS_CONFIG = path.resolve(CONFIG_PATH, 'config.functions.ts')

const WEB_PATH = path.resolve(CWD, `./packages/app/config.ts`)
const FUNCTIONS_PATH = path.resolve(CWD, `./packages/functions/src/config.ts`)

fs.copyFileSync(WEB_CONFIG, WEB_PATH)
fs.copyFileSync(FUNCTIONS_CONFIG, FUNCTIONS_PATH)
