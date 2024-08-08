/*
	returns a random integer within a range (min, max) 
	where the integer is inclusive of min and max
*/
function getRandomIntInRange(min, max) {
  const minCeil = Math.ceil(min)
  const maxFloor = Math.floor(max + 1) // makes max inclusive
  return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil)
}

/*
    returns array of integers [ r, g, b ]
    representing an html rgb color
    where each integer is within a range (min, max) 
    where default min = 0 and
    where default max = 255
*/
function getRandomRgbColor(min = 0, max = 255) {
  const r = getRandomIntInRange(min, max)
  const g = getRandomIntInRange(min, max)
  const b = getRandomIntInRange(min, max)
  return [r, g, b]
}

/*
    returns a random html hex color as a string
*/
function getRandomHexColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return `#${randomColor}`
}

/*
    converts an html color to an html hex color;
    receives an array of integers [r, g, b] and
    returns an html hex color as a string
    if any integer input is outside the inclusive range (0, 255),
    then the integer is set to nearest min or max value
*/
function convertRgbToHex(r, g, b) {
  // correct out-of-range values
  r = r < 0 ? 0 : r > 255 ? 255 : r
  g = g < 0 ? 0 : g > 255 ? 255 : g
  b = b < 0 ? 0 : b > 255 ? 255 : b

  // convert from decimal to hexidecimal
  r = r.toString(16)
  g = g.toString(16)
  b = b.toString(16)

  // pre-pend 0s to single digits and under
  if (r.length == 1) r = '0' + r
  if (g.length == 1) g = '0' + g
  if (b.length == 1) b = '0' + b

  return '#' + r + g + b
}

/*
    For TipTap collaborative cursor, 
    get cursor-flag color as html hex string
    based on random [r,g,b] within range
    min = 50, max = 205
    (to be assigned to new socket connection)
*/
function getCursorFlagColor() {
  // get random rgb values within a range
  const rgb = getRandomRgbColor(55, 200)

  // convert the rgb values to an html hex string
  const hex = convertRgbToHex(rgb[0], rgb[1], rgb[2])
  return hex
}

/*
  update all color boxes in browser
*/
function updateColors() {
  const rgbAnyBox = document.querySelector('.rgb-any-box')
  const rgbAnyText = document.querySelector('.rgb-any-txt')
  const rgbAnyColor = getRandomRgbColor()
  let r = rgbAnyColor[0]
  let g = rgbAnyColor[1]
  let b = rgbAnyColor[2]
  rgbAnyBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  rgbAnyText.innerHTML = `rgb(${r}, ${g}, ${b})`

  // update rgb range colors
  const rgbRangeBox = document.querySelector('.rgb-range-box')
  const rgbRangeText = document.querySelector('.rgb-range-txt')
  const rgbRangeColor = getRandomRgbColor(50, 205)
  r = rgbRangeColor[0]
  g = rgbRangeColor[1]
  b = rgbRangeColor[2]
  rgbRangeBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  rgbRangeText.innerHTML = `rgb(${r}, ${g}, ${b})`

  // update hex any colors
  const hexAnyBox = document.querySelector('.hex-any-box')
  const hexAnyText = document.querySelector('.hex-any-txt')
  const hexAnyColor = getRandomHexColor()
  hexAnyBox.style.backgroundColor = hexAnyColor
  hexAnyText.innerHTML = hexAnyColor

  // update hex range colors
  const hexRangeBox = document.querySelector('.hex-range-box')
  const hexRangeText = document.querySelector('.hex-range-txt')
  const hexRangeColor = convertRgbToHex(r, g, b)
  hexRangeBox.style.backgroundColor = hexRangeColor
  hexRangeText.innerHTML = hexRangeColor

  // update cursor-flag color
  const cursorFlagBox = document.querySelector('.cursor-flag-box')
  const cursorFlagText = document.querySelector('.cursor-flag-txt')
  const cursorFlagColor = getCursorFlagColor()
  cursorFlagBox.style.backgroundColor = cursorFlagColor
  cursorFlagText.innerHTML = cursorFlagColor

  // print colors
  console.log('any: ', `${rgbAnyColor} | ${hexAnyColor}`)
  console.log('range: ', `${rgbRangeColor} | ${hexRangeColor}`)
  console.log('wonky rgb to hex: ', convertRgbToHex(-1, 256, 300))
  console.log('getCursorFlagColor: ', getCursorFlagColor())
}

updateColors()

// button listener
const newColorBtn = document.querySelector('.new-color-btn')
newColorBtn.addEventListener('click', () => updateColors())

