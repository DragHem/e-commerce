'use client';

import React from 'react';
import { useFormState } from 'react-dom';

const Form = ({ create }: { create: any }) => {
  const initialState = {
    message: null,
    errors: {
      name: '',
      price: null,
    },
  };
  const [state, formAction] = useFormState(create, initialState);

  console.log('state: ', state);

  return (
    <form action={formAction} className="flex flex-col">
      <label>
        <p>Product name</p>
        <input type="text" name="name" className="border" />
        {state && state.errors?.name}
      </label>
      <label>
        <p>Price</p>
        <input type="number" name="price" className="border" />
        {state && state.errors?.price}
      </label>
      <label>
        <p>Active</p>
        <input type="checkbox" name="avtive" className="border" />
        {state && state.errors?.price}
      </label>
      <button>Submit</button>
    </form>
  );
};

export default Form;
