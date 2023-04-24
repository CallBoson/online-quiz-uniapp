<template>
	<view class="container">
		<view class="card question-wrap">
			<view class="type-wrap">
				<view class="title">切换题型</view>
				<view class="type-select" @click="selectQuestionType">
					{{ typeArray[currentQuestionType - 1] }}
					<text class="tn-icon-right"></text>
				</view>
			</view>
			<view class="question-title-wrap">
				<view class="title">题目</view>
				<textarea cols="30" rows="10" placeholder="点击输入题目内容" :value="question.content" @input="input_question"></textarea>
			</view>
		</view>
		<view class="card options-wrap">
			<!-- 单选题 -->
			<block v-if="currentQuestionType === 1">
				<view class="title">选项</view>
				<view class="list-wrap">
					<radio-group @change="change_single">
						<view class="list-item" v-for="(item, index) in options_single" :key="index">
							<text class="tn-icon-reduce-circle-fill" @click="removeOption(index)"></text>
							<view class="input-wrap">
								<view class="prefix-index">{{ String.fromCharCode(65 + index) }}.</view>
								<input type="text" :value="options_single[index].content" @input="input_single" :data-index="index" :placeholder="`请输入选项 ${index+1}`">
							</view>
							<radio :value="String(index)" :checked="item.isAnswer" />
						</view>
					</radio-group>
				</view>
				<view class="add-option" @click="addOption">
					<text class="tn-icon-add-fill"></text>
					添加选项
				</view>
			</block>
			<!-- 多选题 -->
			<block v-else-if="currentQuestionType === 2">
				<view class="title">选项</view>
				<view class="list-wrap">
					<checkbox-group @change="change_multiple">
						<view class="list-item" v-for="(item, index) in options_multiple" :key="index">
							<text class="tn-icon-reduce-circle-fill" @click="removeOption(index)"></text>
							<view class="input-wrap">
								<view class="prefix-index">{{ String.fromCharCode(65 + index) }}.</view>
								<input type="text" :value="options_multiple[index].content" @input="input_multiple" :data-index="index" :placeholder="`请输入选项 ${index+1}`">
							</view>
							<checkbox :value="String(index)" :checked="item.isAnswer" />
						</view>
					</checkbox-group>
				</view>
				<view class="add-option" @click="addOption">
					<text class="tn-icon-add-fill"></text>
					添加选项
				</view>
			</block>
			<!-- 判断题 -->
			<block v-else-if="currentQuestionType === 3">
				<view class="title">选项</view>
				<view class="list-wrap">
					<radio-group @change="change_judge">
						<!-- 正确 -->
						<view class="list-item">
							<view class="input-wrap">
								<view class="prefix-index">{{ String.fromCharCode(65) }}.</view>
								正确
							</view>
							<radio value="1" :checked="!!options_judge.answer" />
						</view>
						<!-- 错误 -->
						<view class="list-item">
							<view class="input-wrap">
								<view class="prefix-index">{{ String.fromCharCode(66) }}.</view>
								错误
							</view>
							<radio value="0" :checked="!options_judge.answer" />
						</view>
					</radio-group>
				</view>
			</block>
			<!-- 填空题 -->
			<block v-else-if="currentQuestionType === 4">
				<view class="title">填空</view>
				<view class="fill-list-wrap">
					<view class="list-item" v-for="(fill,findex) in options_fill" :key="findex">
						<view class="close-wrap">
							<view class="text">
								空{{ findex + 1 }}参考答案
								<text class="small-text"> (答案匹配任何一个都得分)</text>
							</view>
							<text class="tn-icon-close-fill" @click="removeOption(findex)"></text>
						</view>
						<view class="input-wrap" v-for="(answer,aindex) in fill">
							<text class="tn-icon-reduce-circle-fill" @click="removeFillAnswer(findex,aindex)"></text>
							<input :value="options_fill[findex][aindex]" @input="input_fill" :data-index="findex" :data-i="aindex" type="text" :placeholder="`请输入参考答案${aindex + 1}`">
						</view>
						<view class="add-answer-wrap" @click="addFillAnswer(findex)">
							<text class="tn-icon-add-fill"></text>
							添加参考答案
						</view>
					</view>
				</view>
				<view class="add-fill-wrap" @click="addOption">
					<text class="tn-icon-add-circle"></text>
					插入一个填空项
				</view>
			</block>
			<!-- 简答题 -->
			<view v-else class="short-tip">
				<view class="tag">beta</view>
				简答题目前仅支持AI评分
			</view>
		</view>
		<view class="card analysis-wrap">
			<view class="title">解析</view>
			<textarea placeholder="点击输入答案解析内容" maxlength="1000" :value="analysis.content" @input="input_analysis"></textarea>
		</view>
		<button class="save-btn" @click="save">保存</button>
	</view>
</template>

<script>
import create_question from './create_question'
export default create_question
</script>

<style lang="scss" scoped>
@import './create_question.scss';
</style>
