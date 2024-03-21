export default {
  data() {
    return {
      coverUrl: "", // 封面图片地址
      titleInput: "", // 标题输入框
      descInput: "", // 描述输入框
      questionList: [], // 题目列表
      isShowScoreWrap: true, // 是否展开设置题目分数/抽题
      isShowRuleWrap: true, // 是否展开答题规则
      settings: {
        is_shuffle: false, // 是否随机抽题
        each_score: {
          single: "10", // 单选题分数
          multiple: "10", // 多选题分数
          judge: "10", // 判断题分数
          fill: "10", // 填空题分数
          short: "10", // 简答题分数
        },
        is_show_answer: false, // 是否每答完一题答案
        is_date_range: false, // 是否开启时间限制
        date_range: {
          start: "", // 开始时间
          end: "", // 结束时间
        },
        is_countdown: false, // 是否开启倒计时
        countdown_minutes: "15", // 答题分钟
        is_random_options: false, // 是否选项乱序
      },
      date_range_picker: {
        isShowStartPicker: false, // 是否展示开始时间选择器
        isShowEndPicker: false, // 是否展示结束时间选择器
        params: {
          // 时间选择器参数
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
        },
      },
    };
  },
  mounted() {
    this.initDateRange();

    // 监听从题库选题完毕事件
    uni.$on("selectedQuestions", (questions) => {
      console.log(questions);
      this.questionList = this.questionList.concat(questions);
    });

    // 监听新建题目完毕事件
    uni.$on("manualAdded", (question) => {
      this.questionList.push(question);
    });
  },
  onUnload() {
    uni.$off("selectedQuestions");
    uni.$off("manualAdded");
  },
  methods: {
    // 初始化答题时间段
    initDateRange() {
      // 获取当前日期和时间
      const now = new Date();

      // 获取当天0点
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      // 获取1个月后的同一时间
      const endOfMonth = new Date(now);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(startOfDay.getDate());
      endOfMonth.setHours(23, 59, 0);

      this.settings.date_range.start = uni.$util.dateFormat(startOfDay);
      this.settings.date_range.end = uni.$util.dateFormat(endOfMonth);
    },
    // 上传封面图片
    chooseCover() {
      uni.uploadImage().then((res) => {
        this.coverUrl = res.data.url;
      });
    },
    // 从题库选择题目
    selectFromBank() {
      uni.navigateTo({
        url: "/pages/quiz/select_from_bank/select_from_bank",
      });
    },
    // 新建题目
    createQuestion() {
      uni.navigateTo({
        url: "/pages/my_question_bank/create_question/create_question?mode=manual",
      });
    },
    // 删除题目
    deleteQuestion(index) {
      this.questionList.splice(index, 1);
    },
    // 创建答题
    save() {
      const questionList = this.questionList.map((item) => {
        return {
          question: item.question,
          type: item.type,
          analysis: item.analysis,
          answer:
            item.type == 1
              ? item.answer_single
              : item.type == 2
              ? item.answer_multiple
              : item.type == 3
              ? item.answer_judge
              : item.answer_fill,
        };
      });
      uni
        .post("/quiz/create", {
          questionList,
          title: this.titleInput,
          description: this.descInput,
          cover: this.coverUrl,
          each_score: this.settings.each_score,
          is_shuffle: this.settings.is_shuffle,
          is_show_answer: this.settings.is_show_answer,
          date_range: this.settings.is_date_range
            ? [this.settings.date_range.start, this.settings.date_range.end]
            : null,
          countdown_minutes: this.settings.is_countdown
            ? this.settings.countdown_minutes
            : null,
          is_random_options: this.settings.is_random_options,
        })
        .then((res) => {
          uni.showToast({
            title: "创建成功",
            icon: "success",
            duration: 2000,
            success: () => {
              uni.redirectTo({
                url: "/pages/quiz/quiz_detail/quiz_detail?id=" + res.data.id,
              });
            },
          });
        });
    },
    // 获取题目选项
    getOptions(item) {
      const type = String(item.type);
      if (type === "1") {
        return item.answer_single;
      } else if (type === "2") {
        return item.answer_multiple;
      } else if (type === "3") {
        return [{ content: "正确" }, { content: "错误" }];
      } else {
        return [];
      }
    },
    // 获取题目答案文本
    getAnswerText(item) {
      const type = String(item.type);
      if (type === "1") {
        return item.answer_single.find((item) => item.isAnswer).content;
      } else if (type === "2") {
        return Array.from(
          item.answer_multiple.filter((item) => item.isAnswer),
          (obj) => {
            return obj.content;
          }
        ).join("；");
      } else if (type === "3") {
        return item.answer_judge.answer ? "正确" : "错误";
      } else if (type === "4") {
        let text = "\n";
        for (let i = 0; i < item.answer_fill.length; i++) {
          text += `空${i + 1}: ${item.answer_fill[i].join("；")}\n`;
        }
        return text;
      } else {
        return "";
      }
    },
  },
  computed: {
    // 题目总分
    questionTotalScore() {
      let total = 0;
      for (let i = 0; i < this.questionList.length; i++) {
        const item = this.questionList[i];
        const type = String(item.type);
        if (type === "1") {
          total += parseInt(this.settings.each_score.single);
        } else if (type === "2") {
          total += parseInt(this.settings.each_score.multiple);
        } else if (type === "3") {
          total += parseInt(this.settings.each_score.judge);
        } else if (type === "4") {
          total += parseInt(this.settings.each_score.fill);
        } else if (type === "5") {
          total += parseInt(this.settings.each_score.short);
        }
      }
      return total;
    },
  },
  filters: {
    // 题目类型
    questionTypeFilter(type) {
      switch (String(type)) {
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
    // 题型数量
    questionTypeCountFilter(value, type) {
      return value.filter((item) => String(item.type) === String(type)).length;
    },
  },
};
