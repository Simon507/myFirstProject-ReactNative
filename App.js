import React from 'react';
import { useState, useEffect } from 'react';

import Main from './assets/components/Main';

// import UseRoute from './assets/router';

import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';

import { auth } from './fireBase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  // onAuthStateChanged(auth, user => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     setUserId(uid);

  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
