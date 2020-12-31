import {routes,mockroute} from './config';
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
/*一级路由*/

class First extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route, i) => {
              if (route.auth) {//根据配置是否检测登录
                return (
                  <PrivateRoute key={i} path={route.path}>
                    <route.component/>
                  </PrivateRoute>
                )
              } else {
                return (<RouteWithSubRoutes key={i} {...route} />)
              }
            }
          )}
        </Switch>
      </Router>
    );
  }
}
/*二级路由*/
class SystemRouter extends Component {
  render() {
    return (
        <Switch>
          {routes[1].routes.map((route, i) => {
            if (route.auth) {//根据配置是否检测登录
              return (
                <PrivateRoute  key={i} path={route.path}>
                  <route.component/>
                </PrivateRoute>
              )
            } else {
              return (<RouteWithSubRoutes key={i} {...route} />)
            }
          })}
        </Switch>
    );
  }
}



export {
  First, SystemRouter
};
// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
/*开放路由*/
function RouteWithSubRoutes(route) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}
    />
  );
}
/*登录检测路由*/
function PrivateRoute({children, ...rest}) {
  console.log(...rest,123123);
  let isAuthenticated = sessionStorage.auth;
  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}
