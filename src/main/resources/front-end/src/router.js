import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/default/IndexPage';
// users
import RegistrationPage from './routes/users/login/RegistrationPage';
import UserLogin from './routes/users/login/UserLogin';
import Homepage from './routes/users/shows/Homepage';
import BuyPage from './routes/users/buy/BuyPage';
import MyInfo from './routes/users/my/MyInfo';
import MyOrders from './routes/users/my/MyOrders';
import MyStatistics from './routes/users/my/MyStatistics';
import SelectSeatsPage from './routes/users/buy/SelectSeatsPage';
import SortVocal from './routes/users/shows/SortVocal';
import SortConcert from './routes/users/shows/SortConcert';
import SortOpera from './routes/users/shows/SortOpera';
import SortDrama from './routes/users/shows/SortDrama';
import SortDance from './routes/users/shows/SortDance';
import SortChildren from './routes/users/shows/SortChildren';
import SortComic from './routes/users/shows/SortComic';
import SecurityModification from './routes/users/my/SecurityModification';
import UnauthorizedPage from './routes/UnauthorizedPage';

// venues
import VenueLogin from './routes/venues/VenueLogin';
import MyVenue from './routes/venues/my/MyVenue';
import VenueApplication from './routes/venues/VenueApplication';
import MyShows from './routes/venues/my/MyShows';
import Release from './routes/venues/Release';
import MyLiveTickets from './routes/venues/my/MyLiveTickets';
import VenueStatistics from './routes/venues/VenueStatistics';
import BuyTicketsLive from './routes/venues/BuyTicketsLive';
import CheckTicketsLive from './routes/venues/CheckTicketsLive';
import UpdateVenueInfo from './routes/venues/my/UpdateVenueInfo';
import VenueInfo from './routes/venues/my/VenueInfo';

// managers
import ApplicationExam from './routes/managers/ApplicationExam';
import Balance from './routes/managers/Balance';
import ManagerStatistics from './routes/managers/ManagerStatistics';
import ManagerLogin from './routes/managers/ManagerLogin';
import ModificationExam from './routes/managers/ModificationExam';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        // users
        <Route path="/" exact component={IndexPage} />
        <Route path="/register" exact component={RegistrationPage} />
        <Route path="/login" exact component={UserLogin} />
        <Route path="/homepage" exact component={Homepage} />
        <Route path="/buy" exact component={BuyPage} />
        <Route path="/myinfo" exact component={MyInfo} />
        <Route path="/myorders" exact component={MyOrders} />
        <Route path="/mystatistics" exact component={MyStatistics} />
        <Route path="/selectseats" exact component={SelectSeatsPage} />
        <Route path="/classification/vocalConcert" exact component={SortVocal} />
        <Route path="/classification/concert" exact component={SortConcert} />
        <Route path="/classification/opera" exact component={SortOpera} />
        <Route path="/classification/drama" exact component={SortDrama} />
        <Route path="/classification/dance" exact component={SortDance} />
        <Route path="/classification/children" exact component={SortChildren} />
        <Route path="/classification/comic" exact component={SortComic} />
        <Route path="/securitymodification" exact component={SecurityModification} />
        <Route path="/unauthorizedpage" exact component={UnauthorizedPage} />
        // venues
        <Route path="/venuelogin" exact component={VenueLogin} />
        <Route path="/myvenue" exact component={MyVenue} />
        <Route path="/venueapplication" exact component={VenueApplication} />
        <Route path="/myshows" exact component={MyShows} />
        <Route path="/release" exact component={Release} />
        <Route path="/mylivetickets" exact component={MyLiveTickets} />
        <Route path="/venuestatistics" exact component={VenueStatistics} />
        <Route path="/buyticketslive" exact component={BuyTicketsLive} />
        <Route path="/checkticketslive" exact component={CheckTicketsLive} />
        <Route path="/updatevenueinfo" exact component={UpdateVenueInfo} />
        <Route path="/venueinfo" exact component={VenueInfo} />
        // managers
        <Route path="/managerlogin" exact component={ManagerLogin} />
        <Route path="/applicationexam" exact component={ApplicationExam} />
        <Route path="/balance" exact component={Balance} />
        <Route path="/managerstatistics" exact component={ManagerStatistics} />
        <Route path="/modificationexam" exact component={ModificationExam} />

      </Switch>
    </Router>
  );
}

export default RouterConfig;
