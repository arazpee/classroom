import React from 'react';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';

export default ({ children }) => {
  return (
    <div>
      <Header/>
        {children}
      <Footer/>
    </div>
  )
}
