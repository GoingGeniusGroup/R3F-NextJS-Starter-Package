"use client";

import { Children } from "react";

const MainContent = ({children}) => (
    <div className="relative w-full auto z-[5]">
        {children}
    </div>
)

export default MainContent;


