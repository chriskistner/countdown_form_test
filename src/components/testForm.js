
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startTest, tickUp } from '../actions/testForm';

 class TestForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            intervalID: null
        }
    }

    render() {
        return (
            <div className="row mt-3">
                <div className="col-md-auto mr-2 clearfix">
                    <div className="row">
                        {!this.props.testOn ? <div className="col">
                            <button type="button" onClick={() => {
                                this.setState({intervalID: setInterval(this.props.startTest, 1000)})}} 
                                className="btn btn-primary">Begin</button>
                        </div> : 
                        <div className="col">
                            <button type="button" onClick={() => {
                                this.props.tickUp()}} className="btn btn-success">Score</button>
                        </div>}
                    </div>
                    <div className="row">
                        <div className="col">
                            <a href="#" className="text-danger" onClick={(event) => {
                                event.preventDefault()
                                clearInterval(this.state.intervalID)
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
                    <div className="row">
                        <div className="col">
                            <h4>{this.props.score} Score</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (state.form)

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({startTest, tickUp}, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(TestForm);