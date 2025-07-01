// import React from "react";

export interface IDropdownItem {
    children: React.ReactNode;
    onClick?: () => React.MouseEventHandler<HTMLDivElement> | undefined;
    icon?: React.ReactNode;
    className?: any;
}

export const DropDownItem = (props: IDropdownItem) => {
    const { children, onClick, icon, className } = props;

    return (
        <div className="flex bg-white shadow-md px-xs py-sm hover:text-primary-700 hover:bg-primary-200">
            <div className='flex items-center  mr-sm'>{icon}</div>
            <div onClick={onClick} className={`${className}`} style={{ width: '100%' }}>
                {children}
            </div>
        </div>
    );
}

