/**
 * Created by a297 on 18/3/22.
 */
import React from 'react';
import { connect } from 'dva';
import SortPane from '../../../components/users/SortPane';
import SortResults from '../../../components/users/SortResults';
import Navigation from '../../../components/page_constitution/Navigation';
import Footer from '../../../components/page_constitution/Footer';

function SortVocal() {
  return (
    <div>
      <Navigation selectedKey="classification/vocalConcert" />
      <SortPane />
      <SortResults />
      <Footer />
    </div>
  );
}
export default connect()(SortVocal);
