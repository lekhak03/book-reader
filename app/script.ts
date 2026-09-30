import { get } from "http";

const topics = [
    "Fiction",
    "Philosophy",
    "Science",
    "History",
    "Poetry",
    "Drama",
    "Essays",
    "Adventure",
    "Travel",
    "Biography",
    "Science fiction",
    "Horror tales"
];
async function getText() {
    const topic = 'Fiction';  // ← Remove duplicate

    console.log("building base url")
    const baseUrl = `https://gutendex.com/books?topic=${encodeURIComponent(topic)}&languages=en`;

    console.log("getting response")

    // 1. Get the first page to find total books
    const response = await fetch(baseUrl);

    if (!response.ok) throw new Error("Response not found");

    const data = await response.json();
    const total_books = data.count;
    const max_pages = Math.ceil(total_books / 32);

    // 2. Pick a random page
    const page_no = Math.floor(Math.random() * max_pages) + 1;
    const pageUrl = `${baseUrl}&page=${page_no}`;
    const response_page = await fetch(pageUrl);
    const page_data = await response_page.json();

    // 3. Pick a random book from that page
    const books_on_page = page_data.results;
    const random_book = books_on_page[Math.floor(Math.random() * books_on_page.length)];
    const book_text_url = random_book.formats['text/plain; charset=us-ascii'];
    console.log(random_book)
    const bookSite = random_book.formats['text/html'].split('.html.images')[0]
    const bookTitle = random_book.title
    const bookAuthor = random_book.authors[0].name.split(',')[1] + ' ' +  random_book.authors[0].name.split(',')[0]

    console.log(book_text_url)

    if (book_text_url) {
        const response = await fetch(book_text_url);
        if (!response.ok) {
            throw new Error("Failed to fetch book text");
        }
        const bookText = await response.text();
        // return NextResponse.json({ text: bookText, bookSite: bookSite, bookTitle: bookTitle, bookAuthor: bookAuthor });  // ← Return NextResponse
    }
    console.log("HERE")

    // return NextResponse.json({ text: "HELLO" });  // ← Return NextResponse: Default for test
}

getText()