import React, { Component } from 'react';
import Notification from '../Notification/Notification';


class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { initialValue, handleClick, handleChange } = this.props;

    return (
      <div>
        <Notification />
        <div className="form-group commentText">
          <textarea
            name="comment"
            id="comment-area"
            cols="40"
            rows="10"
            maxLength="2000"
            autoFocus
            required
            className="form-control commentText"
            defaultValue={initialValue}
            onChange={handleChange}
          />
        </div>
        <button name="cancel" type="submit" className="c-btn outline" onClick={handleClick}>Cancel</button>
        <button name="save" type="submit" className="c-btn primary" onClick={handleClick}>Save Changes</button>
      </div>
    );
  }
}

export default Comment;