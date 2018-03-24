import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';

export const routes =
    <Layout>
        <Route exact path='/ReactRedux/Home' component={Home} />
        <Route path='/ReactRedux/Home/counter' component={Counter} />
        <Route path='/ReactRedux/Home/fetchdata:startDateIndex?' component={FetchData} />
    </Layout>
    ;
