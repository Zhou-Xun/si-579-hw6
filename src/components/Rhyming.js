import React, { useState, useEffect } from 'react';
import {map} from "react-bootstrap/ElementChildren";

const Rhyming = (props) => {
    const [rhymingEvents, setRhymingEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': props.query})).toString()}`;

    const handleSaveClick = (word) => {
        props.saveWord(word)
    };

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setLoading(false);
                setRhymingEvents(Object.values(json))
            });
    }, [url]);

    // group by function
    const groupBy = (objects, property) => {
        // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
        // value for property (obj[property])
        if(typeof property !== 'function') {
            const propName = property;
            property = (obj) => obj[propName];
        }

        const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
        for(const object of objects) {
            const groupName = property(object);
            //Make sure that the group exists
            if(!groupedObjects.has(groupName)) {
                groupedObjects.set(groupName, []);
            }
            groupedObjects.get(groupName).push(object);
        }

        // Create an object with the results. Sort the keys so that they are in a sensible "order"
        const result = {};
        for(const key of Array.from(groupedObjects.keys()).sort()) {
            result[key] = groupedObjects.get(key);
        }
        return result;
    }

    const generateEvents = () => {
        const eventsToShow = [];
        // group by rhyming
        const mapped_data = groupBy(rhymingEvents, "numSyllables")

        for (let group in mapped_data) {
            eventsToShow.push(<h3 key={group}>{group} syllable:</h3>);
            for (let word_entry in mapped_data[group]) {
                const {word} = mapped_data[group][word_entry];
                eventsToShow.push(
                    <li key={word}>{word} {'\u00A0'}
                        <button className="saved_button"
                                style={{color: "white", backgroundColor: "green"}}
                                onClick={ () =>handleSaveClick(word)}
                        >(Save)
                        </button>
                    </li>
                )
            }
        };

        return eventsToShow;
    };



    // return value
    if (rhymingEvents.length > 0) {
        return (
            <>
                <div className="row">
                    <h2 className="col">Words that rhyme with {props.query}:</h2>
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

export default Rhyming;