import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

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
        this.read_item = {};
        this.getReadItem = this.getReadItem.bind(this);
    }
    componentDidMount() {
        if(Object.keys(this.props.app_lists).length === 0) {
            this.props.handleGetDB();
            // set...time...out... 
            setTimeout(this.getReadItem, 2000);
        } else {
            this.getReadItem();
        }
    }
    getReadItem() {
        this.read_item = this.props.app_lists && this.props.app_lists.filter(list => {
            return this.props.match.params.key === list.key
        }).pop();
        console.log(this.read_item);
    }
    render() {
        return(
            <div className="read">
                <ReadTitle/>
                <ReadContents/>
                <ReadReply/>
                <ReadButtons/>
            </div>
        );
    }
}
Read.propTypes = propTypes;
Read.defaultProps = defaultProps;
export default Read;