// ALOC API Integration for ExamPrep+
// Based on https://questions.aloc.com.ng API endpoints

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizData {
  title: string;
  subject: string;
  exam: string;
  timeLimit: number;
  questions: QuizQuestion[];
  type?: "quiz" | "challenge" | "jamb";
  year?: string;
}

// ALOC API Response interfaces
interface AlocQuestion {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string;
  solution?: string;
  examtype: string;
  examyear: string;
}

interface AlocApiResponse {
  status: boolean;
  message: string;
  data: AlocQuestion | AlocQuestion[];
}

// ALOC API Configuration
const ALOC_BASE_URL = "https://questions.aloc.com.ng/api/v2";
const API_TOKEN = process.env.NEXT_PUBLIC_ALOC_API_TOKEN;

// Helper function to transform ALOC question to our format
function transformAlocQuestion(
  alocQuestion: AlocQuestion,
  index: number
): QuizQuestion {
  const options = [
    alocQuestion.option_a,
    alocQuestion.option_b,
    alocQuestion.option_c,
    alocQuestion.option_d,
  ];

  // Convert answer letter (A, B, C, D) to index (0, 1, 2, 3)
  const answerIndex = alocQuestion.answer.toUpperCase().charCodeAt(0) - 65;

  return {
    id: index + 1,
    question: alocQuestion.question,
    options,
    correctAnswer: Math.max(0, Math.min(3, answerIndex)), // Ensure valid index
    explanation:
      alocQuestion.solution || `The correct answer is ${alocQuestion.answer}.`,
  };
}

// Helper function to make API requests to ALOC
async function fetchFromAloc(endpoint: string): Promise<AlocQuestion[]> {
  try {
    if (!API_TOKEN) {
      console.warn(
        "[v0] No ALOC API token found. Using fallback data instead of making API call."
      );
      throw new Error("No API token configured");
    }

    const url = `${ALOC_BASE_URL}${endpoint}`;
    console.log("[v0] Fetching from ALOC:", url);

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      AccessToken: API_TOKEN,
    };

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `ALOC API error: ${response.status} ${response.statusText}`
      );
    }

    const data: AlocApiResponse = await response.json();

    if (!data.status) {
      throw new Error(`ALOC API error: ${data.message}`);
    }

    // Handle both single question and multiple questions responses
    const questions = Array.isArray(data.data) ? data.data : [data.data];
    return questions;
  } catch (error) {
    console.error("[v0] ALOC API error:", error);
    throw error;
  }
}

// Fetch JAMB questions (UTME)
export async function fetchJambQuestions(
  subject: string,
  year: string
): Promise<QuizData> {
  try {
    if (!API_TOKEN) {
      console.log(
        "[v0] No ALOC API token found. Returning sample JAMB questions."
      );
      return createFallbackJambQuiz(subject, year);
    }

    // Get multiple questions for JAMB practice
    const endpoint = `/m?subject=${subject.toLowerCase()}&year=${year}&type=utme`;
    const alocQuestions = await fetchFromAloc(endpoint);

    const questions = alocQuestions.map(transformAlocQuestion);

    return {
      title: `JAMB ${subject} Practice - ${year}`,
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      exam: "JAMB",
      timeLimit: 1800, // 30 minutes
      type: "jamb",
      year,
      questions: questions.slice(0, 40), // Limit to 40 questions for JAMB
    };
  } catch (error) {
    console.error("[v0] Error fetching JAMB questions:", error);
    return createFallbackJambQuiz(subject, year);
  }
}

// Fetch WAEC questions (WASSCE)
export async function fetchWaecQuestions(
  subject: string,
  year: string
): Promise<QuizData> {
  try {
    const endpoint = `/m?subject=${subject.toLowerCase()}&year=${year}&type=wassce`;
    const alocQuestions = await fetchFromAloc(endpoint);

    const questions = alocQuestions.map(transformAlocQuestion);

    return {
      title: `WAEC ${subject} Practice - ${year}`,
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      exam: "WAEC",
      timeLimit: 2700, // 45 minutes
      questions: questions.slice(0, 50), // Limit to 50 questions for WAEC
    };
  } catch (error) {
    console.error("[v0] Error fetching WAEC questions:", error);
    return {
      title: `WAEC ${subject} Practice - ${year}`,
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      exam: "WAEC",
      timeLimit: 2700,
      questions: [
        {
          id: 1,
          question: `Sample WAEC ${subject} question for ${year}. (API connection needed)`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: 0,
          explanation:
            "This is a sample question. Please configure ALOC API token.",
        },
      ],
    };
  }
}

