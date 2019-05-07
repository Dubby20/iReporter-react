/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { postReport } from '../../actions/postReportActions';
import Notification from '../Notification/Notification';
import Loader from '../Loader/Loader';
import './report.scss';


export class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // location: '',
      images: [],
      videos: []
    };
  }


  updateImage = (e) => {
    this.setState({ images: [e.target.files[0]] });
  }

  updateVideo = (e) => {
    this.setState({ videos: [e.target.files[0]] });
  }

  redirect = (to) => {
    const { history } = this.props;
    history.push(to);
  }

  render() {
    const { postReport, isLoading } = this.props;
    

    return (
      <div className="page-container page-border">
        <div className="heading">
          <h3>Create a report</h3>
        </div>
        <Formik
          initialValues={{
            comment: '',
            images: [],
            videos: [],
            location: '',
            reportType: ''
          }}

          validate={values => {
            const errors = {};
            if (!values.comment) errors.comment = "Comment is required";
            if (!location) errors.location = "Location is required";
            if (!values.reportType) errors.reportType = "Report type is required";

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const { images, videos } = this.state;
            values.image = images;
            values.video = videos;

            postReport({ ...values });
            if (values.reportType === 'red-flag') {
              this.redirect('/redFlag');
            } else {
              this.redirect('/intervention');
            }
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
                  <Field
                    name="comment"
                    value={props.values.comment}
                    onChange={props.handleChange}
                    component="textarea"
                    id="comment"
                    cols="40"
                    rows="10"
                    maxLength="2000"
                    autoFocus
                    placeholder="Tell us about your report"
                    className="form-control"
                  />
                </div>

                <ErrorMessage name="reportType">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <label htmlFor="type">Type of report:</label>
                <div className="form-group">
                  <Field component="select" name="reportType" className="form-control">
                    <option value="">Select an option</option>
                    <option value="red-flag">red-flag</option>
                    <option value="intervention">intervention</option>
                  </Field>
                </div>

                <div className="form-group image-msg">
                  <label htmlFor="file">File Type: Image</label>
                  <input onChange={this.updateImage} type="file" name="images" accept="image/*" multiple="multiple" className="form-control" />
                </div>

                <div className="form-group video-msg">
                  <label htmlFor="file">File Type: Video</label>
                  <input onChange={this.updateVideo} type="file" name="videos" accept="video/mp4,video/x-m4v,video/*" multiple="multiple" className="form-control" id="video-upload" />
                </div>

                <div className="form-group location-div">
                  <ErrorMessage name="location">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                  <input
                    name="location"
                    className="location-display"
                    // ref={this.locationInput}
                    type="text"
                    value={props.values.location}
                    onChange={props.handleChange}
                  />
                </div>
                <div className="form-group btn-div">
                  <input
                    type="submit"
                    value="SEND REPORT"
                    className="send-btn"
                  />
                </div>
                <div className="center">
                  {isLoading ? <Loader /> : ''}
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