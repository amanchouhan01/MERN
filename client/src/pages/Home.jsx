import React from 'react'
import "./Home.css"
import { NavLink } from 'react-router-dom'
const Home = () => {
  return (
    <>
      <main>
        <div className="homeSection-hero">
          <div className="homeContainer-grid">
            <div className="homeHero-content">

              <h1>
                <span className='homeIntro'>Hi, I'm</span> <br />
                <span className="homeHighlight">Aman Chouhan</span>
                <br />
                <span className="homeSubtitle">Building Modern Web Experiences</span>
              </h1>

              <p>
             I’m Aman Chouhan, a full-stack web developer focused on building scalable, reliable, and user-centric digital solutions. I combine modern web technologies with clean engineering practices to deliver secure, high-performance applications that solve real-world problems.
              </p>
              <div className='homeButtun'>
                 <NavLink to="/contact">
                 <button className='btn' >Connect Now</button>
               </NavLink>
               <NavLink to="/about">
                 <button className='btn' >know more</button>
               </NavLink>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
