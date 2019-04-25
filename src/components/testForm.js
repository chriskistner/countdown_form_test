
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CogAssessment from './cogAssessment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, 
        startTest, 
        tickUp, 
        resetTest, 
        resetTickUp, 
        testBegan, 
        testEnded } from '../actions/testForm';

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
            modal: false
        }
    };

    componentDidMount = () => {
        this.props.fetchUser()
    };

    componentDidUpdate = () => {
        if(this.props.timer < 1) {
            clearInterval(this.state.intervalID);
        }
    };

    componentWillUnmount = () => {
        this.props.resetTest();
    };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    renderTime = (time) => {
        if(time) {
            return `${time.getMonth()+1}/${time.getDay()}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
    };

    render() {
        const { classes } = this.props;
        console.log(this.props.testComp)
        return (
            <div>
                <Button onClick={() => {this.toggleModal(); this.props.resetTest()}}>Cognitive Assessment</Button>
                    <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modal}
                    onClose={() => {this.toggleModal()}}
                    >
                        <CogAssessment toggle= {this.toggleModal}/>
                    </Modal>
                {this.props.testComp ?
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant= "h6" color="textSecondary" gutterBottom>
                            Cognitive Assessment Results
                        </Typography>
                        <Typography variant="body1">
                            <strong>Test Started:</strong> {this.renderTime(this.props.startTime)}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Date Submitted:</strong> {this.renderTime(this.props.endTime)}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Score:</strong> {this.props.score}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Attempts:</strong> {this.props.attempts}
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


const mapStateToProps = (state) => (state.form)

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {fetchUser, 
        startTest, 
        tickUp, 
        resetTest, 
        resetTickUp, 
        testBegan, 
        testEnded}, dispatch)
  };

const TestFormWrapped = withStyles(styles)(TestForm)

export default connect(mapStateToProps, mapDispatchToProps)(TestFormWrapped);