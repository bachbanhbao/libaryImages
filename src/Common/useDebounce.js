import React, {useEffect, useState} from 'react';

export function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(()=> {
        const id = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => clearTimeout(id);
    }, [value, delay])
    return debounceValue;
}

