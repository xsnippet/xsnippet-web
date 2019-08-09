import ReactGA from 'react-ga'
import { getTrackingId } from '../misc/tracking'

const useReactGA = () => {
  const initialize = () => {
    const id = getTrackingId()

    ReactGA.initialize(id)
    ReactGA.pageview(window.location.pathname)
  }

  const gaEvent = ({ category, action, value }) => {
    ReactGA.event({ category, action, value })
  }

  return {
    initialize,
    gaEvent,
  }
}

export default useReactGA
