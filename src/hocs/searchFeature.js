import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;
function SearchFeature(props) {
    const [searchTerms, setSearchTerms] = useState("");
    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)
        props.updateFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Search
                value={searchTerms}
                onChange={onChangeSearch}
                placeholder="Search by type..."
            />
        </div>
        )
}

export default SearchFeature;