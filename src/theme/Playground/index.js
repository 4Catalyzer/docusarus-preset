// eslint-disable-next-line import/no-unresolved
import Playground from '@theme-original/Playground';
import React from 'react';

import { Context } from '../ImportContext';

function PlaygroundWithImports(props) {
  const resolveImports = React.useContext(Context);
  return (
    <Playground
      showImports={false}
      resolveImports={resolveImports}
      {...props}
    />
  );
}

export default PlaygroundWithImports;
