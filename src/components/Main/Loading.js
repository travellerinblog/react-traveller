import React from 'react';


const Loading = () => {

    return (
      <div className="loading">
        <div className="loading-content-box">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
}

export default Loading;