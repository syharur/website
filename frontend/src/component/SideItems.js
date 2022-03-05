import React from 'react';

const SideItems=({items})=>{
   const {nama,link,open}=items;
   const [isOpen,setIsOpen]=React.useState('');
   
   const OpenSideNav=()=>{
       
        setIsOpen(!isOpen);
        
       
    }
    const CloseSideNav=()=>{
       
        setIsOpen(isOpen);
        
       
    }
  return (
  <div onClick={()=>{
        CloseSideNav();
        OpenSideNav();
    }
    }>
      
      <p>
          Side Items
      </p>
                
       
                
                { 
                  isOpen && link.map((linka,index)=>{
                      const {tittle,to}=linka;
                     return( 
                      <div key={index}>
                        <a href={to}>
                            <p>{tittle}</p>
                        </a>
                    </div>
                     )
                    })
                    
                }

             
         
                              
      
  </div>
  );

};
export default SideItems;


