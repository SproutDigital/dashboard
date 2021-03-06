import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { createCompanyProfile } from '../../actions/companyProfileAction';
import {countries} from '../../common/country';
import axios from 'axios';
import { headers } from '../../utils/headerJWT';
import { url } from '../../config/config';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
          industry: "",
          name: "",
          phone: "",
          address: "",
          short_bio: "",
          website: "",
          country: "",
          photo: "",
          facebook: "",
          facebook_visible: false,
          twitter: "",
          twitter_visible: false,
          linkedin: "",
          linkedin_visible: false,
          instagram: "",
          instagram_visible: false,
          email: "",
          success: null,
          error: null
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let { photo, industry, email, name, phone, address, short_bio,
            website, country, facebook, facebook_visible,
            twitter, twitter_visible, linkedin, linkedin_visible, instagram, instagram_visible } = this.state;

            let site = '';

            if (website.includes('http')) {
                site = website;
            }
            else {
                site = `http://${website}`;
            }
            

            let type = photo.slice(5, 14);
            let photoData = photo.slice(22, photo.length);
            let countryName = country.slice(3, country.length)
    
            const dataImage = {
                name: name,
                photo: photoData,
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

                const data = { industry, email, name, phone, address, short_bio,
                    website: site, country: countryName, facebook, facebook_visible, logo: urls,
                    twitter, twitter_visible, linkedin, linkedin_visible, instagram, instagram_visible }
                    //  console.log('data', data);
                    this.props.createCompanyProfile(data)
                        .then(res => {
                            this.setState({ industry: "", email: "", name: "", phone: "", address: "", short_bio: "", 
                            website: "", country: "", photo: "", facebook: "", facebook_visible: "",
                            twitter: "", twitter_visible: "", linkedin: "", linkedin_visible: "", instagram: "", instagram_visible: "", success: "Company created Successfully"});
                            this.props.history.push('/company-list');
                            window.location.reload();
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
        const types = ['image/png', 'image/jpeg', 'image/gif'];

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
        let size = 1048576;
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

    imageChangedHandler = event => {
        let self = this;
        let reader = new FileReader();
        const file = event.target.files[0];
        if (this.checkMimeType(event) && this.checkFileSize(event)) {
            reader.onload = function(upload) {
                // console.log(upload.target.result);
                self.setState({ photo: upload.target.result });
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
        let countryArray = Object.keys(countries);   
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
                                                    <h5>Company Profile info</h5>
                                                    <span>Setting up company Profile</span>
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
                                                        <a href="/company-list">Company List</a>
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
                                                                <h5>Add Company Profile</h5>
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
                                                                        <label className="form-label">Industry</label>
                                                                        {/* <input type="text" name="industry" placeholder="Enter Industry" 
                                                                        onChange={this.handleChange} value={this.state.industry} className="form-control" 
                                                                        /> */}
                                                                        <select name="industry" className="form-control" onChange={this.handleChange} value={this.state.industry}>
                                                                                <option value="">Select your Industry
                                                                                </option>
                                                                                <option value="agriculture">Agriculture</option>
                                                                                <option value="construction/real-estate">Construction/Real Estate</option>
                                                                                <option value="consumer-goods">Consumer Goods</option>
                                                                                <option value="health-care">Health Care</option>
                                                                                <option value="industrial_goods">Industrial Goods</option>
                                                                                <option value="ICT">Information & Communication Technology (ICT)</option>
                                                                                <option value="natural_resources">Natural Resource</option>
                                                                                <option value="oil/gas">Oil & Gas</option>
                                                                                <option value="services">Services</option>
                                                                                <option value="utilities">Utilities</option>
                                                                        </select>
                                                                    </div>
                                                                    </div> 
                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Name</label>
                                                                        <input type="text" name="name" placeholder="Enter Name"
                                                                         onChange={this.handleChange} value={this.state.name} className="form-control" />
                                                                    </div>
                                                                    </div> 
                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-label">phone</label>
                                                                        <input type="number" name="phone" placeholder="Enter Phone number"
                                                                         onChange={this.handleChange} value={this.state.phone} className="form-control" />
                                                                    </div>
                                                                    </div> 
                                                                    
                                                                </div>
                                                                <div className="row">

                                                                    <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Email</label>
                                                                        <input type="text" name="email" placeholder="Enter Company Email"
                                                                         onChange={this.handleChange} value={this.state.email} className="form-control" required/>
                                                                    </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Website</label>
                                                                        <input type="text" name="website" placeholder="Enter Website" 
                                                                        onChange={this.handleChange} value={this.state.website} className="form-control" />
                                                                    </div>
                                                                    </div> 
                                                                    
                                                                </div>

                                                                <div className="row">
                                                                   <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Address</label>
                                                                        {/* <input type="text" name="address" placeholder="Enter Address" 
                                                                        onChange={this.handleChange} value={this.state.address} className="form-control" /> */}
                                                                        <textarea name="address" rows="2" maxLength={500} value={this.state.address} onChange={this.handleChange}
                                                                        className="form-control" placeholder="Company Address">
                                                                        </textarea>
                                                                    </div>
                                                                    </div>    
                                                                </div>

                                                                <div className="row">
                                                            
                                                                    <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label">About Company</label>
                                                                        <textarea name="short_bio" rows="3" maxLength={500} value={this.state.short_bio} onChange={this.handleChange}
                                                                        className="form-control" placeholder="Resource Description">
                                                                        </textarea>
                                                                        <span>{this.state.short_bio.length}/500</span>
                                                                    </div>
                                                                    </div>
                                                                    
                                                                </div>


                                                                <div className="row">

                                                                    <div className="col-md-4">
                                                                    <div className="form-group">
                                                                            <label className="form-label">Country</label>
                                                                            <select name="country" className="form-control" onChange={this.handleChange} value={this.state.country}>
                                                                                <option value="">Select your country
                                                                                </option>
                                                                                { countryArray.map((data, i) => <option key={i} value={`${data}${countries[data]}`}>{countries[data]}</option>)}
                                                                            </select>
                                                                    </div>
                                                                    </div> 

                                                                    <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Logo</label>
                                                                        <input type="file" className="form-control" onChange={this.imageChangedHandler}/>
                                                                    </div>
                                                                    </div> 

                                                                    <div className="col-md-5">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Facebook</label>
                                                                        <input type="text" name="facebook" placeholder="Enter facebook"
                                                                        onChange={this.handleChange} value={this.state.facebook} className="form-control" />
                                                                    </div>
                                                                    </div> 
                                                                    
                                                                </div>

                                                                <div className="row">

                                                                    <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Facebook Visible</label>
                                                                        <select name="facebook_visible" className="form-control" onChange={this.handleChange} value={this.state.facebook_visible}>
                                                                                <option value="">Select your event color
                                                                                </option>
                                                                                <option value="false">False</option>
                                                                                <option value="true">True</option>
                                                                        </select>
                                                                    </div>
                                                                    </div>  

                                                                    <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Twitter</label>
                                                                        <input type="text" name="twitter" placeholder="Enter Twitter" 
                                                                        onChange={this.handleChange} value={this.state.twitter} className="form-control" />
                                                                    </div>
                                                                    </div> 

                                                                    <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Twitter Visible</label>
                                                                        <select name="twitter_visible" className="form-control" onChange={this.handleChange} value={this.state.twitter_visible}>
                                                                            <option value="">Select your twitter Visible
                                                                            </option>
                                                                            <option value="false">False</option>
                                                                            <option value="true">True</option>
                                                                        </select>
                                                                    </div>
                                                                    </div> 
                                                                    
                                                                </div>

                                                                <div className="row">
                                                                    
                                                                    <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Linkedin</label>
                                                                        <input type="text" name="linkedin" placeholder="Enter linkedin" 
                                                                        onChange={this.handleChange} value={this.state.linkedin} className="form-control" />
                                                                    </div>
                                                                    </div>  

                                                                    <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Linkedin Visible</label>
                                                                        <select name="linkedin_visible" className="form-control" onChange={this.handleChange} value={this.state.linkedin_visible    }>
                                                                            <option value="">Select your linkedin Visible
                                                                            </option>
                                                                            <option value="false">False</option>
                                                                            <option value="true">True</option>
                                                                        </select>
                                                                    </div>
                                                                    </div> 
                                                                    
                                                                </div>

                                                                <div className="row">
                                                                    
                                                                    <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Instagram</label>
                                                                        <input type="text" name="instagram" placeholder="Enter instagram" 
                                                                        onChange={this.handleChange} value={this.state.instagram} className="form-control" />
                                                                    </div>
                                                                    </div> 

                                                                    <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Instagram Visible</label>
                                                                        <select name="instagram_visible" className="form-control" onChange={this.handleChange} value={this.state.instagram_visible}>
                                                                            <option value="">Select your instagram Visible
                                                                            </option>
                                                                            <option value="false">False</option>
                                                                            <option value="true">True</option>
                                                                        </select>
                                                                    </div>
                                                                    </div>  
                                                                    
                                                                </div>
                                
                                                                {/* <div className="row">
                                                                    <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Description</label>
                                                                        <textarea name="description" rows="3" value={this.state.description} onChange={this.handleChange}
                                                                        className="form-control" placeholder="Resource Description">
                                                                        </textarea>
                                                                    </div>
                                                                    </div> 
                                                                </div> */}
                                                                 { notification }
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

// export default Profile;
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    events: state.events,
    programs: state.programs
});

export default connect(mapStateToProps, { createCompanyProfile })(Profile);
