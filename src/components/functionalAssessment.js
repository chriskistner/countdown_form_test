import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startTest, 
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
  button: {
    margin: theme.spacing.unit,
  }
});

 class FunctionalAssessment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            intervalID: null,
        }
    };

    componentDidMount = () => {
    };

    componentDidUpdate = () => {
        if(this.props.timer < 1) {
            clearInterval(this.state.intervalID);
        }
    };

    render() {
        const { classes } = this.props;
        return (
                <div style={{top: `25%`,left: `50%`, transform: `translate(-50%, -50%)`,}} className={classes.paper}>
                    <Grid container spacing={8} alignItems="flex-start" justify="space-between">
                        <Grid item xs={12}>
                            <Typography variant="h6" id="form-title">
                                Functional Assessment
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" style={{marginLeft: 8, marginTop: 8}}>
                                Instruct the patient to name as many animals they can in 60 seconds. Clearly say "Begin", and hit the Start Test button. <strong>Do not count repeat animals.</strong>
                            </Typography>
                        </Grid>
                        {!this.props.testOn ?
                            <Grid item xs={4}> 
                                <Button variant="contained" onClick={() => {
                                    this.props.testBegan()
                                    this.setState({intervalID: setInterval(this.props.startTest, 1000)})}} 
                                    className={classes.button}>
                                    Start Test
                                </Button>
                            </Grid> 
                            :
                            <Grid item xs={4}> 
                                {this.props.timer > 0 ? 
                                    <Button variant="contained" onClick={() => {
                                        this.props.tickUp()}} color="primary" 
                                        className={classes.button}>
                                        Count Animal
                                    </Button> 
                                    :
                                    <Button variant="contained" disabled onClick={() => {
                                        this.props.tickUp()}} color="secondary" 
                                        className={classes.button}>
                                        Test Complete
                                    </Button>
                                    }
                                </Grid>
                        }
                        <Grid item xs={4}>
                            <Typography variant="h6">
                                {this.props.timer} Seconds Left
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6">
                                {this.props.score} Score
                            </Typography>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end" justify="space-between">
                            <Grid item xs={4}>
                                <Button color="secondary" style={{padding:0}} onClick={() => {
                                    clearInterval(this.state.intervalID);
                                    this.props.resetTickUp()
                                    this.props.resetTest()}} 
                                    className={classes.button}>
                                    Stop/Reset
                                </Button>
                            </Grid>
                            {this.props.timer < 1 ? 
                            <Grid item xs={2}>
                                <Button variant="contained" onClick={() => {
                                    this.props.testEnded()
                                    this.props.toggle()}}  
                                    color="primary">
                                        SUBMIT
                                    </Button>
                            </Grid> 
                            : 
                            null}
                        </Grid>
                    </Grid>
                </div>
        )
    }
};

FunctionalAssessment.propTypes = {
    classes: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => (state.form)

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {startTest, 
        tickUp, 
        resetTest, 
        resetTickUp, 
        testBegan, 
        testEnded}, dispatch)
  };

const FunctionalAssessmentWrapped = withStyles(styles)(FunctionalAssessment)

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalAssessmentWrapped);