export class DefaultFonts {
  constructor() {
    this.fontFamily = 'sans-serif'
  }
  fontFamily: string
}

export type FontSettings = {
  regular: DefaultFonts
  medium: DefaultFonts
  light: DefaultFonts
  thin: DefaultFonts
}

const defaults: FontSettings = {
  regular: {
    fontFamily: 'Helvetica Neue',
  },
  medium: {
    fontFamily: 'HelveticaNeue-Bold',
  },
  light: {
    fontFamily: 'HelveticaNeue-light',
  },
  thin: {
    fontFamily: 'HelveticaNeue-thin',
  },
}

const fontConfig = {
  web: defaults,
  ios: defaults,
  android: defaults,
  macos: undefined,
  windows: undefined,
  native: undefined
}

export default fontConfig
