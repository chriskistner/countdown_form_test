
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startTest } from '../actions/testForm';

 class TestForm extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="row mt-3">
                <div className="col-md-auto mr-2">
                <button type="button" onClick={() => this.props.startTest()} class="btn btn-primary">Begin</button>
                </div>
                <div className="col-md-auto">
                    <h4>{this.props.timer} Seconds Remaining</h4>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timer: state.form.timer
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({startTest}, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(TestForm);