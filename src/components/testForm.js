
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CogAssessment from './cogassessment/cogAssessment';
import FunctionalAssessment from './functionalassessment/functionalAssessment';
import { connect } from 'react-redux';

 class TestForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            anchorEl: null,
            assessment: null
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

    render() {
        const { anchorEl} = this.state;
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
                        <this.state.assessment toggle= {this.toggleModal}/>
                </Modal>
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