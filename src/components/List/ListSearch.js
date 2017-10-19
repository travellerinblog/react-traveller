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
    // componentWillMount () {
    //     const script = document.createElement('script');
    
    //     script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAg6gMFuAeH6n3fc19dIJNJDaJ53eqMeWY&libraries=places';
    //     script.type = 'text/javascript';
    //     script.async = true;
    
    //     document.head.appendChild(script);
    // }
    componentDidMount () {
        const input = document.getElementsByClassName('list-search-input')[0];
        let autocomplete;
        const options = {
            types: ['(cities)']
        };
        // geocode
        function initialize() {
          autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
          autocomplete.addListener('place_changed', fillInAddress);
        }
        initialize()
        function fillInAddress() {
            // Get the place details from the autocomplete object.
            var place = autocomplete.getPlace();
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