import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Web3Button } from "@web3modal/react";

const HeaderFooter = (props:any) => {
  const { activeIndex } = props;

  return (
    <div>
       <header className=" bg-indigo-800  px-4 py-6 font-[GT-America-Bold] relative z-50 ">
          <div className=' w-full sm:w-10/12 mx-auto flex items-center justify-between'>
            <Header/>
            <Web3Button />
          </div>
        </header>
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default HeaderFooter;
