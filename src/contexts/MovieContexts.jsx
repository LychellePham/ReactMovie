import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = (children) => {
    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        const storedFaves = localStorage.getItem("favourites")

        if (storedFaves) setFavourites(JSON.parse(storedFaves))
    }, [])

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites])

    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev, movie])
        /* how to update state if it is an array ^*/
    }

    const removeFromFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}