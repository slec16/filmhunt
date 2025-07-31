import { type ISimilarMovies } from "../interfaces"
import SimilarMovieCard from './SimilarMovieCard'
type SimilarMoviesProps = {
    similarMovies: ISimilarMovies[]
}

const SimilarMovies = (props: SimilarMoviesProps) => {


    return(
        <div className="py-5">
            <h3 className="border-b mb-5 text-3xl">Похожее</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-center gap-7">
                {props.similarMovies.map(item => {
                    return(
                        <SimilarMovieCard  key={`duplicate-${item.id}`} similarMovieInfo={item}  />
                    )
                })}
            </div>
        </div>
    )

}

export default SimilarMovies

