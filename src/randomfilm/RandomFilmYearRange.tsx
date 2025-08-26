type RandomFilmYearRangeProps = {
    startYear: number
    setStartYear: React.Dispatch<React.SetStateAction<number>>
    endYear: number
    setEndYear: React.Dispatch<React.SetStateAction<number>>
}

const RandomFilmYearRange = (props: RandomFilmYearRangeProps) => {
    const { startYear,  setStartYear, endYear, setEndYear} = props

    const step = 10
    const minYear = 1920
    const maxYear = 2025

    const totalYears = maxYear - minYear

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), endYear)
        setStartYear(value)
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), startYear)
        setEndYear(value)
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
        <div className="w-full flex justify-between">
            <div className="text-center px-2 w-20">
                <span className="block text-sm text-gray-600">От</span>
                <span className="block text-lg font-semibold text-orange-500">{startYear}</span>
            </div>

            {/* Шкала с отметками */}
            <div className="relative w-full">
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
                        left: `${calculatePosition(startYear)}%`,
                        width: `${calculatePosition(endYear) - calculatePosition(startYear)}%`
                    }}
                ></div>

                {/* Слайдеры */}
                <input
                    type="range"
                    min={minYear}
                    max={maxYear}
                    value={startYear}
                    onChange={handleMinChange}
                    step={1}
                    className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-10"
                />

                <input
                    type="range"
                    min={minYear}
                    max={maxYear}
                    value={endYear}
                    onChange={handleMaxChange}
                    step={1}
                    className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-10"
                />
            </div>

            <div className="text-center px-2 w-20">
                <span className="block text-sm text-gray-600">До</span>
                <span className="block text-lg font-semibold text-orange-500">{endYear}</span>
            </div>

    


        </div>
    )
}

export default RandomFilmYearRange

