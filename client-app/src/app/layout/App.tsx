import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import "./styles.css";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import { ActivityForm } from "../../features/activities/form/ActivityForm";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
import { ModalContainer } from "../common/modals/ModalContainer";
import { ProfilePage } from "../../features/profiles/ProfilePage";
import { ProfileEditForm } from "../../features/profiles/ProfileEditForm";
import { PrivateRoute } from "./PrivateRoute";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const { commonStore, userStore } = useContext(RootStoreContext);
  const { appLoaded, setAppLoaded, token } = commonStore;
  const { getUser } = userStore;
  useEffect(() => {
    if (token) getUser().finally(setAppLoaded);
    else setAppLoaded();
  }, [getUser, token, setAppLoaded]);
  if (!appLoaded) {
    return <LoadingComponent content="Loading app..." />;
  }
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => {
          return (
            <Fragment>
              <NavBar />
              <Container style={{ marginTop: "7em" }}>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/activities"
                    component={ActivityDashboard}
                  />
                  <PrivateRoute
                    path="/activities/:id"
                    component={ActivityDetails}
                  />
                  <PrivateRoute
                    key={location.key}
                    path={["/createActivity", "/manage/:id"]}
                    component={ActivityForm}
                  />
                  <PrivateRoute
                    path="/profile/:username"
                    component={ProfilePage}
                  />
                  <PrivateRoute
                    key={location.key}
                    path="/editProfile"
                    component={ProfileEditForm}
                  />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
