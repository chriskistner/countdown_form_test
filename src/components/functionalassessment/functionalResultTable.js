import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 450,
    },
    tableRow: {
        height: 24
    },
    textCell: {
        paddingTop: 1,
        paddingBottom: 1
    },
    numCell: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        paddingBottom: 1
    }
  });
  

class ResultTable extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={8} alignItems="flex-start" >
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell className={classes.numCell} align='left'>#</TableCell>
                            <TableCell className={classes.textCell} align='center'>Question</TableCell>
                            <TableCell className={classes.numCell} align='left'>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.assessment.map(query => (
                               <TableRow className={classes.tableRow} key={query.number}>
                                    <TableCell className={classes.numCell} align='left'>{query.number}</TableCell>
                                    <TableCell className={classes.textCell} align="center">{query.text}</TableCell>
                                    <TableCell className={classes.numCell} align="center">{query.score}</TableCell>
                               </TableRow> 
                            ))
                        }
                    </TableBody>
                </Table>
            </Grid>
        )
    }
};

ResultTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => (state.functional)

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        { }, dispatch)
  };

const ResultTableWrapped = withStyles(styles)(ResultTable)

export default connect(mapStateToProps, mapDispatchToProps)(ResultTableWrapped);

