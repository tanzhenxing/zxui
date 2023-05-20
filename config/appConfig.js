// 正式版
const APP_URL = 'https://app.wufu-app.com'; // 应用网址（绑定了微信网页授权）
const API_URL = 'https://sfe-wechat-api.wufu-app.com'; // api接口网址
const SHARE_APPID = 'wx41474037d157fa36'; // 微信jssdk 使用的 appid
const MINI_PROGRAM_APPID = 'wxaeeafaae31f05fcf'; // 微信小程序appid
const MAP_KEY = 'UH4BZ-LFLW3-ASJ3Q-3JBX2-2BBPK-RXBZV'; // 腾讯地图key
const LOGIN_PATH = '/pages/login/login'; // 登陆入口
const API_LOG = false; // 是否开启api接口错误日志
const JSSDK_DEBUG = false; // 微信jssdk调试开关

export default {
	jsSdkDebug: JSSDK_DEBUG,
	apiLog: API_LOG,
	apiUrl: API_URL,
	appUrl: APP_URL,
	shareAppid: SHARE_APPID,
	miniProgramAppid: MINI_PROGRAM_APPID,
	mapKey: MAP_KEY,
	loginPath: LOGIN_PATH,
	header: {
		['Content-Type']: 'application/json',
		['X-Requested-With']: 'XMLHttpRequest'
	},
	tokenKey: 'authtoken',
	appIdKey: 'appid',
	componentAppidKey: 'component_appid',
	schoolIdKey: 's_id',
	userInfoKey: 'user_info',
	wechatUserInfoKey: 'wechat_user_info',
	SchoolInfoKey: 'school_info',
	referrerIdKey: 'r_id',
	referrerUrlKey: 'referrer_url',
	pageConfigKey: 'page_config',
	registerKey: 'register',
	homeAdKey: 'home_ad',
	jsApiTicketKey: 'jsapi_ticket',
	jsApiList: [
		'checkJsApi',
		'onMenuShareAppMessage',
		'onMenuShareTimeline',
		'updateAppMessageShareData',
		'updateTimelineShareData',
		'onMenuShareWeibo',
		'onMenuShareQZone',
		'startRecord',
		'stopRecord',
		'onVoiceRecordEnd',
		'playVoice',
		'pauseVoice',
		'stopVoice',
		'onVoicePlayEnd',
		'uploadVoice',
		'downloadVoice',
		'chooseImage',
		'previewImage',
		'uploadImage',
		'downloadImage',
		'translateVoice',
		'getNetworkType',
		'openLocation',
		'getLocation',
		'hideOptionMenu',
		'showOptionMenu',
		'hideMenuItems',
		'showMenuItems',
		'hideAllNonBaseMenuItem',
		'showAllNonBaseMenuItem',
		'closeWindow',
		'scanQRCode',
		'chooseWXPay',
		'openProductSpecificView',
		'addCard',
		'chooseCard',
		'openCard'
	],
	openTagList: [
		'wx-open-launch-weapp',
		'wx-open-launch-app',
		'wx-open-subscribe',
		'wx-open-audio'
	],
	adOpenidKey: 'ad_openid',
	tabListKey: 'tab_list',
	cartInfoKey: 'cart_info',
	copyright: '五福教育科技 提供技术支持',
	// 底部导航信息
	tabList: [{
			index: 0,
			text: '首页',
			module: 'shouye',
			iconPath: 'https://files.wufu-app.com/images/icons/index2.png',
			selectedIconPath: 'https://files.wufu-app.com/images/icons/index.png',
			pagePath: '/pages/index/index'
		},
		{
			index: 1,
			text: '家长学堂',
			module: 'jiazhangxuetang',
			iconPath: 'https://files.wufu-app.com/images/icons/course2.png',
			selectedIconPath: 'https://files.wufu-app.com/images/icons/course.png',
			pagePath: '/pages/course/index'
		},
		{
			index: 2,
			text: '班级圈',
			module: 'banjiquan',
			iconPath: 'https://files.wufu-app.com/images/icons/cricle2.png',
			selectedIconPath: 'https://files.wufu-app.com/images/icons/cricle.png',
			pagePath: '/pages/circle/index'
		},
		{
			index: 3,
			text: '红色教育',
			module: 'hongsejiaoyu',
			iconPath: 'https://files.wufu-app.com/images/icons/edu2.png',
			selectedIconPath: 'https://files.wufu-app.com/images/icons/edu.png',
			pagePath: '/pages/edu/index'
		},
		{
			index: 4,
			text: '我的',
			module: 'wode',
			iconPath: 'https://files.wufu-app.com/images/icons/my2.png',
			selectedIconPath: 'https://files.wufu-app.com/images/icons/my.png',
			pagePath: '/pages/my/index'
		}
	],
	iconList: [{
			title: '幸福家园',
			module: 'xingfujiayuan',
			icon: 'https://files.wufu-app.com/images/nav/xfjy.png',
			url: '/pages/package01/family/index',
			show: true
		},
		{
			title: '夜听音频',
			module: 'yetingyinpin',
			icon: 'https://files.wufu-app.com/images/nav/ytyp.png',
			url: '/pages/package01/music/index',
			show: true
		},
		{
			title: '早间晨语',
			module: 'zaojianchenyu',
			icon: 'https://files.wufu-app.com/images/nav/zjcy.png',
			url: '/pages/package01/words/index',
			show: true
		},
		{
			title: '精彩文章',
			module: 'jingcaiwenzhang',
			icon: 'https://files.wufu-app.com/images/nav/jcwz.png',
			url: '/pages/article/index',
			show: true
		},
		{
			title: '天赋测评',
			module: 'shengmingshuzi',
			icon: 'https://files.wufu-app.com/images/nav/smsz.png',
			url: '/pages/package01/family/lifeNew',
			show: true
		},
		{
			title: '成长档案',
			module: 'duihuankecheng',
			icon: 'https://files.wufu-app.com/images/nav/czda.png',
			url: '/pages/package02/poster/index',
			show: true
		},
		{
			title: '近期活动',
			module: 'jingcaihuodong',
			icon: 'https://files.wufu-app.com/images/nav/jchd.png',
			url: '/pages/package01/family/activity',
			show: true
		},
		{
			title: '签到打卡',
			module: 'qiandaodaka',
			icon: 'https://files.wufu-app.com/images/nav/qddk.png',
			url: '/pages/my/signin/signin',
			show: true
		}
	],
	/* 家庭角色
	   1:爸2:妈3:爷4:奶5:外公6:外婆7:哥8:姐9:叔:10:舅舅 0:其它 
	*/
	// 商城底部导航菜单
	shopTabbar: [{
			title: '商城',
			icon: 'bag',
			path: '/pages/package02/shop/index'
		},
		{
			title: '分类',
			icon: 'list-dot',
			path: '/pages/package02/shop/category/category'
		},
		{
			title: '购物车',
			icon: 'shopping-cart',
			path: '/pages/package02/shop/cart/cart'
		},
		{
			title: '我的',
			icon: 'account',
			path: '/pages/package02/shop/my/my'
		}
	],
	familyRole: [{
			id: 1,
			text: "爸爸"
		},
		{
			id: 2,
			text: "妈妈"
		},
		{
			id: 3,
			text: "爷爷"
		},
		{
			id: 4,
			text: "奶奶"
		},
		{
			id: 5,
			text: "外公"
		},
		{
			id: 6,
			text: "外婆"
		},
		{
			id: 7,
			text: "哥哥"
		},
		{
			id: 8,
			text: "姐姐"
		},
		{
			id: 9,
			text: "叔叔"
		},
		{
			id: 10,
			text: "舅舅"
		},
		{
			id: 0,
			text: "其它"
		}
	],

	// 提现信息
	withdrawInfoKey: 'withdraw_info',
	// 提现须知
	operations: [{
			text: '第1点：请根据需求选择提现方式，到余额或银行卡；'
		},
		{
			text: '第2点：为减少提现发票开据频次，提现额度为500元；'
		},
		{
			text: '第3点：每次提现需要提交对应额度发票为提现凭证；'
		},
		{
			text: '第4点：管理员会根据提交信息是否完善进行审核；'
		},
		{
			text: '第5点：提交提现申请后收益额度会清零，驳回会恢复；'
		},
		{
			text: '第6点：开票要求：开票方公司与签约合同一致，开票内容：咨询服务费或推广费；如有发票疑问请联系您的客服人员进行询问；'
		},
		{
			text: '发票抬头：广东五福教育科技有限公司'
		},
		{
			text: '发票识别：91440902MA53LWB6XP'
		},
	],

	// 提现方式 
	withdrawList: [{
			title: '微信提现',
			icon: '/static/icon/wxpay.png',
			show: true,
			id: 'wx'
		},
		{
			title: '银行卡提现',
			icon: '/static/icon/bankpay.png',
			show: true,
			id: 'bank'
		},
	],

	// 红色教育图标列表
	eduIconList: [{
			title: '红色家风',
			icon: 'https://files.wufu-app.com/images/edu/hongsejiafeng.png',
			url: '/pages/edu/party?type=3&cate=9',
			show: true
		},
		{
			title: '学习时代',
			icon: 'https://files.wufu-app.com/images/edu/xuexishidai.png',
			url: '/pages/learn?type=0',
			show: true
		},
		{
			title: '建党百年',
			icon: 'https://files.wufu-app.com/images/edu/jiandangbainian.png',
			url: '/pages/edu/party?type=2&cate=4',
			show: true
		}
	],
	agreeContent: '<p>我们将按法律法规要求，合理、合法的开展相关事项，采取相应安全保护措施，尽力保护您的合法权益与平台利益不受伤害。鉴于此，我们制定本《用户注册管理协议》（下称“本协议/本注册协议/本服务条款”）及其附属协议（包括但不限于已经发布的或将来可能发布的各类规则、合同协议、情况说明、操作细则等），我们希望您务必仔细阅读、充分理解本协议及其附属协议的全文内容，并在需要时，按照本协议及其附属协议的指引，作出您认为适当的选择。</p><p>我们也在此着重提醒您本人，在本协议及其附属协议中，所有涉及与您个人权益和权利有关的条款、免除或者限制责任的条款、法律适用和争议解决条款等内容，请您本人重点留意并详细阅读。</p><p>一、重点说明&nbsp;</p><p>1、本协议及其附属协议适用于我们提供的产品和平台服务，在使用我们各项产品或服务前，请您务必仔细阅读并透彻理解本协议及其附属协议，您应重点阅读，在确认充分理解并同意后方可开始使用，并同时享受我们给予的相关平台服务与各学习中心授权我们代管权等相关服务，如您本人不同意本协议及其附属协议的内容，请您不要启动任何注册程序。用户应当充分阅读并同意本协议及其附属协议的全部条款并按照页面上的提示完成全部的注册程序（未成年人应与法定监护人共同完成）。用户在注册过程中点击“同意”即表示用户完全接受本协议及其附属协议项下的全部条款，将视为同意接受本协议及其附属协议全部条款的约束。</p><p>二、定义</p><p>1、个人敏感信息：指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息，包括个人基本资料（包括个人姓名、身份证号码、生日、性别、住址、手机号码、电子邮箱等）、个人生物识别信息、银行账号、财产信息（包括交易和消费记录、钱包、零钱、优惠券等虚拟财产信息）、通讯录信息、个人上网记录（包括网站浏览记录、软件使用记录、点击记录）、个人位置信息（包括大概地理位置、精准定位信息）、行踪轨迹、交易信息等个人信息。</p><p>三、服务说明</p><p>1、我们致力于打造多样的产品和服务以满足您的需求。因我们向您提供的产品和服务种类众多，且不同会员选择使用的具体产品/服务范围存在差异，相应的，各类功能及收集使用的个人信息类型、范围等会有所区别，请以具体的产品/服务功能为准。</p><p>2、为给您带来更好的产品和服务体验，我们在持续努力改进我们的技术，随之我们可能会不时推出新的或优化后的功能，可能需要收集、使用新的个人敏感信息或变更个人敏感信息使用目的或方式。对此，我们将通过更新本协议、弹窗、页面提示等方式另行向您说明对应信息的收集目的、范围及使用方式，并为您提供自主选择同意的方式，且在征得您明示同意后收集、使用。</p><p>四、用户注册</p><p>1、注册服务</p><p>&nbsp;&nbsp;&nbsp;（1）用户可以通过在本平台上注册帐号使用平台提供的各项服务。为帮助您成为我们的用户，以便我们为您提供用户服务。您需要提供手机号码创建账号设置密码（或验证码）和昵称以成为我们的注册用户。</p><p>2、信息完善：您需要进一步完善本产品账号信息，如填写生日、性别、身份证等信息。</p><p>3、实名认证</p><p>（1）为保证学习组织安全，我们将在您创建学习组织的环节，通过您提供姓名、身份证信息、人脸识别、或支付宝授权信息等方式进行实名认证。您本人理解并承诺，您的账户名称、昵称、头像和个人敏感信息等内容中不得出现任何违法和不良信息，没有侵犯、冒用、关联机构或社会名人，您本人在账户注册过程中需遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚等方面内容。如有违反，我们可对您本人的账户名进行暂停使用或注销等处理，并向有权机关予以举报和报告。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;（2）任何组织或者个人注册账号，制作、复制、下载、发布、传播信息内容的，应当使用真实身份信息，不得以虚假、冒用的居民身份信息、企业注册信息、组织机构代码信息进行注册。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;（3）用户同意接受平台通过电子邮件、客户端、网页或其他合法方式向用户发送商品促销或其他相关商业信息。在使用电信增值或其他服务的情况下，用户同意接受平台及其关联公司、合作公司通过增值服务系统或其他方式向您发送的相关服务信息或其他信息，其他信息包括但不限于通知信息、宣传信息、广告信息等。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;4、我们明确告知您本人，严禁在本平台实施下述的行为，或发布相关言论内容，如涉及相应法律责任，均由用户自行负责：</p><p>（1）使用本平台内容进行虚假宣传，进行不正当的行为与交易的；</p><p>（2）宣传危害国家，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p><p>（3）损害国家荣誉和社会公共利益的；</p><p>（4）煽动民族仇恨、民族歧视，破坏民族团结的；</p><p>（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</p><p>（6）散布谣言，扰乱社会秩序，破坏社会稳定的；</p><p>（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p><p>（8）侮辱或者诽谤他人，侵害他人合法权益的；</p><p>（9）没有按照平台正确的操作步骤和流程，造成的后果自负；</p><p>（10）根据五福将与您要履行的相关其他书面文件所必需执行的；</p><p>（11）含有法律、行政法规禁止的其他内容的。</p><p>&nbsp;&nbsp;&nbsp;5、您充分理解并同意，我们在以下情况下收集您的个人敏感信息且无需获得您的授权同意，但是我们严守保密义务，除非法律有规定或经您本人书面许可，否则，我们将不作任何的公开、泄露、披露或告知：</p><p>（1）在紧急情况下，为维护用户及公众的权益。</p><p>（2）为维护平台的著作权、商标权、专利权及其他任何合法权利或权益。</p><p>&nbsp;&nbsp;6、在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将在不侵害本产品商业秘密或其他用户权益、社会公共利益的前提下提供解决方法。</p><p>五、隐私保护</p><p>本应用不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本社区的非公开内容，但下列情况除外：</p><p>(1)事先获得用户的明确授权；	</p><p>(2)根据有关的法律法规要求；</p><p>(3)按照相关政府主管部门的要求；</p><p>(4)为维护社会公众的利益。</p><p>本应用可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本社区同等的保护用户隐私的责任，则本社区有权将用户的注册资料等信息提供给该第三方，并无须另行告知用户。</p><p>在不透露单个用户隐私资料的前提下，本应用有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p><p>八、免责声明</p><p>1、平台对于用户经平台上的广告展示而购买、取得的任何产品、信息或资料，对此，我们明确表示，相关内容或信息仅仅作为商业性的宣传和推广，并非对产品或服务的作用、性质、效果、功效等实质性方面进行任何承诺，因此，我们需要告知用户，本平台的产品/服务需要用户结合自身实际情况，谨慎判断，并在充分考虑后再决定是否购买或使用。因您本人自愿购买或使用产品/服务而引起的所有风险，包括因产品/服务的作用、性质、效果、功效等方面的完整性或实用性所产生的风险，对此，我们不承担任何法律责任。</p><p>2、因系统故障或不可抗力的因素而导致本平台不能提供相应业务的，则本平台不承担任何赔偿责任。以下状况或不限于：</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）本平台在本网站公告之系统停机维护期间；</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）电信设备出现故障不能进行数据传输的；</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成系统障碍不能执行业务的；</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）由于黑客攻击、电信部门技术调整或故障、银行方面的问题等原因而造成的服务中断或者延迟。</p>',

}