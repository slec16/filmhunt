
import React from 'react';

type AnimatedButtonProps = {
    icon: React.ReactNode
    text: string
    onClick: () => void
}

const AnimatedButton = (props: AnimatedButtonProps) => {

    const {
        icon,
        text,
        onClick,
    } = props


    return (
        <button
            onClick={onClick}
            className={`
                group
                relative
                flex
                items-center
                justify-center
                space-x-2
                overflow-hidden
                transition-all
                duration-500
                ease-in-out
                rounded-full
                bg-orange-400
                hover:bg-orange-600
                text-white
                w-12
                h-12
                hover:w-full
                hover:px-4
            `}
        >

            <span
                className={`
                    absolute
                    left-4
                    opacity-0
                    transition-all
                    duration-300
                    ease-in-out
                    whitespace-nowrap
                    group-hover:opacity-100
                    group-hover:static
                    -translate-x-full
                    group-hover:translate-x-0
                `}
            >
                {text}
            </span>


            <div
                className={`
                    absolute
                    left-1/2
                    transform
                    -translate-x-1/2
                    transition-all
                    duration-400
                    ease-in-out
                    group-hover:static
                    group-hover:translate-x-0
                    group-hover:left-auto
                `}
            >
                {icon}
            </div>
        </button>
    );
};

export default AnimatedButton;