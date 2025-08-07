import React, { useState, useRef, useEffect } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface MultiSelectProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
}


const MultiSelect = (props: MultiSelectProps) => {

    const { options, selected, onChange, placeholder, className } = props

    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter(item => item !== option))
        } else {
            onChange([...selected, option])
        }
    }

    const removeOption = (option: string, e: React.MouseEvent) => {
        e.stopPropagation()
        onChange(selected.filter(item => item !== option))
    }

    return (
        <div
            ref={wrapperRef}
            className={`relative ${className}`}
        >
            <div
                className={`flex flex-wrap items-center gap-2 p-2 border rounded-lg cursor-pointer transition-all ${isOpen ? 'ring-2 ring-orange-400 border-orange-400' : 'border-gray-300 hover:border-gray-400'
                    }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected.length === 0 && (
                    <span className="text-orange-400 ml-1 ">{placeholder}</span>
                )}

                {selected.map(option => (
                    <div
                        key={option}
                        className="flex items-center bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-sm"
                    >
                        {option}
                        <button
                            type="button"
                            onClick={(e) => removeOption(option, e)}
                            className="ml-1 text-orange-500 hover:text-orange-700"
                        >
                            ×
                        </button>
                    </div>
                ))}

                {isOpen && (
                    <input
                        type="text"
                        className="flex-1 min-w-[100px] outline-none bg-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Найти..."
                        autoFocus
                    />
                )}

                <ArrowDropDownIcon className={`transition-transform ${isOpen ? 'rotate-180' : ''} ml-auto mr-0`} />
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                    {filteredOptions.length === 0 ? (
                        <div className="px-4 py-2 text-gray-500">Ничего не найдено</div>
                    ) : (
                        filteredOptions.map(option => (
                            <div
                                key={option}
                                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 ${selected.includes(option) ? 'bg-orange-50' : ''
                                    }`}
                                onClick={() => toggleOption(option)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    onChange={() => { }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleOption(option)
                                    }}
                                    className="mr-2 h-4 w-4 text-orange-600 rounded focus:ring-orange-500"
                                />
                                <span>{option}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default MultiSelect