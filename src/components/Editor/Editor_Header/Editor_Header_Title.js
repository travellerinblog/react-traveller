import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainTitle from './Editor_Header_MainTitle';
import SubTitle from './Editor_Header_SubTitle';
import CoverImage from './Editor_Header_CoverImage';

export default class HeaderTitle extends Component {

  render() {
    return (
      <div className="editor-header-inner">
        <MainTitle 
          onEditableFocus={this.props.onEditableFocus}
        />
        <SubTitle 
          onEditableFocus={this.props.onEditableFocus}
        />
        <CoverImage />
      </div>
    )
  }
}

HeaderTitle.propTypes = {

}
HeaderTitle.defaultProps = {

}