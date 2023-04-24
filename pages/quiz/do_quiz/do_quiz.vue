<template>
	<view class="container">
		<view class="question-info-wrap">
			<view class="question-type">{{ questionTypeFilter(question_list[current].type) }}</view>
			<view class="question-num">{{ `${current + 1} / ${question_list.length}` }}</view>
		</view>

		<progress :percent="((current + 1) / question_list.length) * 100" activeColor="rgb(61, 126, 255)" stroke-width="3" />

		<view class="question-wrap">
			<view class="question">
				{{ question_list[current].question.content }}
				{{ `（${ questionScoreFilter(question_list[current].type) }分）` }}
			</view>
			<view class="option-wrap">
				<!-- 单选题 -->
				<block v-if="question_list[current].type == 1">
					<view
						v-for="(item, index) in question_list[current].answer_single"
						:key="index"
						class="option-item"
						:class="{'active': item.isChecked}"
						@click="selectSingle(index)">
						<view class="icon-index">{{ String.fromCharCode(65 + index) }}</view>
						<view class="content">{{ item.content }}</view>
					</view>
				</block>
				<!-- 多选题 -->
				<block v-else-if="question_list[current].type == 2">
					<view
						v-for="(item, index) in question_list[current].answer_multiple"
						:key="index"
						class="option-item"
						:class="{'active': item.isChecked}"
						@click="selectMultiple(index)">
						<view class="icon-index">{{ String.fromCharCode(65 + index) }}</view>
						<view class="content">{{ item.content }}</view>
					</view>
				</block>
				<!-- 判断题 -->
				<block v-else-if="question_list[current].type == 3">
					<view
						v-for="(item, index) in question_list[current].answer_judge"
						:key="index"
						class="option-item"
						:class="{'active': item.isChecked}"
						@click="selectJudge(index)">
						<view class="icon-index">{{ String.fromCharCode(65 + index) }}</view>
						<view class="content">{{ item.content }}</view>
					</view>
				</block>
				<!-- 填空题 -->
				<block v-else-if="question_list[current].type == 4">
					<view
						v-for="(item, index) in question_list[current].answer_fill"
						:key="index"
						class="input-item">
						<view class="title">空{{ index + 1 }}答案：</view>
						<input v-model="question_list[current].answer_fill[index]" type="text" placeholder="请输入填空答案">
					</view>
				</block>
				<!-- 简答题 -->
				<block v-else-if="question_list[current].type == 5">
					<textarea
						v-model="question_list[current].answer_short.content"
						placeholder="请填写简答题答案">
					</textarea>
				</block>
			</view>
		</view>

		<view class="bottom-wrap">
			<view class="left-wrap">
				<text class="tn-icon-ticket"></text>
				答题卡
				{{ clock }}
			</view>
			<view class="right-wrap">
				<tn-button
					v-if="current !== 0"
					backgroundColor="tn-bg-blue"
					fontColor="tn-color-white"
					@click="prev">
					上一题
				</tn-button>
				<tn-button
					v-if="(current + 1) !== question_list.length"
					backgroundColor="tn-bg-blue"
					fontColor="tn-color-white"
					@click="next">
					下一题
				</tn-button>
				<tn-button
					v-else
					@click="submit"
					backgroundColor="tn-bg-blue" 
					fontColor="tn-color-white">
					交卷
				</tn-button>
			</view>
		</view>
	</view>
</template>

<script>
import do_quiz from './do_quiz'
export default do_quiz
</script>

<style lang="scss" scoped>
@import './do_quiz.scss';
</style>
