import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css"

function Home(){
    const [searchQuery, setSearchQuery] = useState("");


    {/*
        hard coded movie enties

    const movies = [
        {id: 1, title: "Big Hero 6", release_date: 2014},
        {id: 2, title: "Tangled", release_date: 2011},
        {id: 3, title: "Coco", release_date: 2016},
    ]
        */}

    {/* Now we add movies through API instead, and we will use useEffect */}

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () =>{
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            }catch(err){
                console.log(err)
                setError("Failed to load movies...")
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) =>{
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)

        }catch (err){
            console.log(err)
            setError("Failed to seach movies...")

        }finally {
            setLoading(false)
        }


    }

    return(
        <>
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button type="submit" className="search-btn">Search</button>

            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div> 
            ) : (
            <div className="movies-grid">
                {movies.map((movie) => (
                    movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div> 
            )}

        </div>
        </>
    )
}

export default Home