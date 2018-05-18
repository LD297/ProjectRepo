/**
 * Created by a297 on 18/2/8.
 */
import React from 'react';
import { connect } from 'dva';
import { Avatar, Input, Carousel } from 'antd';
import Navigation from '../../../components/page_constitution/Navigation';
import Footer from '../../../components/page_constitution/Footer';
import logoSrc from '../../../assets/logo.png';
import poster0 from '../../../assets/00.png';
import poster1 from '../../../assets/01.png';
import poster2 from '../../../assets/02.png';
import poster3 from '../../../assets/03.png';
import ShowRow from '../../../components/users/ShowRow';
import styles from './Homepage.css';

const Search = Input.Search;

function Homepage({ showsInHomepage }) {


  if (showsInHomepage !== undefined) {
    const {
        vocalConcertShows,
        concertShows,
        operaShows,
        dramaShows,
        danceShows,
        childrenShows,
        comicShows
      } = showsInHomepage;
    return (
      <div>
        <Navigation />
        <Avatar src={logoSrc} className={styles.Logo} />
        <Search
          placeholder="输入演出、艺人、场馆..."
          onSearch={value => console.log(value)}
          enterButton
          className={styles.Search}
        />
        <ShowRow color={"magenta"} tag={"演唱会"} type="vocalConcert" showInfoArr={vocalConcertShows} />
        <ShowRow color={"geekblue"} tag={"音乐会"} type="concert" showInfoArr={concertShows} />
        <ShowRow color={"volcano"} tag={"曲苑杂谈"} type="opera" showInfoArr={operaShows} />
        <ShowRow color={"cyan"} tag={"话剧歌剧"} type="drama" showInfoArr={dramaShows} />
        <ShowRow color={"gold"} tag={"舞蹈芭蕾"} type="dance" showInfoArr={danceShows} />
        <ShowRow color={"green"} tag={"儿童亲子"} type="children" showInfoArr={childrenShows}/>
        <ShowRow color={"red"} tag={"动漫"} type="comic" showInfoArr={comicShows}/>
        <div className={styles.AboveFooter}>&nbsp;</div>
        <Footer />
      </div>
    );
  }
  else {
    return (
      <div />
    );
  }
}
function mapStateToProps(state) {
  const  { showsInHomepage } = state.shows;
  return { showsInHomepage };
}
export default connect(mapStateToProps)(Homepage);
