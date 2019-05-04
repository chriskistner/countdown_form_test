
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CogAssessment from './cogassessment/cogAssessment';
import FunctionalAssessment from './functionalassessment/functionalAssessment';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

 class TestForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            anchorEl: null,
            assessment: null,
            snackbar: false,
            snackBarInfo: null
        }
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
      };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    renderModal = (Component) => {
        this.setState({
            assessment: Component
        })
    };

    toggleSnackBar = (type) => {
        this.setState({
            snackbar: !this.state.snackbar,
            snackBarInfo: type
        })
    };

    renderElapsedTime = (seconds) => {
        if (seconds <= 60) {
            return `${seconds} seconds`
        } else {
            return `${Math.floor(seconds / 60)} min, ${seconds % 60} sec`
        }
    }

    renderSnackBarMessage = () => {
        if (this.state.snackBarInfo === 'cognitive') {
            const test = this.props.cognitive;
            const time = this.renderElapsedTime(test.elapsedTime)
            return (
                <div>
                <Typography color="inherit" variant="h6">Results Submitted</Typography>
                <span >TYPE: Cognitive | SCORE: {test.score} | ELAPSED TIME: {time} | Attempts: {test.attempts}</span>
                </div>
            )}
        else if (this.state.snackBarInfo === 'functional') {
            const test = this.props.functional;
            const time = this.renderElapsedTime(test.elapsedTime);
            return (
                <div>
                    <Typography color="inherit" variant="h6">Results Submitted</Typography>
                    <span >TYPE: Functional | SCORE: {test.score} | ELAPSED TIME: {time}</span>
                </div>
            )} else {return}
    };

    render() {
        const { anchorEl} = this.state;
        console.log(this.props.functional)
        return (
            <div>
                <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={this.handleClick}>
                    Mental Health Tests
                </Button>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}>
                    <MenuItem disabled>Select Test</MenuItem>
                    <MenuItem onClick={() => {this.renderModal(CogAssessment); 
                                                this.toggleModal(); 
                                                this.handleClose()}}>
                        Cognitive Assessment
                    </MenuItem>
                    <MenuItem onClick={() => {this.renderModal(FunctionalAssessment); 
                                                this.toggleModal();
                                                this.handleClose()}}>
                        Functional Assessment
                    </MenuItem>
                </Menu>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modal}
                    onClose={() => {this.toggleModal()}}
                    disableBackdropClick={true}
                    >
                        <this.state.assessment modal={this.toggleModal} snackbar={this.toggleSnackBar}/>
                </Modal>
                <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: "left"}}
                open={this.state.snackbar}
                autoHideDuration={10000}
                onClose={this.toggleSnackBar}
                ContentProps={{'aria-describedby': 'message-id'}}
                message={this.renderSnackBarMessage(this.state.snackBarType)}
                />
          </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        cognitive: state.cog,
        functional: state.functional
    }
};

export default connect(mapStateToProps, null)(TestForm);