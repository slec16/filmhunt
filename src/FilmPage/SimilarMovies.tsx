import { type ISimilarMovies } from "../interfaces"
import SimilarMovieCard from './SimilarMovieCard';
type SimilarMoviesProps = {
    similarMovies: ISimilarMovies[]
}

const SimilarMovies = (props: SimilarMoviesProps) => {



    return(
        <div className="px-10 py-5">
            <h3 className="border-b mb-5 text-3xl">Похожее</h3>
            <div className="flex flex-row flex-wrap justify-center gap-7">
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

