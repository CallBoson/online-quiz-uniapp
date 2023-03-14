import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import NavIndexButton from '@/libs/components/nav-index-button.vue'
export default {
	name: 'TemplateJob',
	mixins: [template_page_mixin],
	components: {
		NavIndexButton
	},
	data() {
		return {
			banner: [{
				image: 'https://tnuiimage.tnkjapp.com/swiper/tnbanner1.jpg'
			}, {
				image: 'https://tnuiimage.tnkjapp.com/swiper/tnbanner2.jpg'
			}, {
				image: 'https://tnuiimage.tnkjapp.com/swiper/tnbanner3.jpg'
			}, {
				image: 'https://tnuiimage.tnkjapp.com/swiper/tnbanner4.jpg'
			}],
			tuniaoData: [{
					title: '职位推荐',
					icon: 'praise',
					color: 'purplered',
					value: '32'
				},
				{
					title: '课程专区',
					icon: 'discover',
					color: 'green',
					value: '65'
				},
				{
					title: '精选专题',
					icon: 'topics',
					color: 'orange',
					value: '26'
				},
				{
					title: '在线简历',
					icon: 'honor',
					color: 'indigo',
					value: '6'
				}
			],
			icons: [{
					icon: "shop",
					title: "电商",
				},
				{
					icon: "video",
					title: "直播",
				},
				{
					icon: "company",
					title: "建筑",
				},
				{
					icon: "computer",
					title: "互联网",
				},
				{
					icon: "focus",
					title: "猎头",
				},
				{
					icon: "sing",
					title: "音乐",
				},
				{
					icon: "code",
					title: "软件开发",
				},
				{
					icon: "medical",
					title: "医疗",
				},
				{
					icon: "biology",
					title: "生物",
				},
				{
					icon: "pharmacy",
					title: "制药",
				},
				{
					icon: "chemistry",
					title: "化学",
				},
				{
					icon: "creative",
					title: "教师",
				},
				{
					icon: "gloves",
					title: "行政文秘",
				},
				{
					icon: "caring",
					title: "通信技术",
				},
				{
					icon: "refund",
					title: "外贸",
				},
				{
					icon: "level",
					title: "土木",
				},
				{
					icon: "deploy",
					title: "机械",
				},
				{
					icon: "server",
					title: "电气",
				},
				{
					icon: "hardware",
					title: "电子",
				},
				{
					icon: "group-circle",
					title: "化工",
				},
				{
					icon: "cube",
					title: "材料",
				},
				{
					icon: "safe",
					title: "保险",
				},
				{
					icon: "coupon",
					title: "证券",
				},
				{
					icon: "funds",
					title: "银行",
				},
				{
					icon: "map",
					title: "会展",
				},
				{
					icon: "service",
					title: "客服",
				},
				{
					icon: "trophy",
					title: "销售",
				},
				{
					icon: "image-text",
					title: "编辑运营",
				},
				{
					icon: "brand",
					title: "投行",
				},
				{
					icon: "trusty",
					title: "法务",
				},
				{
					icon: "comment",
					title: "咨询",
				},
				{
					icon: "logistics",
					title: "快递物流",
				},
				{
					icon: "moon",
					title: "艺术设计",
				},
				{
					icon: "bankcard",
					title: "财务",
				},
				{
					icon: "trust",
					title: "人力",
				},
				{
					icon: "flag",
					title: "市场营销",
				},
				{
					icon: "signpost",
					title: "其他",
				}


			],
		}
	},
	methods: {

	}
}
