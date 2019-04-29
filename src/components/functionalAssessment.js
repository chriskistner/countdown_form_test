import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    nextQuestion,
    scoreQuestion
} from '../actions/functionalAssessment';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
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
            score: '',
            name: 'hai',
            labelWidth: 0,
         }
    };

    componentDidMount = () => {

    };

    handleChange = event => {
        this.setState({ score: event.target.value });
      };

    componentDidUpdate = () => {

    };

    render() {
        const { classes } = this.props;
        return (
                <div style={{top: `25%`,left: `50%`, transform: `translate(-50%, -50%)`,}} className={classes.paper}>
                    <form className={classes.root} autoComplete="off">
                        <Grid container spacing={8} alignItems="flex-start" justify="space-between">
                            <Grid item xs={12}>
                                <Typography variant="h6" id="form-title">
                                    Functional Assessment
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {
                                    <Typography variant="body1">{this.props.question.text}</Typography>
                                }
                            </Grid>
                            <Grid item xs={6}>
                                <Select value={this.state.score}
                                    onChange={this.handleChange}
                                    displayEmpty
                                    name="question-select"
                                    className={classes.selectEmpty}
                                    >
                                    <MenuItem value="">Select Aptitude Level</MenuItem>
                                    <MenuItem value={3}>Dependent = 3</MenuItem>
                                    <MenuItem value={2}>Requires assistance = 2</MenuItem>
                                    <MenuItem value={1}>Has difficulty but does by self = 1</MenuItem>
                                    <MenuItem value={0}>Normal = 0</MenuItem>
                                    <MenuItem value={0}>Never did [the activity] but could do now = 0</MenuItem>
                                    <MenuItem value = {1}>Never did and would have difficulty now = 1 </MenuItem>
                                </Select>
                                <FormHelperText>Choose option most in line with patient's abilities</FormHelperText>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                            {this.state.score !== '' ? 
                                <Button variant="contained" onClick={() => {
                                    this.props.scoreQuestion(this.state.score);
                                    this.props.nextQuestion();
                                    this.setState({
                                        score: ''
                                    })
                                }}
                                    color="primary" 
                                    className={classes.button}>
                                        Next Question
                                </Button> 
                                :
                                <Button disabled variant="contained"
                                    color="primary" 
                                    className={classes.button}>
                                        Next Question
                                </Button> 
                            }
                            </Grid>
                        </Grid>
                    </form>
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
        {nextQuestion,
        scoreQuestion
        }, dispatch)
  };

const FunctionalAssessmentWrapped = withStyles(styles)(FunctionalAssessment)

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalAssessmentWrapped);