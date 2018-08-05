import React from 'react';
import { observer } from 'mobx-react';


export default observer(({ form }) => (
  <form onSubmit={form.onSubmit}>
    <label htmlFor={form.$('name').id}>
      {form.$('name').label}
    </label>
    <input {...form.$('name').bind()} />
    <p>{form.$('name').error}</p>
    <label htmlFor={form.$('price').id}>
      {form.$('price').label}
    </label>
    <input {...form.$('price').bind()} />
    <p>{form.$('price').error}</p>
    <button type="submit" onClick={form.onSubmit}>Submit</button>
    <button type="button" onClick={form.onClear}>Clear</button>
    <button type="button" onClick={form.onReset}>Reset</button>
    <p>{form.error}</p>
  </form>
));