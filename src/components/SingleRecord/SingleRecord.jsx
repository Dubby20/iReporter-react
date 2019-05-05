/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { singleRecordRequest } from '../../actions/singleRecordActions';
import editCommentRequest from '../../actions/editcommentActions';
import deleteRecordRequest from '../../actions/deleteRecordActions';
import Comment from '../Comment/Comment';
import './singleRecord.scss';



export class SingleRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      commentInput: '',
      showModal: false
    };
  }

  async componentDidMount() {

    const {
      match: {
        params: { id, type }
      },
      singleRecordRequest
    } = this.props;

    await singleRecordRequest({ id, type });
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
      params: { id, type }
    }, editComment, deleteRecord, history } = this.props;
    const { commentInput } = this.state;

    switch (target.name) {
      case 'cancel':
        this.toggleCommentInput();
        break;
      case 'save':
        await editComment({ id, type, newComment: commentInput });
        this.toggleCommentInput();
        break;
      case 'delete':
        await deleteRecord(id);
        if (type === 'red-flag') {
          history.push('/redFlag');
        } else {
          history.push('/intervention');
        }
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
    const { isLoading, record, user } = this.props;
    const { isVisible, showModal } = this.state;

    if (isLoading) {
      return <div className="center"><Loader /></div>;
    }

    return (
      <div className="record-container">
        <div className="main-content">
          <p className="type">
            {`Type: ${record.type}`}
          </p>
          <p className="status-p">
            {`Status: ${record.status}`}
          </p>
          <p className="location">
            {`Location: ${record.location}`}
          </p>
          {!isVisible && (
            <p id="comment">
              {record.comment}
            </p>
          )}
        </div>
        {
          user.id === record.user_id && (
            <div className="actions">
              <button className="edit-btn change-location">
                Change location
              </button>
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
              initialValue={record.comment}
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
              {this.renderImage(record.images)}
            </li>
          </ul>
        </div>
        <div className="video-frame">
          <ul className="video-layout">
            <li className="video-list">
              {this.renderVideo(record.videos)}
            </li>
          </ul>
        </div>
        {user.id === record.user_id && (
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
  record: state.recordReducer.record,
  user: state.authReducer.user.user,
});

const mapDispatchToProps = dispatch => ({
  singleRecordRequest: payload => dispatch(singleRecordRequest(payload)),
  editComment: payload => dispatch(editCommentRequest(payload)),
  deleteRecord: id => dispatch(deleteRecordRequest(id))
});


const connectedSingleRecord = connect(mapStateToProps, mapDispatchToProps)(SingleRecord);

export default connectedSingleRecord;