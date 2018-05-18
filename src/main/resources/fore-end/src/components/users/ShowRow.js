/**
 * Created by a297 on 18/2/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Tag, Row, Col } from 'antd';
import PosterCard from './PosterCard';
import styles from './ShowRow.css';

function ShowRow({color, tag, type, showInfoArr }) {

  /**
   * 最多 0～5 个 posterCard
   */

  let posterCards = [];
  showInfoArr.forEach(function (value, index, arr) {
    if (index === 0) {
      posterCards.push(
        <Col offset={2} span={4} key={index + 1}>
          <PosterCard showDetails={value} />
        </Col>
      );
    }
    else {
      posterCards.push(
        <Col span={4} key={index + 1}>
          <PosterCard showDetails={value}  />
        </Col>
      );
    }
  });

  return (
   <div>
     <Row className={styles.TagRow}>
       <Col offset={2} span={1}>
         <a href={`/#/classification/${type}`}>
           <Tag color={color} className={styles.Tag} >
             {tag}
           </Tag>
         </a>
       </Col>
       <Col offset={18} span={1}>
         <a className={styles.MoreTag} href={`/#/classification/${type}`}>
           更多>
         </a>
       </Col>
     </Row>
     <Row>
       { posterCards }
     </Row>
   </div>
 );
}
export default connect()(ShowRow);
