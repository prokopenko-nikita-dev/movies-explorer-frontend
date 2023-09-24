import {useMemo, useState, useEffect, useCallback} from "react";

export const useSearchMovie = (getMovies, withLocalStorage) => {
    const lss = localStorage.getItem("search") || "";
    const lsf = localStorage.getItem("filter") === "true";

    const[state, setState] = useState([]);
    const[search, setSearch] = useState(withLocalStorage ? lss : "");
    const[filter, setFilter] = useState(withLocalStorage ? lsf : false);

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

        localStorage.setItem("filteredFilms", JSON.stringify(filteredFilms));
        return filteredFilms;
    }, [search, filter, loading, state.length]);

    const onSearch = useCallback((value) => {
        setSearch(value)
        withLocalStorage && localStorage.setItem("search", value)
    }, []);

    const onFilter = useCallback((value) => {
        setFilter(value)
        withLocalStorage && localStorage.setItem("filter", value)
    }, [])

    const nothingFound = (!loading && state.length !== 0 && searchedFilms.length === 0);

    return {
        searchedFilms,
        search,
        filter,
        loading,
        onSearch,
        onFilter,
        setState,
        state,
        nothingFound
    }
}
