import { Fragment } from "react";
import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
    {id: 'q1', author: 'David', text: "Learning React is fun!"},
    {id: 'q2', author: 'Gusenga', text: "Learning Cyber security is fun!"}
];

const AllQuotes = () => {
    return <Fragment>
    <QuoteList quotes={DUMMY_QUOTES} />
    </Fragment>
}

export default AllQuotes;