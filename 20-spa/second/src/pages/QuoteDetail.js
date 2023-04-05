import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const DUMMY_QUOTES = [
    {id: 'q1', author: 'David', text: "Learning React is fun!"},
    {id: 'q2', author: 'Gusenga', text: "Learning Cyber security is fun!"}
];

const QuoteDetail = () => {
    const param = useParams();

    const quote = DUMMY_QUOTES.find(quote => quote.id === param.quoteId);

    if(!quote) {
        return <NoQuotesFound />
    }
    
    return <section>
        <HighlightedQuote text={quote.text} author={quote.author} />
        <Route path={`/quotes/${param.quoteId}/comments`}>
            <Comments />
        </Route>
    </section>
}

export default QuoteDetail;