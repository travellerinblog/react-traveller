/**
   * 글 목록을 최신순으로 정렬
   * @type {function}
   * @param {object} lists - DB에서 가져온 list
   * @return {object} - 최신순으로 정렬된 list
*/
export const getListSortByLastest = (lists) => {
  return lists.sort((a, b)=> b.write_date - a.write_date);
}

  
/**
   * 글 목록을 인기순으로 정렬
   * @type {function}
   * @param {object} lists - DB에서 가져온 list
   * @return {object} - 인기순으로 정렬된 list
*/
export const  getListSortByPopular = (lists) => {
    return lists.sort((a,b) => {
      if(a.view > b.view) return -1;
      if(a.view < b.view) return 1;
      else { // 만약에 조회수가 같으면 날짜를 기준으로 다시 정렬한다.
        return b.write_date - a.write_date;
      }
    });
}


 /** 
   * 페이지의 개수를 계산
   * @type {function}
   * @param {object} lists - DB에서 가져온 list 
   * @property {array} list_items_amount - 리스트의 개수
   * @return {number} - 페이지의 개수
   * 
   */
  export const getListPageAmount = (lists) => {
    // props 로 받아 올 값, list item의 개수 
    const list_items_amount = lists.list.length; 
    // page를 표시해야하는 수 (아이템수/한페이지에 표시되는수);
    return Math.ceil(list_items_amount/12);
  }
