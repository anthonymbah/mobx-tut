import { types } from 'mobx-state-tree';
import { reaction } from 'mobx';

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

const WishUser = types.model({
	name: types.optional(types.string, ''),
}).actions(self => ({
	update(values){
		self.name = values;
	},
	bind(form){
		reaction(() => form.values, values => self.update(values));
	},
}));

export {
	WishList,
	WishListItem,
	WishUser,
}