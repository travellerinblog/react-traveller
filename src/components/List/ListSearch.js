import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};


class ListSearch extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        const google = window.google;
        // 자동 완성을 연결할 input창
        const input = document.getElementsByClassName('list-search-input')[0];
        let autocomplete = new google.maps.places.Autocomplete(input, { types: ['(regions)'] });
        autocomplete.addListener('place_changed', fillInAddress);
        function fillInAddress() {
            // autocomplete 객체로 부터 장소에 대한 정보를 받는다. 
            const place = autocomplete.getPlace()
            console.log(place);
          }
          
    }
    render() {
        return(
            <div>
                <input className="list-search-input" type="text" placeholder="검색할 나라/도시를 입력해주세요" />
            </div>

        );
    }
}




ListSearch.propTypes = propTypes;
ListSearch.defaultProps = defaultProps;
export default ListSearch;