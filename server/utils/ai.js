const axios = require("axios");

const requestAI = async (prompt) => {
  return axios.post(
    "https://api.moonshot.cn/v1/chat/completions",
    {
      model: "moonshot-v1-8k",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    },
    {
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + process.env.MOONSHOT_API_KEY,
      },
    }
  );
};

// AI打分（简答题）
const auto_mark_short = (options) => {
  return new Promise(async (resolve, reject) => {
    let retryCount = 0;
    while (retryCount < 3) {
      try {
        const title = options?.title;
        const score = options?.score ? Number(options.score) : 10;
        const answer = options?.answer ?? "";
        // 得分关键点
        const pointExpect = [
          "回答是否准确",
          "回答的完整性",
          "回答的逻辑性",
          "回答的条理性",
          "回答的严谨性",
          "回答的深度",
          "回答的广度",
          "回答的新颖性",
          "回答的创新性",
          "回答的独到性",
        ];
        // 失分关键点
        const losePoint = [
          "空答案",
          "回答不完整",
          "完全敷衍回答",
          "回答完全不相关",
        ];

        const prompt1 = `现在你是一个评委，请根据json中的question(问题)，给json中的userAnswer(用户的回答)打分(0-${score})，得分关键点如下：${pointExpect.join(
          "；"
        )}，若遇到如下情况则不给分：${losePoint.join(
          "；"
        )}，并且你要思考这个问题的正确答案。以 json 格式输出分数(score)、你打分的原因(reason)和你思考的答案(standardAnswer)。`;
        const prompt2 = `{"question": "${title}","answer": "${answer}"}`;

        const response = await requestAI(prompt1 + prompt2);
        const data = response.data;
        console.log(data.choices[0].message.content);
        return resolve(JSON.parse(data.choices[0].message.content));
      } catch (error) {
        console.error(error);
        retryCount++;
      }
    }
    return reject();
  });
};

exports.auto_mark_short = auto_mark_short;
