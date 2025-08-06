import { useState } from 'react'

type FilmNameProps = {
    name: string,
    logo: {
        url: string,
        previewUrl: string
    },
    isDetail?: boolean
}

const FilmName = (props: FilmNameProps) => {

    const { name, logo, isDetail } = props

    const [isLoadedLogo, setIsLoadedLogo] = useState(false)
    const [logoHasError, setLogoHasError] = useState(false)

    return (
        <>
            {((logo && logo.previewUrl) || (logo && logo.url)) &&
                <div className={`mb-4 ${logoHasError ? 'hidden' : 'block'}`}>
                    <img src={logo.url || logo.previewUrl} className={`max-h-32 2xl:max-h-64 ${isDetail && 'mb-3'}`} onLoad={() => setIsLoadedLogo(true)} onError={() => setLogoHasError(true)} />
                    {isDetail && <h1 className="text-sm text-gray-300 font-bold">{name}</h1>}
                </div>
            }
            {!isLoadedLogo && <h1 className={`${name.length > 35 ? 'text-2xl 2xl:text-4xl' : 'text-5xl 2xl:text-7xl'} text-gray-300 font-bold mb-4`}>{name}</h1>}

        </>
    )
}

export default FilmName