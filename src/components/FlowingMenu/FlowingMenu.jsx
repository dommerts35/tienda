import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './FlowingMenu.css';

function FlowingMenu({ items = [] }) {
  const location = useLocation();

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem 
            key={idx} 
            {...item} 
            isActive={isActivePath(item.link)}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, isActive }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (!marqueeRef.current) return;
    gsap.to(marqueeRef.current, {
      y: '0%',
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!marqueeRef.current) return;
    gsap.to(marqueeRef.current, {
      y: '101%',
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
    </React.Fragment>
  ));

  return (
    <div className={`menu__item ${isActive ? 'active' : ''}`} ref={itemRef}>
      <Link 
        className="menu__item-link" 
        to={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </Link>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
