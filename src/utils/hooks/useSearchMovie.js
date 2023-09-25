import {useMemo, useState, useEffect, useCallback} from "react";

export const useSearchMovie = (getMovies, withLocalStorage) => {
    const lss = localStorage.getItem("search") || "";
    const lsf = localStorage.getItem("filter") === "true";

    const[state, setState] = useState([]);
    const[search, setSearch] = useState(withLocalStorage ? lss : "");
    const[filter, setFilter] = useState(withLocalStorage ? lsf : false);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isFetchedOnce, setIsFetchedOnce] = useState(false);

    const searchedFilms = useMemo(() => {
        if (((withLocalStorage ? search.trim() !== "" : true) && !isFetchedOnce && !loading)) {
            setLoading(true);
            getMovies()
                .then(res => {setState(res);
                    // return Promise.reject(0);
                }
                )
                .catch(err =>  setError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"))
                .finally(() =>{ setLoading(false); setIsFetchedOnce(true)});
            return [];
        }

        if(loading || state.length === 0) {
            return []
        }

        // проверка если выключен тумблер и поиск = ""
        if (withLocalStorage && search.trim() === "") {
            return []; // пропускаем итерацию, т.е. не добавляем фильм в filteredFilms
        }
         // проверка если включен тумблер и поиск = ""
        // if ( (filter && search.trim() === "")) {
        //     return []; // пропускаем итерацию, т.е. не добавляем фильм в filteredFilms
        // }
        
        const filteredFilms = [];

        console.log("useSearchMovie", state)
      
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

    const nothingFound = (!loading && isFetchedOnce && searchedFilms.length === 0 && search.trim().length);

    return {
        searchedFilms,
        search,
        filter,
        loading,
        onSearch,
        onFilter,
        setState,
        state,
        nothingFound,
        error
    }
}
