import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
// 컴포넌트
import Read from '../components/Read';

const mapStateToProps = (state) => {
  return {
      app_lists: state.list_db
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleGetDB : () => {
    dispatch(actions.listDB())
    dispatch(actions.userDB())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Read);
