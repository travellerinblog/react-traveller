import React from 'react';


const MainContent = ({ cont_info, carousel_info }) => {

    return (
      <section className={cont_info.class_name}>
        <div>
          <h3 className="title">{cont_info.title}</h3>
          {/* NavLink */}
          <Link to="/List">더보기</Link>
        </div>
        <Carousel carousel_item_info={carousel_info}/>
      </section>
    );
}

export default MainContent