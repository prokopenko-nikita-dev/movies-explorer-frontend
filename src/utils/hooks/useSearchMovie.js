import { useMemo, useState, useEffect } from "react";

export const useSearchMovie = (getMovies) => {
    const[state, setState] = useState([]);
    const[search, setSearch] = useState("");
    const[filter, setFilter] = useState(false);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        function getFilms(){
            setLoading(true);
            
            getMovies()
            .then(res => {
                setState(res)
            })
            .finally(() => {setLoading(false)})
        }

        getFilms();
    }, []);

    const searchedFilms = useMemo(() => {
        if(loading || state.length === 0) {
            return []
        } 
        const filteredFilms = [];
        state.forEach(element => {
            const nameRU = element.nameRU.toLowerCase();
            const nameEN = element.nameEN.toLowerCase();
            const duration = element.duration;

            const isInSearch = nameRU.includes(search.toLowerCase()) || nameEN.includes(search.toLowerCase())
            const isInShort = duration < 40;

            // проверка если включен тумблер и поиск = ""
            if(filter && !search && isInShort){
                filteredFilms.push(element);
                return;
            }

            // проверка если включен тумблер и поиск != ""
            if(filter && search && isInShort && isInSearch) {
                filteredFilms.push(element);
                return;
            }

            // проверка если выключен тумблер и поиск != ""
            if(!filter && search && isInSearch) {
                filteredFilms.push(element)
                return;
            }

            if(!filter && !search) {
                filteredFilms.push(element)
                return;
            }
        });

        return filteredFilms;
    }, [search, filter, state, loading]); 


    return {
        searchedFilms,
        search,
        filter,
        loading,
        onSearch: setSearch,
        onFilter: setFilter,
    }
}