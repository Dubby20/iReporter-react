/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { interventionRequest } from '../../services/userServices';



class Intervention extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.interventionRequest();
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
            {records.length && records.map(item => (
              <li className="list" key={item.id}>
                <div>
                  <p className="type">
                    Type:
                    <span>{item.type}</span>
                  </p>
                </div>
                <div id="image-frame">
                  <Link to={`/records/${item.id}`} target="_self" className="red-flag">
                    {item.images.length === 0 ? <p>No Image Uploaded</p> : <img src={(item.images.slice(0, 1))} alt="" className="item" height="200" width="240" />}
                  </Link>
                </div>
                <div className="comment-div">
                  <Link to={`/records/${item.id}`} title="intervention" className="comment">
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

Intervention.propTypes = {
  interventionRequest: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isLoading: state.recordReducer.isLoading,
  records: state.recordReducer.records
});

const connectedIntervention = connect(mapStateToProps, { interventionRequest })(Intervention);

export default connectedIntervention;