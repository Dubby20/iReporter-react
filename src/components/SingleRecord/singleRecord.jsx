/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { singleRecordRequest } from '../../services/userServices';
import './singleRecord.scss';



class SingleRecord extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const {
      match: {
        params: { id }
      },
      singleRecordRequest
    } = this.props;

    singleRecordRequest(id);
  }

  renderImage = (image = []) => {
    if (image.length === 0) {
      return 'No Image Uploaded';
    }
    const displayImage = image.map(
      img =>
        <img src={img} key={img} alt="" className="item" height="200" width="240" />

    );
    return displayImage;
  };

  renderVideo = (video = []) => {
    if (video.length === 0) {
      return 'No Video Uploaded';
    }
    const displayVideo = video.map(
      (vid, i) =>
        <video key={i} width="240" height="180" controls><source src={vid} /></video>

    );
    return displayVideo;
  };




  render() {
    const { isLoading, records } = this.props;

    return (
      <div className="record-container">
        <div className="center">
          {isLoading ? <Loader /> : ''}
        </div>
        <section className="display-item">
          <ul>
            <li className="list" key={records.id}>
              <div>
                <p className="type">
                  Type:
                  <span>
                    {records.type}
                  </span>
                </p>
              </div>
              <div>
                <p className="status-p">
                  Status:
                  <span className="status-type">

                    {records.status}
                  </span>
                </p>
              </div>
              <div className="action-btn">
                <p>
                  Location:
                  {' '}
                  <span id="location">
                    {records.location}
                  </span>
                  <Link to="/" className="edit-btn change-location">
                    Change location
                  </Link>
                </p>
              </div>
              <div className="error" />
              <div className="hidden">
                <div className="form-group locate">
                  <input type="text" id="input-location" className="form-control" />
                </div>
                <button type="submit" className="c-btn outline">Cancel</button>
                <button type="submit" className="c-btn primary">Update Location</button>
              </div>
              <div className="comment-div">
                <p id="comment">
                  {records.comment}
                </p>
                <button type="submit" className="edit-btn action-btn comment-btn">Edit Comment</button>
              </div>
              <div className="error" />
              <div className="hide-div">
                <div className="form-group">
                  <textarea name="comment" id="comment-area" cols="40" rows="10" maxLength="2000" autoFocus required className="form-control" />
                </div>
                <button type="submit" className="c-btn outline">Cancel</button>
                <button type="submit" className="c-btn primary">Save Changes</button>
              </div>
              <div id="image-frame">
                <ul className="image-layout">
                  <li className="image-list">
                    {this.renderImage(records.images)}
                  </li>
                </ul>
              </div>
              <div className="video-frame">
                <ul className="video-layout">
                  <li className="video-list">
                    {this.renderVideo(records.videos)}
                  </li>
                </ul>
              </div>
              <div className="delete-record action-btn">
                <button type="submit" className="trash"><i className="fas fa-trash fa-color fa-2x" /></button>
              </div>
            </li>
            <div id="delete-modal" className="modal">
              <div className="del-content animate">
                <span className="close-page">&times;</span>
                <div className="del-body">
                  <div className="title-background"><h4>Delete Record</h4></div>
                  <p className="del-question">Are you sure you want to delete the selected record?</p>
                  <hr />
                  <div className="display-btn">
                    <button type="submit" className="bg-cancel">Cancel</button>
                    <button type="submit" className="bg-red">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </section>

      </div>
    );
  }
}

SingleRecord.propTypes = {
  singleRecordRequest: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isLoading: state.recordReducer.isLoading,
  records: state.recordReducer.records
});

const mapDispatchToProps = dispatch => ({
  singleRecordRequest: id => dispatch(singleRecordRequest(id))
});

const connectedSingleRecord = connect(mapStateToProps, mapDispatchToProps)(SingleRecord);

export default connectedSingleRecord;