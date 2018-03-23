export const getCorrectTextColor = hex => {
  const threshold = 130 /* about half of 256. Lower threshold equals more dark text on dark background  */

  const hRed = hexToR(hex)
  const hGreen = hexToG(hex)
  const hBlue = hexToB(hex)

  function hexToR(h) {
    return parseInt(cutHex(h).substring(0, 2), 16)
  }
  function hexToG(h) {
    return parseInt(cutHex(h).substring(2, 4), 16)
  }
  function hexToB(h) {
    return parseInt(cutHex(h).substring(4, 6), 16)
  }
  function cutHex(h) {
    return h.charAt(0) == '#' ? h.substring(1, 7) : h
  }

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000
  if (cBrightness > threshold) {
    return '#000000'
  } else {
    return '#ffffff'
  }
}

export const homePageStyles = {
  paper: {
    margin: 5,
    padding: 10,
    display: 'block',
    height: '100%',
    minHeight: '100vh',
    transitionEnabled: true,
    backgroundColor: '#F2F6F7',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowRadius: 5
  }
}

export const listPageStyles = {
  paper: {
    margin: 5,
    padding: 10,
    display: 'block',
    height: '100%',
    minHeight: '100vh',
    transitionEnabled: true,
    backgroundColor: '#F2F6F7',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowRadius: 5
  }
}
