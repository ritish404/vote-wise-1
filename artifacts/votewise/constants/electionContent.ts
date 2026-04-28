import type { Language } from "./translations";

export interface TimelineStep {
  id: string;
  title: string;
  duration: string;
  summary: string;
  details: string[];
}

export interface LearnCard {
  id: string;
  title: string;
  abbreviation?: string;
  body: string;
  bullets: string[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const timelineEn: TimelineStep[] = [
  {
    id: "announcement",
    title: "Election announcement",
    duration: "1 day",
    summary:
      "The Election Commission of India (ECI) announces the schedule and the Model Code of Conduct kicks in.",
    details: [
      "ECI publishes the calendar of phases, polling dates and the counting day.",
      "From this moment, the Model Code of Conduct applies to all parties and candidates.",
      "Governments cannot announce new schemes, transfers or freebies that may sway voters.",
    ],
  },
  {
    id: "nomination",
    title: "Nomination",
    duration: "About 7 days",
    summary:
      "Candidates file nomination papers with the Returning Officer for their constituency.",
    details: [
      "Candidates submit affidavits about their assets, education and any criminal cases.",
      "A security deposit is required, which is refunded if they secure enough votes.",
      "To stand for Lok Sabha you must be at least 25 years old and a registered Indian voter.",
    ],
  },
  {
    id: "scrutiny",
    title: "Scrutiny and withdrawal",
    duration: "2 days",
    summary:
      "The Returning Officer checks each nomination and candidates have a window to withdraw.",
    details: [
      "Incomplete or invalid nominations are rejected at scrutiny.",
      "Accepted candidates may withdraw before the deadline if they choose.",
      "The final list of contestants and their symbols is then published.",
    ],
  },
  {
    id: "campaign",
    title: "Campaigning",
    duration: "Around 14 days",
    summary:
      "Candidates and parties take their message to voters through rallies, door visits and media.",
    details: [
      "Spending limits and content rules are enforced by the ECI.",
      "Loudspeakers, posters and social media must follow MCC and local rules.",
      "Campaigning ends 48 hours before polling — known as the silence period.",
    ],
  },
  {
    id: "polling",
    title: "Polling day",
    duration: "1 day per phase",
    summary:
      "Voters cast their vote on an Electronic Voting Machine (EVM) with a VVPAT slip for verification.",
    details: [
      "Carry your EPIC card or any approved photo ID to the polling station.",
      "Press the button next to your candidate. A VVPAT slip shows your choice for 7 seconds.",
      "If you do not support any candidate, you can press NOTA — None of the Above.",
    ],
  },
  {
    id: "counting",
    title: "Counting day",
    duration: "1 day",
    summary:
      "EVM votes are counted at the constituency counting centre under heavy supervision.",
    details: [
      "Counting begins with postal ballots, then EVMs, round by round.",
      "Random VVPAT slips from each Assembly segment are matched with EVM totals.",
      "Candidates' agents observe the count to ensure transparency.",
    ],
  },
  {
    id: "results",
    title: "Results and oath",
    duration: "Same day",
    summary:
      "The Returning Officer declares the winner who later takes oath as the elected representative.",
    details: [
      "The candidate with the most valid votes wins, no minimum vote share is required.",
      "Winners are notified by the ECI and a new House is constituted.",
      "MPs take oath in Parliament; MLAs take oath in their state Assembly.",
    ],
  },
];

const timelineHi: TimelineStep[] = [
  {
    id: "announcement",
    title: "चुनाव की घोषणा",
    duration: "1 दिन",
    summary:
      "भारत निर्वाचन आयोग (ECI) कार्यक्रम की घोषणा करता है और आदर्श आचार संहिता लागू हो जाती है।",
    details: [
      "ECI चरणों, मतदान तिथियों और मतगणना दिवस का कैलेंडर जारी करता है।",
      "उसी क्षण से सभी पार्टियों और उम्मीदवारों पर आदर्श आचार संहिता लागू हो जाती है।",
      "सरकारें ऐसी नई योजनाएँ, स्थानांतरण या लाभ नहीं घोषित कर सकतीं जो वोटरों को प्रभावित करें।",
    ],
  },
  {
    id: "nomination",
    title: "नामांकन",
    duration: "लगभग 7 दिन",
    summary:
      "उम्मीदवार अपने क्षेत्र के रिटर्निंग ऑफिसर के पास नामांकन पत्र दाखिल करते हैं।",
    details: [
      "उम्मीदवार अपनी संपत्ति, शिक्षा और किसी भी आपराधिक मामले का हलफनामा देते हैं।",
      "जमानत राशि जमा करनी होती है, जो पर्याप्त वोट मिलने पर वापस होती है।",
      "लोकसभा चुनाव लड़ने के लिए न्यूनतम आयु 25 वर्ष है और भारत का पंजीकृत वोटर होना ज़रूरी है।",
    ],
  },
  {
    id: "scrutiny",
    title: "जाँच और नाम वापसी",
    duration: "2 दिन",
    summary:
      "रिटर्निंग ऑफिसर हर नामांकन की जाँच करते हैं और उम्मीदवार चाहें तो नाम वापस ले सकते हैं।",
    details: [
      "अधूरे या अमान्य नामांकन जाँच में अस्वीकार कर दिए जाते हैं।",
      "स्वीकार हुए उम्मीदवार अंतिम तिथि तक नाम वापस ले सकते हैं।",
      "उसके बाद उम्मीदवारों और उनके चुनाव चिह्न की अंतिम सूची प्रकाशित होती है।",
    ],
  },
  {
    id: "campaign",
    title: "चुनाव प्रचार",
    duration: "करीब 14 दिन",
    summary:
      "उम्मीदवार और दल रैलियों, घर-घर जाकर और मीडिया के ज़रिए वोटरों तक अपनी बात पहुँचाते हैं।",
    details: [
      "खर्च की सीमा और सामग्री के नियम ECI द्वारा लागू किए जाते हैं।",
      "लाउडस्पीकर, पोस्टर और सोशल मीडिया को MCC और स्थानीय नियमों का पालन करना होता है।",
      "मतदान से 48 घंटे पहले प्रचार बंद हो जाता है — इसे साइलेंस पीरियड कहते हैं।",
    ],
  },
  {
    id: "polling",
    title: "मतदान का दिन",
    duration: "हर चरण में 1 दिन",
    summary:
      "वोटर EVM से अपना वोट डालते हैं और VVPAT पर्ची से उसकी पुष्टि होती है।",
    details: [
      "अपना EPIC कार्ड या कोई स्वीकृत फोटो पहचान-पत्र पोलिंग बूथ पर ले जाएँ।",
      "अपने उम्मीदवार के सामने वाला बटन दबाएँ। VVPAT पर्ची 7 सेकंड के लिए आपकी पसंद दिखाती है।",
      "अगर कोई उम्मीदवार पसंद नहीं है तो आप NOTA — इनमें से कोई नहीं — दबा सकते हैं।",
    ],
  },
  {
    id: "counting",
    title: "मतगणना का दिन",
    duration: "1 दिन",
    summary:
      "EVM के वोट क्षेत्रीय मतगणना केंद्र पर कड़ी निगरानी में गिने जाते हैं।",
    details: [
      "गिनती पहले डाक मतपत्रों से शुरू होती है, फिर राउंड-दर-राउंड EVM से।",
      "हर विधानसभा क्षेत्र की कुछ VVPAT पर्चियाँ EVM के कुल से मिलाई जाती हैं।",
      "पारदर्शिता के लिए उम्मीदवारों के एजेंट गिनती के समय मौजूद रहते हैं।",
    ],
  },
  {
    id: "results",
    title: "परिणाम और शपथ",
    duration: "उसी दिन",
    summary:
      "रिटर्निंग ऑफिसर विजेता की घोषणा करते हैं जो बाद में निर्वाचित प्रतिनिधि के रूप में शपथ लेते हैं।",
    details: [
      "सबसे ज़्यादा वैध वोट पाने वाला उम्मीदवार जीतता है — कोई न्यूनतम वोट-प्रतिशत अनिवार्य नहीं है।",
      "ECI विजेताओं को अधिसूचित करता है और नया सदन गठित होता है।",
      "सांसद संसद में और विधायक अपनी राज्य विधानसभा में शपथ लेते हैं।",
    ],
  },
];

const learnEn: LearnCard[] = [
  {
    id: "eci",
    title: "Election Commission of India",
    abbreviation: "ECI",
    body: "An autonomous constitutional body that runs every Lok Sabha, Rajya Sabha, state Assembly and Presidential election.",
    bullets: [
      "Headed by the Chief Election Commissioner and two Election Commissioners.",
      "Decides election schedules, candidate eligibility and code enforcement.",
      "Maintains the electoral roll and supervises polling and counting.",
    ],
  },
  {
    id: "evm",
    title: "EVM and VVPAT",
    body: "An EVM is the electronic device used to record votes; the VVPAT prints a paper slip so you can verify your vote.",
    bullets: [
      "EVMs are standalone machines — they are never connected to the internet.",
      "The VVPAT slip shows your candidate's name and symbol for about 7 seconds.",
      "VVPAT slips from random booths are matched with EVM totals during counting.",
    ],
  },
  {
    id: "nota",
    title: "NOTA — None of the Above",
    body: "A button on the EVM that lets you reject every candidate without leaving your vote unused.",
    bullets: [
      "Introduced after a Supreme Court direction in 2013.",
      "Your NOTA vote is counted but does not change who wins the seat.",
      "It is a strong, recorded signal of voter dissatisfaction.",
    ],
  },
  {
    id: "mcc",
    title: "Model Code of Conduct",
    abbreviation: "MCC",
    body: "A set of rules that parties, candidates and the government in power must follow once an election is announced.",
    bullets: [
      "No new schemes, transfers or inducements that could influence voters.",
      "No campaigning in the 48 hours before polling.",
      "No appeals to caste, religion or community for votes.",
    ],
  },
  {
    id: "houses",
    title: "Lok Sabha and Rajya Sabha",
    body: "India's Parliament has two Houses with very different roles.",
    bullets: [
      "Lok Sabha — directly elected by voters; up to 543 members; 5-year term.",
      "Rajya Sabha — elected by state legislators; permanent body; one third retires every 2 years.",
      "Money bills can only originate in the Lok Sabha.",
    ],
  },
  {
    id: "epic",
    title: "Voter ID (EPIC)",
    body: "The Electors Photo Identity Card issued by the ECI is your proof of being a registered Indian voter.",
    bullets: [
      "Apply online via the Voter Helpline app or voters.eci.gov.in.",
      "You can also vote with passport, Aadhaar or other approved photo IDs.",
      "Check your name in the electoral roll well before polling day.",
    ],
  },
  {
    id: "vote-count",
    title: "How votes are counted",
    body: "India follows a first-past-the-post system in single-member constituencies.",
    bullets: [
      "The candidate with the most valid votes wins — no run-off, no minimum share.",
      "Postal ballots are counted first, then EVM votes round by round.",
      "Final results are signed off by the Returning Officer of each constituency.",
    ],
  },
];

const learnHi: LearnCard[] = [
  {
    id: "eci",
    title: "भारत निर्वाचन आयोग",
    abbreviation: "ECI",
    body: "एक स्वायत्त संवैधानिक संस्था जो लोकसभा, राज्यसभा, विधानसभा और राष्ट्रपति चुनाव कराती है।",
    bullets: [
      "इसका नेतृत्व मुख्य चुनाव आयुक्त और दो चुनाव आयुक्त करते हैं।",
      "चुनाव कार्यक्रम, उम्मीदवारों की पात्रता और आचार संहिता लागू करती है।",
      "मतदाता सूची तैयार करती है और मतदान-गिनती की निगरानी करती है।",
    ],
  },
  {
    id: "evm",
    title: "EVM और VVPAT",
    body: "EVM एक इलेक्ट्रॉनिक मशीन है जो वोट दर्ज करती है; VVPAT एक काग़ज़ की पर्ची छापती है ताकि आप अपना वोट देख सकें।",
    bullets: [
      "EVM किसी भी इंटरनेट या नेटवर्क से नहीं जुड़ी होतीं।",
      "VVPAT पर्ची आपके उम्मीदवार का नाम और चिह्न क़रीब 7 सेकंड दिखाती है।",
      "गिनती के समय कुछ बूथों की VVPAT पर्चियाँ EVM के नतीजों से मिलाई जाती हैं।",
    ],
  },
  {
    id: "nota",
    title: "NOTA — इनमें से कोई नहीं",
    body: "EVM का एक बटन जिससे आप किसी भी उम्मीदवार को नकार सकते हैं — फिर भी आपका वोट दर्ज होता है।",
    bullets: [
      "2013 में सुप्रीम कोर्ट के निर्देश के बाद शुरू हुआ।",
      "NOTA वोट गिने जाते हैं, पर इससे विजेता नहीं बदलता।",
      "यह वोटर के असंतोष का एक दर्ज प्रमाण है।",
    ],
  },
  {
    id: "mcc",
    title: "आदर्श आचार संहिता",
    abbreviation: "MCC",
    body: "चुनाव की घोषणा के बाद पार्टियों, उम्मीदवारों और सत्ताधारी सरकार के लिए लागू नियमों का संग्रह।",
    bullets: [
      "वोटरों को प्रभावित करने वाली नई योजनाएँ या नियुक्तियाँ नहीं की जा सकतीं।",
      "मतदान से 48 घंटे पहले प्रचार पूरी तरह बंद हो जाता है।",
      "जाति, धर्म या समुदाय के नाम पर वोट माँगना मना है।",
    ],
  },
  {
    id: "houses",
    title: "लोकसभा और राज्यसभा",
    body: "भारतीय संसद के दो सदन हैं — दोनों की भूमिका अलग है।",
    bullets: [
      "लोकसभा — सीधे जनता द्वारा चुनी जाती है; अधिकतम 543 सदस्य; 5 साल का कार्यकाल।",
      "राज्यसभा — राज्यों के विधायकों द्वारा चुनी जाती है; स्थायी सदन; एक-तिहाई हर 2 साल में बदलते हैं।",
      "धन विधेयक केवल लोकसभा में पेश हो सकते हैं।",
    ],
  },
  {
    id: "epic",
    title: "वोटर आईडी (EPIC)",
    body: "ECI द्वारा जारी इलेक्टर्स फोटो पहचान कार्ड आपके पंजीकृत वोटर होने का प्रमाण है।",
    bullets: [
      "Voter Helpline ऐप या voters.eci.gov.in से ऑनलाइन आवेदन करें।",
      "पासपोर्ट, आधार या अन्य स्वीकृत फोटो आईडी से भी वोट डाला जा सकता है।",
      "मतदान से पहले मतदाता सूची में अपना नाम ज़रूर देख लें।",
    ],
  },
  {
    id: "vote-count",
    title: "वोट कैसे गिने जाते हैं",
    body: "भारत में हर सीट पर सबसे अधिक वोट पाने वाले उम्मीदवार की जीत होती है।",
    bullets: [
      "सबसे ज़्यादा वैध वोट वाला जीतता है — कोई दूसरा दौर या न्यूनतम प्रतिशत नहीं।",
      "पहले डाक मतपत्र, फिर EVM के वोट राउंड-दर-राउंड गिने जाते हैं।",
      "हर क्षेत्र का अंतिम परिणाम रिटर्निंग ऑफिसर प्रमाणित करते हैं।",
    ],
  },
];

const quizEn: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "What is the minimum age to vote in India?",
    options: ["16", "18", "21", "25"],
    correctIndex: 1,
    explanation:
      "The 61st Constitutional Amendment in 1989 lowered the voting age to 18.",
  },
  {
    id: "q2",
    prompt: "Which body conducts national elections in India?",
    options: [
      "The Supreme Court",
      "The Prime Minister's Office",
      "The Election Commission of India",
      "The Ministry of Home Affairs",
    ],
    correctIndex: 2,
    explanation:
      "The Election Commission of India is an autonomous constitutional authority.",
  },
  {
    id: "q3",
    prompt: "How many seats does the Lok Sabha have at full strength?",
    options: ["272", "400", "543", "780"],
    correctIndex: 2,
    explanation: "Currently 543 members are directly elected from constituencies across India.",
  },
  {
    id: "q4",
    prompt: "What is the normal term of the Lok Sabha?",
    options: ["3 years", "4 years", "5 years", "6 years"],
    correctIndex: 2,
    explanation:
      "A Lok Sabha runs for five years unless dissolved earlier by the President.",
  },
  {
    id: "q5",
    prompt: "What does NOTA stand for on an Indian ballot?",
    options: [
      "Need Of The Area",
      "None Of The Above",
      "National Option To Abstain",
      "New Option To Approve",
    ],
    correctIndex: 1,
    explanation:
      "NOTA lets you reject every candidate while still recording your vote.",
  },
  {
    id: "q6",
    prompt: "What does VVPAT do?",
    options: [
      "Sends your vote to a central server",
      "Prints a paper slip showing your choice",
      "Verifies your fingerprint",
      "Counts the total turnout in real time",
    ],
    correctIndex: 1,
    explanation:
      "VVPAT prints a slip with your candidate's name and symbol for about 7 seconds.",
  },
  {
    id: "q7",
    prompt: "When does election campaigning officially end?",
    options: [
      "On polling day morning",
      "12 hours before polling",
      "48 hours before polling ends",
      "One week before polling",
    ],
    correctIndex: 2,
    explanation:
      "Campaigning stops 48 hours before polling closes — the silence period.",
  },
  {
    id: "q8",
    prompt: "Who heads the Election Commission of India?",
    options: [
      "The President",
      "The Chief Justice of India",
      "The Chief Election Commissioner",
      "The Vice President",
    ],
    correctIndex: 2,
    explanation:
      "The Chief Election Commissioner leads ECI alongside two Election Commissioners.",
  },
  {
    id: "q9",
    prompt: "What is the minimum age to contest a Lok Sabha election?",
    options: ["18", "21", "25", "30"],
    correctIndex: 2,
    explanation: "Article 84 sets 25 as the minimum age for the Lok Sabha.",
  },
  {
    id: "q10",
    prompt: "Which House can money bills originate in?",
    options: [
      "Only the Rajya Sabha",
      "Only the Lok Sabha",
      "Either House",
      "Joint sittings only",
    ],
    correctIndex: 1,
    explanation:
      "Money bills can be introduced only in the Lok Sabha; Rajya Sabha may suggest amendments.",
  },
];

