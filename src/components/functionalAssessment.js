import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    nextQuestion
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
  button: {
    margin: theme.spacing.unit,
  }
});

 class FunctionalAssessment extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    };

    componentDidMount = () => {
        console.log('firing Mount')
    };

    componentDidUpdate = () => {
        console.log('firing Updated')
    };

    render() {
        const { classes } = this.props;
        console.log(this.props)
        return (
                <div style={{top: `25%`,left: `50%`, transform: `translate(-50%, -50%)`,}} className={classes.paper}>
                    <Grid container spacing={8} alignItems="flex-start" justify="space-between">
                        <Grid item xs={12}>
                            <Typography variant="h6" id="form-title">
                                Functional Assessment
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                this.props.assessment.filter(question => question.number === this.props.question).map(question => <Typography>{question.text}</Typography>)
                            }
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                        <Button variant="contained" onClick={
                            this.props.nextQuestion} color="primary" 
                            className={classes.button}>
                                Next Question
                            </Button> 
                        </Grid>
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
        {nextQuestion
        }, dispatch)
  };

const FunctionalAssessmentWrapped = withStyles(styles)(FunctionalAssessment)

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalAssessmentWrapped);