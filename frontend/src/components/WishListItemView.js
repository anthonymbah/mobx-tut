import React from 'react';
import { observer } from 'mobx-react';

const WishListItemView = ({ item }) => (
	<li className='item'>
		<h2>{item.name}</h2>
		<span>{item.price}</span>
	</li>
);


export default observer(WishListItemView);