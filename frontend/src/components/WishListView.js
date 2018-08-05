import React from 'react';
import WishListItemView from './WishListItemView'

const WishListView = ({ wishList }) => (
	<div className='list'>
		<ul>{wishList.items.map(m => <WishListItemView item={m} />)}</ul>
	</div>
);

export default WishListView;