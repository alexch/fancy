
var smallWords = [
    // articles
    'a', 'an', 'the',
    // conjunctions
    'and', 'but', 'or', 'nor',
    // prepositions
    'as',
    'at',
    'by',
    'for',
    'from',
    'in',
    'into',
    'near',
    'of',
    'on',
    'onto',
    'to',
    'with'
];

function formatText(input) {
    var lines = input
        .trim()
        .replace(/^["'](.*)/gm, '$1')
        .replace(/(.*)["']$/gm, '$1')
        .split(/\r?\n/g);
    console.log(lines);
    lines = lines
        .map(formatLine)
        .sort();
    var output = lines.join(', ');
    return output;
}

function formatLine(input) {

    // input: line-break delimited? or semicolon delimited?
    // output: comma-delimited? line-break delimited?

    // strip or convert magic Word symbols
    // see http://www.andornot.com/blog/post/Replace-MS-Word-special-characters-in-javascript-and-C.aspx

    // alphabetical order

    // title case
    // see https://capitalizemytitle.com/
    // see https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript#

    var first = true;
    var output = input
        .trim()
        .split(' ')
        .map(function (word) {
            if (smallWords.includes(word) && !first) {
                return word;
            } else {
                first = false;
                return word.charAt(0).toUpperCase() + word.substr(1)
            }
        })
        .join(' ');

    return output;
}

function checkFormat(originalText, expectedOutput, why) {
    var actualOutput = formatText(originalText);
    if (actualOutput === expectedOutput) {
        console.log("Success: " + why + "\n");
    }
    else {
        console.log(
            "Failure: " + why + "\n" +
            "         Given: " + originalText + "\n" +
            "      Expected: " + expectedOutput + "\n" +
            "        Actual: " + actualOutput
        );
    }
}

function test() {
    checkFormat("", "", "empty");
    checkFormat("   ", "", "all spaces");
    checkFormat("Foo", "Foo", "simple word");
    checkFormat("brooke", "Brooke", "capitalized single word");
    checkFormat("brooke dooley", "Brooke Dooley", "capitalized two words");
    checkFormat("a tale of two cities", "A Tale of Two Cities", "a book title");
    checkFormat("to russia with love", "To Russia with Love", "a movie title");
    checkFormat("the bridge over the river Kwai", "The Bridge Over the River Kwai", "another movie title");
    checkFormat("the rain in spain falls mainly in the plain",
        "The Rain in Spain Falls Mainly in the Plain", "a nice song title");
    checkFormat("IUD insertion", "IUD Insertion", "an all-caps word (first word)");
    checkFormat("insertion of IUD", "Insertion of IUD", "with an all-caps word (not first)");
    checkFormat("insertion of IUDs", "Insertion of IUDs", "with an all-caps word pluralized");

    checkFormat("bob\nalice\ncharlie", "Alice, Bob, Charlie", "alphabetizes lines");
    checkFormat("bob\nalice\ncharlie", "Alice, Bob, Charlie", "alphabetizes lines");
    checkFormat("bob\r\nalice\r\ncharlie", "Alice, Bob, Charlie", "alphabetizes lines (windows)");

    checkFormat("\"this is all in quotes\"", "This Is All in Quotes", "strips surrounding quotes");
    checkFormat("'this is all in quotes'", "This Is All in Quotes", "strips surrounding single quotes");
    // checkFormat("\"this is not all in\" quotes", "\"this Is Not All In\" Quotes", "leaves internal quotes (todo: capitalize first quoted word)");

    checkFormat("\"Consult-Liaison Psychiatry\n" +
        "Pain Medicine\n" +
        "Behavioral Neurology\"",
        "Behavioral Neurology, " +
        "Consult-Liaison Psychiatry, " +
        "Pain Medicine", "func test"     );

}
