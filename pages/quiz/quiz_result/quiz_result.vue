<template>
  <view class="container">
    <view class="score-wrap">
      <view class="title">{{ result.title }}</view>
      <view class="score">{{ result.score }}</view>
      <view v-if="ai_marking_count > 0" class="ai-desc">
        <view class="ai-tag">BETA</view>
        AI正为您自动打分简答题，剩余{{ ai_marking_count }}题
        <view class="ai-btn" @click="getResult">刷新</view>
      </view>
      <view class="desc">{{
        `共${result.question_count}题，满分${result.total_score}分`
      }}</view>
    </view>

    <view class="number-wrap">
      <view class="correct-wrap">
        <view class="number-item">
          <view class="number">{{ result.correct_count }}</view>
          <view class="desc">答对</view>
        </view>
        <view class="number-item">
          <view class="number">{{
            result.question_count - result.correct_count
          }}</view>
          <view class="desc">错误</view>
        </view>
        <view class="number-item">
          <view class="number"
            >{{
              result.correct_count &&
              ((result.correct_count / result.question_count) * 100).toFixed(1)
            }}%</view
          >
          <view class="desc">正确率</view>
        </view>
      </view>
      <view class="time-wrap">
        <view class="desc">用时</view>
        <view class="number">{{ getTime() }}</view>
      </view>
    </view>

    <view class="btns-wrap">
      <view class="btn" @click="toAnalysis">查看回答与解析</view>
      <view class="btn">再答一次</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: "", // 答题记录id
      result: {}, // 答题结果
      ai_marking_count: 0, // AI正在打分的题目数量
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
          console.log(res.data);
          this.result = res.data;
          let ai_marking_count = 0;

          // 统计AI正在打分的题目数量
          for (let key in res.data.answer_analysis) {
            if (res.data.answer_analysis[key].ai_marking) {
              ai_marking_count++;
            }
          }

          this.ai_marking_count = ai_marking_count;
        });
    },
    // 获取答题用时
    getTime() {
      try {
        const start_time = new Date(this.result.start_time);
        const end_time = new Date(this.result.end_time);
        const time = end_time.getTime() - start_time.getTime();

        const hour = Math.floor(time / 1000 / 60 / 60)
          .toString()
          .padStart(2, "0");
        const minute = Math.floor((time / 1000 / 60) % 60)
          .toString()
          .padStart(2, "0");
        const second = Math.floor((time / 1000) % 60)
          .toString()
          .padStart(2, "0");

        return `${hour}:${minute}:${second}`;
      } catch (err) {
        return "00:00:00";
      }
    },
    // 查看回答与解析
    toAnalysis() {
      uni.navigateTo({
        url: `/pages/quiz/quiz_analysis/quiz_analysis?id=${this.id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #f0f0f0;
  padding: 30rpx;
  min-height: 100vh;
}

.score-wrap {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx;
  border-radius: 15rpx;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
  }

  .score {
    font-size: 80rpx;
    font-weight: bold;
    color: #568bff;
  }

  .ai-desc {
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    color: #ff566f;

    .ai-tag {
      background-color: #ff5656;
      color: #fff;
      font-size: 25rpx;
      padding: 5rpx 10rpx;
      border-radius: 10rpx;
      margin-right: 10rpx;
    }

    .ai-btn {
      font-size: 25rpx;
      margin-left: 10rpx;
      background-color: #568bff;
      color: #fff;
      padding: 5rpx 10rpx;
      border-radius: 10rpx;
    }
  }

  .desc {
    font-size: 25rpx;
    color: #999;
    margin-top: 20rpx;
  }
}

.number-wrap {
  background-color: #fff;
  border-radius: 15rpx;
  margin-top: 30rpx;
  padding: 30rpx;

  .correct-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
    padding-bottom: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;

    .number-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .number {
        font-size: 45rpx;
        font-weight: bold;
        color: #568bff;
      }

      &:nth-child(1) .number {
        color: #4acb50;
      }

      &:nth-child(2) .number {
        color: #ff566f;
      }

      &:nth-child(3) .number {
        color: #333;
      }

      .desc {
        font-size: 25rpx;
        color: #999;
      }
    }
  }

  .time-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30rpx;

    .desc {
      font-size: 25rpx;
      color: #999;
    }

    .number {
      font-weight: bold;
      color: #333;
      font-size: 45rpx;
    }
  }
}

.btns-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 30rpx;
  .btn {
    background-color: #568bff;
    color: #fff;
    width: 330rpx;
    height: 80rpx;
    border-radius: 15rpx;
    font-size: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
