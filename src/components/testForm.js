
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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

    renderDuration = (start, finish) => {
        const seconds = finish.getSeconds() - start.getSeconds();
        const minutes = finish.getMinutes() - start.getMinutes();
        return `${minutes} min. ${seconds} sec.`
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                    <Button onClick={() => {this.toggleModal(); this.props.resetTest()}}>Cognitive Assessment</Button>
                        <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.modal}
                        onClose={() => {this.toggleModal(); this.props.resetTest()}}
                        >
                        <div style={{top: `25%`,left: `50%`, transform: `translate(-50%, -50%)`,}} className={classes.paper}>
                            <Grid container spacing={16} alignItems="flex-start" justify="space-between">
                                <Grid item xs={12}>
                                    <Typography variant="h6" id="form-title">
                                        Cognitive Assement
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" style={{marginLeft: 8, marginTop: 8}}>
                                        Instruct the patient to name as many animals they can in 60 seconds. Do not count repeated animals.
                                    </Typography>
                                </Grid>
                            <Grid item xs={4}>
                                {!this.props.testOn ? 
                                <Button variant="contained" onClick={() => {
                                    this.props.testBegan()
                                    this.setState({intervalID: setInterval(this.props.startTest, 1000)})}} 
                                    className={classes.button}>
                                    Start Test
                                </Button> 
                                :
                                <Button variant="contained" onClick={() => {
                                    this.props.tickUp()}} color="primary" 
                                    className={classes.button}>
                                    Count Animal
                                </Button>
                                }
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6">{this.props.timer} Seconds Left</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6">{this.props.score} Score</Typography>
                            </Grid>
                        <Grid container spacing={8} alignItems="flex-end" justify="space-between">
                            <Grid item xs={4}>
                                <Button color="secondary" style={{padding:0}} onClick={(event) => {
                                    event.preventDefault();
                                    clearInterval(this.state.intervalID);
                                    this.props.resetTickUp()
                                    this.props.resetTest()}} 
                                    className={classes.button}>
                                    Stop/Reset
                                </Button>
                            </Grid>
                            {this.props.timer < 1 ? <Grid item xs={2}>
                                <Button variant="contained" onClick={() => {
                                    this.props.testEnded()
                                    this.toggleModal()}}  
                                    color="primary">SUBMIT</Button>
                            </Grid> : null}
                        </Grid>
                    </Grid>
                </div>
            </Modal>
            {this.props.testComp ?
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant= "h6" color="textSecondary" gutterBottom>
                            Cognitive Assessment Results
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
                        <Typography variant="body1">
                            <strong>Time Elapsed:</strong> {this.renderDuration(this.props.startTime, this.props.endTime)}
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