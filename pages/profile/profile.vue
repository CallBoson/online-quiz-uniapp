<template>
  <view class="container">
    <view class="form-wrap">
      <view class="row">
        <view class="row-title">修改头像</view>
        <view class="image-wrap" @click="chooseCover">
          <image v-if="avatar" class="avatar" :src="avatar" />
          <view v-else class="empty-wrap">
            <text class="tn-icon-camera-fill"></text>
          </view>
        </view>
      </view>
      <view class="row">
        <view class="row-title">昵称</view>
        <input
          v-model="username"
          type="text"
          placeholder="输入一个可爱的昵称吧～"
        />
      </view>
      <view class="row description">
        <view class="row-title">个人简介</view>
        <textarea
          v-model="description"
          type="text"
          placeholder="填写简介更容易获得关注哦～"
        ></textarea>
      </view>
    </view>
    <view class="save-btn" @click="save">保存</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatar: "",
      username: "",
      description: "",
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      uni.post("/user/profile").then((res) => {
        this.avatar = res.data.avatar;
        this.username = res.data.username;
        this.description = res.data.description;
      });
    },
    chooseCover() {
      uni.uploadImage().then((res) => {
        this.avatar = res.data.url;
      });
    },
    save() {
      uni.showLoading();
      uni
        .post("/user/update", {
          avatar: this.avatar,
          username: this.username,
          description: this.description,
        })
        .then((res) => {
          this.$store.commit("setUsername", this.username);
          this.$store.commit("setAvatar", this.avatar);
          uni.navigateBack();
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #f5f5f5;
  padding: 30rpx;
  min-height: 100vh;
}

.form-wrap {
  background-color: #fff;
  border-radius: 12rpx;

  .row {
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #eaeaea;
    padding: 30rpx;

    .row-title {
      font-size: 32rpx;
      width: 200rpx;
    }

    .image-wrap {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;

      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      .empty-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        font-size: 55rpx;
        color: rgba(0, 0, 0, 0.3);
      }
    }
  }

  .row.description {
    align-self: flex-start;
  }
}

.save-btn {
  width: 100%;
  background-color: rgb(114, 163, 249);
  margin-top: 30rpx;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12rpx;
  height: 80rpx;
  font-size: 32rpx;
}
</style>
