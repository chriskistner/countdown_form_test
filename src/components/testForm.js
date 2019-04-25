
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
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
  text: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
        return `${time.getMonth()+1}/${time.getDay()}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    }


    render() {
        const { classes } = this.props;

        return (
            <div>
            <Typography gutterBottom>Click to get the full Modal experience!</Typography>
            <Button onClick={this.toggleModal}>Cognitive Assessment</Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.modal}
              onClose={() => {this.toggleModal(); this.props.resetTest()}}
            >
              <div style={{top: `25%`,left: `50%`, transform: `translate(-50%, -50%)`,}} className={classes.paper}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Typography variant="h6" id="form-title">
                            Cognitive Assement
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">{this.props.user}</Typography>
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
                    <Grid item xs={4}> 
                    <Button color="secondary" className={classes.button}>
                        Stop/Reset
                    </Button>
                    </Grid>
                </Grid>
              </div>
            </Modal>
          </div>






            // <div>
            //     <div className="row mt-3">
            //         <div className = "col-md-auto">
            //             <p><strong>Test Administered By:</strong> {this.props.user}</p>
            //         </div>
            //         {this.props.startTime ? <div className="col-md-auto">
            //         <p><strong>Test Initiated:</strong> {this.renderTime(this.props.startTime)}</p>
            //         </div> : null}
            //     </div>
            //     <div className="row"> 
            //         <div className="col-md-auto mr-2">
            //             <div className="row">
            //                 {!this.props.testOn ? <div className="col">
            //                     <button type="button" onClick={() => {
            //                         this.props.testBegan()
            //                         this.setState({intervalID: setInterval(this.props.startTest, 1000)})}} 
            //                         className="btn btn-primary">Begin</button>
            //                 </div> : 
            //                 <div className="col">
            //                     {this.props.timer > 0 ? <button type="button" onClick={() => {
            //                         this.props.tickUp()}} className="btn btn-success">Score</button> :
            //                         <button type="button" disabled onClick={() => {
            //                             this.props.tickUp()}} className="btn btn-secondary">Score</button>}
            //                 </div>}
            //             </div>
            //             <div className="row mt-1">
            //                 <div className="col">
            //                     <a href="#" className="text-danger" onClick={(event) => {
            //                         event.preventDefault();
            //                         clearInterval(this.state.intervalID);
            //                         this.props.resetTickUp()
            //                         this.props.resetTest()
            //                     }}>Stop/Reset</a>
            //                 </div> 
            //             </div>
            //         </div>
            //         <div className="col-md-auto">
            //             <div className="row">
            //                 <div className="col">
            //                     <h4>{this.props.timer} Seconds Remaining</h4>
            //                 </div>
            //             </div>
            //             <div className="row mt-2 mr-2">
            //                 <div className="col">
            //                     <h4>{this.props.score} Score</h4>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     {this.props.timer < 1 ?<div className="row">
            //         <div className="col-md-auto">
            //             <button type="button" onClick={() => this.props.testEnded() } className="btn btn-primary"> SUBMIT</button>
            //         </div>
            //     </div> : null}
            // </div>
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