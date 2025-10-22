import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState([]);

  const addDish = (dish) => {
    // dish should include: id, name, description, course, price
    setMenu(prev => [dish, ...prev]);
  };

  const removeDish = (id) => setMenu(prev => prev.filter(d => d.id !== id));

  const clearMenu = () => setMenu([]);

  return (
    <MenuContext.Provider value={{ menu, addDish, removeDish, clearMenu }}>
      {children}
    </MenuContext.Provider>
  );
}