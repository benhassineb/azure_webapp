import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
export var routes = React.createElement(Layout, null,
    React.createElement(Route, { exact: true, path: '/ReactRedux/Home', component: Home }),
    React.createElement(Route, { path: '/ReactRedux/Home/counter', component: Counter }),
    React.createElement(Route, { path: '/ReactRedux/Home/fetchdata:startDateIndex?', component: FetchData }));
//# sourceMappingURL=routes.js.map