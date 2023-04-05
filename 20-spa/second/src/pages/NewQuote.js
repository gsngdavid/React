import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {

    const addQuoteHandler = quote => {
        console.log(quote.author);
        console.log(quote.text);
    }

    return <QuoteForm onAddQuote={addQuoteHandler} />
}

export default NewQuote;