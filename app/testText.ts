export const book = `
When two of your authors, Neal and Mark, were writing the book Fundamentals of
Software Architecture, we kept coming across complex examples in architecture that
we wanted to cover but that were too difficult. Each one offered no easy solutions but
rather a collection of messy trade-offs. We set those examples aside into a pile we
called “The Hard Parts.” Once that book was finished, we looked at the now gigantic
pile of hard parts and tried to figure out: why are these problems so difficult to solve in
modern architectures?
We took all the examples and worked through them like architects, applying trade-off
analysis for each situation, but also paying attention to the process we used to arrive
at the trade-offs. One of our early revelations was the increasing importance of data
in architecture decisions: who can/should access data, who can/should write to it, and
how to manage the separation of analytical and operational data. To that end, we
asked experts in those fields to join us, which allows this book to fully incorporate
decision making from both angles: architecture to data and data to architecture.
The result is this book: a collection of difficult problems in modern software architec‐
ture, the trade-offs that make the decisions hard, and ultimately an illustrated guide
to show you how to apply the same trade-off analysis to your own unique problems.
Conventions Used in This Book
The following typographical conventions are used in this book:
Italic
Indicates new terms, URLs, email addresses, filenames, and file paths.
Constant width
Used for program listings, as well as within paragraphs to refer to program ele‐
ments such as variable or function names, databases, data types, environment
variables, statements, and keywords.
xi
Constant width bold
Shows commands or other text that should be typed literally by the user.
Constant width italic
Shows text that should be replaced with user-supplied values or by values deter‐
mined by context.
This element signifies a tip or suggestion.
Using Code Examples
Supplemental material (code examples, exercises, etc.) is available for download at
http://architecturethehardparts.com.
If you have a technical question or a problem using the code examples, please send
email to bookquestions@oreilly.com.
This book is here to help you get your job done. In general, if example code is offered
with this book, you may use it in your programs and documentation. You do not
need to contact us for permission unless you’re reproducing a significant portion of
the code. For example, writing a program that uses several chunks of code from this
book does not require permission. Selling or distributing examples from O’Reilly
books does require permission. Answering a question by citing this book and quoting
example code does not require permission. Incorporating a significant amount of
example code from this book into your product’s documentation does require
permission.
We appreciate, but generally do not require, attribution. An attribution usually
includes the title, author, publisher, and ISBN. For example: “Software Architecture:
The Hard Parts by Neal Ford, Mark Richards, Pramod Sadalage, and Zhamak Deh‐
ghani (O’Reilly). Copyright 2022 Neal Ford, Mark Richards, Pramod Sadalage, and
Zhamak Dehghani, 978-1-492-08689-5.”
If you feel your use of code examples falls outside fair use or the permission given
above, feel free to contact us at permissions@oreilly.com.
xii | Preface
O’Reilly Online Learning
For more than 40 years, O’Reilly Media has provided technol‐
ogy and business training, knowledge, and insight to help
companies succeed.
Our unique network of experts and innovators share their knowledge and expertise
through books, articles, and our online learning platform. O’Reilly’s online learning
platform gives you on-demand access to live training courses, in-depth learning
paths, interactive coding environments, and a vast collection of text and video from
O’Reilly and 200+ other publishers. For more information, visit http://oreilly.com.
How to Contact Us
Please address comments and questions concerning this book to the publisher:
O’Reilly Media, Inc.
1005 Gravenstein Highway North
Sebastopol, CA 95472
800-998-9938 (in the United States or Canada)
707-829-0515 (international or local)
707-829-0104 (fax)
We have a web page for this book, where we list errata, examples, and any additional
information. You can access this page at https://oreil.ly/sa-the-hard-parts.
Email bookquestions@oreilly.com to comment or ask technical questions about this
book.
For news and information about our books and courses, visit http://oreilly.com.
Find us on Facebook: http://facebook.com/oreilly
Follow us on Twitter: http://twitter.com/oreillymedia
Watch us on YouTube: http://youtube.com/oreillymedia
Preface | xiii
Acknowledgments
Mark and Neal would like to thank all the people who attended our (almost exclu‐
sively online) classes, workshops, conference sessions, and user group meetings, as
well as all the other people who listened to versions of this material and provided
invaluable feedback. Iterating on new material is especially tough when we can’t do it
live, so we appreciate those who commented on the many iterations. We thank the
publishing team at O’Reilly, who made this as painless an experience as writing a
book can be. We also thank a few random oases of sanity-preserving and idea-
sparking groups that have names like Pasty Geeks and the Hacker B&B.
Thanks to those who did the technical review of our book—Vanya Seth, Venkat Sub‐
ramanian, Joost van Weenen, Grady Booch, Ruben Diaz, David Kloet, Matt Stein,
Danilo Sato, James Lewis, and Sam Newman. Your valuable insights and feedback
helped validate our technical content and make this a better book.
We especially want to acknowledge the many workers and families impacted by the
unexpected global pandemic. As knowledge workers, we faced inconveniences that
pale in comparison to the massive disruption and devastation wrought on so many of
our friends and colleagues across all walks of life. Our sympathies and appreciation
especially go out to health care workers, many of whom never expected to be on the
front line of a terrible global tragedy yet handled it nobly. Our collective thanks can
never be adequately expressed.
Acknowledgments from Mark Richards
In addition to the preceding acknowledgments, I once again thank my lovely wife,
Rebecca, for putting up with me through yet another book project. Your unending
support and advice helped make this book happen, even when it meant taking time
away from working on your own novel. You mean the world to me, Rebecca. I also
thank my good friend and coauthor Neal Ford. Collaborating with you on the materi‐
als for this book (as well as our last one) was truly a valuable and rewarding experi‐
ence. You are, and always will be, my friend.
Acknowledgments from Neal Ford
I would like to thank my extended family, Thoughtworks as a collective, and Rebecca
Parsons and Martin Fowler as individual parts of it. Thoughtworks is an extraordi‐
nary group of people who manage to produce value for customers while keeping a
keen eye toward why things work so that we can improve them. Thoughtworks sup‐
ported this book in many ways and continues to grow Thoughtworkers who chal‐
lenge and inspire me every day. I also thank our neighborhood cocktail club for a
regular escape from routine, including the weekly outside, socially distanced versions
that helped us all survive the odd time we just lived through. I thank my long-time
xiv | Preface
friend Norman Zapien, who never ceases to provide enjoyable conversation. Lastly, I
thank my wife, Candy, who continues to support this lifestyle that has me staring at
things like book writing rather than our cats too much.
Acknowledgments from Pramod Sadalage
I thank my wife, Rupali, for all the support and understanding, and my lovely girls,
Arula and Arhana, for the encouragement; daddy loves you both. All the work I do
would not be possible without the clients I work with and various conferences that
have helped me iterate on the concepts and content. I thank AvidXchange, the latest
client I am working with, for its support and providing great space to iterate on new
concepts. I also thank Thoughtworks for its continued support in my life, and Neal
Ford, Rebecca Parsons, and Martin Fowler for being amazing mentors; you all make
me a better person. Lastly, thank you to my parents, especially my mother, Shobha,
whom I miss every day. I miss you, MOM.
Acknowledgments from Zhamak Dehghani
I thank Mark and Neal for their open invitation to contribute to this amazing body of
work. My contribution to this book would not have been possible without the contin‐
uous support of my husband, Adrian, and patience of my daughter, Arianna. I love
you both.
Preface | xv
CHAPTER 1
What Happens When There
Are No “Best Practices”?
Why does a technologist like a software architect present at a conference or write a
book? Because they have discovered what is colloquially known as a “best practice,” a
term so overused that those who speak it increasingly experience backlash. Regardless
of the term, technologists write books when they have figured out a novel solution to
a general problem and want to broadcast it to a wider audience.
But what happens for that vast set of problems that have no good solutions? Entire
classes of problems exist in software architecture that have no general good solutions,
but rather present one messy set of trade-offs cast against an (almost) equally messy
set.
Software developers build outstanding skills in searching online for solutions to a
current problem. For example, if they need to figure out how to configure a particular
tool in their environment, expert use of Google finds the answer.
But that’s not true for architects.
For architects, many problems present unique challenges because they conflate the
exact environment and circumstances of your organization—what are the chances
that someone has encountered exactly this scenario and blogged it or posted it on
Stack Overflow?
Architects may have wondered why so few books exist about architecture compared
to technical topics like frameworks, APIs, and so on. Architects rarely experience
common problems but constantly struggle with decision making in novel situations.
For architects, every problem is a snowflake. In many cases, the problem is novel not
just within a particular organization but rather throughout the world. No books or
conference sessions exist for those problems!
1
Architects shouldn’t constantly seek out silver-bullet solutions to their problems; they
are as rare now as in 1986, when Fred Brooks coined the term:
There is no single development, in either technology or management technique, which
by itself promises even one order of magnitude [tenfold] improvement within a decade
in productivity, in reliability, in simplicity.
—Fred Brooks from “No Silver Bullet”
Because virtually every problem presents novel challenges, the real job of an architect
lies in their ability to objectively determine and assess the set of trade-offs on either
side of a consequential decision to resolve it as well as possible. The authors don’t talk
about “best solutions” (in this book or in the real world) because “best” implies that
an architect has managed to maximize all the possible competing factors within the
design. Instead, our tongue-in-cheek advice is as follows:
Don’t try to find the best design in software architecture; instead,
strive for the least worst combination of trade-offs.
Often, the best design an architect can create is the least worst collection of trade-offs
—no single architecture characteristics excels as it would alone, but the balance of all
the competing architecture characteristics promote project success.
Which begs the question: “How can an architect find the least worst combination of
trade-offs (and document them effectively)?” This book is primarily about decision
making, enabling architects to make better decisions when confronted with novel
situations.
Why “The Hard Parts”?
Why did we call this book Software Architecture: The Hard Parts? Actually, the “hard”
in the title performs double duty. First, hard connotes difficult, and architects con‐
stantly face difficult problems that literally (and figuratively) no one has faced before,
involving numerous technology decisions with long-term implications layered on top
of the interpersonal and political environment where the decision must take place.
Second, hard connotes solidity—just as in the separation of hardware and software,
the hard one should change much less because it provides the foundation for the soft
stuff. Similarly, architects discuss the distinction between architecture and design,
where the former is structural and the latter is more easily changed. Thus, in this
book, we talk about the foundational parts of architecture.
2 | Chapter 1: What Happens When There Are No “Best Practices”?
The definition of software architecture itself has provided many hours of non-
productive conversation among its practitioners. One favorite tongue-in-cheek defi‐
nition is that “software architecture is the stuff that’s hard to change later.” That stuff is
what our book is about.
Giving Timeless Advice About Software Architecture
The software development ecosystem constantly and chaotically shifts and grows.
Topics that were all the rage a few years ago have either been subsumed by the ecosys‐
tem and disappeared or replaced by something different/better. For example, 10 years
ago, the predominant architecture style for large enterprises was orchestration-
driven, service-oriented architecture. Now, virtually no one builds in that architecture
style anymore (for reasons we’ll uncover along the way); the current favored style for
many distributed systems is microservices. How and why did that transition happen?
When architects look at a particular style (especially a historical one), they must con‐
sider the constraints in place that lead to that architecture becoming dominant. At the
time, many companies were merging to become enterprises, with all the attendant
integration woes that come with that transition. Additionally, open source wasn’t a
viable option (often for political rather than technical reasons) for large companies.
Thus, architects emphasized shared resources and centralized orchestration as a
solution.
However, in the intervening years, open source and Linux became viable alternatives,
making operating systems commercially free. However, the real tipping point occur‐
red when Linux became operationally free with the advent of tools like Puppet and
Chef, which allowed development teams to programmatically spin up their environ‐
ments as part of an automated build. Once that capability arrived, it fostered an archi‐
tectural revolution with microservices and the quickly emerging infrastructure of
containers and orchestration tools like Kubernetes.
This illustrates that the software development ecosystem expands and evolves in
completely unexpected ways. One new capability leads to another one, which unex‐
pectedly creates new capabilities. Over the course of time, the ecosystem completely
replaces itself, one piece at a time.
This presents an age-old problem for authors of books about technology generally
and software architecture specifically—how can we write something that isn’t old
immediately?
We don’t focus on technology or other implementation details in this book. Rather,
we focus on how architects make decisions, and how to objectively weigh trade-offs
when presented with novel situations. We use contemporaneous scenarios and exam‐
ples to provide details and context, but the underlying principles focus on trade-off
analysis and decision making when faced with new problems.
Giving Timeless Advice About Software Architecture | 3
The Importance of Data in Architecture
Data is a precious thing and will last longer than the systems themselves.
—Tim Berners-Lee
For many in architecture, data is everything. Every enterprise building any system
must deal with data, as it tends to live much longer than systems or architecture,
requiring diligent thought and design. However, many of the instincts of data archi‐
tects to build tightly coupled systems create conflicts within modern distributed
architectures. For example, architects and DBAs must ensure that business data sur‐
vives the breaking apart of monolith systems and that the business can still derive
value from its data regardless of architecture undulations.
It has been said that data is the most important asset in a company. Businesses want to
extract value from the data that they have and are finding new ways to deploy data in
decision making. Every part of the enterprise is now data driven, from servicing exist‐
ing customers, to acquiring new customers, increasing customer retention, improv‐
ing products, predicting sales, and other trends. This reliance on data means that all
software architecture is in the service of data, ensuring the right data is available and
usable by all parts of the enterprise.
The authors built many distributed systems a few decades ago when they first became
popular, yet decision making in modern microservices seems more difficult, and we
wanted to figure out why. We eventually realized that, back in the early days of dis‐
tributed architecture, we mostly still persisted data in a single relational database.
However, in microservices and the philosophical adherence to a bounded context
from Domain-Driven Design, as a way of limiting the scope of implementation detail
coupling, data has moved to an architectural concern, along with transactionality.
Many of the hard parts of modern architecture derive from tensions between data
and architecture concerns, which we untangle in both Part I and Part II.
One important distinction that we cover in a variety of chapters is the separation
between operational versus analytical data:
Operational data
Data used for the operation of the business, including sales, transactional data,
inventory, and so on. This data is what the company runs on—if something inter‐
rupts this data, the organization cannot function for very long. This type of data
is defined as Online Transactional Processing (OLTP), which typically involves
inserting, updating, and deleting data in a database.
4 | Chapter 1: What Happens When There Are No “Best Practices”?
Analytical data
Data used by data scientists and other business analysts for predictions, trending,
and other business intelligence. This data is typically not transactional and often
not relational—it may be in a graph database or snapshots in a different format
than its original transactional form. This data isn’t critical for the day-to-day
operation but rather for the long-term strategic direction and decisions.
We cover the impact of both operational and analytical data throughout the book.
Architectural Decision Records
One of the most effective ways of documenting architecture decisions is through
Architectural Decision Records (ADRs). ADRs were first evangelized by Michael
Nygard in a blog post and later marked as “adopt” in the Thoughtworks Technology
Radar. An ADR consists of a short text file (usually one to two pages long) describing
a specific architecture decision. While ADRs can be written using plain text, they are
usually written in some sort of text document format like AsciiDoc or Markdown.
Alternatively, an ADR can also be written using a wiki page template. We devoted an
entire chapter to ADRs in our previous book, Fundamentals of Software Architecture
(O’Reilly).
We will be leveraging ADRs as a way of documenting various architecture decisions
made throughout the book. For each architecture decision, we will be using the fol‐
lowing ADR format with the assumption that each ADR is approved:
ADR: A short noun phrase containing the architecture decision
Context
In this section of the ADR we will add a short one- or two-sentence description of the
problem, and list the alternative solutions.
Decision
In this section we will state the architecture decision and provide a detailed justifica‐
tion of the decision.
Consequences
In this section of the ADR we will describe any consequences after the decision is
applied, and also discuss the trade-offs that were considered.
A list of all the Architectural Decision Records created in this book can be found in
Appendix B.
Documenting a decision is important for an architect, but governing the proper use
of the decision is a separate topic. Fortunately, modern engineering practices allow
automating many common governance concerns by using architecture fitness
functions.
Architectural Decision Records | 5
Architecture Fitness Functions
Once an architect has identified the relationship between components and codified
that into a design, how can they make sure that the implementers will adhere to that
design? More broadly, how can architects ensure that the design principles they
define become reality if they aren’t the ones to implement them?
These questions fall under the heading of architecture governance, which applies to
any organized oversight of one or more aspects of software development. As this
book primarily covers architecture structure, we cover how to automate design and
quality principles via fitness functions in many places.
Software development has slowly evolved over time to adapt unique engineering
practices. In the early days of software development, a manufacturing metaphor was
commonly applied to software practices, both in the large (like the Waterfall develop‐
ment process) and small (integration practices on projects). In the early 1990s, a
rethinking of software development engineering practices, lead by Kent Beck and the
other engineers on the C3 project, called eXtreme Programming (XP), illustrated the
importance of incremental feedback and automation as key enablers of software
development productivity. In the early 2000s, the same lessons were applied to the
intersection of software development and operations, spawning the new role of
DevOps and automating many formerly manual operational chores. Just as before,
automation allows teams to go faster because they don’t have to worry about things
breaking without good feedback. Thus, automation and feedback have become central
tenets for effective software development.
Consider the environments and situations that lead to breakthroughs in automation.
In the era before continuous integration, most software projects included a lengthy
integration phase. Each developer was expected to work in some level of isolation
from others, then integrate all the code at the end into an integration phase. Vestiges
of this practice still linger in version control tools that force branching and prevent
continuous integration. Not surprisingly, a strong correlation existed between project
size and the pain of the integration phase. By pioneering continuous integration, the
XP team illustrated the value of rapid, continuous feedback.
The DevOps revolution followed a similar course. As Linux and other open source
software became “good enough” for enterprises, combined with the advent of tools
that allowed programmatic definition of (eventually) virtual machines, operations
personnel realized they could automate machine definitions and many other repeti‐
tive tasks.
In both cases, advances in technology and insights led to automating a recurring job
that was handled by an expensive role—which describes the current state of architec‐
ture governance in most organizations. For example, if an architect chooses a particu‐
lar architecture style or communication medium, how can they make sure that a
6 | Chapter 1: What Happens When There Are No “Best Practices”?
developer implements it correctly? When done manually, architects perform code
reviews or perhaps hold architecture review boards to assess the state of governance.
However, just as in manually configuring computers in operations, important details
can easily fall through superficial reviews.
Using Fitness Functions
In the 2017 book Building Evolutionary Architectures (O’Reilly), the authors (Neal
Ford, Rebecca Parsons, and Patrick Kua) defined the concept of an architectural fit‐
ness function: any mechanism that performs an objective integrity assessment of some
architecture characteristic or combination of architecture characteristics. Here is a
point-by-point breakdown of that definition:
Any mechanism
Architects can use a wide variety of tools to implement fitness functions; we will
show numerous examples throughout the book. For example, dedicated testing
libraries exist to test architecture structure, architects can use monitors to test
operational architecture characteristics such as performance or scalability, and
chaos engineering frameworks test reliability and resiliency.
Objective integrity assessment
One key enabler for automated governance lies with objective definitions for
architecture characteristics. For example, an architect can’t specify that they want
a “high performance” website; they must provide an object value that can be
measured by a test, monitor, or other fitness function.
Architects must watch out for composite architecture characteristics—ones that
aren’t objectively measurable but are really composites of other measurable
things. For example, “agility” isn’t measurable, but if an architect starts pulling
the broad term agility apart, the goal is for teams to be able to respond quickly
and confidently to change, either in ecosystem or domain. Thus, an architect can
find measurable characteristics that contribute to agility: deployability, testability,
cycle time, and so on. Often, the lack of ability to measure an architecture char‐
acteristic indicates too vague a definition. If architects strive toward measurable
properties, it allows them to automate fitness function application.
Some architecture characteristic or combination of architecture characteristics
This characteristic describes the two scopes for fitness functions:
Atomic
These fitness functions handle a single architecture characteristic in isola‐
tion. For example, a fitness function that checks for component cycles within
a codebase is atomic in scope.
Architecture Fitness Functions | 7
Holistic
Holistic fitness functions validate a combination of architecture characteris‐
tics. A complicating feature of architecture characteristics is the synergy they
sometimes exhibit with other architecture characteristics. For example, if an
architect wants to improve security, a good chance exists that it will affect
performance. Similarly, scalability and elasticity are sometimes at odds—
supporting a large number of concurrent users can make handling sudden
bursts more difficult. Holistic fitness functions exercise a combination of
interlocking architecture characteristics to ensure that the combined effect
won’t negatively affect the architecture.
An architect implements fitness functions to build protections around unexpected
change in architecture characteristics. In the Agile software development world,
developers implement unit, functional, and user acceptance tests to validate different
dimensions of the domain design. However, until now, no similar mechanism existed
to validate the architecture characteristics part of the design. In fact, the separation
between fitness functions and unit tests provides a good scoping guideline for archi‐
tects. Fitness functions validate architecture characteristics, not domain criteria; unit
tests are the opposite. Thus, an architect can decide whether a fitness function or unit
test is needed by asking the question: “Is any domain knowledge required to execute
this test?” If the answer is “yes,” then a unit/function/user acceptance test is appropri‐
ate; if “no,” then a fitness function is needed.
For example, when architects talk about elasticity, it’s the ability of the application to
withstand a sudden burst of users. Notice that the architect doesn’t need to know any
details about the domain—this could be an ecommerce site, an online game, or some‐
thing else. Thus, elasticity is an architectural concern and within the scope of a fitness
function. If on the other hand the architect wanted to validate the proper parts of a
mailing address, that is covered via a traditional test. Of course, this separation isn’t
purely binary—some fitness functions will touch on the domain and vice versa, but
the differing goals provide a good way to mentally separate them.
Here are a couple of examples to make the concept less abstract.
One common architect goal is to maintain good internal structural integrity in the
codebase. However, malevolent forces work against the architect’s good intentions on
many platforms. For example, when coding in any popular Java or .NET development
environment, as soon as a developer references a class not already imported, the IDE
helpfully presents a dialog asking the developer if they would like to auto-import the
reference. This occurs so often that most programmers develop the habit of swatting
the auto-import dialog away like a reflex action.
However, arbitrarily importing classes or components among one another spells dis‐
aster for modularity. For example, Figure 1-1 illustrates a particularly damaging anti-
pattern that architects aspire to avoid.
`
