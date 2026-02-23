// ─── Seeded RNG (Park-Miller LCG) ────────────────────────────────────────────
export function seededRandom(seed) {
  let s = Math.abs(seed) || 1;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

// ─── Name Pools ───────────────────────────────────────────────────────────────
const FIRST = ["Alex","Jordan","Morgan","Taylor","Casey","Riley","Avery","Quinn","Drew","Blake","Skyler","Cameron","Reese","Logan","Parker","Harper","Peyton","Dakota","Sage","River","Marcus","Diana","Theo","Elena","Rafael","Nadia","Omar","Priya","Kai","Yuki","Mia","Ethan","Sofia","Liam","Olivia","Noah","Emma","Ava","Charlotte","Amelia","Luna","Chloe","Nora","Miles","Felix","Hugo","Oscar","Leo","Ezra","Ivan","Soren","Luca","Matteo","Zara","Lena","Aria","Cora","Iris","Jade","Knox","Wren","Finn","Arlo","Beau","Cruz","Dean","Eli","Fox","Gray","Hale","Ivan","Jace","Kurt","Lars","Max","Neil","Owen","Paul","Rex","Sam","Tate","Uri","Van","Wade","Xan","Yael","Zoe","Ada","Bea","Cal","Dot","Eve","Fay","Gia","Hal","Ida","Joy","Kim","Lou","Mae","Nan","Ora","Peg","Rae","Sue","Uma","Val","Win"];
const LAST = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Martinez","Wilson","Anderson","Taylor","Thomas","Moore","Jackson","White","Harris","Martin","Thompson","Robinson","Clark","Lewis","Lee","Walker","Hall","Allen","Young","King","Wright","Scott","Green","Baker","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Cox","Howard","Ward","Torres","Peterson","Gray","Ramirez","James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson","Hughes","Flores","Washington","Butler","Simmons","Foster","Gonzales","Bryant","Alexander","Russell","Griffin","Diaz","Hayes","Myers","Ford","Hamilton","Graham","Sullivan","Wallace","Woods","Cole","West","Jordan","Owens","Reynolds","Fisher","Ellis","Harrison","Gibson","McDonald","Cruz","Marshall","Ortiz","Gomez","Murray","Freeman","Wells","Webb","Simpson","Stevens","Tucker","Porter","Hunter","Hicks","Crawford","Henry","Boyd","Mason","Morales","Kennedy","Warren","Dixon","Ramos","Reyes","Burns","Gordon","Shaw","Holmes","Rice","Robertson","Hunt","Black","Daniels","Palmer","Mills","Nichols","Grant","Knight","Ferguson","Rose","Stone","Hawkins","Dunn","Perkins","Hudson","Spencer","Gardner","Stephens","Payne","Pierce","Berry","Matthews","Arnold","Wagner","Willis","Ray","Watkins","Olson","Carroll","Duncan","Snyder","Hart","Cunningham","Bradley","Andrews","Ruiz","Armstrong","Carpenter","Weaver","Greene","Lawrence","Elliott","Chavez","Sims","Austin","Peters","Kelley","Franklin","Lawson","Fields","Gutierrez","Ryan","Schmidt","Carr","Vasquez","Castillo","Wheeler","Chapman","Oliver","Montgomery","Richards"];
const ADJECTIVES = ["Clever","Fuzzy","Ancient","Cosmic","Mystic","Turbo","Quantum","Based","Epic","Silent","Random","Tiny","Mega","Ultra","Hyper","Sneaky","Brave","Dark","Spicy","Chill","Neon","Rusty","Golden","Fluffy","Cursed","Blessed","Salty","Dank","Spooky","Lucky","Grumpy","Jolly","Witty","Sleepy","Hungry","Fancy","Gloomy","Shiny","Weird","Cool","Wild","Lazy","Angry","Happy","Sad","Rad","Nifty","Zesty","Crispy","Wavy"];
const NOUNS = ["Panda","Wizard","Ninja","Viking","Robot","Ghost","Dragon","Potato","Banana","Penguin","Raccoon","Otter","Ferret","Goblin","Troll","Witch","Knight","Pirate","Monk","Sage","Fox","Wolf","Bear","Eagle","Hawk","Raven","Crow","Owl","Deer","Moose","Crab","Shark","Whale","Narwhal","Lemur","Capybara","Axolotl","Sloth","Koala","Platypus","Hamster","Gerbil","Hedgehog","Ferret","Badger","Weasel","Mink","Otter","Beaver","Marmot"];

// ─── Avatar styles (DiceBear) ─────────────────────────────────────────────────
const AVATAR_STYLES = ['adventurer','avataaars','big-ears','bottts','croodles','fun-emoji','icons','identicon','lorelei','micah','miniavs','notionists','open-peeps','personas','pixel-art','rings','shapes','thumbs'];

// ─── Subreddits (realistic) ───────────────────────────────────────────────────
export const SUBREDDITS = [
  { id:'r_askreddit', name:'AskReddit', display:'r/AskReddit', color:'#FF4500', members:42800000, description:'Ask and answer thought-provoking questions. The place to find out what strangers on the internet think.', banner:'#FF4500', icon:'❓', rules:['Be civil','No spam','English only'] },
  { id:'r_worldnews', name:'worldnews', display:'r/worldnews', color:'#0079D3', members:31200000, description:'A place for major news from around the world, excluding US-internal news.', banner:'#0079D3', icon:'🌍', rules:['Mainstream news only','No editorializing in titles'] },
  { id:'r_todayilearned', name:'todayilearned', display:'r/todayilearned', color:'#7193FF', members:38900000, description:'You learn something new every day; what did you learn today? TIL is a community for interesting facts discovered through research.', banner:'#7193FF', icon:'🧠', rules:['Must be verifiable','No politics','Title must begin with TIL'] },
  { id:'r_science', name:'science', display:'r/science', color:'#46D160', members:32100000, description:'This community is a place to share and discuss new scientific research. Read about the latest advances in astronomy, biology, medicine, physics, social science.', banner:'#46D160', icon:'🔬', rules:['Must be peer-reviewed','No sensationalism'] },
  { id:'r_technology', name:'technology', display:'r/technology', color:'#0DD3BB', members:14600000, description:'Subreddit dedicated to the news and discussions about the creation and use of technology and its surrounding issues.', banner:'#0DD3BB', icon:'💻', rules:['Relevant tech news only','No self promotion'] },
  { id:'r_programming', name:'programming', display:'r/programming', color:'#FF585B', members:6200000, description:'Computer Programming — discussion of computer programming, coding, and software engineering.', banner:'#FF585B', icon:'👨‍💻', rules:['On-topic only','No job postings','Constructive criticism'] },
  { id:'r_gaming', name:'gaming', display:'r/gaming', color:'#24A0ED', members:38700000, description:'A subreddit for (almost) anything related to games — video games, board games, card games, etc.', banner:'#24A0ED', icon:'🎮', rules:['No piracy','No spam','Mark spoilers'] },
  { id:'r_movies', name:'movies', display:'r/movies', color:'#FC471E', members:31400000, description:'News & Discussion about Major Motion Pictures', banner:'#FC471E', icon:'🎬', rules:['No piracy links','Spoiler tags required','No low effort posts'] },
  { id:'r_music', name:'Music', display:'r/Music', color:'#FF4500', members:32900000, description:'The musical community of reddit. Music news, videos, reviews and discussion.', banner:'#FF4500', icon:'🎵', rules:['Music only','No spam'] },
  { id:'r_books', name:'books', display:'r/books', color:'#FF6534', members:22800000, description:'This is a moderated subreddit. It is our intent and purpose to foster and support self-improvement, and the betterment of others.', banner:'#FF6534', icon:'📚', rules:['Books only','No piracy'] },
  { id:'r_cooking', name:'Cooking', display:'r/Cooking', color:'#FF585B', members:3100000, description:'Cooking is a subreddit for the cooks of reddit and those who want to learn how to cook.', banner:'#FF585B', icon:'🍳', rules:['No blogspam','Recipes welcome'] },
  { id:'r_fitness', name:'Fitness', display:'r/Fitness', color:'#FF6534', members:9800000, description:'Discussion of physical fitness goals and how they can be achieved. Advice, tips, and discussion welcome.', banner:'#FF6534', icon:'💪', rules:['No medical advice','Be respectful'] },
  { id:'r_space', name:'space', display:'r/space', color:'#0A1628', members:22400000, description:'Share & discuss informative content on: * Astrophysics * Cosmology * Space Exploration * Planetary Science * Astrobiology', banner:'#0A1628', icon:'🚀', rules:['Credible sources only'] },
  { id:'r_history', name:'history', display:'r/history', color:'#A08060', members:16200000, description:'This community is for the discussion and appreciation of history — everything from ancient Egypt to the fall of the Berlin Wall.', banner:'#A08060', icon:'🏛️', rules:['No current events','Cite sources'] },
  { id:'r_philosophy', name:'philosophy', display:'r/philosophy', color:'#7193FF', members:17900000, description:'The portal for public philosophy, where ideas and arguments are treated on their merits.', banner:'#7193FF', icon:'🤔', rules:['Arguments must be reasoned','Respect all views'] },
  { id:'r_personalfinance', name:'personalfinance', display:'r/personalfinance', color:'#46D160', members:17300000, description:'Learn about budgeting, saving, getting out of debt, credit, investing, and retirement planning.', banner:'#46D160', icon:'💰', rules:['No solicitation','Follow up encouraged'] },
  { id:'r_lifeprotips', name:'lifeprotips', display:'r/LifeProTips', color:'#FF4500', members:22100000, description:'Tips that improve your life in meaningful ways.', banner:'#FF4500', icon:'💡', rules:['Must improve life','Must be specific'] },
  { id:'r_photoshop', name:'photoshop', display:'r/photoshop', color:'#31A9FF', members:3400000, description:'Photoshop battles, tutorials, and creative requests.', banner:'#31A9FF', icon:'🖼️', rules:['OC only in battles','Credit sources'] },
  { id:'r_dataisbeautiful', name:'dataisbeautiful', display:'r/dataisbeautiful', color:'#FC471E', members:20700000, description:'DataIsBeautiful is for visualizations that effectively convey information.', banner:'#FC471E', icon:'📊', rules:['OC must include data source','No political visualizations'] },
  { id:'r_explainlikeimfive', name:'explainlikeimfive', display:'r/explainlikeimfive', color:'#FF6534', members:22600000, description:'Explain Like I\'m Five is the best forum and archive on the internet for layperson-friendly explanations.', banner:'#FF6534', icon:'👶', rules:['Keep it simple','No condescending'] },
  { id:'r_nfl', name:'nfl', display:'r/nfl', color:'#013369', members:2200000, description:'NFL: National Football League Discussion', banner:'#013369', icon:'🏈', rules:['Game threads encouraged','No spoilers in titles'] },
  { id:'r_soccer', name:'soccer', display:'r/soccer', color:'#00A550', members:3700000, description:'The football subreddit. News, results and discussion about the beautiful game.', banner:'#00A550', icon:'⚽', rules:['Match threads welcome','No hate speech'] },
  { id:'r_tifu', name:'tifu', display:'r/tifu', color:'#FF4500', members:17500000, description:'Today I Fucked Up is a community for the funny, sad, embarrassing, weird, and wonderful range of ways we each fuck up our lives.', banner:'#FF4500', icon:'🤦', rules:['Must be a fuck-up','No violence'] },
  { id:'r_unpopularopinion', name:'unpopularopinion', display:'r/unpopularopinion', color:'#7193FF', members:4200000, description:'Got a burning unpopular opinion you want to share? Spark some discussions!', banner:'#7193FF', icon:'🔥', rules:['Must be unpopular','Must be an opinion'] },
  { id:'r_changemyview', name:'changemyview', display:'r/changemyview', color:'#0079D3', members:3400000, description:'A subreddit where you can challenge your own views and have a conversation about the evidence behind them.', banner:'#0079D3', icon:'🔄', rules:['Must be open to changing','Respond to challengers'] },
];

// ─── Real-world Post Templates ────────────────────────────────────────────────
const RAW_POSTS = [
  // AskReddit
  { sub:'r_askreddit', title:'What\'s a "harmless" habit that is actually pretty toxic?', type:'text', body:'I\'ll start: Saying "I was just joking" after saying something genuinely hurtful. Using humor as a shield so you can say anything without accountability.' },
  { sub:'r_askreddit', title:'What do you wish you had learned in school but didn\'t?', type:'text', body:'For me it\'s taxes. I graduated high school not knowing how to file a tax return but I knew how to calculate the area of a rhombus.' },
  { sub:'r_askreddit', title:'What\'s something that everyone does but nobody talks about?', type:'text', body:'Narrating your own life in your head. "And then he opened the fridge, wondering what he would have for dinner..."' },
  { sub:'r_askreddit', title:'Doctors of Reddit, what\'s the most surprising thing a patient has said to you?', type:'text', body:'Not a doctor, but a nurse. Had a patient absolutely convinced that antibiotics were just "big pharma vitamins" and refused to take them for their severe infection. Spent 2 hours explaining bacterial biology.' },
  { sub:'r_askreddit', title:'What\'s the most useful website that most people don\'t know about?', type:'text', body:'I\'ll start with a few:\n\n- [archive.org](https://archive.org) - The Wayback Machine, find old versions of websites\n- [12ft.io](https://12ft.io) - Bypass paywalls\n- [sleepyti.me](https://sleepyti.me) - Sleep cycle calculator' },
  { sub:'r_askreddit', title:'What\'s something that is considered normal in your country but would be weird everywhere else?', type:'text', body:'In Finland, we take saunas seriously. Business meetings in saunas are not uncommon. It\'s considered rude to decline a sauna invitation from your host.' },
  { sub:'r_askreddit', title:'What book genuinely changed how you see the world?', type:'text', body:'Looking for a book that actually shifted your perspective, not just one you enjoyed. Mine was Thinking, Fast and Slow by Kahneman. Realized how irrational most of my "rational" decisions were.' },
  { sub:'r_askreddit', title:'People who grew up poor and are now doing well financially, what\'s a habit you can\'t shake?', type:'text', body:'Saving condiment packets. I have a drawer full of soy sauce, ketchup, and hot sauce packets. My fridge is full of actual condiments now but I cannot stop taking the packets.' },
  { sub:'r_askreddit', title:'What\'s a "red flag" that people often mistake for a "green flag"?', type:'text', body:'Being jealous. People confuse extreme jealousy with someone "caring" about them. It\'s not love, it\'s control.' },
  { sub:'r_askreddit', title:'What skill do you have that most people don\'t even know is a skill?', type:'text', body:'Reading a room. Knowing when to speak, when to shut up, when to crack a joke, when to let silence do the work. Most people genuinely cannot do this.' },

  // worldnews
  { sub:'r_worldnews', title:'Scientists discover that deep ocean currents are slowing faster than expected, raising sea level concerns for coastal cities', type:'text', body:'A new study published in Nature Climate Change shows Atlantic Meridional Overturning Circulation (AMOC) is weakening at a rate 15% faster than models predicted. This circulation system acts like Earth\'s climate thermostat.' },
  { sub:'r_worldnews', title:'European Parliament passes landmark AI regulation bill, first of its kind globally', type:'text', body:'The EU AI Act introduces risk-based classifications for AI systems, banning certain uses outright including real-time biometric surveillance in public spaces and social credit scoring.' },
  { sub:'r_worldnews', title:'Japan\'s population falls below 125 million for first time in decades', type:'text', body:'Japan recorded its 14th consecutive year of population decline. The government has announced new incentives for families including free childcare and monthly stipends of ¥100,000 per child.' },
  { sub:'r_worldnews', title:'WHO declares malaria vaccine program a success after 3 years in sub-Saharan Africa', type:'text', body:'The R21/Matrix-M vaccine program has shown 75% efficacy in children under 5. Ghana, Kenya, and Malawi have vaccinated over 1.7 million children, reducing child malaria deaths by 13%.' },
  { sub:'r_worldnews', title:'Canada announces plan to build world\'s longest electric rail corridor from Vancouver to Halifax', type:'text', body:'The $90 billion High Frequency Rail project would connect 8 major Canadian cities with electric trains capable of 250 km/h, estimated completion 2035.' },

  // TIL
  { sub:'r_todayilearned', title:'TIL that honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.', type:'text', body:'The low moisture content and acidic pH of honey make it inhospitable to bacteria. When sealed, it can last indefinitely. The jars found in Tutankhamun\'s tomb were still good.' },
  { sub:'r_todayilearned', title:'TIL that otters hold hands while sleeping so they don\'t drift apart from each other. This is called a "raft."', type:'text', body:'Sea otters sleep floating on their backs. To prevent being separated by currents, family groups will hold hands or wrap themselves in kelp. A group of floating otters is called a raft.' },
  { sub:'r_todayilearned', title:'TIL that the word "salary" comes from the Latin word "salarium" because Roman soldiers were sometimes paid in salt', type:'text', body:'Salt was incredibly valuable in ancient Rome. "Worth their salt" comes from the same origin. However, historians debate whether soldiers were literally paid in salt or if this is a myth.' },
  { sub:'r_todayilearned', title:'TIL Oxford University is older than the Aztec Empire. Teaching at Oxford began around 1096, while the Aztec Empire was founded in 1428.', type:'text', body:'The Aztec Empire (1428–1521) is often thought of as ancient history, but Oxford University had already been operating for 332 years when the Aztec Empire was founded. It\'s also older than many nation-states.' },
  { sub:'r_todayilearned', title:'TIL that a day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun.', type:'text', body:'Venus also rotates backwards compared to most planets (retrograde rotation), meaning the Sun rises in the west and sets in the east there.' },
  { sub:'r_todayilearned', title:'TIL that "Bluetooth" technology was named after a Danish king Harald Bluetooth who united warring tribes — just like Bluetooth technology unites devices', type:'text', body:'Harald Bluetooth (Harald Blåtand) was a 10th century Danish king who united the Scandinavian tribes. The Bluetooth logo is actually a runic monogram of his initials HB.' },
  { sub:'r_todayilearned', title:'TIL that the fingerprints of koalas are so similar to human fingerprints that they have on rare occasions confused forensic investigators', type:'text', body:'Koalas are one of only two non-primates to have fingerprints (the other is a type of marsupial). They evolved independently for gripping rough eucalyptus bark.' },

  // Science
  { sub:'r_science', title:'New study finds that regular cold water swimming reduces inflammation markers by up to 29% in adults over 40', type:'text', body:'Published in BMJ Open Sport and Exercise Medicine. 87 participants, cold water immersion (15°C) for 10 minutes, 3x/week for 12 weeks. Significant reduction in IL-6 and TNF-α cytokines.' },
  { sub:'r_science', title:'Physicists achieve quantum teleportation across 44km of fiber optic cable at room temperature', type:'text', body:'The research published in Physical Review Letters demonstrates quantum state transfer of qubits at 94% fidelity over commercial fiber optic infrastructure. Previous records used cryogenic systems.' },
  { sub:'r_science', title:'Researchers discover that trees communicate distress signals to each other through underground fungal networks within 6 hours', type:'text', body:'The "Wood Wide Web" — mycorrhizal networks connecting tree root systems — transmit chemical warning signals when a tree is attacked by insects or pathogens. Study shows neighboring trees begin producing defensive compounds within hours.' },
  { sub:'r_science', title:'New CRISPR technique successfully reverses hearing loss in adult mice, restoring 80% of hearing function', type:'text', body:'Researchers at Mass Eye and Ear used CRISPR-Cas9 to repair mutations in the TMC1 gene responsible for progressive deafness. The treated mice showed significant improvement in hair cell survival and auditory brainstem response.' },
  { sub:'r_science', title:'Meta-analysis of 200 studies confirms: 8 hours of sleep improves memory consolidation, emotional regulation, and cognitive performance equally', type:'text', body:'The comprehensive review found that consistent 7-9 hours of sleep is associated with 34% better memory retention, 27% improvement in emotional regulation, and significantly reduced risk of neurodegenerative diseases.' },

  // Technology
  { sub:'r_technology', title:'Google announces end-to-end encryption for all Gmail messages by default, rolling out globally', type:'text', body:'Starting with the update, all Gmail messages are encrypted in transit and at rest using the same encryption standard as Google\'s existing S/MIME support, but automatically without user configuration.' },
  { sub:'r_technology', title:'First commercial fusion power plant breaks ground in Scotland — targeting 2034 delivery', type:'text', body:'Commonwealth Fusion Systems and MIT\'s collaboration results in the SPARC project breaking ground. Uses high-temperature superconducting magnets to achieve net energy gain. If successful, would be the first commercially viable fusion reactor.' },
  { sub:'r_technology', title:'Apple M4 chip outperforms previous-gen by 40% in CPU, 50% in GPU — leaked benchmarks', type:'text', body:'Leaked Geekbench scores show the next Apple silicon generation performing substantially better than M3 while maintaining the same 3nm process. Single core: 3840. Multi-core: 14,920. GPU: 76,800.' },
  { sub:'r_technology', title:'Firefox gains 18 million users in a month after Chrome\'s third-party cookie announcement', type:'text', body:'Mozilla reports the largest single-month user growth since 2010. Privacy advocates recommend Firefox with uBlock Origin as the most private mainstream browser combination.' },
  { sub:'r_technology', title:'SpaceX Starship completes first successful orbit and ocean landing — what this means for the industry', type:'text', body:'After several failed attempts, Starship completed a full orbital flight and executed a controlled water landing in the Indian Ocean. Both Super Heavy booster and ship were recovered. This changes the economics of launch forever.' },

  // Programming
  { sub:'r_programming', title:'After 10 years of Python, I switched to Go for my backend. Here\'s my honest review.', type:'text', body:'**What I expected:** Faster code, explicit error handling, better concurrency\n\n**What I got:** All of that, plus an initial learning curve that was steeper than expected. The tooling (gofmt, go vet, go test) is exceptional. The lack of generics was painful for a long time but got better in 1.18+.\n\n**Verdict:** For I/O-bound web backends, Go is genuinely superior. For ML/data work, Python still wins.' },
  { sub:'r_programming', title:'PSA: Stop storing secrets in environment variables. Here\'s what to use instead.', type:'text', body:'Environment variables are readable by any process on the system. They appear in error logs, debug output, and child processes inherit them. Use a dedicated secrets manager (AWS Secrets Manager, HashiCorp Vault, or at minimum a .env file that never leaves the developer machine) and access secrets at runtime, not at startup.' },
  { sub:'r_programming', title:'I analyzed 10,000 GitHub repos and here\'s what the most maintained projects have in common', type:'text', body:'1. README with setup instructions under 5 minutes\n2. CI that runs on every PR\n3. Issues that get responded to within 72 hours\n4. Changelogs\n5. Consistent code style enforced by linter\n6. Tests with >70% coverage\n7. Semantic versioning\n8. Contributing guide\n\nNot one had perfect code. All had process.' },
  { sub:'r_programming', title:'The "right" way to handle errors in async JavaScript — a comprehensive guide', type:'text', body:'Three patterns:\n\n**1. try/catch with async/await (recommended)**\n```js\ntry {\n  const data = await fetchData();\n} catch (err) {\n  // handle specific errors\n}\n```\n\n**2. .catch() on promises**\n**3. Global unhandledRejection handler**\n\nNever silently swallow errors. Always log or re-throw.' },
  { sub:'r_programming', title:'Hot take: ORMs do more harm than good for complex applications', type:'text', body:'I\'ve worked with Hibernate, Sequelize, SQLAlchemy, Prisma, and ActiveRecord across 15 years. ORMs are fantastic for simple CRUD and getting started fast. But the moment you have complex queries, custom aggregations, or performance-critical paths, you spend more time fighting the ORM than you would writing SQL. Learn SQL properly first.' },

  // Gaming
  { sub:'r_gaming', title:'After 1,200 hours in Elden Ring, I finally beat the final boss. I\'m shaking.', type:'text', body:'Started as a complete souls-game beginner. Died to the first boss 47 times. Died to Malenia 214 times according to the tracker. But I never gave up. The feeling of finally seeing "YOU HAVE CONQUERED" after months of trying is indescribable. If you\'re struggling: every death is progress.' },
  { sub:'r_gaming', title:'The games industry spent 2024 laying off 10,000+ developers. Here\'s what happened and why.', type:'text', body:'The post-pandemic gaming boom led to massive over-hiring from 2020-2022. As engagement normalized, companies faced bloated payrolls. The Microsoft-Activision merger accelerated studio closures. We lost Arkane Austin, Tango Gameworks, and several indie studios. The industry needs to reckon with its hiring/firing cycle.' },
  { sub:'r_gaming', title:'What game have you gone back to after years away and it was somehow BETTER than you remembered?', type:'text', body:'Mine is Morrowind. Played it at 12, thought it was confusing and weird. Came back at 30 and it\'s the most immersive RPG I\'ve ever played. The lack of quest markers, the bizarre alien world, the actual political depth — it\'s a masterpiece I wasn\'t ready for as a kid.' },
  { sub:'r_gaming', title:'Nintendo just announced The Legend of Zelda: Echoes of Wisdom as the next mainline entry [OC Analysis]', type:'text', body:'This is the first mainline Zelda where Zelda herself is the protagonist. The Echo mechanic (copying objects and enemies) looks incredibly deep. From my analysis of the trailer: at least 20+ distinct Echo abilities, a clear combat system, and what appears to be a parallel world mechanic reminiscent of ALttP.' },

  // Movies
  { sub:'r_movies', title:'Movies that start strong but end so badly they ruin the whole experience?', type:'text', body:'I\'ll start: Game Night (2018). Incredible first two acts, genuinely clever and funny. The final twist completely undermines everything that made it interesting. Went from "potential cult classic" to "just another comedy" in 15 minutes.' },
  { sub:'r_movies', title:'Christopher Nolan\'s Oppenheimer swept the Oscars — a breakdown of why it worked', type:'text', body:'Nolan has always been a filmmaker obsessed with time and perception. Oppenheimer is his most mature work because he finally trusts the audience completely. Non-linear structure that rewards attention, a performance from Murphy that carries genuine moral weight, and a third act that\'s more terrifying than any horror film.' },
  { sub:'r_movies', title:'What movie did you go into with zero expectations and came out absolutely blown away?', type:'text', body:'Everything Everywhere All at Once. I thought it was going to be a quirky multiverse comedy. It was that, but it was also a meditation on meaning, generational trauma, and love that made me cry three times. One of the best films of the decade.' },
  { sub:'r_movies', title:'The problem with modern blockbusters isn\'t the budget, it\'s the risk aversion', type:'text', body:'Studios now greenlight sequels, reboots, and IP adaptations because they test well. But testing well means "familiar" — nobody tests well for "never seen before." The films that become classics (Alien, The Matrix, Blade Runner) were all massive gambles. We\'ve systematically removed the conditions for those films to be made.' },

  // Music
  { sub:'r_music', title:'[Discussion] Albums that are perfect front to back, no skips — your lists?', type:'text', body:'Starting the thread:\n\n- Dark Side of the Moon — Pink Floyd\n- Kind of Blue — Miles Davis\n- Nevermind — Nirvana\n- To Pimp a Butterfly — Kendrick Lamar\n- The Wall — Pink Floyd\n- OK Computer — Radiohead\n- Abbey Road — The Beatles\n\nAdd yours. Only rule: genuinely no skips for you personally.' },
  { sub:'r_music', title:'Spotify\'s new AI DJ feature is actually good and I\'m upset about it', type:'text', body:'I didn\'t want to like it. I thought it was a gimmick. But after a month of using it on commutes, it\'s discovered three artists I genuinely love that I never would have found otherwise. I\'m upset because it actually works and I wanted to be cynical about it.' },

  // Books
  { sub:'r_books', title:'What\'s a book you thought you\'d hate but ended up loving?', type:'text', body:'Assigned Moby Dick for a class at 17. Convinced myself it was torture. Actually read it properly at 35 and it\'s one of the most remarkable things ever written. Melville was describing depression, obsession, and the nature of evil 150 years before we had the vocabulary for those concepts.' },
  { sub:'r_books', title:'Monthly thread: What are you reading in February? Recommendations welcome!', type:'text', body:'Currently working through:\n\n**Fiction:** The Covenant of Water by Abraham Verghese — stunning multigenerational Indian family saga\n**Non-fiction:** The Coming Wave by Mustafa Suleyman — genuinely alarming book about AI from an insider\n**Poetry:** Selected Poems by Mary Oliver — perfect for slow mornings\n\nWhat about everyone else?' },

  // Cooking
  { sub:'r_cooking', title:'The single most impactful cooking tip I\'ve ever received: salt your pasta water like the sea', type:'text', body:'I\'d been under-salting pasta water my entire life. The water should taste distinctly salty — not ocean salty, but noticeably so. About 1 tablespoon of salt per liter of water. This is your ONLY chance to season the pasta itself. It changes everything.' },
  { sub:'r_cooking', title:'I made croissants from scratch for the first time. 72 hours of lamination. Here\'s everything I learned.', type:'text', body:'**Lamination** is the process of folding butter into dough to create the layers. After 72 hours of resting periods and folds, I had 256 layers.\n\n**What went wrong:** Butter broke through on fold 4 because it was too cold. Temperature control is everything.\n\n**Result:** Not perfect but actually tasted like real croissants. 8/10, will do again.' },
  { sub:'r_cooking', title:'Stop buying store-bought stock. Making your own takes 10 minutes of active time and tastes 10x better.', type:'text', body:'**Chicken Stock:**\n1. Save carcasses and bones in the freezer\n2. When you have enough, cover with cold water\n3. Bring to bare simmer (never boil)\n4. Add aromatics (onion, carrot, celery, peppercorns, bay)\n5. Simmer 3-4 hours\n6. Strain, cool, skim fat\n\nFreezes beautifully. The difference in soups and sauces is dramatic.' },

  // Fitness
  { sub:'r_fitness', title:'6 months of consistent training. No dramatic transformation but I feel completely different.', type:'text', body:'SW: 195 lbs, CW: 181 lbs. Before anyone asks: this is not a dramatic physical transformation. But I can run 5k without stopping. I sleep better. My anxiety is noticeably lower. I have more energy at 3pm. The mental transformation is harder to photograph but more real than the physical one.' },
  { sub:'r_fitness', title:'The "minimum effective dose" for staying fit: what actually works when you\'re time-constrained', type:'text', body:'Research and personal experience: 3x 45-minute sessions per week is the sweet spot for most people. You need:\n\n1. Resistance training (compound lifts: squat, deadlift, press, row)\n2. Zone 2 cardio (conversational pace, 20-30 min)\n3. Sleep (7-9 hours is non-negotiable)\n\nYou don\'t need 6-day splits. You need consistency.' },

  // Space
  { sub:'r_space', title:'James Webb captures the most detailed image ever of the Pillars of Creation — and it\'s breathtaking', type:'text', body:'The new JWST image shows star-forming regions within the Pillars with unprecedented clarity. We can now see hundreds of newly formed stars embedded in the dust columns. The image spans about 5 light-years and shows gas and dust that will eventually form new planetary systems.' },
  { sub:'r_space', title:'NASA confirms: water ice exists in permanently shadowed craters near the lunar south pole', type:'text', body:'The LCROSS impact mission\'s data has been definitively confirmed by three independent studies. The south pole contains approximately 600 million metric tons of water ice — enough to fill 240 Olympic swimming pools. This is critical for the Artemis lunar base plans.' },

  // History
  { sub:'r_history', title:'The Battle of Stalingrad lasted 199 days and remains the deadliest single battle in human history', type:'text', body:'From August 1942 to February 1943, approximately 2 million combatants became casualties. The German 6th Army was encircled and destroyed. The battle marked the turning point of the Eastern Front and arguably World War II itself. Urban warfare reduced life expectancy to under 24 hours in some areas.' },
  { sub:'r_history', title:'Why the Roman Empire didn\'t fall but transformed — the revisionist history that\'s gaining acceptance', type:'text', body:'The traditional "fall in 476 AD" narrative is increasingly seen as a simplification. What actually happened was a gradual political fragmentation while Roman culture, law, language, and religion continued. The Eastern Roman Empire (Byzantium) lasted another 1,000 years. "Transformation" is more accurate than "fall."' },

  // Philosophy
  { sub:'r_philosophy', title:'Determinism vs. Free Will: The debate that refuses to die and why it actually matters', type:'text', body:'If every action is the result of prior causes (physical laws, brain chemistry, experience), then in what meaningful sense do we "choose"? Compatibilists argue free will is compatible with determinism — you acted freely if you acted according to your own desires, even if those desires were causally determined. Hard determinists say this is a linguistic trick. Does the answer matter practically? I argue yes: it changes how we think about punishment, praise, and personal responsibility.' },
  { sub:'r_philosophy', title:'The Trolley Problem is actually interesting — here\'s why most dismissals miss the point', type:'text', body:'People love to say the trolley problem is useless because "you\'d never be in that situation." But the problem isolates specific moral intuitions: the difference between killing and letting die, the doctrine of double effect, and utilitarian calculus. These intuitions ARE present in real decisions: triage medicine, autonomous vehicle ethics, resource allocation in pandemics. The trolley problem is a scalpel that separates these intuitions.' },

  // Personal Finance
  { sub:'r_personalfinance', title:'28 years old, just paid off $47,000 in student loans. Here\'s my exact method.', type:'text', body:'It took 4 years of aggressive payoff. Key decisions:\n\n1. **Moved to LCOL city** after graduating — cut rent from $1,800/mo to $950/mo\n2. **No car payment** — bought a 2015 Civic for $8,500 cash\n3. **Avalanche method** — targeted 7.8% loan first, saved $4,200 in interest\n4. **Side income** — $800-1,200/month freelancing added up to $40k over 4 years\n5. **Lifestyle deflation** — kept living like a student even after getting a real salary\n\nAMA about any of this.' },
  { sub:'r_personalfinance', title:'Index funds vs. individual stocks: the data is clearer than most people realize', type:'text', body:'Over 20-year periods, approximately 88% of actively managed funds underperform their benchmark index. Individual stock pickers fare worse. The S&P 500 has returned ~10% annually on average since 1957. Fees eat 1-2% when actively managed. Compound that over 30 years and the math is stark. This doesn\'t mean never buy individual stocks, but understand what you\'re competing against.' },

  // LifeProTips
  { sub:'r_lifeprotips', title:'LPT: When someone is angry and yelling at you, lower your voice instead of raising it', type:'text', body:'This forces them to stop yelling to hear you, which physiologically calms them. It\'s nearly impossible to maintain an angry elevated tone when the other person is speaking quietly and calmly. Works in professional settings, arguments, customer service situations. Took me years to learn this.' },
  { sub:'r_lifeprotips', title:'LPT: Set your clocks 5-7 minutes fast. You\'ll be early to everything without even trying.', type:'text', body:'I know intellectually that my clock is fast. But emotionally I still feel the urgency. Been doing it for 8 years. I have not been late to a single thing in those 8 years. The "oh crap" response to seeing you\'re almost late overrides your brain\'s ability to do the math and correct.' },
  { sub:'r_lifeprotips', title:'LPT: Before sending a strongly-worded email, save it as a draft and sleep on it', type:'text', body:'97% of the time I edit it significantly or don\'t send it at all the next morning. The email that felt righteous and necessary at 11pm looks aggressive and petty at 7am. Your future self will thank your present self for waiting.' },

  // TIFU
  { sub:'r_tifu', title:'TIFU by accidentally sending my boss a "this meeting could have been an email" GIF while in the meeting about GIF policy', type:'text', body:'Long story. We were having a meeting (I know) about appropriate use of GIFs in workplace Slack. My phone buzzed. I thought I was sending the GIF to my friend. I sent it in the meeting Slack channel while everyone was in the meeting. The irony was not lost on anyone. I was not fired but I now facilitate the company\'s "Digital Communication Best Practices" training.' },
  { sub:'r_tifu', title:'TIFU by confidently explaining a movie plot I\'d never seen to a group of people, including the director', type:'text', body:'Film festival networking event. Someone mentioned "The Room." I had never seen it but nodded confidently as people discussed it and started contributing. What I did not know was that Tommy Wiseau was standing three feet to my left. The silence that followed my characterization of it as "an underrated thriller" will haunt me.' },

  // Unpopular Opinion
  { sub:'r_unpopularopinion', title:'Unpopular opinion: Breakfast food at dinner time is not quirky, it\'s just dinner', type:'text', body:'I\'m tired of people acting like eating eggs and pancakes at 7pm is a personality trait. Food is food. Breakfast for dinner is just dinner. You are not interesting for this.' },
  { sub:'r_unpopularopinion', title:'The phrase "everything happens for a reason" is genuinely harmful and we should stop saying it', type:'text', body:'It shifts the burden of tragedy onto the victim ("this is part of a plan"), dismisses genuine suffering with false comfort, and is philosophically incoherent. Not everything happens for a reason. Some things just happen, and people survive them or don\'t. Acknowledging that is harder but more honest and more respectful.' },

  // CMV
  { sub:'r_changemyview', title:'CMV: Social media has been a net negative for human social wellbeing', type:'text', body:'My view: The mental health epidemic (especially in adolescents), political polarization, attention span degradation, and erosion of local community relationships correlate too strongly with social media adoption to be coincidental. The "connection" social media provides is shallow compared to in-person relationships. CMV.' },
  { sub:'r_changemyview', title:'CMV: Learning a musical instrument should be mandatory in schools', type:'text', body:'I believe learning an instrument provides benefits that no other subject uniquely provides: mathematical pattern recognition, fine motor development, emotional expression, discipline, and collaborative skills. The cost-benefit of replacing electives with mandatory music education is positive. CMV.' },

  // Dataisbeautiful  
  { sub:'r_dataisbeautiful', title:'[OC] I tracked every dollar I spent for 5 years and visualized it. The results surprised me.', type:'text', body:'Tracked 5 years of spending, ~18,000 individual transactions. Key findings:\n\n- Food (groceries + restaurants) was 31% of non-housing spending\n- Transportation costs decreased 40% after I sold my car\n- Subscription services grew from $47/month in year 1 to $284/month by year 5 without me noticing\n- Healthcare was the most unpredictable category' },

  // ELI5
  { sub:'r_explainlikeimfive', title:'ELI5: Why does rubbing your eyes when tired feel so good?', type:'text', body:'When you\'re tired, your eyes produce less of the fluid that keeps them moist, making them feel dry and irritated. Rubbing increases blood flow to the area (warmth + pressure = relief) and stimulates the vagus nerve, which actually slows your heart rate slightly — that\'s the "ahh" feeling. It\'s also a bit like a massage for your tired eye muscles.' },
  { sub:'r_explainlikeimfive', title:'ELI5: How does noise-canceling headphone technology actually work?', type:'text', body:'Sound is just air vibrating in waves. Noise-canceling headphones have a microphone that listens to outside sound and a tiny computer that creates the exact opposite sound wave — like a mirror image. When the original sound wave meets its mirror, they cancel each other out (destructive interference). You hear silence because two opposite waves = zero wave.' },
];

// ─── Comment Templates ────────────────────────────────────────────────────────
const COMMENT_TEMPLATES = [
  "This is genuinely one of the better posts I've seen on this subreddit in months.",
  "Came here to say exactly this. Saving the post.",
  "I have a slightly different take: {alt}",
  "Source? Not doubting, just want to read more about this.",
  "This happened to me too. Exact same situation. The universe is wild.",
  "As someone who works in this field, I can confirm this is accurate.",
  "Counterpoint: {counter}",
  "The real answer is buried in the comments as usual.",
  "I've been saying this for years and nobody believed me.",
  "Underrated comment right here.",
  "This is the way.",
  "Username checks out.",
  "Instructions unclear, now I have {silly}.",
  "Wait, this is actually legal?",
  "TIL something from a Reddit comment. Today is a good day.",
  "I did not expect to learn something today but here we are.",
  "Can confirm. Source: am a {job}.",
  "This needs to be higher up.",
  "Saving this comment for when I inevitably need it.",
  "The fact that this works is simultaneously obvious and mind-blowing.",
  "I tried this and it works. 10/10 would recommend.",
  "Unpopular opinion incoming: {unpopular}",
  "This is why I still use Reddit after all these years.",
  "I'm screenshotting this whole thread.",
  "Okay but has anyone actually tried this? What were the results?",
  "The most Reddit thread ever and I mean that as a compliment.",
  "My therapist would have a field day with this comment section.",
  "Came for the post, staying for the comment section.",
  "Three years on Reddit and this is the most useful thing I've encountered.",
  "The algorithm brought me here and I'm not mad about it.",
];

const ALTS = ["the real issue is systemic, not individual","we're all kind of overthinking this","it varies wildly by region","context matters enormously here","history would suggest otherwise","the data actually points the other way"];
const COUNTERS = ["most people don't actually do this","the incentive structures don't support this","it's more nuanced than it appears","correlation is doing a lot of heavy lifting here","this only works in ideal conditions"];
const SILLY = ["17 tabs open","a new pasta recipe I didn't need","a whole philosophy minor","more questions than answers","a very strong opinion about cheese"];
const JOBS = ["marine biologist","software engineer","nurse","teacher","chef","former politician","archaeologist","game developer","physicist","librarian"];
const UNPOPULARS = ["pineapple on pizza is fine","the sequel was better","you're all addicted to outrage","breakfast food is overrated","silence is undervalued"];

function fillTemplate(t) {
  return t
    .replace('{alt}', ALTS[Math.floor(Math.random() * ALTS.length)])
    .replace('{counter}', COUNTERS[Math.floor(Math.random() * COUNTERS.length)])
    .replace('{silly}', SILLY[Math.floor(Math.random() * SILLY.length)])
    .replace('{job}', JOBS[Math.floor(Math.random() * JOBS.length)])
    .replace('{unpopular}', UNPOPULARS[Math.floor(Math.random() * UNPOPULARS.length)]);
}

// ─── Generate Users ───────────────────────────────────────────────────────────
export function generateUsers(count = 2000) {
  const users = [];
  const usedHandles = new Set();
  for (let i = 0; i < count; i++) {
    const r = seededRandom(i * 9973 + 7);
    const useAdj = r() < 0.6;
    let name, handle;
    if (useAdj) {
      const adj = ADJECTIVES[Math.floor(r() * ADJECTIVES.length)];
      const noun = NOUNS[Math.floor(r() * NOUNS.length)];
      const num = Math.floor(r() * 9999);
      name = `${adj}${noun}`;
      handle = `${adj.toLowerCase()}${noun.toLowerCase()}${num > 0 ? num : ''}`;
    } else {
      const fn = FIRST[Math.floor(r() * FIRST.length)];
      const ln = LAST[Math.floor(r() * LAST.length)];
      const num = Math.floor(r() * 999);
      name = `${fn}_${ln}`;
      handle = `${fn.toLowerCase()}_${ln.toLowerCase()}${num > 0 ? num : ''}`;
    }
    while (usedHandles.has(handle)) handle += Math.floor(r() * 9);
    usedHandles.add(handle);

    const style = AVATAR_STYLES[Math.floor(r() * AVATAR_STYLES.length)];
    const seed = handle;
    const karma = Math.floor(Math.pow(r(), 2.5) * 500000);
    const cakeDay = new Date(Date.now() - Math.floor(r() * 10 * 365 * 24 * 60 * 60 * 1000));
    const subCount = Math.floor(r() * 30) + 1;
    const favSubs = [];
    for (let j = 0; j < subCount; j++) {
      const s = SUBREDDITS[Math.floor(r() * SUBREDDITS.length)];
      if (!favSubs.includes(s.id)) favSubs.push(s.id);
    }

    users.push({
      id: `u${i}`,
      name,
      handle,
      avatarUrl: `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&size=64`,
      avatarStyle: style,
      karma,
      cakeDay: cakeDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      favSubs,
      isPremium: r() < 0.08,
      isMod: r() < 0.03,
    });
  }
  return users;
}

// ─── Build Posts ──────────────────────────────────────────────────────────────
export function buildPosts(users) {
  return RAW_POSTS.map((raw, i) => {
    const r = seededRandom(i * 6421 + 13);
    const author = users[Math.floor(r() * Math.min(users.length, 500))];
    const upvotes = Math.floor(Math.pow(r(), 1.8) * 80000) + 10;
    const ratio = 0.7 + r() * 0.29;
    const comments = Math.floor(r() * r() * 3000) + 5;
    const hoursAgo = Math.floor(r() * 48 * 7);
    const ts = Date.now() - hoursAgo * 3600000;
    const flair = r() < 0.4 ? ['Discussion','Question','Meta','OC','News','Analysis','Advice','Help','Serious'][Math.floor(r() * 9)] : null;
    const imgPost = raw.type === 'image' || (r() < 0.15);
    const imgColors = ['#FF4500','#0079D3','#46D160','#FF585B','#7193FF','#24A0ED','#FC471E','#0DD3BB','#FF6534','#A08060'];
    const imgColor = imgColors[Math.floor(r() * imgColors.length)];
    const imgEmojis = ['🌄','🖼️','📸','🎨','🌃','🌌','🏔️','🌊','🔬','💻','🎮','🎬','🎵','📊','🏛️'];
    const imgEmoji = imgEmojis[Math.floor(r() * imgEmojis.length)];

    // Generate thread comments
    const threadComments = [];
    const numTopLevel = Math.min(Math.floor(r() * 12) + 3, 15);
    for (let c = 0; c < numTopLevel; c++) {
      const cr = seededRandom(i * 1000 + c * 77 + 3);
      const commentAuthor = users[Math.floor(cr() * users.length)];
      const tmpl = COMMENT_TEMPLATES[Math.floor(cr() * COMMENT_TEMPLATES.length)];
      const text = fillTemplate(tmpl);
      const cUpvotes = Math.floor(Math.pow(cr(), 2) * 5000) + 1;
      const cTs = ts + Math.floor(cr() * 3600000 * 12);
      const numReplies = Math.floor(cr() * 4);
      const replies = [];
      for (let rep = 0; rep < numReplies; rep++) {
        const rr = seededRandom(i * 10000 + c * 100 + rep * 7 + 11);
        const replyAuthor = users[Math.floor(rr() * users.length)];
        const rTmpl = COMMENT_TEMPLATES[Math.floor(rr() * COMMENT_TEMPLATES.length)];
        replies.push({
          id: `cmt_${i}_${c}_${rep}`,
          authorId: replyAuthor.id,
          text: fillTemplate(rTmpl),
          upvotes: Math.floor(Math.pow(rr(), 2) * 1000) + 1,
          timestamp: cTs + Math.floor(rr() * 3600000 * 6),
          isEdited: rr() < 0.05,
          awards: rr() < 0.1 ? Math.floor(rr() * 3) + 1 : 0,
        });
      }
      threadComments.push({
        id: `cmt_${i}_${c}`,
        authorId: commentAuthor.id,
        text,
        upvotes: cUpvotes,
        timestamp: cTs,
        replies,
        isEdited: cr() < 0.05,
        awards: cr() < 0.12 ? Math.floor(cr() * 5) + 1 : 0,
        collapsed: false,
      });
    }

    return {
      id: `post_${i}`,
      subId: raw.sub,
      authorId: author.id,
      title: raw.title,
      body: raw.body || null,
      type: imgPost ? 'image' : 'text',
      imgColor,
      imgEmoji,
      upvotes,
      ratio,
      commentCount: comments,
      timestamp: ts,
      flair,
      isNSFW: false,
      isSpoiler: false,
      isPinned: i < 2,
      awards: Math.floor(Math.pow(r(), 3) * 20),
      crosspostCount: Math.floor(r() * 50),
      isLocked: r() < 0.03,
      saved: false,
      voted: 0, // -1, 0, 1
      comments: threadComments,
    };
  });
}
