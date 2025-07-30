import type { ISeasons, IEpisode } from "../interfaces"
import SeriasCard from "./SeriasCard"

type SeriasListProps = {
    season: ISeasons | undefined,
    poster: {
        previewUrl: string,
        url: string
    }
}

const SeriasList = (props: SeriasListProps) => {
    const {season, poster} = props

    // console.log(season)
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] justify-center gap-4">
            {season?.episodes.sort((a, b) => a.number - b.number).map(series => {
                return (
                    <SeriasCard series={series} poster={poster}/>
                )
            })}
        </div>
    )
}

export default SeriasList