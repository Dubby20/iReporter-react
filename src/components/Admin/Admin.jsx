/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import adminRequest from '../../actions/adminActions';
import Loader from '../Loader/Loader';
import './admin.scss';


class Admin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { adminRequest } = this.props;

    adminRequest();
  }

  render() {
    const { records, isLoading } = this.props;
    if (isLoading) {
      return <div className="center"><Loader /></div>;
    }
    return (
      <div className="admin-page">
        <div>
          <h2 className="status-title">Red-Flags Status</h2>
          <div className="admin-container">
            <div className="status status-box">
              <div className="status-div draft-bg">
                <h2 id="red-flag-draft" />
                <h3>Draft</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div investigation-bg">
                <h2 id="red-flag-under-investigation" />
                <h3>Under Investigation</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div resolved-bg">
                <h2 id="red-flag-resolved" />
                <h3>Resolved</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div rejected-bg">
                <h2 id="red-flag-rejected" />
                <h3>Rejected</h3>
              </div>
            </div>
          </div>

          <h2 className="status-title">Interventions Status</h2>
          <div className="admin-container">
            <div className="status status-box">
              <div className="status-div draft-bg">
                <h2 id="intervention-draft" />
                <h3>Draft</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div investigation-bg">
                <h2 id="intervention-under-investigation" />
                <h3>Under Investigation</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div resolved-bg">
                <h2 id="intervention-resolved" />
                <h3>Resolved</h3>
              </div>
            </div>
            <div className="status status-box">
              <div className="status-div rejected-bg">
                <h2 id="intervention-rejected" />
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
                <th>Username</th>
                <th>Record Type</th>
                <th>Report</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody id="tablebody">
              {records.map((item, i) => (
                <tr key={i}>
                  <td item-data="ID">{item.id}</td>
                  <td item-data="Username">Jacinta</td>
                  <td item-data="Type">{item.type}</td>
                  <td item-data="Record">
                    <button type="submit" className="view-btn">View Report</button>
                  </td>
                  <td item-data="Status">
                    <select name="status" id="select" className="form-control">
                      <option value="">
                        {item.status}
                      </option>
                      <option value="under investigation">under investigation</option>
                      <option value="resolved">resolved</option>
                      <option value="rejected">rejected</option>
                    </select>
                  </td>
                  <td><button type="submit" className="update-btn">Update Status</button></td>
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
  records: state.recordReducer.records,
});

const connectedAdmin = connect(mapStateToProps, { adminRequest })(Admin);

export default connectedAdmin;