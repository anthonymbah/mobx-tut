import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { reaction } from 'mobx';
import { WishList, WishListItem } from './WishList';

it('can create an instance of the model', () => {

	const item = WishListItem.create({
		name: 'book One',
		price: 23.00
	});

	expect(getSnapshot(item)).toEqual({
			name: 'book One',
			price: 23.00,
	});
});

it('can create an instance of list of model', () => {

	const list = WishList.create()

	list.add({
		name: 'book One',
		price: 23.00
	});

	expect(getSnapshot(list)).toEqual({
		items:[{
			name: 'book One',
			price: 23.00,
		}]
	});

});

it('can create an instance of list of model: snapshot', () => {

	const list = WishList.create()

	list.add({
		name: 'book One',
		price: 23.00
	});

	expect(getSnapshot(list)).toMatchSnapshot();
});

it('can create an instance of list of model on state change', () => {

	const list = WishList.create();
	const states = [];
	onSnapshot(list, snapshot => {
		states.push(snapshot);
	});

	list.add({
		name: 'book One',
		price: 23.00
	});

	list.items[0].changeName('book X');

	expect(states).toMatchSnapshot();
});

it('can create an instance of list of model on patch change', () => {

	const list = WishList.create();
	const patches = [];
	onPatch(list, patch => {
		patches.push(patch);
	});

	list.add({
		name: 'book One',
		price: 23.00
	});

	list.items[0].changeName('book X');

	expect(patches).toMatchSnapshot();
});

it('can total price', () => {

	const list = WishList.create();
	list.add({
		name: 'book One',
		price: 23.00
	});
	let changed = 0;
	reaction(() => list.totalPrice, () => changed ++);
	
	const [ item ] = list.items;
	item.changeName('book X');
	expect(changed).toBe(0);

	item.changePrice(24);
	expect(changed).toBe(1);

});