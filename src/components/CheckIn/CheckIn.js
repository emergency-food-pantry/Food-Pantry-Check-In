import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import "./CheckIn.css";

class CheckIn extends React.Component {
  state = {
    locationID: '',
    dietaryRestrictions: "",
    walkingHome: false,
    pregnant: false,
    childBirthday: false,
    snap: false,
    other: "",
    showCheckIn: true,
    showQuestions: false,
    showSuccess: false,
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Container id="checkInContainer">
          <Row id="clientInfoRow">
            <div id="clientInfo">
              <h1 id="accountName">Hi, {this.props.account.name}</h1>
              <h3 id="houseId">
                Household ID: <strong>{this.props.account.household_id}</strong>
              </h3>
              <h3 id="lastPickup">
                Last pickup: {this.props.account.last_pickup}
              </h3>
            </div>
          </Row>
          <div id="orangeBox"></div>
          <Row>
            {this.state.showCheckIn && (
              <div id="clientInput">
                <form>
                  <label htmlFor="name" id="parkingLabel">
                    Please enter parking spot number:
                    <br></br>
                    <input
                      type="text"
                      name="parking"
                      value={this.state.locationID}
                      id="parkingNumber"
                      onChange={(event) =>
                        this.setState({ locationID: event.target.value })
                      }
                    />
                    <br></br>
                    <input
                      type="button"
                      name="submit"
                      value="Check-In"
                      id="checkInButton"
                      disabled={!Boolean(this.state.locationID)}
                      onClick={() =>
                        this.setState({
                          showQuestions: true,
                          showCheckIn: false,
                        })
                      }
                    />
                  </label>
                </form>
              </div>
            )}
          </Row>
          <Form.Row xs={12}>
            {this.state.showQuestions && (
              <>
                <div id="clientQuestions">
                  <label htmlFor="foodRestrictions" id="foodRestrictionsLabel">
                    Please list any food restrictions here:
                    <br></br>
                    <textarea
                      rows="2"
                      cols="40"
                      name="foodRestrictions"
                      value={this.state.dietaryRestrictions}
                      onChange={(event) =>
                        this.setState({
                          dietaryRestrictions: event.target.value,
                        })
                      }
                      placeholder="Example: Dairy, peanuts"
                    ></textarea>
                  </label>
                  <br></br>
                  <label htmlFor="walking" className="checkboxLabel">
                    Are you walking home?
                    <input
                      type="checkbox"
                      id="walkingHome"
                      className="check"
                      name="walkingHome"
                      checked={this.state.walkingHome}
                      onChange={() =>
                        this.setState({ walkingHome: !this.state.walkingHome })
                      }
                    />
                  </label>
                  <br></br>
                  <label htmlFor="birthday" className="checkboxLabel">
                    Is there a child in the household with a birthday in the
                    next 2 months?
                    <input
                      type="checkbox"
                      id="childBirthday"
                      className="check"
                      name="birthday"
                      checked={this.state.childBirthday}
                      onChange={() =>
                        this.setState({
                          childBirthday: !this.state.childBirthday,
                        })
                      }
                    />
                  </label>
                  <br></br>
                  <label htmlFor="pregnant" className="checkboxLabel">
                    Is there a woman in the household who is pregnant?
                    <input
                      type="checkbox"
                      id="pregnant"
                      className="check"
                      name="pregnant"
                      checked={this.state.pregnant}
                      onChange={() =>
                        this.setState({ pregnant: !this.state.pregnant })
                      }
                    />
                  </label>
                  <br></br>
                  <label htmlFor="snap" className="checkboxLabel">
                    Are you currently receiving SNAP?
                    <input
                      type="checkbox"
                      id="snap"
                      className="check"
                      name="snap"
                      checked={this.state.snap}
                      onChange={() => this.setState({ snap: !this.state.snap })}
                    />
                  </label>
                  <br></br>
                  <label htmlFor="other" className="checkboxLabel">
                    Please list any other needs:
                    <br></br>
                    <textarea
                      rows="2"
                      cols="40"
                      id="other"
                      name="other"
                      placeholder="Example: Baby supplies, hygiene, pet needs"
                      checked={this.state.other}
                      onChange={() =>
                        this.setState({ other: !this.state.other })
                      }
                    />
                  </label>
                  <br></br>
                  <button
                    id="submitButton"
                    onClick={() => {
                      this.props.dispatch({ type: 'CLEAR_ORDER_PLACEMENT_ERROR' });
                      this.props.dispatch({
                        type: "SUBMIT_ORDER",
                        payload: {
                          location_id: this.state.locationID,
                          dietary_restrictions: this.state.dietaryRestrictions,
                          walking_home: this.state.walkingHome,
                          pregnant: this.state.pregnant,
                          child_birthday: this.state.childBirthday,
													snap: this.state.snap,
                          other: this.state.other
                        },
                      });
                      this.setState({
                        showSuccess: true,
                        showQuestions: false,
                      });
                    }}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </Form.Row>
          {this.state.showSuccess && (
            <div id="clientInput">
              <h3>Thank you, we have received your order!</h3>
              <p>We will be with you in about {this.props.waitTime}.</p>
              <p>You may now log out.</p>
            </div>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
  waitTime: state.waitTime
});

export default connect(mapStateToProps)(CheckIn);
