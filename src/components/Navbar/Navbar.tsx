import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { title: 'Home', slug: '/' },
    //{ title: 'Articles', slug: '/list' },
    //{ title: 'Form', slug: 'Form' },
    { title: 'Instrument', slug: 'Instrument' },
    { title: 'Orders', slug: 'Orders' },
    { title: 'Wallet', slug: 'Wallet' },
    { title: 'Position', slug: 'Position' },
    { title: 'TradeHistory', slug: 'TradeHistory' },
    { title: 'OrderForm', slug: 'OrderForm' },
    { title: 'Fan', slug: 'Fan' }
  ];

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <NavLink className='navbar-brand' to='/'>
        Home
      </NavLink>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav mr-auto'>
          {navItems.map(item => (
            <li className='nav-item' key={`nav-${item.slug}`}>
              <NavLink to={item.slug} className='nav-link'>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
//  <a href={`${process.env.REACT_APP_API}/redocs`} className="nav-link" target='_'>redocs</a>
