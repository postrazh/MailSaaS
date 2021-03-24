import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
  CardFooter,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import Dropzone from "dropzone";
import ReactQuill from "react-quill";
import { connect } from 'react-redux'

import PageHeader from "../../../components/Headers/PageHeader";

Dropzone.autoDiscover = false;

export class Profile extends Component {
  constructor(props) {
    super(props);
    let { user } = this.props;

    this.state = {
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        companyName: user.company_name,
        profile_url: STATIC_FILES.team_4,
      },
    };
  }

  componentDidMount() {

  }

  render() {
    const { user } = this.state;
    const setUser = (e) => {
      this.setState({
        user: { ...user, [e.target.name]: e.target.value },
      });
    };

    const onChangeProfile = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        this.setState({
          user: { ...user, profile_url: [reader.result] },
        });
      }.bind(this);
    };

    return (
      <>
        <div>
          <div
            className="header pb-6 d-flex align-items-center justify-content-center"
            style={{ minHeight: "250px" }}
          >
            <span className="mask bg-v-gradient-info" />
            <Row>
              <Col>
                <h1 className="display-2 text-white">Hello {user.firstName}</h1>
              </Col>
            </Row>
          </div>
          <Container className="mt--6" fluid>
            <Row>
              <Col className="col-12">
                <Card className="card-profile">
                  <CardHeader className="p-0 mb-5 border-0">
                    <Row className="justify-content-center">
                      <div className="card-profile-image">
                        <img
                          alt="..."
                          className="profile-rounded-img"
                          src={user.profile_url}
                        />
                        <label className="profile-edit-icon">
                          <input
                            type="file"
                            name="profile-input"
                            hidden
                            onChange={onChangeProfile}
                          />
                          <i className="fa fa-camera"></i>
                        </label>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Draft</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Working</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Paused</span>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <div className="text-center">
                      <h5 className="h3">
                        {`${user.firstName} ${user.lastName}`}
                      </h5>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        {user.email}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="col-12">
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">User information</h3>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        User information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="first-name"
                              >
                                First name
                              </label>
                              <Input
                                id="first-name"
                                placeholder="First name"
                                type="text"
                                value={user.firstName}
                                name="firstName"
                                onChange={setUser}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="last-name"
                              >
                                Last name
                              </label>
                              <Input
                                id="last-name"
                                placeholder="Last name"
                                type="text"
                                value={user.lastName}
                                name="lastName"
                                onChange={setUser}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="companyName"
                              >
                                Company name
                              </label>
                              <Input
                                id="company-name"
                                placeholder="Company name"
                                type="text"
                                value={user.companyName}
                                name="companyName"
                                autoComplete='off'
                                onChange={setUser}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="email"
                              >
                                Email address
                              </label>
                              <Input
                                id="email"
                                placeholder="jesse@example.com"
                                type="email"
                                value={user.email}
                                name="email"
                                onChange={setUser}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />

                      <h6 className="heading-small text-muted mb-4">
                        Change Password
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="old-password"
                              >
                                Old Password
                              </label>
                              <Input
                                id="old-password"
                                placeholder="Old Password"
                                type="password"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="new-password"
                              >
                                New Password
                              </label>
                              <Input
                                id="new-password"
                                placeholder="New Password"
                                type="password"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="confirm-password"
                              >
                                Confirm Password
                              </label>
                              <Input
                                id="confirm-password"
                                placeholder="Confirm Password"
                                type="password"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                  <CardFooter className="bg-transparent text-right">
                    <Button
                      color="info"
                      type="submit"
                      className="text-uppercase"
                    >
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
};

export default connect(mapStateToProps)(Profile);
