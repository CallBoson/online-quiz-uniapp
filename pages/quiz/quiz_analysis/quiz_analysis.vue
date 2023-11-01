<template>
  <view class="container">
    <view class="questions-wrap">
      <view class="wrap-title">答案与解析</view>
      <view class="question-list">
        <view
          class="question-item"
          v-for="(item, index) in questions"
          :key="index"
        >
          <view class="title-wrap">
            {{ `${index + 1}. [${item.type}] ${item.question.content}` }}
          </view>
          <view class="score">{{
            `(此题${item.question_score}分 得分${item.score}分)`
          }}</view>

          <view class="options-wrap">
            <view
              class="option-item"
              :class="{ correct: option.isAnswer }"
              v-for="(option, index) in item.options"
              :key="index"
            >
              <view class="option-title"
                >{{ String.fromCharCode(65 + index) }}.</view
              >
              <view class="option-content">{{ option.content }}</view>
            </view>
          </view>

          <view class="answer-wrap">
            <view class="answer-title">[回答]</view>
            <view class="my-answer" :class="item.correct ? 'correct' : 'wrong'"
              >我的答案：{{ item.answer }}</view
            >
            <text class="correct-answer"
              >正确答案：{{ item.correct_answer }}</text
            >
          </view>

          <view class="ai-wrap" v-if="item.ai_reason">
            <view class="ai-title">
              <view class="tag">beta</view>
              [AI打出的分数]
            </view>
            <view class="reson">{{ item.score }}</view>
          </view>

          <view class="ai-wrap" v-if="item.ai_reason">
            <view class="ai-title">
              <view class="tag">beta</view>
              [AI评分原因]
            </view>
            <view class="reson">{{ item.ai_reason }}</view>
          </view>

          <view class="ai-wrap" v-if="item.ai_answer">
            <view class="ai-title">
              <view class="tag">beta</view>
              [AI解析]
            </view>
            <view class="reson">{{ item.ai_answer }}</view>
          </view>

          <view class="analysis-wrap">
            <view class="analysis-title">[答案解析]</view>
            <view class="analysis">{{ item.analysis.content }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      questions: [],
      result: {},
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getResult();
  },
  methods: {
    getResult() {
      uni
        .post("/quiz/result", {
          record_id: this.id,
        })
        .then((res) => {
          this.result = res.data;
          const result = res.data;
          console.log(result);
          this.questions = Array.from(result.questions, (item) => {
            const obj = new Object();
            obj.question = item.question && JSON.parse(item.question);
            obj.analysis = item.analysis && JSON.parse(item.analysis);
            obj.type = this.questionTypeFilter(item.type);

            if (item.type == 1) {
              obj.options = JSON.parse(item.answer_single);
              obj.correct_answer = JSON.parse(item.answer_single).find(
                (item) => item.isAnswer
              ).content;
            } else if (item.type == 2) {
              obj.options = JSON.parse(item.answer_multiple);
              obj.correct_answer = JSON.parse(item.answer_multiple)
                .filter((item) => item.isAnswer)
                .map((item) => item.content)
                .join("、");
            } else if (item.type == 3) {
              obj.options = [
                {
                  content: "正确",
                  isAnswer: JSON.parse(item.answer_judge).answer ? true : false,
                },
                {
                  content: "错误",
                  isAnswer: JSON.parse(item.answer_judge).answer ? false : true,
                },
              ];
              obj.correct_answer = JSON.parse(item.answer_judge).answer
                ? "正确"
                : "错误";
            } else if (item.type == 4) {
              let str = "";
              JSON.parse(item.answer_fill).forEach((item, index) => {
                str += `\n空${index + 1}、${item.join("；")} `;
              });
              obj.correct_answer = str;
            }
            obj.question_score =
              result.each_score[
                item.type == 1
                  ? "single"
                  : item.type == 2
                  ? "multiple"
                  : item.type == 3
                  ? "judge"
                  : item.type == 4
                  ? "fill"
                  : "short"
              ];
            for (let key in result.answer_analysis[item.id]) {
              obj[key] = result.answer_analysis[item.id][key];
            }
            return obj;
          });
          console.log(this.questions);
        });
    },
    // 题目类型
    questionTypeFilter(value) {
      switch (String(value)) {
        case "1":
          return "单选题";
        case "2":
          return "多选题";
        case "3":
          return "判断题";
        case "4":
          return "填空题";
        case "5":
          return "简答题";
        default:
          return "未知类型";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./quiz_analysis.scss";
</style>
