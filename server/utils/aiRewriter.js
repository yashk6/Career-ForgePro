/**
 * AI Resume Rewriter - OpenAI Integration
 * Rewrites resume content to incorporate missing JD keywords naturally.
 */

const OpenAI = require('openai');
const buildRewritePrompt = (resumeText, missingKeywords, matchedKeywords, jobDescription) => {
  return `You are an expert ATS Resume Optimizer. Rewrite the resume to maximize ATS score for this job:

MISSING KEYWORDS: ${missingKeywords.join(', ')}
MATCHED KEYWORDS: ${matchedKeywords.join(', ')}

JOB DESCRIPTION: ${jobDescription}

ORIGINAL RESUME: ${resumeText}

Rewrite bullet points naturally incorporating missing keywords. Keep truthful.

Respond ONLY with JSON:
{
  "optimizedContent": "Full rewritten content",
  "changes": [
    {
      "original": "Old text",
      "rewritten": "New text with keywords",
      "keywordsAdded": ["kw1", "kw2"]
    }
  ],
  "newAtsScore": 90,
  "summary": "Changes summary"
}`;
};

const rewriteResume = async (resumeText, missingKeywords, matchedKeywords, jobDescription) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY missing in server/.env");
  }

  const openai = new OpenAI({ apiKey });

  const prompt = buildRewritePrompt(resumeText, missingKeywords, matchedKeywords, jobDescription);

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const content = completion.choices[0].message.content.trim();

    // Extract JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid JSON response from OpenAI");

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    throw new Error(`OpenAI error: ${error.message}`);
  }
};

module.exports = { rewriteResume };

