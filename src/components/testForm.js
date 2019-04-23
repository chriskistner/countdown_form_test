
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, startTest, tickUp, resetTest } from '../actions/testForm';

 class TestForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            intervalID: null
        }
    };

    componentDidMount = () => {
        this.props.fetchUser()
    }

    componentWillUnmount = () => {
        this.props.resetTest();
    }


    render() {
        return (
            <div>
                <div className="row mt-3">
                    <div className="col-md-auto mr-2">
                        <div className="row">
                            {!this.props.testOn ? <div className="col">
                                <button type="button" onClick={() => {
                                    this.setState({intervalID: setInterval(this.props.startTest, 1000)})}} 
                                    className="btn btn-primary">Begin</button>
                            </div> : 
                            <div className="col">
                                {this.props.timer > 0 ? <button type="button" onClick={() => {
                                    this.props.tickUp()}} className="btn btn-success">Score</button> :
                                    <button type="button" disabled onClick={() => {
                                        this.props.tickUp()}} className="btn btn-secondary">Score</button>}
                            </div>}
                        </div>
                        <div className="row mt-1">
                            <div className="col">
                                <a href="#" className="text-danger" onClick={(event) => {
                                    event.preventDefault();
                                    clearInterval(this.state.intervalID);
                                    this.props.resetTest()
                                }}>Stop/Reset</a>
                            </div> 
                        </div>
                    </div>
                    <div className="col-md-auto">
                        <div className="row">
                            <div className="col">
                                <h4>{this.props.timer} Seconds Remaining</h4>
                            </div>
                        </div>
                        <div className="row mt-2 mr-2">
                            <div className="col">
                                <h4>{this.props.score} Score</h4>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.timer < 1 ?<div className="row">
                    <div className="col-md-auto">
                        <button type="button" className="btn btn-primary"> SUBMIT</button>
                    </div>
                </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => (state.form)

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchUser, startTest, tickUp, resetTest}, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(TestForm);