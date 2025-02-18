import MovieCard from "../components/MovieCard"
import { useState } from "react"
import "../css/Home.css"

function Home(){
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        {id: 1, title: "Big Hero 6", release_date: 2014},
        {id: 2, title: "Tangled", release_date: 2011},
        {id: 3, title: "Coco", release_date: 2016},
    ]

    const handleSearch = (e) =>{
        e.preventDefault()
        alert(searchQuery)
        setSearchQuery("")

    }

    return(
        <>
        <div className="home">
            <form onSubmit={handleSearch} className="searc-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button type="submit" className="search-btn">Search</button>



            </form>

            <div className="movies-grid">
                {movies.map((movie) => (
                    movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id}/>
                    ))}
            </div>

        </div>
        </>
    )
}

export default Home