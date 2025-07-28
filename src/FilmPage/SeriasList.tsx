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
        <div className="flex flex-row flex-wrap gap-4 justify-around">
            {season?.episodes.sort((a, b) => a.number - b.number).map(series => {
                return (
                    <SeriasCard series={series} poster={poster}/>
                )
            })}
        </div>
    )
}

export default SeriasList