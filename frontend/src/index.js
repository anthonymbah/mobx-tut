import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { WishList } from './models/WishList';

const wishList = WishList.create();
wishList.add({name: 'book one', price: 23.00})

ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));
registerServiceWorker();
