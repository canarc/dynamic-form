import { useCallback, useState } from 'react';

const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}

const formTypeToHtmlType = (type: 'STRING' | 'NUMBER') => {
  switch (type) {
    case 'STRING':
      return 'string';
    case 'NUMBER':
      return 'number';
  }
};

export { delay, useForceUpdate, formTypeToHtmlType };
