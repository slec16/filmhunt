import { useState, useRef, useEffect } from 'react'

interface PageInputProps {
    page: number;
    maxPage: number;
    onPageChange: (newPage: number) => void;
}

const PageInput = ({ page, maxPage, onPageChange }: PageInputProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState(page.toString())
    const [isInvalid, setIsInvalid] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setInputValue(page.toString())
    }, [page])

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

    const handleClick = () => {
        setIsEditing(true)
        setIsInvalid(false)
    }

    const validateAndSubmit = () => {
        const newPage = parseInt(inputValue)
        const isValid = !isNaN(newPage) && newPage > 0 && newPage <= maxPage

        setIsInvalid(!isValid)

        if (isValid) {
            onPageChange(newPage)
            setIsEditing(false)
        } else {
            if (inputRef.current) {
                inputRef.current.focus()
                inputRef.current.select()
            }
        }
    }

    const handleBlur = () => {
        validateAndSubmit()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            validateAndSubmit()
        } else if (e.key === 'Escape') {
            setInputValue(page.toString())
            setIsEditing(false)
            setIsInvalid(false)
        }
    }

    return (
        <div className="relative">
            {isEditing ? (
                <div>
                    <input
                        ref={inputRef}
                        type="number"
                        min='1'
                        max={maxPage}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className={`
                            w-15 h-10 rounded  text-center border-2
                            focus:outline-none focus:ring-1 focus:ring-orange-500
                            ${isInvalid ? 'border-red-500 bg-red-100 text-red-800' : 'border-orange-500 bg-orange-100 text-gray-800'}
            `}
                        aria-invalid={isInvalid}
                        aria-errormessage="invalid-page-error"
                    />
        
                    <div className={`absolute top-full rounded-xl mt-1 w-fit p-2 bg-gray-950 text-center text-xs ${isInvalid ? ' text-red-500' : 'text-white'}`}>
                        Всего {maxPage} страниц
                    </div>

                </div>
            ) : (
                <button
                    onClick={handleClick}
                    className="w-15 h-10 rounded bg-orange-500 text-white hover:bg-orange-600"
                    aria-label={`Current page ${page}, click to edit`}
                >
                    {page}
                </button>
            )}
        </div>
    )
}

export default PageInput