<template>
  <view class="container template-about tn-safe-area-inset-bottom">
    <view class="top-backgroup">
      <image
        src="https://tnuiimage.tnkjapp.com/swiper/summer.jpg"
        mode="widthFix"
        class="backgroud-image"
      ></image>
    </view>

    <view class="tnwave waveAnimation">
      <view class="waveWrapperInner bgTop">
        <view
          class="wave waveTop"
          style="
            background-image: url('https://tnuiimage.tnkjapp.com/wave/wave-2.png');
          "
        ></view>
      </view>
      <view class="waveWrapperInner bgMiddle">
        <view
          class="wave waveMiddle"
          style="
            background-image: url('https://tnuiimage.tnkjapp.com/wave/wave-2.png');
          "
        ></view>
      </view>
      <view class="waveWrapperInner bgBottom">
        <view
          class="wave waveBottom"
          style="
            background-image: url('https://tnuiimage.tnkjapp.com/wave/wave-1.png');
          "
        ></view>
      </view>
    </view>

    <view class="about__wrap">
      <!-- 头像用户信息 -->
      <view
        class="user-info__container tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center"
        @click="toLogin"
      >
        <view
          class="user-info__avatar tn-bg-grey--light tn-flex tn-flex-col-center tn-flex-row-center"
        >
          <view
            class="tn-shadow-blur"
            style="width: 170rpx; height: 170rpx; background-size: cover"
            :style="{
              backgroundImage: `url(${
                avatar || 'https://tnuiimage.tnkjapp.com/blogger/avatar_2.jpeg'
              })`,
            }"
          >
          </view>
          <!-- <view class="tn-icon-logo-tuniao" style="font-size: 140rpx;color: #01BEFF;"></view> -->
        </view>
        <view class="user-info__nick-name">{{ username || "未登录" }}</view>
      </view>

      <!-- 消息&数据 -->
      <view
        class="tn-shadow-warp"
        style="margin-top: 100rpx; background-color: rgba(255, 255, 255, 1)"
      >
        <!-- <view class="tn-flex">
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="">
                <view class="tn-text-xxl tn-color-orange">1.29W</view>
              </view>
              <view class="tn-margin-top-xs tn-color-gray tn-text-df tn-text-center">
                <text class="tn-icon-fire"></text>
                <text class="tn-padding-left-xs">人气</text>
              </view>
            </view>
          </view>
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="">
                <view class="tn-text-xxl tn-color-blue">216</view>
              </view>
              <view class="tn-margin-top-xs tn-color-gray tn-text-df tn-text-center">
                <text class="tn-icon-share-circle"></text>
                <text class="tn-padding-left-xs">分享</text>
              </view>
            </view>
          </view>
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="">
                <view class="tn-text-xxl tn-color-red">962</view>
              </view>
              <view class="tn-margin-top-xs tn-color-gray tn-text-df tn-text-center">
                <text class="tn-icon-like"></text>
                <text class="tn-padding-left-xs">爱心</text>
              </view>
            </view>
          </view>
        </view> -->
      </view>

      <!-- 更多信息-->
      <view
        class="about-shadow tn-margin-top-xl tn-padding-top-sm tn-padding-bottom-sm tn-margin-left tn-margin-right"
      >
        <tn-list-cell
          @click="toMyQuestionBank"
          :hover="true"
          :unlined="true"
          :radius="true"
          :fontSize="30"
        >
          <view class="tn-flex tn-flex-col-center">
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-5 tn-color-white"
            >
              <view class="tn-icon-logo-tuniao"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">我的题库</view>
            <view class="tn-margin-left-sm tn-color-cyan tn-icon-link"></view>
          </view>
        </tn-list-cell>
        <tn-list-cell
          @click="toMyQuiz"
          :hover="true"
          :unlined="true"
          :radius="true"
          :fontSize="30"
        >
          <view class="tn-flex tn-flex-col-center">
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-1 tn-color-white"
            >
              <view class="tn-icon-like-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">我的答题</view>
            <!-- <view class="tn-margin-left-sm tn-color-blue tn-icon-copy-fill"></view> -->
          </view>
        </tn-list-cell>
        <!-- <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
          <view class="tn-flex tn-flex-col-center">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-2 tn-color-white"> 
              <view class="tn-icon-set-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">更新日志</view>
            <view class="tn-margin-left-sm tn-color-gray">懒</view>
          </view>
        </tn-list-cell> -->
      </view>

      <!-- 更多信息-->
      <view
        class="about-shadow tn-margin-top-xl tn-padding-top-sm tn-padding-bottom-sm tn-margin-left tn-margin-right"
      >
        <tn-list-cell
          @click="toProfile"
          :hover="true"
          :unlined="true"
          :radius="true"
          :fontSize="30"
        >
          <view class="tn-flex tn-flex-col-center">
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-16 tn-color-white"
            >
              <view class="tn-icon-wechat-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">个人信息</view>
            <view class="tn-margin-left-sm tn-color-cyan tn-icon-link"></view>
          </view>
        </tn-list-cell>
        <!-- <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
          <view class="tn-flex tn-flex-col-center">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-8 tn-color-white"> 
              <view class="tn-icon-message-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">问题反馈</view>
            <view class="tn-margin-left-sm tn-color-blue tn-icon-copy-fill"></view>
          </view>
        </tn-list-cell> -->
        <!-- <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
          <view class="tn-flex tn-flex-col-center">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-6 tn-color-white"> 
              <view class="tn-icon-phone-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">技术支持</view>
            <view class="tn-margin-left-sm tn-color-orangered tn-text-sm tn-padding-left-xs tn-padding-right-xs tn-bg-orange--disabled tn-round">136****0470</view>
          </view>
        </tn-list-cell> -->
        <!-- <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
          <view class="tn-flex tn-flex-col-center">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-12 tn-color-white"> 
              <view class="tn-icon-safe-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">会员协议</view>
            <view class="tn-margin-left-sm tn-color-red tn-icon-fire-fill"></view>
          </view>
        </tn-list-cell> -->
        <tn-list-cell
          @click="logout"
          :hover="true"
          :unlined="true"
          :radius="true"
          :fontSize="30"
        >
          <view class="tn-flex tn-flex-col-center">
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-1 tn-color-white"
            >
              <view class="tn-icon-logout"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1" style="color: #e83a30"
              >退出登录</view
            >
          </view>
        </tn-list-cell>
      </view>
    </view>
  </view>
</template>

<script>
import account from "./account.js";
export default account;
</script>

<style lang="scss" scoped>
@import "./account.scss";
</style>
