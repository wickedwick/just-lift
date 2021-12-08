import { configureFonts, DefaultTheme } from 'react-native-paper'
import customFonts from './Fonts'

export const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  colors: {
    ...DefaultTheme.colors,
    primary: '#4169E1',
    accent: '#f1c40f',
    favorite: '#BADA55',
    cancelButton: '#a4c639',
    iconColor: '#808080',
    background: '#e1e1e1',
  },
}

export const darkTheme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  colors: {
    ...DefaultTheme.colors,
    primary: '#00f56a',
    accent: '#ffed65',
    favorite: '#ffed65',
    cancelButton: '#cc2936',
    iconColor: '#808080',
    background: '#2d3047',
    surface: '#93b7be',
    error: '#cc2936',
    text: '#FFFFFF',
  },
}
