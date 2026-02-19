import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'util'

if (global.TextEncoder == null) {
  global.TextEncoder = TextEncoder
}

if (global.TextDecoder == null) {
  global.TextDecoder = TextDecoder
}
