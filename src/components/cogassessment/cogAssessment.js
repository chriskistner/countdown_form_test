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
        resetCog,
        restartCog, 
        resetTickUp, 
        beginCog, 
        endCog } from '../../actions/cognitiveAssessment';

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
  },
  startButton: {
      margin: theme.spacing.unit,
      borderRadius: 50,
      minWidth: 103,
      minHeight: 103,
      fontSize: 20,
      backgroundColor: '#4CAF50',
  },
  countButton: {
    margin: theme.spacing.unit,
    borderRadius: 50,
    minWidth: 103,
    minHeight: 103,
    fontSize: 20,
    backgroundColor: 'primary.main',
    }
});

 class CogAssessment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            intervalID: null,
        }
    };

    componentDidMount = () => {
        this.props.resetCog();
    };

    componentDidUpdate = () => {
        if(this.props.timer < 1) {
            clearInterval(this.state.intervalID);
        }
    };

    render() {
        const { classes } = this.props;
        return (
                <div style={{top: `25%`,left: `50%`, transform: `translate(-50%, -25%)`,}} className={classes.paper}>
                    <Grid container spacing={8} alignItems="flex-end" justify="space-between">
                        <Grid item xs={10}>
                            <Typography variant="h5" id="form-title">
                                Cognitive Assement: Naming Test
                            </Typography>
                        </Grid>
                        <Grid item xs={2} align="right">
                            <Button variant="outlined" size="small" onClick={() => {
                                    this.props.toggle()
                                }} 
                                style={{minWidth: 30, padding: 2}} 
                                className={classes.button}>
                                    X
                                </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="justify">
                                <strong>Instructions:</strong> Instruct the patient to name as many animals they can in 60 seconds. Clearly say "Begin", and hit the Start Test button. <strong>Do not count repeat animals.</strong>
                            </Typography>
                        </Grid>
                        <Grid container spacing={8}  alignItems="center" justify="space-between">
                            <Grid item xs={5} align="center">
                                <Typography variant="h6">
                                    <u>Seconds Left</u>
                                </Typography>
                                <Typography variant="h4">
                                    {this.props.timer}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <Typography variant="h6">
                                    <u>Score</u>
                                </Typography>
                                <Typography variant="h4">
                                    {this.props.score}
                                </Typography>
                            </Grid>
                            {!this.props.testOn ?
                                <Grid item xs={3} borderBottom={1}> 
                                    <Button variant="contained" onClick={() => {
                                        this.props.beginCog()
                                        this.setState({intervalID: setInterval(this.props.startTest, 1000)})}}
                                        border={1} 
                                        className={classes.startButton}>
                                        Start
                                    </Button>
                                </Grid> 
                                :
                                <Grid item xs={3}> 
                                    <Button variant="contained" onClick={() => {
                                        this.props.tickUp()}} color="primary"
                                        disabled={this.props.timer > 0 ? false : true} 
                                        className={classes.countButton}>
                                        Count
                                    </Button> 
                                </Grid>
                            }
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end" justify="space-between">
                            <Grid item xs={4}>
                                <Button color="secondary" style={{padding:0}} onClick={() => {
                                    clearInterval(this.state.intervalID);
                                    this.props.resetTickUp()
                                    this.props.restartCog()}} 
                                    className={classes.button}>
                                    Stop/Reset
                                </Button>
                            </Grid>
                            {this.props.timer < 1 ? 
                            <Grid item xs={2}>
                                <Button variant="contained" onClick={() => {
                                    this.props.endCog()
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

CogAssessment.propTypes = {
    classes: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => (state.cog)

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {startTest, 
        tickUp, 
        resetCog,
        restartCog, 
        resetTickUp, 
        beginCog, 
        endCog}, dispatch)
  };

const CogAssessmentWrapped = withStyles(styles)(CogAssessment)

export default connect(mapStateToProps, mapDispatchToProps)(CogAssessmentWrapped);