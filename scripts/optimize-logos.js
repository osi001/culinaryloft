import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.join(__dirname, '../src/assets')

await sharp(path.join(assetsDir, 'logo-chef.png'))
  .webp({ quality: 85 })
  .resize(224)
  .toFile(path.join(assetsDir, 'logo-chef.webp'))

await sharp(path.join(assetsDir, 'Logo.png'))
  .webp({ quality: 85 })
  .resize(224)
  .toFile(path.join(assetsDir, 'Logo.webp'))

console.log('Logos converted to WebP.')
