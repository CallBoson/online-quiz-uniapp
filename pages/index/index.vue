<template>
  <view class="template-job tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed :isBack="false" :bottomShadow="false" backgroundColor="#FFFFFF">
      <view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
        <!-- 返回按钮 -->
        <view class="custom-nav__back">
          <view class="logo-pic tn-shadow-blur" style="background-image:url('https://tnuiimage.tnkjapp.com/logo/logo2.png')">
            <view class="logo-image">
            </view>
          </view> 
          <!-- <view class="tn-icon-left"></view> -->
        </view>
        <!-- 搜索框 -->
        <view class="custom-nav__search tn-flex tn-flex-col-center tn-flex-row-center ">
          <view class="custom-nav__search__box tn-flex tn-flex-col-center tn-flex-row-left tn-color-gray--dark tn-bg-gray--light">
            <view class="custom-nav__search__icon tn-icon-search"></view>
            <view class="custom-nav__search__text tn-padding-left-xs">好想搜点什么</view>
          </view>
        </view>
      </view>
    </tn-nav-bar>
    
    
    <view class="tn-margin-top" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <tn-swiper :list="banner" :height="350" :effect3d="true" mode="round"></tn-swiper>
    </view>

    <view class="create-btn">
      <button>创建答题</button>
    </view>
    
    <!-- 数据信息 -->
    <view class="tn-info__container tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-between tn-margin">
      <block v-for="(item, index) in tuniaoData" :key="index">
        <view class="tn-info__item tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between job-shadow">
          <view class="tn-info__item__left tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
            <view class="tn-info__item__left--icon tn-flex tn-flex-col-center tn-flex-row-center tn-color-white" :class="[`tn-bg-${item.color}`]">
              <view :class="[`tn-icon-${item.icon}`]"></view>
            </view>
            <view class="tn-info__item__left__content">
              <view class="tn-info__item__left__content--title">{{ item.title }}</view>
              <view class="tn-info__item__left__content--data tn-padding-top-xs">{{ item.value }}</view>
            </view>
          </view>
          <view class="tn-info__item__right">
            <view class="tn-info__item__right--icon">
              <view class="tn-icon-right"></view>
            </view>
          </view>
        </view>
      </block>
    </view>
    
    <!-- 方式16 start-->
    <view class="tn-flex tn-flex-wrap tn-margin job-shadow">
      <block v-for="(item, index) in icons" :key="index">
        <view class=" " style="width: 25%;">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center  tn-padding-xl">
            <view class="icon16__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
              <view class="tn-cool-color-icon16" :class="[$tn.color.getRandomCoolBgClass(index) + ' tn-icon-' + item.icon]"></view>
            </view>  
            <view class="tn-color-black tn-text-lg tn-text-center">
              <text class="tn-text-ellipsis">{{item.title}}</text>
            </view>
          </view>
        </view>
      </block>
    </view>
    
  </view>
</template>

<script>
import index from './indexJs.js'
export default index
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
