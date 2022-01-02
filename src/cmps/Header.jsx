import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
export function Header(props) {
  const [activeIdx, setActiveIdx] = useState(null)
  // useScrollPosition.js
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', updatePosition)
    updatePosition()
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  const updatePosition = () => {
    setScrollPosition(window.pageYOffset)
    checkScrollPos(window.pageYOffset)
  }

  // return scrollPosition
  const checkScrollPos = (pos) => {
    if (pos < 450) setActiveIdx(1)
    else if (pos > 450 && pos < 1000) setActiveIdx(2)
    else setActiveIdx(3)
  }

  const changeActiveIdx = (idx, y) => {
    setActiveIdx(idx)
    window.scrollTo({
      behavior: 'smooth',
      top: y,
    })
  }

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
        <div
          className={activeIdx === 1 ? 'active-idx cp' : 'cp'}
          onClick={() => {
            changeActiveIdx(1, 80)
          }}
        >
          Search
        </div>
        <div
          className={activeIdx === 2 ? 'active-idx cp' : 'cp'}
          onClick={() => {
            changeActiveIdx(2, 450)
          }}
        >
          player
        </div>
        <div
          className={activeIdx === 3 ? 'active-idx cp' : 'cp'}
          onClick={() => {
            changeActiveIdx(3, 1000)
          }}
        >
          History
        </div>
      </div>
      <div className='right-nav'>
        <input
          type='checkbox'
          className='custom-checkbox'
          onClick={() => props.toggleDarkMode()}
        />
      </div>
    </div>
  )
}
