const liquidPreset = require('@emdgroup-liquid/liquid/dist/css/tailwind-preset.cjs')

module.exports = {
  presets: [liquidPreset],
  purge: ['./src/**/*.tsx', './index.html'],
}
