import { Dimensions } from 'react-native'

export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height

const guidelindeBaseWidth = 375
const guidelindeBaseHeight = 812

type WidthTypes = (size: number) => number

export const scaleWidthSize: WidthTypes = size => (WINDOW_WIDTH / guidelindeBaseWidth) * size
export const scaleHeightSize: WidthTypes = size => (WINDOW_HEIGHT / guidelindeBaseHeight) * size
