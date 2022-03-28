import React, { useState, useEffect } from 'react';

const Synonym = (props) => {
    const [synonymEvents, setSynonymEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = `https://api.datamuse.com/words?${(new URLSearchParams({'ml': props.query})).toString()}`;

    const handleSaveClick = (word) => {
        props.saveWord(word)
    };

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setLoading(false);
                setSynonymEvents(Object.values(json))
            });
    }, [url]);

    const generateEvents = () => {
        const eventsToShow = [];

        synonymEvents.forEach((eventInstance, index) =>
            eventsToShow.push(
                <li key={eventInstance.word}>{eventInstance.word} {'\u00A0'}
                    <button className="saved_button"
                            style={{color: "white", backgroundColor: "green"}}
                            onClick={ () =>handleSaveClick(eventInstance.word)}
                    >(Save)
                    </button>
                </li>
            )
        );

        return eventsToShow;
    };
    if (synonymEvents.length > 0) {
        return (
            <>
                <div className="row">
                    <h2 className="col">Words with a similar meaning to {props.query}:</h2>
                </div>
                <div className="output row">
                    <output className="col">
                        <ul>
                            {generateEvents()}
                        </ul>
                    </output>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="row">
                    <h2 className="col">Words with a similar meaning to {props.query}:</h2>
                </div>
                <div className="output row">
                    <output className="col">
                        {loading ? <p>...loading</p> : <ul><li>(no results)</li></ul>}
                    </output>
                </div>
            </>
        )
    }

};

export default Synonym;