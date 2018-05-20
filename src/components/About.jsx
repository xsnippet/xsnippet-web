import React from 'react';
import Title from './common/Title';

import '../styles/AboutUs.styl';
import RomanImage from '../assets/photos/roman.jpg';
import IhorImage from '../assets/photos/ihor.jpg';
import OlhaImage from '../assets/photos/olha.jpg';
import AinuraImage from '../assets/photos/ainura.jpg';
import KaterynaImage from '../assets/photos/kateryna.jpg';

const About = () => (
  [
    <div className="about-us" key="about">
      <Title title="About" key="About title" />
      <p className="about-us-paragraph">
        XSnippet is an open source web-service for sharing code snippets on
        the Internet. Years ago it was started as educational project, and
        nothing has changed since then. The service has been rewritten several
        times from scratch and now it consists of:
      </p>
      <ul className="about-us-repo-list">
        <li className="about-us-repo-item">
          <span className="about-us-repo">xsnippet-api</span>
          <p className="about-us-paragraph">
            It implements a RESTful API to manage snippets and flies on top of
            asyncio/aiohttp and MongoDB;
          </p>
        </li>
        <li className="about-us-repo-item">
          <span className="about-us-repo">xsnippet-web</span>
          <p className="about-us-paragraph">
            It provides a web-based user interface (SPA) and flies on top of
            React/Redux stack;
          </p>
        </li>
        <li className="about-us-repo-item">
          <span className="about-us-repo">xsnippet-web-backend</span>
          <p className="about-us-paragraph">
            It is a tiny app which implements what doesn’t fall under API
            description yet required by xsnippet-web.
          </p>
        </li>
      </ul>
      <p className="about-us-paragraph">
        These components, and other goodies, can be found in our GitHub:
      </p>
      <a className="about-us-github" href="http://github.com/xsnippet/">
        http://github.com/xsnippet/
      </a>
    </div>,
    <div className="about-us" key="team">
      <Title title="Our Team" key="Team title" />
      <p className="about-us-paragraph">
        Modern XSnippet incarnation has been designed and developed by these fine people:
      </p>
      <ul className="about-us-team-list">
        <li className="about-us-team-item">
          <img src={KaterynaImage} alt="Kateryna Zharikova" />
          <div>
            <span className="about-us-team-member">Kateryna Zharikova</span>
            <p className="about-us-paragraph small">UI Designer</p>
          </div>
        </li>
        <li className="about-us-team-item">
          <img src={IhorImage} alt="Ihor Kalnytskyi" />
          <div>
            <span className="about-us-team-member">Ihor Kalnytskyi</span>
            <p className="about-us-paragraph small">Back-end developer</p>
          </div>
        </li>
        <li className="about-us-team-item">
          <img src={RomanImage} alt="Roman Podoliaka" />
          <div>
            <span className="about-us-team-member">Roman Podoliaka</span>
            <p className="about-us-paragraph small">Back-end developer</p>
          </div>
        </li>
        <li className="about-us-team-item">
          <img src={OlhaImage} alt="Olha Kurkaiedova" />
          <div>
            <span className="about-us-team-member">Olha Kurkaiedova</span>
            <p className="about-us-paragraph small">Front-end developer</p>
          </div>
        </li>
        <li className="about-us-team-item">
          <img src={AinuraImage} alt="Ainura Aliieva" />
          <div>
            <span className="about-us-team-member">Ainura Aliieva</span>
            <p className="about-us-paragraph small">Front-end developer</p>
          </div>
        </li>
      </ul>
    </div>,
  ]
);

export default About;
