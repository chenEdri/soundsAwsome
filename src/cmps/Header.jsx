import { NavLink, withRouter } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export function _Header(props) {
  const [activeIdx, setActiveIdx] = useState(null)

  const changeActiveIdx = (idx) => setActiveIdx(idx)
  return (
    <div className='main-header'>
      <div className='logo'>
        <a href='https://edea.co.il' role='link'>
          <img
            width='120'
            height='31'
            src='https://edea.co.il/wp-content/uploads/2020/09/logo_edea1white.png'
            className='attachment-large size-large'
            alt=''
            loading='lazy'
          />
        </a>
      </div>
      <div className='nav'>
        <NavLink
          className={activeIdx === 1 ? 'active-idx' : ''}
          to='/main'
          onClick={() => {
            changeActiveIdx(1)
          }}
        >
          Main-Page
        </NavLink>
        <NavLink
          className={activeIdx === 2 ? 'active-idx' : ''}
          to='/'
          onClick={() => {
            setActiveIdx(2)
          }}
        >
          Home
        </NavLink>
        <NavLink
          className={activeIdx === 3 ? 'active-idx' : ''}
          to='/user'
          onClick={() => {
            setActiveIdx(3)
          }}
        >
          Dashboard
        </NavLink>
      </div>
      <div className="right-nav">
        <input
          type='checkbox'
          className='custom-checkbox'
          onClick={() => props.toggleDarkMode()}
        />
      </div>
    </div>
  )
}

export const Header = connect()(withRouter(_Header))
