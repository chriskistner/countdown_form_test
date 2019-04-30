
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CogAssessment from './cogassessment/cogAssessment';
import FunctionalAssessment from './functionalassessment/functionalAssessment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {startTest, 
        tickUp, 
        resetTest, 
        resetTickUp, 
        testBegan, 
        testEnded } from '../actions/cognitiveAssessment';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
  },
  card: {
    minWidth: 275,
    maxWidth: 500,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

 class TestForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            intervalID: null,
            modal: false,
            assessment: null,
        }
    };

    componentDidMount = () => {

    };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    renderTime = (time) => {
        if(time) {
            return `${time.getMonth()+1}/${time.getDay()}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${time.getTimezoneOffset()}`}
    };

    renderModal = (Component) => {
        this.setState({
            assessment: Component
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button onClick={() => {this.renderModal(CogAssessment); this.toggleModal(); this.props.resetTest()}}>Cognitive Assessment</Button>
                <Button onClick={() => {this.renderModal(FunctionalAssessment); this.toggleModal(); this.props.resetTest()}}>Functional Assessment</Button>
                    <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modal}
                    onClose={() => {this.toggleModal()}}
                    >
                        <this.state.assessment toggle= {this.toggleModal}/>
                    </Modal>
                {this.props.cognitive.testComp ?
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant= "h6" color="textSecondary" gutterBottom>
                            Cognitive Assessment Results
                        </Typography>
                        <Typography variant="body1">
                            <strong>Test Started:</strong> {this.renderTime(this.props.cognitive.startTime)}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Date Submitted:</strong> {this.renderTime(this.props.cognitive.endTime)}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Score:</strong> {this.props.cognitive.score}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Attempts:</strong> {this.props.cognitive.attempts}
                        </Typography>
                    </CardContent>
                </Card>
                :
                null
            }
          </div>
        )
    }
};

TestForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => {
    return {
        cognitive: state.cog,
        functional: state.functional
    }
}

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {startTest, 
        tickUp, 
        resetTest, 
        resetTickUp, 
        testBegan, 
        testEnded}, dispatch)
  };

const TestFormWrapped = withStyles(styles)(TestForm)

export default connect(mapStateToProps, mapDispatchToProps)(TestFormWrapped);