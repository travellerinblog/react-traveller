import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

// 컴포넌트
import ReadTitle from './ReadTitle';
import ReadContents from './ReadContents';
import ReadReply from './ReadReply';
import ReadButtons from './ReadButtons';


const propTypes = {
};
const defaultProps = {
};
class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getReadItem = this.getReadItem.bind(this);
    }
    componentDidMount() {
        if(Object.keys(this.props.app_lists).length === 0) {
            this.props.handleGetListDB();
            // set...time...out... 
            setTimeout(this.getReadItem, 2000);
        } else {
            this.getReadItem();
        }
    }
    getReadItem() {
        const read_item = this.props.app_lists && this.props.app_lists.filter(list => {
            return this.props.match.params.key === list.key
        }).pop();
        this.setState(read_item)
    }
    render() {
        return Object.keys(this.state).length === 0 ? (<p className="read-item-loading"> 잠시만 기다려 주세요. </p>) : (
            <div className="read">
                <ReadTitle item = {this.state} getDB={this.props.handleGetListDB}/>
                <ReadContents item = {this.state}/>
                <ReadReply item = {this.state} getDB={this.props.handleGetListDB} handleErrorMessage={this.props.throwErrorMessage} error_message={this.props.errors}/>
                <ReadButtons/>
            </div>
        );
    }
}
Read.propTypes = propTypes;
Read.defaultProps = defaultProps;
export default Read;