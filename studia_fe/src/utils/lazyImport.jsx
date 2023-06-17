import React, { lazy } from 'react';

export function lazyImport(factory, name) {
  return {
    [name]: lazy(() =>
      factory().then((module) => ({
        default: module[name],
      }))
    ),
  };
}
