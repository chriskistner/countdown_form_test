import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import ResultTable from './functionalResultTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    startFunc,
    endFunc,
    nextQuestion,
    scoreQuestion,
    tallyScore,
    resetFunc
} from '../../actions/functionalAssessment';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 90,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

 class FunctionalAssessment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            score: ''
         }
    };

    componentDidMount = () => {
        this.props.resetFunc();
        this.props.startFunc();
    };

    handleChange = event => {
        this.setState({ score: event.target.value });
      };

    render() {
        const { classes } = this.props;
        return (
                <div style={{top: `25%`,left: `50%`, transform: `translate(-50%, -25%)`}} className={classes.paper}>
                        <Grid container spacing={8} alignItems="flex-end" justify="space-between">
                            <Grid item xs={10}>
                                <Typography variant="h5" id="form-title">
                                    Functional Assessment {this.props.score ? 'Results' : null}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} align="right">
                                <Button variant="outlined" size="small" onClick={() => {
                                    this.setState({
                                        score: ''
                                    })
                                    this.props.toggle()
                                }} 
                                    style={{minWidth: 30, padding: 2}} 
                                    className={classes.button}>
                                    X
                                </Button>
                            </Grid>
                        </Grid>
                                {!this.props.score ? 
                                    <Grid container spacing ={8}>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" align="justify"><strong>Instructions:</strong> Have the subject describe their capacity to perform activities in the following
                                                aspects of daily life. If they perform the activities ask them if they do so on their own or with help. See if the patient can recall
                                                specific instances of the activity and when they last performed it. Select a score in line with their stated abilities.
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} align="left" style={{paddingBottom: 0}}>
                                            <Typography variant='subheading' color="primary"> 
                                                Activity: {this.props.currentQuestion + 1}/{this.props.assessment.length}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} align="left" style={{paddingTop: 0, minHeight: 70}}>
                                        {
                                            <Typography variant="h6">{this.props.question.text}</Typography>
                                        }
                                        </Grid>
                                        <Grid item xs={6} align="right">
                                            <Select value={this.state.score}
                                                onChange={this.handleChange}
                                                displayEmpty
                                                name="question-select"
                                                className={classes.selectEmpty}
                                                style = {{marginTop: 0, marginLeft: 8, minWidth: 265}}>
                                                    <MenuItem value="" disabled>Select Aptitude Level</MenuItem>
                                                    <MenuItem value={3}>Dependent = 3</MenuItem>
                                                    <MenuItem value={2}>Requires assistance = 2</MenuItem>
                                                    <MenuItem value={1}>Has difficulty but does by self = 1</MenuItem>
                                                    <MenuItem value={0}>Normal = 0</MenuItem>
                                                    <MenuItem value={0}>Never did [the activity] but could do now = 0</MenuItem>
                                                    <MenuItem value = {1}>Never did and would have difficulty now = 1 </MenuItem>
                                            </Select>
                                            <FormHelperText style={{textAlign: "right"}}>Choose option most in line with patient's abilities</FormHelperText>
                                        </Grid>
                                    </Grid> 
                                    :
                                    <ResultTable/>
                                }
                        <Grid container spacing={16} alignItems="flex-end" justify="space-between">
                            <Grid item xs={8} align="left">
                                <Button color="secondary" style={{marginBottom: 0, marginTop: 16}} onClick={() => {
                                    this.props.resetFunc()
                                    this.setState({
                                        score:''
                                    })}} 
                                    className={classes.button}>
                                    Restart/Test
                                </Button>
                            </Grid>
                            {this.props.currentQuestion + 1 !== this.props.assessment.length ?
                                <Grid item xs={4} align="right">
                                    <Button variant="contained" onClick={() => {
                                        this.props.scoreQuestion(this.state.score);
                                        this.props.nextQuestion();
                                        this.setState({
                                            score: ''
                                            })}}
                                        disabled={this.state.score !== '' ? false : true}
                                        color="primary" 
                                        className={classes.button}>
                                            Next Question
                                    </Button> 
                            </Grid>
                            :
                            <Grid item xs={4} align="right">
                                {!this.props.score  ?
                                    <Button variant="contained" onClick={() => {
                                        this.props.scoreQuestion(this.state.score);
                                        this.props.tallyScore()
                                        }}
                                        disabled={this.state.score !== '' ? false : true}
                                        color="primary" 
                                        className={classes.button}>
                                            Finish
                                    </Button> 
                                :
                                    <Button variant="contained" onClick={() => {
                                        this.props.toggle();
                                        this.props.endFunc();
                                    }}
                                    color="primary"
                                    className={classes.button}>
                                        Submit
                                    </Button>
                                }
                            </Grid>}
                        </Grid>

                </div>
        )
    }
};

FunctionalAssessment.propTypes = {
    classes: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => (state.functional)

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {startFunc,
        endFunc,
        nextQuestion,
        scoreQuestion,
        resetFunc,
        tallyScore
        }, dispatch)
  };

const FunctionalAssessmentWrapped = withStyles(styles)(FunctionalAssessment)

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalAssessmentWrapped);