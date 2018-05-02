import React from 'react';
import Helmet from 'react-helmet';

import styles from './styles.css';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Hops Demo 2</title>
      </Helmet>
      <h1 className={styles.headline}>Hello World!</h1>
    </div>
  );
}
