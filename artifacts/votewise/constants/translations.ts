export type Language = "en" | "hi";

export interface TranslationStrings {
  appName: string;
  tabs: {
    chat: string;
    timeline: string;
    quiz: string;
    learn: string;
  };
  chat: {
    heading: string;
    subheading: string;
    placeholder: string;
    send: string;
    clear: string;
    neutralBadge: string;
    thinking: string;
    errorTitle: string;
    errorRetry: string;
    suggestions: string[];
  };
  timeline: {
    heading: string;
    subheading: string;
    duration: string;
  };
  quiz: {
    heading: string;
    subheading: string;
    start: string;
    restart: string;
    next: string;
    finish: string;
    progress: (a: number, b: number) => string;
    correct: string;
    incorrect: string;
    score: (a: number, b: number) => string;
    best: (n: number) => string;
    perfect: string;
    good: string;
    learning: string;
  };
  learn: {
    heading: string;
    subheading: string;
  };
  common: {
    languageLabel: string;
  };
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appName: "VoteWise",
    tabs: {
      chat: "Ask",
      timeline: "Timeline",
      quiz: "Quiz",
      learn: "Learn",
    },
    chat: {
      heading: "Ask anything about Indian elections",
      subheading:
        "Plain answers about voting, EVM, NOTA, EPIC, the Model Code of Conduct and more.",
      placeholder: "How do I check if I am registered to vote?",
      send: "Send",
      clear: "Clear chat",
      neutralBadge: "Neutral. No party endorsements.",
      thinking: "Thinking",
      errorTitle: "Could not reach the assistant",
      errorRetry: "Tap send to try again.",
      suggestions: [
        "How do I register to vote in India?",
        "What is the difference between Lok Sabha and Rajya Sabha?",
        "How does an EVM and VVPAT work?",
        "What does NOTA mean on the ballot?",
      ],
    },
    timeline: {
      heading: "How an Indian election unfolds",
      subheading: "Tap any step to see what happens.",
      duration: "Typical duration",
    },
    quiz: {
      heading: "Test what you know",
      subheading: "Ten quick questions on Indian elections.",
      start: "Start quiz",
      restart: "Try again",
      next: "Next",
      finish: "Finish",
      progress: (a: number, b: number) => `Question ${a} of ${b}`,
      correct: "Correct",
      incorrect: "Not quite",
      score: (a: number, b: number) => `You scored ${a} out of ${b}`,
      best: (n: number) => `Best score: ${n}`,
      perfect: "A perfect run. Share your knowledge with a friend.",
      good: "Strong showing. A quick review and you'll ace it next time.",
      learning: "Every attempt teaches you more about how India votes.",
    },
    learn: {
      heading: "The basics, simplified",
      subheading: "A pocket reference to India's election system.",
    },
    common: {
      languageLabel: "Language",
    },
  },
  hi: {
    appName: "VoteWise",
    tabs: {
      chat: "पूछें",
      timeline: "क्रम",
      quiz: "क्विज़",
      learn: "सीखें",
    },
    chat: {
      heading: "भारतीय चुनाव से जुड़ा कुछ भी पूछें",
      subheading:
        "वोटिंग, EVM, NOTA, EPIC, आदर्श आचार संहिता — सब कुछ सरल भाषा में।",
      placeholder: "मैं वोटर सूची में अपना नाम कैसे देखूं?",
      send: "भेजें",
      clear: "बातचीत साफ़ करें",
      neutralBadge: "पूरी तरह निष्पक्ष। किसी पार्टी का समर्थन नहीं।",
      thinking: "सोच रहा हूँ",
      errorTitle: "सहायक से संपर्क नहीं हो पाया",
      errorRetry: "फिर से भेजने के लिए टैप करें।",
      suggestions: [
        "भारत में वोट देने के लिए नाम कैसे जोड़ें?",
        "लोकसभा और राज्यसभा में क्या अंतर है?",
        "EVM और VVPAT कैसे काम करते हैं?",
        "बैलट पर NOTA का मतलब क्या है?",
      ],
    },
    timeline: {
      heading: "भारतीय चुनाव कैसे होते हैं",
      subheading: "किसी भी चरण पर टैप करें।",
      duration: "सामान्य अवधि",
    },
    quiz: {
      heading: "अपनी जानकारी जाँचें",
      subheading: "भारतीय चुनाव पर दस त्वरित प्रश्न।",
      start: "क्विज़ शुरू करें",
      restart: "फिर से कोशिश करें",
      next: "आगे",
      finish: "समाप्त",
      progress: (a: number, b: number) => `प्रश्न ${a} / ${b}`,
      correct: "सही",
      incorrect: "ग़लत",
      score: (a: number, b: number) => `आपने ${b} में से ${a} सही किए`,
      best: (n: number) => `सर्वश्रेष्ठ स्कोर: ${n}`,
      perfect: "शानदार! किसी मित्र के साथ अपनी जानकारी साझा करें।",
      good: "अच्छा प्रयास। थोड़े अभ्यास से अगली बार पूरा सही होगा।",
      learning: "हर प्रयास आपको भारत के लोकतंत्र के बारे में और सिखाता है।",
    },
    learn: {
      heading: "ज़रूरी बातें, आसान भाषा में",
      subheading: "भारत की चुनाव प्रणाली का संक्षिप्त परिचय।",
    },
    common: {
      languageLabel: "भाषा",
    },
  },
};
