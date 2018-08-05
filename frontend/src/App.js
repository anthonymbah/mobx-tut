import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WishListView from './components/WishListView'
import FORM from './components/form'
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import {clone, getSnapshot, applySnapshot} from 'mobx-state-tree';



const plugins = { dvr: validatorjs };

const fields = (item) => [{
  name: 'name',
  label: 'Name',
  value: item.name,
  placeholder: 'Name',
  rules: 'required|string|between:5,25',
  hooks: {
      onChange(field) {
        item.changeName(field.value);
        // console.log('-> onBlur HOOK', field.value);
      },
    },
}, {
  name: 'price',
  label: 'price',
  value: item.price,
  placeholder: 'Insert price',
  rules: 'required|alpha_num',
  hooks: {
      onChange(field) {
        item.changePrice(parseFloat(field.value));
        // console.log('-> onBlur HOOK', field.value);
      },
    },
}
];






class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cloned: clone(props.wishList.items[0])
    };
  }
  render() {
    const { props, state } = this;

    const item = state.cloned;

    const hooks = {
  onSuccess(form) {
    //alert('Form is valid! Send the request here.');
    // get field values
    applySnapshot( props.wishList.items[0], getSnapshot(item));
    console.log('Form Values!', form.values());
  },
  onError(form) {
    //alert('Form has errors!');
    // get all form errors
    console.log('All form errors', form.errors());
  }
}

    const form = new MobxReactForm({ fields: fields(item) }, { plugins, hooks });
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <WishListView wishList={props.wishList} />
        <FORM form={form} />
      </div>
    );
  }

}

export default App;
