import { useState, useEffect } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    // Показываем кнопку при прокрутке больше 300px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    // Плавная прокрутка наверх
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 p-3 bg-orange-500 text-white rounded-full shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } hover:bg-orange-700 `}
        >
            <ArrowUpwardIcon />
        </button>
    )
}

export default ScrollToTopButton