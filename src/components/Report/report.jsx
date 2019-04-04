/* eslint-disable global-require */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './report.scss';


class Report extends Component {
    state = { }

    render() {
      return (
        <div className="page-container page-border">
          <div className="heading">
            <h3>Create a report</h3>
          </div>
          <div className="report">
            <form action="" method="POST" id="reportForm">
              <div id="msg-error" />
              <label htmlFor="comment">Comment:</label>
              <div className="form-group">
                <textarea
name="comment" id="comment" cols="40" rows="10" maxLength="2000" autoFocus placeholder="Tell us about your report"
            required className="form-control" />
              </div>
              <label htmlFor="type">Type of report:</label>
              <div className="form-group">
                <select required id="select" className="form-control">
                  <option value="">Select an option</option>
                  <option value="red-flag">Red-flag</option>
                  <option value="intervention">Intervention</option>
                </select>
              </div>

              <div className="form-group image-msg">
                <label htmlFor="file">File Type: Image</label>
                <img src={require('../../../public/images/spinner.gif')} alt="spinner" className="loader" />
                <input type="file" accept="image/*" multiple="multiple" className="form-control" id="image-upload" />
                <ul id="displayImages" />
              </div>
              <div className="form-group video-msg">
                <label htmlFor="file">File Type: Video</label>
                <img src={require('../../../public/images/spinner.gif')} alt="spinner" className="loader" />
                <input type="file" accept="video/mp4,video/x-m4v,video/*" multiple="multiple" className="form-control" id="video-upload" />
                <ul id="displayVideos" />
              </div>
              <div className="form-group location-div">
                <Link to="#" onclick="getLocation()" class="location-btn">
            Use current location
                </Link>
                <p id="location-code" />
              </div>
              <div className="form-group btn-div">
                <input type="submit" value="SEND REPORT" className="send-btn" />
              </div>
              <div className="loader">
                <img src={require('../../../public/images/spinner.gif')} alt="spinner" className="" />
              </div>
            </form>
          </div>
        </div>
      );
    }
}

export default Report;
