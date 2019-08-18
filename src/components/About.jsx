import React, { Fragment } from 'react'
import bemi from 'bemi'

import Title from './common/Title'

import RomanImage from '../assets/photos/roman.jpg'
import IhorImage from '../assets/photos/ihor.jpg'
import OlhaImage from '../assets/photos/olha.jpg'
import KaterynaImage from '../assets/photos/kateryna.jpg'

import '../styles/AboutUs.styl'

const about = bemi('about')

const About = () => (
  <Fragment>
    <div className={about.b()}>
      <Title title="About" />
      <p className={about.e('paragraph', 'padded')}>
        XSnippet is an open source web-service for sharing code snippets on
        the Internet. Years ago it was started as educational project, and
        nothing has changed since then. The service has been rewritten several
        times from scratch and now it consists of:
      </p>
      <ul className={about.e('repo-list')}>
        <li className={about.e('repo-item')}>
          <span className={about.e('repo')}>xsnippet-api</span>
          <p className={about.e('paragraph')}>
            It implements a RESTful API to manage snippets and flies on top of
            asyncio/aiohttp and MongoDB;
          </p>
        </li>
        <li className={about.e('repo-item')}>
          <span className={about.e('repo')}>xsnippet-web</span>
          <p className={about.e('paragraph')}>
            It provides a web-based user interface (SPA) and flies on top of
            React/Redux stack;
          </p>
        </li>
        <li className={about.e('repo-item')}>
          <span className={about.e('repo')}>xsnippet-web-backend</span>
          <p className={about.e('paragraph')}>
            It is a tiny app which implements what doesn’t fall under API
            description yet required by xsnippet-web.
          </p>
        </li>
      </ul>
      <p className={about.e('paragraph')}>
        These components, and other goodies, can be found in our GitHub:
      </p>
      <a className={about.e('github')} href="http://github.com/xsnippet/">
        http://github.com/xsnippet/
      </a>
    </div>
    <div className={about.b()}>
      <Title title="Our Team" />
      <p className={about.e('paragraph', 'padded')}>
        Modern XSnippet incarnation has been designed and developed by these fine people:
      </p>
      <ul className={about.e('team-list')}>
        <li className={about.e('team-item')}>
          <img src={IhorImage} alt="Ihor Kalnytskyi" />
          <div>
            <span className={about.e('team-member')}>Ihor Kalnytskyi</span>
            <p className={about.e('paragraph', 'small')}>Back-end developer</p>
          </div>
        </li>
        <li className={about.e('team-item')}>
          <img src={RomanImage} alt="Roman Podoliaka" />
          <div>
            <span className={about.e('team-member')}>Roman Podoliaka</span>
            <p className={about.e('paragraph', 'small')}>Back-end developer</p>
          </div>
        </li>
        <li className={about.e('team-item')}>
          <img src={OlhaImage} alt="Olha Kurkaiedova" />
          <div>
            <span className={about.e('team-member')}>Olha Kurkaiedova</span>
            <p className={about.e('paragraph', 'small')}>Front-end developer</p>
          </div>
        </li>
        <li className={about.e('team-item')}>
          <img src={KaterynaImage} alt="Kateryna Zharikova" />
          <div>
            <span className={about.e('team-member')}>Kateryna Zharikova</span>
            <p className={about.e('paragraph', 'small')}>UI Designer</p>
          </div>
        </li>
      </ul>
    </div>
  </Fragment>
)

export default About
