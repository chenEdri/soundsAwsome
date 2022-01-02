import logo from '../guitarLogo.png'
import React from 'react'


function Home() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h3 className="pt20">
         Enjoy Music Anywere .
        </h3>
      </header>
    </div>
  )
}

export default Home