const quizHi: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "भारत में वोट देने की न्यूनतम आयु क्या है?",
    options: ["16", "18", "21", "25"],
    correctIndex: 1,
    explanation: "1989 के 61वें संविधान संशोधन से मतदान की उम्र 18 वर्ष की गई।",
  },
  {
    id: "q2",
    prompt: "भारत में राष्ट्रीय चुनाव कौन कराता है?",
    options: [
      "उच्चतम न्यायालय",
      "प्रधानमंत्री कार्यालय",
      "भारत निर्वाचन आयोग",
      "गृह मंत्रालय",
    ],
    correctIndex: 2,
    explanation: "भारत निर्वाचन आयोग एक स्वायत्त संवैधानिक संस्था है।",
  },
  {
    id: "q3",
    prompt: "लोकसभा में पूर्ण क्षमता पर कितनी सीटें हैं?",
    options: ["272", "400", "543", "780"],
    correctIndex: 2,
    explanation: "वर्तमान में देशभर के क्षेत्रों से 543 सदस्य सीधे चुने जाते हैं।",
  },
  {
    id: "q4",
    prompt: "लोकसभा का सामान्य कार्यकाल कितने साल का होता है?",
    options: ["3 साल", "4 साल", "5 साल", "6 साल"],
    correctIndex: 2,
    explanation: "लोकसभा का कार्यकाल पाँच वर्ष का होता है, जब तक पहले भंग न हो।",
  },
  {
    id: "q5",
    prompt: "बैलट पर NOTA का अर्थ क्या है?",
    options: [
      "क्षेत्र की आवश्यकता",
      "इनमें से कोई नहीं",
      "वोट से दूर रहने का विकल्प",
      "नया स्वीकृति विकल्प",
    ],
    correctIndex: 1,
    explanation: "NOTA से आप वोट दर्ज करते हुए सभी उम्मीदवारों को नकार सकते हैं।",
  },
  {
    id: "q6",
    prompt: "VVPAT क्या काम करता है?",
    options: [
      "आपका वोट सर्वर पर भेजता है",
      "पर्ची छापकर आपका चुनाव दिखाता है",
      "फिंगरप्रिंट सत्यापित करता है",
      "लाइव मतदान प्रतिशत बताता है",
    ],
    correctIndex: 1,
    explanation:
      "VVPAT आपके उम्मीदवार का नाम और चिह्न करीब 7 सेकंड के लिए दिखाता है।",
  },
  {
    id: "q7",
    prompt: "चुनाव प्रचार आधिकारिक रूप से कब समाप्त होता है?",
    options: [
      "मतदान के दिन सुबह",
      "मतदान से 12 घंटे पहले",
      "मतदान खत्म होने से 48 घंटे पहले",
      "मतदान से एक सप्ताह पहले",
    ],
    correctIndex: 2,
    explanation: "मतदान समाप्ति से 48 घंटे पहले प्रचार बंद हो जाता है।",
  },
  {
    id: "q8",
    prompt: "भारत निर्वाचन आयोग का प्रमुख कौन होता है?",
    options: [
      "राष्ट्रपति",
      "भारत के मुख्य न्यायाधीश",
      "मुख्य चुनाव आयुक्त",
      "उपराष्ट्रपति",
    ],
    correctIndex: 2,
    explanation:
      "मुख्य चुनाव आयुक्त दो चुनाव आयुक्तों के साथ ECI का नेतृत्व करते हैं।",
  },
  {
    id: "q9",
    prompt: "लोकसभा चुनाव लड़ने की न्यूनतम आयु क्या है?",
    options: ["18", "21", "25", "30"],
    correctIndex: 2,
    explanation: "अनुच्छेद 84 के अनुसार लोकसभा के लिए न्यूनतम आयु 25 वर्ष है।",
  },
  {
    id: "q10",
    prompt: "धन विधेयक किस सदन में पेश हो सकता है?",
    options: [
      "सिर्फ़ राज्यसभा",
      "सिर्फ़ लोकसभा",
      "किसी भी सदन में",
      "केवल संयुक्त बैठक में",
    ],
    correctIndex: 1,
    explanation:
      "धन विधेयक केवल लोकसभा में पेश हो सकते हैं; राज्यसभा सिर्फ़ सुझाव दे सकती है।",
  },
];

export function getTimeline(language: Language): TimelineStep[] {
  return language === "hi" ? timelineHi : timelineEn;
}

export function getLearnCards(language: Language): LearnCard[] {
  return language === "hi" ? learnHi : learnEn;
}

export function getQuiz(language: Language): QuizQuestion[] {
  return language === "hi" ? quizHi : quizEn;
}
