import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { createProgram } from '../../actions/programAction';
import { getPeople } from '../../actions/peopleAction';
import { getEvents } from '../../actions/eventsAction';

class Program extends Component {
    constructor() {
        super();
        this.state = {
          eventid: "",
          title: "",
          description: "",
          start_time: "",
          end_time: "",
          speakers: [],
          time_zone: "",
          success: null,
          type: "",
          date: "",
          venue: "",
          tags: ""
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMultiple = this.handleMultiple.bind(this);
    }

    componentDidMount() {
        this.props.getPeople();
        this.props.getEvents();
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleMultiple(event) {
        let array = []
        array.push(event.target.value)
        this.setState({
            speakers: array
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let { title, type, description, eventid, speakers, start_time, date, venue, tags,  end_time, time_zone } = this.state;
        let tagsArray = tags.split(',');

        const data = { title, type, description, eventid, speakers, date, venue, tags: tagsArray, start_time,  end_time, time_zone }
        
        this.props.createProgram(data)
        .then(res => {
            this.setState({ title: "", eventid: "", date: "", venue: "", tags: "", description: "",  time_zone: "", type: "", speakers: "", start_time: "",  end_time: "", success: "Program Submitted Successfully"})
        })
        .catch(err => {
            console.log(err);
        });

      
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
        // console.log('datad', this.state.speakers)
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
                                                    <h5>Program info</h5>
                                                    <span>Setting up Program Informations</span>
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
                                                        <a href="/program-list">Program List</a>
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
                                                                <h5>Create a Program</h5>
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
                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Program Title</label>
                                                                        <input type="text" name="title" placeholder="Enter your Program Title" 
                                                                        onChange={this.handleChange} value={this.state.title} className="form-control" 
                                                                        required/>
                                                                    </div>
                                                                    </div> 
                                                                
                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Event</label>
                                                                        <select name="eventid" className="form-control" onChange={this.handleChange} value={this.state.eventid} required>
                                                                            <option value="">Select Event
                                                                            </option>
                                                                            {this.props.events.events.map((data, i) => <option key={i} value={data._id}>{data.title}</option> )}
                                                                        </select>
                                                                    </div>
                                                                    </div> 

                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Speakers</label>
                                                                
                                                                        <select name="speakers" className="form-control" onChange={this.handleMultiple} value={this.state.speakers} required>
                                                                            <option value="">Select Speakers
                                                                            </option>
                                                                            {this.props.peopleProfile.peoples.map((data, i) => <option key={i} value={data._id}>{data.name}</option> )}
                                                                        </select>
                                                                    </div>
                                                                    </div> 
                                                                    
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-5">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Venue</label>
                                                                        <input type="text" name="venue" placeholder="Enter Program Venue"
                                                                         onChange={this.handleChange} value={this.state.venue} className="form-control"/>
                                                                    </div>
                                                                    </div> 

                                                                    <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Date</label>
                                                                        <input type="date" name="date" placeholder="Enter Program Date"
                                                                         onChange={this.handleChange} value={this.state.date} className="form-control" required/>
                                                                    </div>
                                                                    </div> 
                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Tags</label>
                                                                        <input type="text" name="tags" placeholder="Enter Program Tags"
                                                                         onChange={this.handleChange} value={this.state.tags} className="form-control"  />
                                                                    </div>
                                                                    </div> 
                                                                </div>
                                                             
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Type</label>
                                                                        <input type="text" name="type" placeholder="Enter Program Type"
                                                                         onChange={this.handleChange} value={this.state.type} className="form-control" required/>
                                                                    </div>
                                                                    </div> 

                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Start Time</label>
                                                                        <input type="time" name="start_time" placeholder="Enter Event Start Time"
                                                                         onChange={this.handleChange} value={this.state.start_time} className="form-control" required/>
                                                                    </div>
                                                                    </div>  
                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-label">End Time</label>
                                                                        <input type="time" name="end_time" placeholder="Enter Event end Time"
                                                                         onChange={this.handleChange} value={this.state.end_time} className="form-control" required/>
                                                                    </div>
                                                                    </div>  
                                                                    {/* <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Time Zone</label>
                                                                        <select name="time_zone" className="form-control" onChange={this.handleChange} value={this.state.time_zone} required>
                                                                                <option value="">Select your time zone
                                                                                </option>
                                                                                <option value="GMT-1">GMT-1</option>
                                                                                <option value="GMT-2">GMT-2</option>
                                                                                <option value="GMT-3">GMT-3</option>
                                                                                <option value="GMT-4">GMT-4</option>
                                                                                <option value="GMT-5">GMT-5</option>
                                                                                <option value="GMT-6">GMT-6</option>
                                                                                <option value="GMT-7">GMT-7</option>
                                                                                <option value="GMT-8">GMT-8</option>
                                                                                <option value="GMT-9">GMT-9</option>
                                                                                <option value="GMT-10">GMT-10</option>
                                                                                <option value="GMT-11">GMT-11</option>
                                                                                <option value="GMT-12">GMT-12</option>
                                                                                <option value="GMT+1">GMT+1</option>
                                                                                <option value="GMT+2">GMT+2</option>
                                                                                <option value="GMT+3">GMT+3</option>
                                                                                <option value="GMT+4">GMT+4</option>
                                                                                <option value="GMT+5">GMT+5</option>
                                                                                <option value="GMT+6">GMT+6</option>
                                                                                <option value="GMT+7">GMT+7</option>
                                                                                <option value="GMT+8">GMT+8</option>
                                                                                <option value="GMT+9">GMT+9</option>
                                                                                <option value="GMT+10">GMT+10</option>
                                                                                <option value="GMT+11">GMT+11</option>
                                                                                <option value="GMT+12">GMT+12</option>
                                                                        </select>
                                                                    </div>
                                                                    </div>  */}
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Description</label>
                                                                        <textarea name="description"  maxLength={500} rows="3" value={this.state.description} onChange={this.handleChange}
                                                                        className="form-control" placeholder="Program Description">
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

// export default Program;

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    events: state.events,
    programs: state.programs,
    peopleProfile: state.peopleProfile,
});

// export default Event;
export default connect(mapStateToProps, { createProgram, getPeople, getEvents })(Program);
