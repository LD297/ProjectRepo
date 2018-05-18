/**
 * Created by a297 on 18/2/12.
 */
import React from 'react';
import { connect } from 'dva';
import EachSortResult from './EachSortResult';
import styles from './SortResults.css';

function SortResults({ sortRes}) {

  const sortResults = [];
  if (sortRes.length > 0) {
    sortRes.forEach(function (value, index, arr) {
      sortResults.push(
        <EachSortResult key={index + 1} showDetails={value}/>
      );
    });
  }

  return (
    <div className={styles.SortResults}>
      { sortResults }
    </div>
  );
}
function mapStateToProps(state) {
  const { sortRes } = state.shows;
  console.log('------------------------ map state, sortRes: ', sortRes);
  return { sortRes };
}
export default connect(mapStateToProps)(SortResults);
