import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
// 컴포넌트
import Read from '../components/Read';

const mapStateToProps = (state) => {
  return {
      app_lists: state.list_db,
      errors: state.Errors
  }
}
const mapDispatchToProps = (dispatch) => ({
  handleGetListDB : () => {
    dispatch(actions.listDB())
  },
  throwErrorMessage: (error_type, message) => dispatch(actions.throwErrorMessage(error_type, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Read);
