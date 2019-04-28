/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { singleRecordRequest, editCommentRequest, deleteRecordRequest } from '../../services/userServices';
import Comment from '../Comment/Comment';
import './singleRecord.scss';



class SingleRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      commentInput: '',
      showModal: false
    };
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
      (img, i) =>
        <img src={img} key={i} alt="" className="item" height="200" width="240" />

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

  toggleCommentInput = () => this.setState((prevState) => ({
    isVisible: !prevState.isVisible,
  }))

  toggleModal = () => this.setState((prevState) => ({
    showModal: !prevState.showModal,
  }))


  handleClick = async (event) => {
    const { target } = event;
    const { match: {
      params: { id }
    }, editComment, deleteRecord, history } = this.props;
    const { commentInput } = this.state;

    switch (target.name) {
      case 'cancel':
        this.toggleCommentInput();
        break;
      case 'save':
        await editComment(id, commentInput);
        this.toggleCommentInput();
        break;
      case 'delete':
        await deleteRecord(id);
        history.push('/intervention');
        break;
      default:
        this.toggleCommentInput();
    }
  }

  handleChange = (event) => {
    this.setState({
      commentInput: event.target.value,
    });
  }

  render() {
    const { isLoading, records, user } = this.props;
    const { isVisible, showModal } = this.state;

    if (isLoading) {
      return <div className="center"><Loader /></div>;
    }

    return (
      <div className="record-container">
        <div className="main-content">
          <p className="type">
            {`Type: ${records.type}`}
          </p>
          <p className="status-p">
            {`Status: ${records.status}`}
          </p>
          <p className="location">
            {`Location: ${records.location}`}
          </p>
          {!isVisible && (
            <p id="comment">
              {records.comment}
            </p>
          )}
        </div>
        {
          user.id === records.user_id && (
            <div className="actions">
              <Link to="/" className="edit-btn change-location">
                Change location
              </Link>
              <button
                name="edit"
                type="submit"
                className="edit-btn action-btn comment-btn"
                onClick={this.handleClick}
              >
                Edit Comment
              </button>
            </div>
          )
        }
        <div className="comment-div">
          {isVisible && (
            <Comment
              initialValue={records.comment}
              handleClick={this.handleClick}
              handleChange={this.handleChange}
            />
          )}
        </div>
        <div className="error" />
        <div className="hidden">
          <div className="form-group locate">
            <input type="text" id="input-location" className="form-control" />
          </div>
          <button type="submit" className="c-btn outline">Cancel</button>
          <button type="submit" className="c-btn primary">Update Location</button>
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
        {user.id === records.user_id && (
          <div className="delete-record action-btn">
            <button type="submit" className="trash" onClick={this.toggleModal}><i className="fas fa-trash fa-color fa-2x" /></button>
          </div>
        )
        }
        {showModal && (
          <div id="delete-modal" className="modal">
            <div className="del-content animate">
              <span onClick={this.toggleModal} className="close-page">&times;</span>
              <div className="del-body">
                <div className="title-background"><h4>Delete Record</h4></div>
                <p className="del-question">Are you sure you want to delete the selected record?</p>
                <hr />
                <div className="display-btn">
                  <button onClick={this.toggleModal} type="submit" className="bg-cancel">Cancel</button>
                  <button type="submit" name="delete" className="bg-red" onClick={this.handleClick}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

SingleRecord.propTypes = {
  singleRecordRequest: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isLoading: state.recordReducer.isLoading,
  records: state.recordReducer.records,
  user: state.authReducer.user.user,
});

const mapDispatchToProps = dispatch => ({
  singleRecordRequest: id => dispatch(singleRecordRequest(id)),
  editComment: (id, newComment) => dispatch(editCommentRequest(id, newComment)),
  deleteRecord: id => dispatch(deleteRecordRequest(id))

});

const connectedSingleRecord = connect(mapStateToProps, mapDispatchToProps)(SingleRecord);

export default connectedSingleRecord;