/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { redFlagRequest } from '../../services/userServices';
import './redFlag.scss';



class RedFlag extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.redFlagRequest();
  }


  render() {
    const { isLoading, records } = this.props;
    return (
      <div className="container">
        <div className="center">
          {isLoading ? <Loader /> : ''}
        </div>
        <div className="record-container">
          <ul className="record-items">
            {records.map(item => (
              <li className="list" key={item.id}>
                <div>
                  <p className="type">
                    Type:
                    <span>{item.type}</span>
                  </p>
                </div>
                <div id="image-frame">
                  <Link to="/red-flags/" target="_self" className="red-flag">
                    {item.images.length === 0 ? <p>No Image Uploaded</p> : <img src={(item.images.slice(0, 1))} alt="" className="item" height="200" width="240" />}
                  </Link>
                </div>
                <div className="comment-div">
                  <Link to="/red-flags/" title="red-flag" className="comment">
                    {item.comment.slice(0, 150)}
                    ...
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

RedFlag.propTypes = {
  redFlagRequest: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isLoading: state.recordReducer.isLoading,
  records: state.recordReducer.records
});

const connectedRedFlag = connect(mapStateToProps, { redFlagRequest })(RedFlag);

export default connectedRedFlag;