import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { createResource } from '../../actions/resourceActions';
import { getEvents } from '../../actions/eventsAction';
import { getPrograms } from '../../actions/programAction';
import axios from 'axios';
import { headers } from '../../utils/headerJWT';
import { url } from '../../config/config';


class Resources extends Component {
    constructor() {
        super();
        this.state = {
          eventid: "",
          programid: "",
          title: "",
          description: "",
          urls: "",
          resource: "",
          success: null,
          error: null
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getEvents();
        this.props.getPrograms();
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        let { resource, title, programid, description, eventid } = this.state;        
        let type = resource.slice(5, 20);
        let photo = resource.slice(28, resource.length);

        const dataImage = {
            name: title,
            photo: photo,
            type: type
        }

            axios.post(`${url}/upload/`, dataImage, { headers: headers })
            .then( res => {
                let urls = res.data.Location;
                    this.setState({
                        urls: urls
                    })
                }
            )
            .then(res => {
                const { urls } = this.state;
                const data = { title, programid, description, eventid, url: urls }
            
                this.props.createResource(data)
                .then(res => {
                    this.setState({ title: "", description: "", eventid: "", programid: "",  urls: "", success: "Resource addeed Successfully"})
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => console.log(err));
    }
     // check file type
     checkMimeType = event => {
        let files = event.target.files;
        let err = '';
        const types = ['application/pdf'];

        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type+' is not a supported format\n'
                this.setState({error: err})
            }
        }

        if (err !== ''){
            event.target.value = null;
            console.log(err)
                return false;
        }
        return true;
    }

    checkFileSize = event => {
        let files = event.target.files;
        let size = 2048576;
        let err = "";

        for (let x = 0; x < files.length; x++) {
            if (files[x].size > size ) {
                err += files[x].type+' is too large, Please pick a small file\n';
                this.setState({error: err})
            }
        }

        if (err !== ''){
            event.target.value = null;
            console.log(err)
                return false;
        }
        return true;
    }

    fileChangedHandler = event => {
        let self = this;
        let reader = new FileReader();
        const file = event.target.files[0];
        if (this.checkMimeType(event) && this.checkFileSize(event)) {
            reader.onload = function(upload) {
                // console.log(upload.target.result);
                self.setState({ resource: upload.target.result });
            };

            reader.readAsDataURL(file);  
        }
    }

    render() {
        let notification = "";
        if (this.state.success != null) {
            notification = (
                <div className="alert alert-success" role="alert">
                    { this.state.success }
                </div>
            );
        }
        else if (this.state.error != null) {
            notification = (
                <div className="alert alert-danger" role="alert">
                    { this.state.error }
                </div>
            );
        }

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
                                                    <h5>Resource info</h5>
                                                    <span>Setting up Resources</span>
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
                                                        <a href="/resources-list">Resource List</a>
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
                                                                <h5>Add Resource</h5>
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
                                                            { notification }
                                                            <form onSubmit={this.handleSubmit}>
                                                                <div className="card-body">
                                                                {/* <h3 className="card-title">Create An Event</h3> */}
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Resource Title</label>
                                                                        <input type="text" name="title" placeholder="Enter your Resource Title" 
                                                                        onChange={this.handleChange} value={this.state.title} className="form-control" 
                                                                        required/>
                                                                    </div>
                                                                    </div> 
                                                                    <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Upload Resource</label>
                                                                        {/* <input type="text" name="url" placeholder="Enter Resource Url"
                                                                         onChange={this.handleChange} value={this.state.url} className="form-control" required/> */}
                                                                         <input type="file" className="form-control"  onChange={this.fileChangedHandler}/>
                                                                         <em style={{ color: 'red' }}>Accepts only PDF resources</em>
                                                                    </div>
                                                                    </div> 
                                                                    
                                                                </div>
                                                                <div className="row">
                                                            
                                                                    <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Event</label>
                                                                        <select name="eventid" className="form-control" onChange={this.handleChange} value={this.state.eventid} required>
                                                                            <option value="">Select Event
                                                                            </option>
                                                                            {this.props.events.events.map((data, i) => <option key={i} value={data._id}>{data.title}</option> )}
                                                                        </select>
                                                                    </div>
                                                                    </div> 

                                                                    <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Program Id</label>
                                                                        {/* <input type="text" name="programid" placeholder="Enter Resource Program Id"
                                                                         onChange={this.handleChange} value={this.state.programid} className="form-control" required/> */}
                                                                         <select name="programid" className="form-control" onChange={this.handleChange} value={this.state.programid} required>
                                                                            <option value="">Select Event
                                                                            </option>
                                                                            {this.props.programs.programs.map((data, i) => <option key={i} value={data._id}>{data.title}</option> )}
                                                                        </select>
                                                                    </div>
                                                                    </div> 
                                                                    
                                                                </div>
                                
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Description</label>
                                                                        <textarea name="description" maxLength={500} rows="3" value={this.state.description} onChange={this.handleChange}
                                                                        className="form-control" placeholder="Resource Description">
                                                                        </textarea>
                                                                        <span>{this.state.description.length}/500</span>
                                                                    </div>
                                                                    </div> 
                                                                </div>

                                                                </div>
                                                                <div className="card-footer text-right">
                                                                <button type="submit" className="btn btn-primary">Submit</button>
                                                                </div>
                                                            </form>
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


// export default Resources;
const mapStateToProps = (state) => ({
    auth: state.auth,
    events: state.events,
    resources: state.resources,
    programs: state.programs
});

// export default Event;
export default connect(mapStateToProps, { createResource, getEvents, getPrograms })(Resources);
