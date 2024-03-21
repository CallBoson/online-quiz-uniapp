let clock = null;
export default {
  data() {
    return {
      id: "", // 答题id
      question_list: [
        {
          type: 1,
          answer_single: [],
          question: { content: "" },
        },
      ], // 题目列表
      quiz: {
        record_id: "", // 答题记录id
        start_time: "", // 开始时间
        each_score: {}, // 每题分数
        countdown_minutes: 0, // 倒计时
      }, // 答题信息
      current: 0, // 当前题目
      clock: 0, // 计时
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.startQuiz();
  },
  onUnload() {
    this.stopClock();
  },
  methods: {
    // 开始答题
    startQuiz() {
      uni
        .post("/quiz/start", {
          id: this.id,
        })
        .then((res) => {
          console.log(res);
          this.quiz = {
            record_id: res.data.record_id,
            start_time: res.data.start_time,
            each_score: res.data.each_score,
            countdown_minutes: res.data.countdown_minutes,
          };
          this.question_list = res.data.question_list;
          this.startClock();
        })
        .catch((err) => {
          uni.showToast({
            title: err.message,
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
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
    // 题目分数
    questionScoreFilter(type) {
      const value = String(type);
      if (value === "1") {
        return this.quiz.each_score.single;
      } else if (value === "2") {
        return this.quiz.each_score.multiple;
      } else if (value === "3") {
        return this.quiz.each_score.judge;
      } else if (value === "4") {
        return this.quiz.each_score.fill;
      } else if (value === "5") {
        return this.quiz.each_score.short;
      } else {
        return 0;
      }
    },
    // 开始计时
    startClock() {
      let start_time = new Date(this.quiz.start_time).getTime(); // 将时间转换为毫秒级别的时间戳
      clock = setInterval(() => {
        const now = new Date().getTime();
        const diff = Math.floor((now - start_time) / 1000);
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        this.clock = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      }, 500);
    },
    // 停止计时
    stopClock() {
      clearInterval(clock);
    },
    // 上一题
    prev() {
      if (this.current > 0) {
        this.current--;
      }
    },
    // 下一题
    next() {
      if (this.current < this.question_list.length - 1) {
        this.current++;
      }
    },
    // 选择单选题答案
    selectSingle(index) {
      this.question_list[this.current].answer_single.forEach((item) => {
        item.isChecked = false;
      });
      this.question_list[this.current].answer_single[index].isChecked = true;
    },
    // 选择多选题答案
    selectMultiple(index) {
      this.question_list[this.current].answer_multiple[index].isChecked =
        !this.question_list[this.current].answer_multiple[index].isChecked;
    },
    // 选择判断题答案
    selectJudge(index) {
      this.question_list[this.current].answer_judge.forEach((item) => {
        item.isChecked = false;
      });
      this.question_list[this.current].answer_judge[index].isChecked = true;
    },
    // 交卷
    submit() {
      uni.showModal({
        title: "提示",
        content: "确定要交卷吗？",
        success: (res) => {
          if (res.confirm) {
            this.stopClock();
            uni
              .post("/quiz/submit", {
                record_id: this.quiz.record_id,
                question_list: this.question_list,
              })
              .then((res) => {
                uni.redirectTo({
                  url:
                    "/pages/quiz/quiz_result/quiz_result?id=" +
                    this.quiz.record_id,
                });
              });
          }
        },
      });
    },
  },
};
