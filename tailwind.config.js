const liquidPreset = require('./tailwind-preset.js')

module.exports = {
  presets: [liquidPreset],
  purge: ['./src/**/*.tsx', './public/index.html'],
}
