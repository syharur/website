import React from 'react';
import SideItems from './SideItems';
import { NavItems } from './NavItemData';

export default function SideNav() {
    
  return (
    <div>
            <h2>Side Navigation </h2>
            {NavItems.map((navItem,index)=>(
              
                   // <a key={navItem._id} href={navItem.link.to}>
                   //     <p>{navItem.link.tittle}</p>
                   // </a>
                <SideItems key={index} items={navItem}/>
                
            ))}
    </div>
  );
}
