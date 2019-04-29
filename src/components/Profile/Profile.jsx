/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { profileRequest } from '../../services/userServices';
import Loader from '../Loader/Loader';
import './profile.scss';


class Profile extends Component {

  componentDidMount() {
    const { profileRequest } = this.props;

    profileRequest();
  }


  render() {
    const {
      isLoading,
      recordsWithStats: { records, redFlagDrafts, redFlagUnderInvestigation,
        redFlagResolved, redFlagRejected, interventionDrafts, interventionUnderInvestigation,
        interventionResolved, interventionRejected
      }
    } = this.props;
    if (isLoading) {
      return <div className="center"><Loader /></div>;
    }

    return (
      <div>
        <div>
          <h2 className="status-title">Red-Flags Status</h2>
          <div className="admin-container">
            <div className="status status-box">
              <div className="status-div draft-bg">
                <h2 id="red-flag-draft">{redFlagDrafts}</h2>
                <h3>Draft</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div investigation-bg">
                <h2 id="red-flag-under-investigation">{redFlagUnderInvestigation}</h2>
                <h3>Under Investigation</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div resolved-bg">
                <h2 id="red-flag-resolved">{redFlagResolved}</h2>
                <h3>Resolved</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div rejected-bg">
                <h2 id="red-flag-rejected">{redFlagRejected}</h2>
                <h3>Rejected</h3>
              </div>
            </div>
          </div>

          <h2 className="status-title">Interventions Status</h2>
          <div className="admin-container">
            <div className="status status-box">
              <div className="status-div draft-bg">
                <h2 id="intervention-draft">{interventionDrafts}</h2>
                <h3>Draft</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div investigation-bg">
                <h2 id="intervention-under-investigation">{interventionUnderInvestigation}</h2>
                <h3>Under Investigation</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div resolved-bg">
                <h2 id="intervention-resolved">{interventionResolved}</h2>
                <h3>Resolved</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div rejected-bg">
                <h2 id="intervention-rejected">{interventionRejected}</h2>
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
            <tbody id="tablebody">
              {records.map((item, i) => (
                <tr key={i}>
                  <td item-data="ID">{item.id}</td>
                  <td item-data="Type">{item.type}</td>
                  <td item-data="Comment">
                    <Link to={`/records/${item.type}/${item.id}`} title={item.type} className="comment" id={item.id}>

                      {item.comment.slice(0, 70)}
                      ...
                    </Link>

                  </td>
                  <td item-data="Status">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.recordReducer.isLoading,
  recordsWithStats: state.recordReducer,
});

const connectedProfile = connect(mapStateToProps, { profileRequest })(Profile);

export default connectedProfile;