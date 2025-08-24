import { useState } from 'react'

const RandomFilmYearRange = () => {
    const [minValue, setMinValue] = useState(1920)
    const [maxValue, setMaxValue] = useState(2025)
    const step = 10
    const minYear = 1920
    const maxYear = 2025

    const totalYears = maxYear - minYear

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('setMinVal', e.target.value)
        const value = Math.min(Number(e.target.value), maxValue )
        setMinValue(value)
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('setMaxVal', e.target.value)
        const value = Math.max(Number(e.target.value), minValue )
        setMaxValue(value)
    }

    const calculatePosition = (year: number) => {
        return ((year - minYear) / totalYears) * 100
    }

    const generateScaleMarks = () => {
        const marks = []
        const startYear = Math.ceil(minYear / step) * step
        const endYear = Math.floor(maxYear / step) * step

        for (let year = startYear; year <= endYear; year += step) {
            if (year >= minYear && year <= maxYear) {
                marks.push(year)
            }
        }
        marks.push(maxYear)
        return marks
    }

    const scaleMarks = generateScaleMarks()

    return (
        <div className="p-5 space-y-6 ">

            {/* Шкала с отметками */}
            <div className="relative ">
                {/* Основная линия шкалы */}
                <div className="absolute top-0 w-full h-1 bg-gray-300 rounded-full"></div>
                
                {/* Отметки на шкале */}
                {scaleMarks.map((year) => (
                    <div
                        key={year}
                        className="absolute transform -translate-x-1/2"
                        style={{ left: `${calculatePosition(year)}%` }}
                    >
                        <div className="w-px h-3 bg-gray-400 mx-auto"></div>
                        <span className="text-xs text-gray-500 mt-1 block whitespace-nowrap">
                            {year}
                        </span>
                    </div>
                ))}


                {/* Активный диапазон */}
                <div
                    className="absolute top-0 h-1 bg-orange-500 rounded-full"
                    style={{
                        left: `${calculatePosition(minValue)}%`,
                        width: `${calculatePosition(maxValue) - calculatePosition(minValue)}%`
                    }}
                ></div>

                {/* Слайдеры */}
                <input
                    type="range"
                    min={minYear}
                    max={maxYear}
                    value={minValue}
                    onChange={handleMinChange}
                    step={1}
                    className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-10"
                />

                <input
                    type="range"
                    min={minYear}
                    max={maxYear}
                    value={maxValue}
                    onChange={handleMaxChange}
                    step={1}
                    className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-10"
                />
            </div>

            {/* Отображение выбранных значений */}
            <div className="flex justify-between items-center p-4 ">
                <div className="text-center">
                    <span className="block text-sm text-gray-600">От</span>
                    <span className="block text-lg font-semibold text-orange-500">{minValue}</span>
                </div>
                {/* <div className="w-px h-8 bg-gray-300"></div> */}
                <div className="text-center">
                    <span className="block text-sm text-gray-600">До</span>
                    <span className="block text-lg font-semibold text-orange-500">{maxValue}</span>
                </div>
            </div>
        </div>
    )
}

export default RandomFilmYearRange

