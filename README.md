# drupal-connector

> The Drupal-connector is a helper package for calling Drupal Back-end, and more features.

[![NPM](https://img.shields.io/npm/v/drupal-connector.svg)](https://www.npmjs.com/package/drupal-connector) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save drupal-connector
```

## Usage

```tsx
import React, { Component } from 'react';

import Drupal from 'drupal-connector';

const ConnectionDrupal = new Drupal({
    baseUrl: 'http://drupal.dd:8083/',
});

const fetchData = () => {
    const dataA = ConnectionDrupal.callAPI('node').get('94e611da-d83b-4d4d-aa4a-b69d00c00112', { bundle: "article" }).then((res) => {
      return res
    });
}
```

## License

MIT © [dongpd1994](https://github.com/dongpd1994)
