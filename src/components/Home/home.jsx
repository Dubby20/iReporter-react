/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

const Home = () => (
  <div>
    <article className="slide-img">
      <div className="banner">
        <div className="banner-text">
          <h1>Send us a report</h1>
          <p>When you get in touch with us, your anonymity is 100% guaranteed.</p>
        </div>
      </div>
    </article>
    <div className="row">
      <div className="left-side">
        <div className="bg-color">
          <div className="text-section">
            <h3>Reporting a red-flag</h3>
            <p>Information about how to report an incident linked to corruption</p>
            <div className="btn-container"><Link to="/report" className="btn">Report here</Link></div>
          </div>
        </div>
      </div>
      <div className="left-side">
        <div className="bg-color">
          <div className="text-section">
            <h3>Reporting an Intervention</h3>
            <p className="p-text">
              Information about how to report for a government agency to intervene e.g repair bad
              road sections, collapsed bridges, flooding e.t.c.
            </p>
            <div className="btn-container"><Link to="/report" className="btn">Report here</Link></div>
          </div>
        </div>
      </div>
    </div>

    <div className="menu-container menu-div">
      <div className="menu-section">
        <h2 className="intervention">Red Flag</h2>
        <div className="row">
          <div className="column">
            <div className="card">
              <div className="card-image" height="200" width="200">
                <img src={require('../../../public/images/bribery-and-corruption.jpg')} alt="" className="img-fluid" />
              </div>
              <div className="image-description">
                <h4>Bribery and Corruption Cases</h4>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="card-image">
                <img src={require('../../../public/images/businessman-receive-money.jpg')} alt="" className="img-fluid" />
              </div>
              <div className="image-description">
                <h4>Corruption in business contracts</h4>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="card-image">
                <img src={require('../../../public/images/money.jpg')} alt="" className="img-fluid" />
              </div>
              <div className="image-description">
                <h4>Money Laundering</h4>
              </div>
            </div>
          </div>
        </div>

        <h2 className="intervention">Intervention</h2>
        <div className="row">
          <div className="column">
            <div className="card">
              <div className="card-image">
                <img src={require('../../../public/images/bad-roads.jpg')} alt="" className="img-fluid" />
              </div>
              <div className="image-description">
                <h4>Bad roads</h4>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="card-image">
                <img src={require('../../../public/images/floods.jpg')} alt="" className="img-fluid" />
              </div>
              <div className="image-description">
                <h4>Flood</h4>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="card-image" height="" width="">
                <img src={require('../../../public/images/poor-electricity.jpeg')} alt="" className="img-fluid" />
              </div>
              <div className="image-description">
                <h4>Poor Electricity</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
