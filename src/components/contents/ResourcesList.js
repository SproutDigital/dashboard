import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getResources } from '../../actions/resourceActions';

class ResourcesList extends Component {
    componentDidMount() {
        this.props.getResources();
    }

    render() {
        return (
            <React.Fragment>
            <div className="loader-bg">
                <div className="loader-bar"></div>
            </div>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">

                     {/* navbar */}
                        <Navbar />



                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">

                             {/* sidebar */}
                                <Sidebar />
                            
                            {/* main content */}
                            <div className="pcoded-content">

                                <div className="page-header card">
                                    <div className="row align-items-end">
                                        <div className="col-lg-8">
                                            <div className="page-header-title">
                                                <i className="feather icon-watch bg-c-blue"></i>
                                                <div className="d-inline">
                                                    <h5>Resources info</h5>
                                                    <span>Setting up Resources info</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="page-header-breadcrumb">
                                                <ul className=" breadcrumb breadcrumb-title">
                                                    <li className="breadcrumb-item">
                                                        <a href="index.html"><i className="feather icon-home"></i></a>
                                                    </li>
                                                    <li className="breadcrumb-item">
                                                        <a href="#!">Resources info</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pcoded-inner-content">
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <div className="page-body">

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h5> Resources Lists</h5>
                                                                <div className="card-header-right">
                                                                    <ul className="list-unstyled card-option">
                                                                        <li className="first-opt"><i
                                                                                className="feather icon-chevron-left open-card-option"></i>
                                                                        </li>
                                                                        <li><i className="feather icon-maximize full-card"></i></li>
                                                                        <li><i className="feather icon-minus minimize-card"></i>
                                                                        </li>
                                                                        <li><i className="feather icon-refresh-cw reload-card"></i>
                                                                        </li>
                                                                        <li><i className="feather icon-trash close-card"></i></li>
                                                                        <li><i
                                                                                className="feather icon-chevron-left open-card-option"></i>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="card-block">
                                                            <div className="table-responsive">
                                                                        <table className="table table-xs table-hover table-outline card-table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                            <th>S/N</th>
                                                                            <th>Event Id</th>
                                                                            <th>Program Id</th>
                                                                            <th>Resource Title</th>
                                                                            {/* <th>Venue</th>
                                                                            <th>Start Date</th>
                                                                            <th>End Date</th> */}
                                                                            <th>Url</th>
                                                                            <th></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.props.resources.resources.map((data, i) => 
                                                                                  <tr key={i}>
                                                                                    <td>{i += 1}</td>
                                                                                    <td>{data.eventid}</td>
                                                                                    <td>{data.programid}</td>
                                                                                    <td><b>{data.title}</b></td>
                                                                                    <td>{data.url}</td>
                                                                                    <td className="text-right">
                                                                                    <a  className="btn btn-secondary btn-sm">
                                                                                        Edit
                                                                                    </a>
                                                                                    <a  className="btn btn-secondary btn-sm">
                                                                                        Delete
                                                                                    </a>
                                                                                    </td>
                                                                               </tr>
                                                                            )}
                                                                        </tbody>
                                                                        </table>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>

                            <div id="styleSelector">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    events: state.events,
    resources: state.resources
});

export default connect(mapStateToProps, { getResources })(ResourcesList);
