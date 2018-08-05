import { types } from 'mobx-state-tree';


const WishListItem = types.model({
	name: types.string,
	price: types.number,
}).actions(self => ({
	changeName(name){
		self.name = name;
	},
	changePrice(price){
		self.price = price;
	}
}));

const WishList = types.model({
	items: types.optional(types.array(WishListItem), []),
}).actions(self => ({
	add(item){
		self.items.push(item);
	}
})).views(self => ({
	get totalPrice(){
		return self.items.reduce((acc,item) => acc + item.price, 0);
	}
}));

export {
	WishList,
	WishListItem,
}