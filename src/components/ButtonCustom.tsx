import React from 'react';

interface ButtonProps {
    value: string;
    py: string | number;
    handleSubmit?: () => void;
}

const Button: React.FC<ButtonProps> = ({ value, py, handleSubmit }) => {
    return (
        <button
            onClick={handleSubmit ? handleSubmit : undefined}
            type='submit'
            className={`bg-gradient-to-br from-primary to-black text-white w-full rounded-md text-xs sm:text-sm py-${py} active:scale-95 transition-all flex justify-center`}
    >{value}</button>
    )
}
export default Button