const liquidPreset = require('@emdgroup-liquid/liquid/dist/css/tailwind-preset.js')

module.exports = {
  presets: [liquidPreset],
  purge: ['./src/**/*.tsx', './public/index.html'],
}
