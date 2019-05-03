
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CogAssessment from './cogassessment/cogAssessment';
import FunctionalAssessment from './functionalassessment/functionalAssessment';
import { connect } from 'react-redux';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
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
            modal: false,
            assessment: null,
        }
    };

    componentDidMount = () => {

    };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    renderElapsedTime = () => {
        if(this.props.cognitive.endCog) {

            return `${this.props.cognitive.elapsedTime} seconds`
        }
    };

    renderModal = (Component) => {
        this.setState({
            assessment: Component
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button onClick={() => {this.renderModal(CogAssessment); this.toggleModal()}}>Cognitive Assessment</Button>
                <Button onClick={() => {this.renderModal(FunctionalAssessment); this.toggleModal()}}>Functional Assessment</Button>
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

TestForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => {
    return {
        cognitive: state.cog,
        functional: state.functional
    }
}

const TestFormWrapped = withStyles(styles)(TestForm)

export default connect(mapStateToProps, null)(TestFormWrapped);