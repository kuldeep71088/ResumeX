const OPENROUTER_KEY = "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";

async function testModels() {
  const models = [
    "google/gemini-flash-1.5",
    "google/gemini-pro-1.5",
    "google/gemini-2.0-flash-exp:free",
    "google/gemini-pro",
    "google/gemini-flash-1.5-8b",
    "google/gemini-exp-1206:free",
    "openai/gpt-3.5-turbo",
  ];

  for (const model of models) {
    try {
      console.log(`\nTesting model: ${model}`);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: "user", content: "Say hello in JSON format with a 'message' field" }],
        }),
      });
      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        console.log(`✓ ${model} works!`);
        console.log(`Response: ${data.choices[0].message.content}`);
      } else {
        console.log(`✗ ${model} failed:`, data.error?.message || JSON.stringify(data));
      }
    } catch (error) {
      console.log(`✗ ${model} error:`, error.message);
    }
  }
}

testModels();
