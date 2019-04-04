/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable global-require */
import React, { Component } from 'react';
import './profile.scss';


class Profile extends Component {
    state = {}

    render() {
      return (
        <div>
          <div className="loader">
            <img src={require('../../../public/images/spinner.gif')} alt="spinner" />
          </div>
          <div>
            <h2 className="status-title">Red-Flags Status</h2>
            <div className="admin-container">
              <div className="status status-box">
                <div className="status-div draft-bg">
                  <h2 id="red-flag-draft" />
                  <h3>Draft</h3>
                </div>
              </div>
              <div className="status status-box">
                <div className="status-div investigation-bg">
                  <h2 id="red-flag-under-investigation" />
                  <h3>Under Investigation</h3>
                </div>
              </div>
              <div className="status status-box">
                <div className="status-div resolved-bg">
                  <h2 id="red-flag-resolved" />
                  <h3>Resolved</h3>
                </div>
              </div>
              <div className="status status-box">
                <div className="status-div rejected-bg">
                  <h2 id="red-flag-rejected" />
                  <h3>Rejected</h3>
                </div>
              </div>
            </div>

            <h2 className="status-title">Interventions Status</h2>
            <div className="admin-container">
              <div className="status status-box">
                <div className="status-div draft-bg">
                  <h2 id="intervention-draft" />
                  <h3>Draft</h3>
                </div>
              </div>
              <div className="status status-box">
                <div className="status-div investigation-bg">
                  <h2 id="intervention-under-investigation" />
                  <h3>Under Investigation</h3>
                </div>
              </div>
              <div className="status status-box">
                <div className="status-div resolved-bg">
                  <h2 id="intervention-resolved" />
                  <h3>Resolved</h3>
                </div>
              </div>
              <div className="status status-box">
                <div className="status-div rejected-bg">
                  <h2 id="intervention-rejected" />
                  <h3>Rejected</h3>
                </div>
              </div>
            </div>
          </div>


          <div className="table-responsive">
            <table className="table table-border table-striped">
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Record Type</th>
                  <th>Report</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="tablebody" />
            </table>
          </div>
        </div>
      );
    }
}

export default Profile;
