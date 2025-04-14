"use client";

import { createContext, useContext, useState } from "react";

const intialState = {
    id: 1,
    store_name: 'UddoktaHut',
    store_type: "",
    store_address: "",
    isActive: false
}

const ShopContext = createContext();

const ShopProvider = ({ children, initialData }) => {
    const data = initialData || intialState;
    const [shop, setShop] = useState(data);

    return (
        <ShopContext.Provider value={{ shop, setShop }}>
            {children}
        </ShopContext.Provider>
    );
}

const useShop = () => {
    const context = useContext(ShopContext);
    if (context === undefined)
        throw new Error("Context was used outside provider");
    return context;
}

export { ShopProvider, useShop }