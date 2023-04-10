<template>
	<view class="container">
		<!-- 封面 -->
		<view class="large-title">封面</view>
		<view class="cover-wrap" @click="chooseCover">
			<image :src="coverUrl" mode="aspectFill" />
			<view class="cover-btn">上传封面</view>
		</view>
		<!-- 标题 -->
		<view class="large-title">标题</view>
		<view class="title-input-wrap">
			<input v-model="titleInput" type="text" placeholder="请输入标题" />
		</view>
		<!-- 描述 -->
		<view class="large-title">描述</view>
		<view class="desc-input-wrap">
			<textarea v-model="descInput" type="text" placeholder="请输入答题描述"></textarea>
		</view>
		<!-- 题目 -->
		<view class="large-title">题目</view>
		<view class="question-wrap">
			<view class="question-list">
				<view
					v-for="(item, index) in questionList"
					:key="index"
					class="question-item">
					<!-- 题目类型 -->
					<view class="question-info-wrap">
						<view class="question-type">{{ item.type | questionTypeFilter }}</view>
						<view class="icons-wrap">
							<text class="tn-icon-edit"></text>
							<text class="tn-icon-delete"></text>
						</view>
					</view>
					<!-- 题目 -->
					<view class="question-content-wrap">{{ index + 1 }}.{{ item.question.content }}</view>
					<!-- 题目详情 -->
					<view class="question-detail">
						<view class="options-wrap">
							<view class="option-item" v-for="(option, index) in getOptions(item)" :key="option.id">
								<view class="option-index">{{ String.fromCharCode(65 + index) }}.</view>
								<view class="option-content">{{ option.content }}</view>
							</view>
						</view>
						<text class="question-answer">
							<text style="color: darkgray;margin-right: 10rpx;">[答案]</text>
							{{ getAnswerText(item) }}
						</text>
						<view v-if="item.analysis" class="question-analysis">
							<text style="color: darkgray;margin-right: 10rpx;">[解析]</text>
							{{ item.analysis.content }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="create-wrap">
			<view class="create-btn" @click="selectFromBank">
				<text class="tn-icon-around"></text>
				从题库选题
			</view>
			<view class="create-btn" @click="createQuestion">
				<text class="tn-icon-add-circle"></text>
				新建题目
			</view>
		</view>
		<!-- 设置题目分数/抽题 -->
		<view class="score-wrap fold-card">
			<view class="title-wrap" @click="isShowScoreWrap = !isShowScoreWrap">
				<view class="title">设置题目分数/抽题</view>
				<text class="tn-icon-right" :style="{ transform: `rotate(${isShowScoreWrap ? 90 : 0}deg)` }"></text>
			</view>
			<block v-if="isShowScoreWrap">
				<view class="row">
					<view class="row-title">随机出题</view>
					<tn-switch v-model="settings.is_shuffle"></tn-switch>
				</view>
				<!-- 单选题 -->
				<view class="row">
					<view class="row-title type">
						单选题
						<text>(共{{ questionList, 1 | questionTypeCountFilter }}题)</text>
					</view>
					<view class="input-col">
						每题
						<input type="number" v-model="settings.each_score.single">
						分
					</view>
				</view>
				<!-- 多选题 -->
				<view class="row">
					<view class="row-title type">
						多选题
						<text>(共{{ questionList, 2 | questionTypeCountFilter }}题)</text>
					</view>
					<view class="input-col">
						每题
						<input type="number" v-model="settings.each_score.multiple">
						分
					</view>
				</view>
				<!-- 判断题 -->
				<view class="row">
					<view class="row-title type">
						判断题
						<text>(共{{ questionList, 3 | questionTypeCountFilter }}题)</text>
					</view>
					<view class="input-col">
						每题
						<input type="number" v-model="settings.each_score.judge">
						分
					</view>
				</view>
				<!-- 填空题 -->
				<view class="row">
					<view class="row-title type">
						填空题
						<text>(共{{ questionList, 4 | questionTypeCountFilter }}题)</text>
					</view>
					<view class="input-col">
						每题
						<input type="number" v-model="settings.each_score.fill">
						分
					</view>
				</view>
				<!-- 简答题 -->
				<view class="row">
					<view class="row-title type">
						简答题
						<text>(共{{ questionList, 5 | questionTypeCountFilter }}题)</text>
					</view>
					<view class="input-col">
						每题
						<input type="number" v-model="settings.each_score.short">
						分
					</view>
				</view>
				<view class="sub-total">已选 {{ questionList.length }} 题，总分 {{ questionTotalScore }} 分</view>
			</block>
		</view>
		<!-- 答题规则 -->
		<view class="rule-wrap fold-card">
			<view class="title-wrap" @click="isShowRuleWrap = !isShowRuleWrap">
				<view class="title">答题规则</view>
				<text class="tn-icon-right" :style="{ transform: `rotate(${isShowRuleWrap ? 90 : 0}deg)` }"></text>
			</view>
			<block v-if="isShowRuleWrap">
				<view class="row">
					<view class="row-title">答题时间段</view>
					<tn-switch v-model="settings.is_date_range"></tn-switch>
				</view>
				<block v-if="settings.is_date_range">
					<view class="row">
						<view class="sub-row-title">开始时间</view>
						<view class="date-range-col" @click="date_range_picker.isShowStartPicker = true">
							{{ settings.date_range.start }}
							<text class="tn-icon-right"></text>
						</view>
					</view>
					<view class="row">
						<view class="sub-row-title">结束时间</view>
						<view class="date-range-col" @click="date_range_picker.isShowEndPicker = true">
							{{ settings.date_range.end }}
							<text class="tn-icon-right"></text>
						</view>
					</view>
				</block>
				<view class="row">
					<view class="row-title">每题显示答案</view>
					<tn-switch v-model="settings.is_show_answer"></tn-switch>
				</view>
				<view class="row">
					<view class="row-title">计时答题</view>
					<tn-switch v-model="settings.is_countdown"></tn-switch>
				</view>
				<view class="row" v-if="settings.is_countdown">
					<view class="sub-row-title">倒计时</view>
					<view class="input-col">
						<input type="number" v-model="settings.countdown_minutes">
						分钟
					</view>
				</view>
				<view class="row">
					<view class="row-title">选项乱序</view>
					<tn-switch v-model="settings.is_random_options"></tn-switch>
				</view>
			</block>
		</view>

		<view class="save-btn" @click="save">创建答题</view>

		<!-- 时间段选择器 -->
		<tn-picker mode="time" title="开始时间" :defaultTime="settings.date_range.start" v-model="date_range_picker.isShowStartPicker" :params="date_range_picker.params"></tn-picker>
		<tn-picker mode="time" title="结束时间" :defaultTime="settings.date_range.end" v-model="date_range_picker.isShowEndPicker" :params="date_range_picker.params"></tn-picker>
	</view>
</template>

<script>
import create from './create'
export default create
</script>

<style scoped lang="scss">
@import './create.scss';
</style>
