/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { postReport, getLocation } from '../../services/userServices';
import Notification from '../Notification/Notification';
import Loader from '../Loader/Loader';
import './report.scss';


class Report extends Component {


  render() {
    const { postReport, isLoading } = this.props;
    const { coords: { latitude, longitude }, getLocation } = this.props;
    return (
      <div className="page-container page-border">
        <div className="heading">
          <h3>Create a report</h3>
        </div>
        <Formik
          initialValues={{ comment: "", images: [], videos: [], location: "", reportType: "" }}
          validate={values => {
            const errors = {};
            if (!values.comment) errors.comment = "Comment is required";
            if (values.images.length > 0) {
              return values.images.map(image => ({
                fileName: image.name,
                type: image.type,
              }));
            }
            if (values.videos.length > 0) {
              return values.videos.map(video => ({
                fileName: video.name,
                type: video.type,
              }));

            }
            if (!values.location) errors.location = "Location is required";
            if (!values.reportType) errors.reportType = "Report type is required";

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            postReport(values);
            setSubmitting(true);
          }}
        >
          {props => (
            <div className="report">
              <Notification />
              <Form id="reportForm" onSubmit={props.handleSubmit}>
                <ErrorMessage name="comment">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <label htmlFor="comment">Comment:</label>
                <div className="form-group">
                  <textarea
                    name="comment" value={props.values.comment} onChange={props.handleChange} id="comment" cols="40" rows="10" maxLength="2000" autoFocus placeholder="Tell us about your report"
                    required className="form-control" />
                </div>

                <ErrorMessage name="reportType">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <label htmlFor="type">Type of report:</label>
                <div className="form-group">
                  <select required id="select" className="form-control" onChange={props.handleChange}>
                    <option value="">Select an option</option>
                    <option value={props.values.reportType}>red-flag</option>
                    <option value={props.values.reportType}>intervention</option>
                  </select>
                </div>

                <div className="form-group image-msg">
                  <label htmlFor="file">File Type: Image</label>
                  {isLoading ? <Loader /> : ''}
                  <input type="file" name="file" accept="image/*" multiple="multiple" className="form-control" onChange={props.handleChange} file={props.values.images} />
                  <ul id="displayImages" file={props.values.file} />
                </div>
                <div className="form-group video-msg">
                  <label htmlFor="file">File Type: Video</label>
                  {isLoading ? <Loader /> : ''}
                  <input type="file" name="file" accept="video/mp4,video/x-m4v,video/*" multiple="multiple" onChange={props.handleChange} file={props.values.videos} className="form-control" id="video-upload" />
                  <ul id="displayVideos" file={props.values.file} />
                </div>
                <div className="form-group location-div">
                  <ErrorMessage name="location">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                  <button type="submit" className="location-btn" onClick={this.getLocation}>Get my current location</button>
                  <p id="location-code">{props.values.location}</p>
                  <p id="location-code">
                    {latitude}
                    ,
                    {longitude}
                  </p>


                </div>
                <div className="form-group btn-div">
                  <input type="submit" value="SEND REPORT" className="send-btn" />
                </div>

              </Form>
            </div>
          )}

        </Formik>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.recordReducer.isLoading,
  location: state.recordReducer.location
});

const connectedPost = connect(mapStateToProps, { postReport })(Report);

export default connectedPost;
