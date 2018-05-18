/**
 * Created by a297 on 18/2/12.
 */
import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Navigation from '../../../components/page_constitution/Navigation';
import Footer from '../../../components/page_constitution/Footer';
import BuyGuide from '../../../components/users/BuyGuide';
import BuyPane from '../../../components/users/BuyPane';

import styles from './BuyPage.css';

class BuyPage extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { genOrderRes } = nextProps;
    if (genOrderRes !== undefined) {
      if (genOrderRes.msg !== '') {
        if (genOrderRes.msg === "success") {
          message.success(genOrderRes.words);
          setTimeout(() => {
            window.location.href = '/#/myorders';
          }, 1000);
        }
        else {
          message.error(genOrderRes.words);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    }
  }

  render () {
    return (
      <div className={styles.Body}>
        <Navigation />
        <BuyPane />
        <BuyGuide />
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const genOrderRes = state.orders.genOrderRes;
  console.log('map in buy page', genOrderRes);
  return {genOrderRes};
}
export default connect(mapStateToProps)(BuyPage);
