import React from 'react'
import { WhatsApp, LinkedIn, Mail } from '@material-ui/icons'

export function Footer() {
  return (
    <div className='footer'>
      <div className='footer-container'>
        <div className='foot-col'>
          <p className="head">TECHNOLOGY</p>
          <div className='foot-grid'>
            <p>React Hooks</p>
            <p>Redux</p>
            <p>Youtube Api</p>
          </div>
        </div>

        <div className='foot-col'>
          <p className="head">Contact Info</p>
          <div className="flex icon sb wrap ">
            <div className='mb10'>
              <a className='foot-hover mb10' href='mailto:chenedri22@gmail.com'>
                <Mail />
              </a>
            </div>
            <div >
              <a
                href='https://www.linkedin.com/in/chen-edri-46290776/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedIn />
              </a>
            </div>
            <div>
              <a
                href='https://www.linkedin.com/in/chen-edri-46290776/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <WhatsApp />
              </a>
            </div>
          </div>
        </div>
        <div className='foot-col'>
          <p className="head">About Me</p>
        </div>
      </div>
    </div>
  )
}