// Fetch NECO questions
export async function fetchNecoQuestions(
  subject: string,
  year: string
): Promise<QuizData> {
  try {
    const endpoint = `/m?subject=${subject.toLowerCase()}&year=${year}&type=neco`;
    const alocQuestions = await fetchFromAloc(endpoint);

    const questions = alocQuestions.map(transformAlocQuestion);

    return {
      title: `NECO ${subject} Practice - ${year}`,
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      exam: "NECO",
      timeLimit: 2700, // 45 minutes
      questions: questions.slice(0, 50), // Limit to 50 questions for NECO
    };
  } catch (error) {
    console.error("[v0] Error fetching NECO questions:", error);
    return {
      title: `NECO ${subject} Practice - ${year}`,
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      exam: "NECO",
      timeLimit: 2700,
      questions: [
        {
          id: 1,
          question: `Sample NECO ${subject} question for ${year}. (API connection needed)`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: 0,
          explanation:
            "This is a sample question. Please configure ALOC API token.",
        },
      ],
    };
  }
}

// Fetch POST-UTME questions
export async function fetchPostUtmeQuestions(
  subject: string,
  year: string
): Promise<QuizData> {
  try {
    const endpoint = `/m?subject=${subject.toLowerCase()}&year=${year}&type=post-utme`;
    const alocQuestions = await fetchFromAloc(endpoint);

    const questions = alocQuestions.map(transformAlocQuestion);

    return {
      title: `POST-UTME ${subject} Practice - ${year}`,
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      exam: "POST-UTME",
      timeLimit: 1800, // 30 minutes
      questions: questions.slice(0, 30), // Limit to 30 questions for POST-UTME
    };
  } catch (error) {
    console.error("[v0] Error fetching POST-UTME questions:", error);
    return {
      title: `POST-UTME ${subject} Practice - ${year}`,
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      exam: "POST-UTME",
      timeLimit: 1800,
      questions: [
        {
          id: 1,
          question: `Sample POST-UTME ${subject} question for ${year}. (API connection needed)`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: 0,
          explanation:
            "This is a sample question. Please configure ALOC API token.",
        },
      ],
    };
  }
}

// Get available subjects from ALOC
export async function getAvailableSubjects(): Promise<string[]> {
  // Common subjects available in ALOC API
  return [
    "mathematics",
    "english",
    "physics",
    "chemistry",
    "biology",
    "economics",
    "geography",
    "government",
    "literature",
    "history",
    "commerce",
    "accounting",
    "agricultural-science",
    "civic-education",
    "christian-religious-studies",
    "islamic-religious-studies",
  ];
}

export async function getAvailableYears(examType: string): Promise<string[]> {
  // Common years available in ALOC API
  const currentYear = new Date().getFullYear();
  const years: string[] = [];

  // Generate years from 2010 to current year
  for (let year = currentYear; year >= 2010; year--) {
    years.push(year.toString());
  }

  return years;
}

function createFallbackJambQuiz(subject: string, year: string): QuizData {
  const sampleQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: `Which of the following is a fundamental concept in ${subject}?`,
      options: [
        "Basic principle A",
        "Advanced theory B",
        "Complex formula C",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "This is a sample question demonstrating multiple choice format. Configure ALOC API token for real questions.",
    },
    {
      id: 2,
      question: `In ${year}, what was considered the most important development in ${subject}?`,
      options: ["Development A", "Innovation B", "Discovery C", "Research D"],
      correctAnswer: 1,
      explanation:
        "Sample question showing year-specific content. Add NEXT_PUBLIC_ALOC_API_TOKEN to access real past questions.",
    },
    {
      id: 3,
      question: `Which method is commonly used to solve ${subject} problems?`,
      options: ["Method 1", "Method 2", "Method 3", "All methods are valid"],
      correctAnswer: 0,
      explanation:
        "This demonstrates the question format you'll see with real ALOC API integration.",
    },
  ];

  return {
    title: `JAMB ${subject} Practice - ${year} (Sample)`,
    subject: subject.charAt(0).toUpperCase() + subject.slice(1),
    exam: "JAMB",
    timeLimit: 1800,
    type: "jamb",
    year,
    questions: sampleQuestions,
  };
}
