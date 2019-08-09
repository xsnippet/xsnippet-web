import ReactGA from 'react-ga'

const analytics = state => next => action => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)

  return next(action)
}

export default analytics
