//import du module react pour le front du Document
import React from 'react';
import {
  Document,
  Head,
  Main
} from '@react-ssr/express';

export default class extends Document {
  render() {
    return (
      <html lang="fr">
        <Head>
          <meta charSet="utf-8" />
          <title>Vot'ini : Application De Vote Électronique</title>
          <meta name="author" content="saidoun-tahmi" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="shortcut icon" href="/images/head-icon.ico" />
        </Head>
        <body style={{margin: 0 }}>
          <Main />
        </body>
      </html>
    );
  }
}
