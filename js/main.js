/* ========================================
   联系信息 / Contact Info（统一配置，避免多处硬编码不一致）
   HTML 中的联系方式由 syncContactInfo() 同步到此常量，确保单一数据源。
   修改邮箱/电话只需改这里，HTML 链接、显示文本、JSON-LD 会自动同步。
   ======================================== */
const CONTACT = {
    email: 'liugc367@163.com',
    phone: '15546459607'
};

/* 将 CONTACT 同步到 HTML：联系链接、显示文本、JSON-LD、降级提示邮箱 */
function syncContactInfo() {
    // 邮箱链接与显示文本
    document.querySelectorAll('[data-contact="email-link"]').forEach(el => {
        el.setAttribute('href', `mailto:${CONTACT.email}`);
    });
    document.querySelectorAll('[data-contact="email-text"]').forEach(el => {
        el.textContent = CONTACT.email;
    });
    // 电话链接与显示文本
    document.querySelectorAll('[data-contact="phone-link"]').forEach(el => {
        el.setAttribute('href', `tel:${CONTACT.phone}`);
    });
    document.querySelectorAll('[data-contact="phone-text"]').forEach(el => {
        el.textContent = CONTACT.phone;
    });
    // 同步 JSON-LD Person 结构化数据（Google 索引时会执行 JS）
    const schema = document.getElementById('personSchema');
    if (schema) {
        try {
            const data = JSON.parse(schema.textContent);
            data.email = CONTACT.email;
            // 格式化为 E.164 友好格式：+86 155 4645 9607
            data.telephone = `+86 ${CONTACT.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')}`;
            schema.textContent = JSON.stringify(data, null, 2);
        } catch (e) { /* JSON-LD 解析失败则保留 HTML 原值 */ }
    }
    // 降级提示中的邮箱
    const fallbackEmail = document.getElementById('formFallbackEmail');
    if (fallbackEmail) fallbackEmail.textContent = CONTACT.email;
}

/* ========================================
   焦点管理 / Focus Management（弹窗可访问性）
   ======================================== */
let lastFocused = null;   // 打开弹窗前的焦点元素，关闭后归还
let activeTrap = null;    // 当前激活的焦点陷阱容器
function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    const f = container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ========================================
   作品集数据 / Portfolio Data
   ======================================== */
const worksData = [
    {
        id: 1,
        titleZh: 'Art Incubator · 艺术孵化器',
        titleEn: 'Art Incubator',
        catZh: 'VR/交互装置',
        catEn: 'VR / Interaction',
        category: 'vr',
        year: '2025',
        descZh: '作品以中国美术联考为切口，提供一个审视应试教育的独特视角。装置直指联考导向教育的深层问题：考试压力导致的学生心理健康危机，以及以分数为中心的单一评价体系的缺陷。通过生动的隐喻，让观众直观看到个人发展受限、学习趋于功利等问题，促使人们深入反思教育的本质，并更加关注学生的心理状态与真实需求。',
        descEn: 'This piece offers a unique perspective on examination-oriented art education in China. It directly addresses the deep problems of the Liankao-driven system: the mental health crisis caused by exam pressure, and the flaws of a score-centered, one-dimensional evaluation system. Through vivid metaphors, it helps people see the stifling of personal growth and the rise of utilitarian learning — prompting deep reflection on education and greater attention to students\' psychological state and real needs.',
        tools: ['Arduino', '红外传感器', '实时投影', 'CAD 结构设计'],
        roleZh: '主设计师 / 技术实施',
        roleEn: 'Lead Designer / Technical Implementation',
        durationZh: '完整项目周期',
        durationEn: 'Full project cycle',
        gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4, #14b8a6)',
        icon: 'vr',
        trailer: '',
        trailerBvid: 'BV1NAbS6xEXT',
        thumb: 'assets/covers/BV1NAbS6xEXT.webp',
        playLink: 'https://youtu.be/i8YErN5VIh0?si=t6T9kwHhd8LN8b-q',
        playLabelZh: '观看完整视频',
        playLabelEn: 'Watch Full Video',
        gallery: [
            { src: 'assets/art-incubator/installation-main.webp', captionZh: '装置全貌 · 中央投影核心与环绕巢穴', captionEn: 'Installation overview · central projection core with ring chambers' },
            { src: 'assets/art-incubator/installation-top.webp', captionZh: '顶部视角 · 环形结构凸显孵化隐喻', captionEn: 'Top view · ring structure echoes the incubation metaphor' },
            { src: 'assets/art-incubator/interaction.webp', captionZh: '互动瞬间 · 红外感应触发实时投影', captionEn: 'Interaction moment · IR sensor triggers real-time projection' },
            { src: 'assets/art-incubator/detail-coffin.webp', captionZh: '巢穴细节 · 无限镜营造的困局', captionEn: 'Chamber detail · infinity-mirror entrapment' },
            { src: 'assets/art-incubator/detail-mechanism.webp', captionZh: '机械细节 · 批量产出与吞噬的隐喻', captionEn: 'Mechanism detail · mass production and devouring' },
            { src: 'assets/art-incubator/design.webp', captionZh: '结构设计 · 三维尺寸方案', captionEn: 'Structural design · 3D dimension plan' },
            { src: 'assets/art-incubator/research-studio.webp', captionZh: '田野调研 · 考前画室', captionEn: 'Field research · exam-prep studio' },
            { src: 'assets/art-incubator/process.webp', captionZh: '制作过程 · 手工搭建', captionEn: 'Fabrication · hand-built assembly' },
            { src: 'assets/art-incubator/exhibition.webp', captionZh: '展览现场 · 画架矩阵', captionEn: 'Exhibition · matrix of easels' }
        ]
    },
    {
        id: 2,
        titleZh: 'Decompression Island · 减压岛',
        titleEn: 'Decompression Island',
        catZh: 'VR/AR App 设计',
        catEn: 'VR / AR App Design',
        category: 'vr',
        year: '2025',
        descZh: '针对东亚高压社会下年轻人的焦虑与抑郁问题，设计了一款结合 VR 沉浸式体验与移动 App 的冥想减压应用。项目构建了奇幻紫蓝色调的虚拟冥想场景，涵盖情绪记录、AI 智能咨询、场景化冥想引导与社交分享功能。经过 5 人用户测试与多轮迭代，根据用户反馈实时调整场景与音乐，有效帮助用户缓解压力、恢复内心平静。',
        descEn: 'A meditation and stress-relief app combining VR immersive experiences with a mobile application, designed for young people facing anxiety and depression in East Asia\'s high-pressure society. The project builds fantastical purple-blue virtual meditation scenes, covering mood tracking, AI-powered consultation, guided scene-based meditation, and social sharing. After user testing with 5 participants and multiple iterations, scenes and music were adjusted in real time based on feedback, effectively helping users alleviate stress and restore inner peace.',
        tools: ['Blender', '3D 建模', 'UI 设计', 'VR 开发'],
        roleZh: '独立创作者',
        roleEn: 'Solo Creator',
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
        icon: 'vr',
        trailer: '',
        trailerBvid: '',
        videoNote: false,
        thumb: 'assets/decompression-island/scene-main.webp',
        projectOverviewZh: '在内卷与功利主义的社会语境下，越来越多年轻人出现焦虑、抑郁等心理问题，却鲜有真正有效的减压出口。减压岛将 VR 冥想与移动 App 结合，构建一座让心灵得以逃离现实的虚拟岛屿——用户记录情绪、进入奇幻紫蓝色的治愈场景、在引导下完成沉浸式冥想，并通过社交与他人分享疗愈时刻，在现实的重压之外获得喘息与平静。',
        projectOverviewEn: 'In a society defined by involution and utilitarianism, more and more young people suffer from anxiety and depression, yet few effective outlets truly exist. Decompression Island combines VR meditation with a mobile app to build a virtual island where the mind can escape reality — users record their mood, enter fantastical purple-blue healing scenes, complete immersive guided meditation, and share healing moments with others through social features, finding respite and calm beyond the weight of reality.',
        ideationZh: '项目从"躺平文化"与当代青年心理压力的洞察出发：面对高竞争、高压力的环境，年轻人出现焦虑、倦怠与习得性无助，倾向于"逃避与消极回应"。研究发现，中国传统文化中的"隐士"叙事——逃离喧嚣、回归自然——在当代被重新书写为一种心理上的"逃离"。由此，项目将概念转化为 App"Escape VR"：一个可以随时逃入的虚拟世界，让用户在一座属于自己的岛上，暂时离开现实的压力。',
        ideationEn: 'The project starts from insights into the "lying flat" culture and the psychological stress of contemporary youth: facing intense competition and high pressure, young people experience anxiety, burnout, and learned helplessness, tending toward "escape and negative response." Research shows the traditional Chinese "hermit" narrative — escaping the noise and returning to nature — has been rewritten in modern times as a psychological escape. From this, the concept evolved into the app "Escape VR": a virtual world one can enter at any time, letting users stay on an island of their own, temporarily away from real-life pressure.',
        persona: {
            name: '李明',
            age: '24',
            roleZh: '程序员 · 长期高压',
            roleEn: 'Programmer · chronic stress',
            quoteZh: '"每天都在加班，回到家只想躺着，什么都不想干。"',
            quoteEn: '"Working overtime every day, when I get home I just want to lie down and do nothing."',
            bgZh: '北京互联网公司程序员，收入尚可但加班成为常态，社交圈逐渐缩小，休息也无法真正放松。',
            bgEn: 'A programmer at a Beijing internet company; decent income but overtime has become routine, social circle shrinking, and even rest brings no real relaxation.',
            painZh: '焦虑、失眠、工作倦怠，感到"心累"，缺乏情绪表达与疏导的渠道。',
            painEn: 'Anxiety, insomnia, work burnout — feeling mentally exhausted, lacking channels to express and release emotions.',
            goalZh: '找到一个能真正放下手机、安静下来、恢复内心平静的出口。',
            goalEn: 'Finding an outlet to truly put down the phone, quiet down, and restore inner peace.',
            expectZh: '通过短期沉浸式冥想获得即时放松，并逐步建立长期的情绪管理习惯。',
            expectEn: 'Achieving immediate relaxation through short immersive meditation, while gradually building long-term emotional management habits.'
        },
        userJourney: {
            stepsZh: ['工作压力累积，情绪低落、疲惫无力', '打开减压岛，记录当下的情绪状态', '选择符合心境的冥想场景进入', '完成场景化冥想引导，情绪得到释放', '查看情绪趋势，获得归属感与持续陪伴'],
            stepsEn: ['Stress accumulates at work — feeling low and exhausted', 'Opens Decompression Island and records current mood', 'Chooses a meditation scene that matches the mood', 'Completes guided scene-based meditation, releasing emotions', 'Reviews mood trends, gaining a sense of belonging and ongoing companionship']
        },
        gameFlow: {
            titleZh: '用户流程', titleEn: 'User Flow',
            stepsZh: ['情绪选择（记录当前心情）', '场景选择（匹配心境的治愈场景）', 'VR 冥想引导（沉浸式体验）', '冥想结果反馈', '社交分享（好友互动与场景推荐）'],
            stepsEn: ['Mood selection (record current feelings)', 'Scene selection (healing scene matching the mood)', 'VR meditation guidance (immersive experience)', 'Meditation result feedback', 'Social sharing (friend interaction and scene recommendations)']
        },
        visualDesign: {
            summaryZh: '视觉上以紫蓝色为主调，营造宁静、梦幻、治愈的品牌气质。品牌标识为蓝紫渐变水滴，象征情绪的流淌与净化；图标以水滴为母题，将不同情绪抽象为不同色彩，直观而统一。',
            summaryEn: 'The visual identity uses purple-blue as the dominant tone, creating a serene, dreamy, healing brand temperament. The logo is a blue-purple gradient water drop symbolizing the flow and purification of emotions; icons use the water drop motif, abstracting different emotions into different colors — intuitive and unified.',
            logoImg: 'assets/decompression-island/logo.webp',
            logoZh: 'Logo 以水滴为原型，蓝紫渐变填充，寓意"情绪如水，流淌过后归于平静"，呼应品牌"减压"的核心主张。',
            logoEn: 'The logo is based on a water drop with a blue-purple gradient, meaning "emotions are like water — after flowing, calm returns," echoing the brand\'s core promise of stress relief.',
            colors: [
                { hex: '#81DAEE', nameZh: '宁静蓝', nameEn: 'Serene Blue' },
                { hex: '#8DD3FF', nameZh: '湖蓝', nameEn: 'Lake Blue' },
                { hex: '#BDC8FF', nameZh: '淡紫', nameEn: 'Lavender' },
                { hex: '#D5C0FF', nameZh: '香芋紫', nameEn: 'Taro Purple' },
                { hex: '#8A8A8A', nameZh: '中性灰', nameEn: 'Neutral Grey' }
            ],
            fonts: [
                { name: 'Inder Regular', usageZh: '正文与界面信息，简洁现代', usageEn: 'Body text & UI info, clean and modern' },
                { name: 'Jomhuria Regular', usageZh: '品牌标题与装饰文字，圆润亲和', usageEn: 'Brand titles & decorative text, rounded and friendly' }
            ],
            iconZh: '图标以水滴为母题：不同情绪对应不同颜色的水滴造型，直观又统一；后根据用户测试反馈，将图标统一调整为与场景主色调一致的紫色系，强化视觉一致性。',
            iconEn: 'Icons use the water drop as the motif: different moods are mapped to water drops of different colors — intuitive and unified. Later, based on user testing feedback, icons were unified to a purple tone matching the main scene color for stronger visual consistency.'
        },
        healingScenes: [
            { nameZh: '静谧水景 · Calm Water', nameEn: 'Calm Water', img: 'assets/decompression-island/scene-island-pink.webp', descZh: '粉蓝色水域中漂浮着治愈小岛，平静的水面与流水声引导呼吸放缓，是缓解焦虑的起点。', descEn: 'Healing islands float in pink-blue waters; the calm surface and flowing water guide the breath to slow down — a starting point for easing anxiety.', elements: ['流水声', '粉色水面', '漂浮小岛', '冥想平台'] },
            { nameZh: '雪山幻境', nameEn: 'Snowy Wonderland', img: 'assets/decompression-island/scene-main.webp', descZh: '紫雪覆盖的雪山与星空下的冥想平台，轻盈的飘雪与冷色调营造超脱现实的宁静感。', descEn: 'Purple-snow mountains and a meditation platform beneath a starry sky; light snowfall and cool tones create a transcendent sense of peace.', elements: ['飘雪', '雪山', '星空', '冥想平台'] },
            { nameZh: '紫雪星空 · 水晶植物', nameEn: 'Crystal Plant Wonderland', img: 'assets/decompression-island/scene-crystal.webp', descZh: '紫调星空下生长着发光的水晶植物，梦幻的光影让用户进入更深层的放松状态。', descEn: 'Glowing crystal plants grow beneath a purple starfield; dreamy light and shadow guide users into a deeper state of relaxation.', elements: ['水晶植物', '紫雪', '星光', '发光叶片'] },
            { nameZh: '静谧之岛', nameEn: 'Serene Island', img: 'assets/decompression-island/scene-island-purple.webp', descZh: '紫调包裹的静谧小岛，色彩统一而克制，适合情绪低落时的自我疗愈。', descEn: 'A quiet island wrapped in purple tones — unified and restrained in color, ideal for self-healing during low moods.', elements: ['紫色植被', '岛屿', '平静水面', '暖色点缀'] },
            { nameZh: '天际之境', nameEn: 'Sky Realm', img: 'assets/decompression-island/scene-sky.webp', descZh: '粉色天空倒映在水面之上，天地一体的视觉让冥想者仿佛悬浮于云端。', descEn: 'A pink sky mirrored on the water; the merging of sky and water makes the meditator feel as if floating above the clouds.', elements: ['粉色天空', '镜面水面', '云影', '开敞视野'] }
        ],
        uiDesign: {
            featuresZh: ['情绪记录', 'AI 智能咨询', 'VR 日记', '宁静引导', '冥想世界', '好友社交', '历史趋势', '场景推荐'],
            featuresEn: ['Mood Tracking', 'AI Consultation', 'VR Diary', 'Serene Guide', 'Meditation World', 'Friendship Zone', 'History Trends', 'Scene Recommendation'],
            shots: [
                { src: 'assets/decompression-island/app-mockup.webp', captionZh: '情绪选择 · 场景选择', captionEn: 'Mood selection · scene selection' },
                { src: 'assets/decompression-island/ui-checkin.webp', captionZh: '情绪记录 · 今日心情', captionEn: 'Mood check-in · today\'s feeling', tall: true },
                { src: 'assets/decompression-island/ui-history.webp', captionZh: '历史记录 · 情绪档案列表', captionEn: 'History · mood log list', tall: true },
                { src: 'assets/decompression-island/ui-result.webp', captionZh: '冥想反馈 · 沉浸值与时长', captionEn: 'Meditation feedback · immersion value', tall: true },
                { src: 'assets/decompression-island/ui-ai.webp', captionZh: 'AI 智能咨询 · 对话式陪伴', captionEn: 'AI consultation · chat companion', tall: true },
                { src: 'assets/decompression-island/ui-scene.webp', captionZh: '场景推荐 · 雪湖冥想', captionEn: 'Scene recommendation · snowy lake', tall: true },
                { src: 'assets/decompression-island/ui-guidance.webp', captionZh: '情绪引导 · 愤怒时的安抚', captionEn: 'Mood guidance · calming anger', tall: true },
                { src: 'assets/decompression-island/ui-social.webp', captionZh: '好友社交 · 社区互动', captionEn: 'Social · community interaction', tall: true },
                { src: 'assets/decompression-island/ui-feed.webp', captionZh: '好友动态 · 疗愈时刻分享', captionEn: 'Friend feed · sharing healing moments', tall: true },
                { src: 'assets/decompression-island/vr-test.webp', captionZh: 'VR 沉浸式冥想测试', captionEn: 'VR immersive meditation test' }
            ]
        },
        testing: [
            { ver: 'T1', date: '原型测试', noteZh: '邀请 5 名目标用户进行 Mobile 与 VR 双端测试。反馈：冥想前缺少情绪信息提示，场景氛围不够沉浸。', noteEn: 'Invited 5 target users for dual Mobile & VR testing. Feedback: no mood info prompt before meditation; scene atmosphere not immersive enough.' },
            { ver: 'T2', date: '第一轮迭代', noteZh: '新增情绪信息提示界面；在场景中加入流水声与动态水面，增强沉浸感。', noteEn: 'Added a mood info prompt screen; introduced flowing water sound and dynamic water surface to enhance immersion.' },
            { ver: 'T3', date: '第二轮迭代', noteZh: '根据冥想中用户情绪实时调整场景氛围与背景音乐；图标由单一蓝色改为不同颜色对应不同情绪，最终统一为紫色系匹配主场景。', noteEn: 'Scene atmosphere and background music are now adjusted in real time based on the user\'s mood during meditation; icons changed from single blue to mood-based colors, finally unified to purple to match the main scene.' }
        ],
        reflectionZh: '项目通过 5 人用户测试与多轮迭代验证了有效性：用户在完成冥想后普遍感到情绪得到释放，界面与场景的调整也让体验更加沉浸。未来计划在压力最大的城市举办线下测试活动与减压工作坊，让更多年轻人体验"逃离现实、回归内心"的减压之旅，并持续优化场景与音乐库。',
        reflectionEn: 'The project validated its effectiveness through 5-person user testing and multiple iterations: users generally felt emotionally released after meditation, and the UI and scene adjustments made the experience more immersive. Future plans include offline testing events and stress-relief workshops in the most high-pressure cities, so more young people can experience the journey of "escaping reality and returning inward," while continuously expanding the scene and music libraries.',
        gallery: [
            { src: 'assets/decompression-island/scene-main.webp', captionZh: '主场景 · 雪山幻境中的冥想平台', captionEn: 'Main scene · meditation platform in a snowy mountain wonderland' },
            { src: 'assets/decompression-island/scene-crystal.webp', captionZh: '紫雪星空 · 水晶植物幻境', captionEn: 'Purple snow starfield · crystal plant wonderland' },
            { src: 'assets/decompression-island/scene-island-pink.webp', captionZh: '粉蓝水域 · 漂浮的治愈岛屿', captionEn: 'Pink-blue waters · floating healing islands' },
            { src: 'assets/decompression-island/scene-island-purple.webp', captionZh: '静谧之岛 · 紫调冥想空间', captionEn: 'Serene island · purple-toned meditation space' },
            { src: 'assets/decompression-island/scene-sky.webp', captionZh: '天际之境 · 粉色天空与水面', captionEn: 'Sky realm · pink sky and reflective waters' },
            { src: 'assets/decompression-island/vr-test.webp', captionZh: 'VR 测试 · 沉浸式体验验证', captionEn: 'VR testing · immersive experience validation' },
            { src: 'assets/decompression-island/exhibition.webp', captionZh: '展览现场 · 蓝色幻境投影空间', captionEn: 'Exhibition · blue wonderland projection space' },
            { src: 'assets/decompression-island/app-mockup.webp', captionZh: 'App 界面 · 情绪记录与场景选择', captionEn: 'App interface · mood tracking and scene selection' },
            { src: 'assets/decompression-island/logo.webp', captionZh: '品牌标识 · 蓝紫渐变水滴 Logo', captionEn: 'Brand identity · blue-purple gradient water drop logo' }
        ]
    },
    {
        id: 4,
        titleZh: 'Relaxing Travel · 基于情境体验的游戏场景设计研究',
        titleEn: 'Relaxing Travel · Research on Game Scene Design',
        catZh: '3D建模/数字媒体',
        catEn: '3D / Digital Media',
        category: '3d',
        year: '2025',
        descZh: '本研究聚焦于东亚高压社会环境下，职场内卷、学业压力与家庭责任交织带来的心理健康危机。通过 Blender 3D 建模与游戏场景设计，构建了六个沉浸式治愈空间：积水洞穴、花海地铁、鸟居树林、像素化草原山、雨滴幻境与云端漫步。以几何意象与视觉隐喻引导用户从焦虑走向放松，并配套海报设计与杂志《RELAXING TRAVEL》系统呈现场景元素与疗愈理念。',
        descEn: 'Focused on the mental health crisis amid workplace involution, academic pressure, and family responsibilities in East Asia, this study builds six immersive healing spaces via Blender 3D modeling: a ponded water cave, a flower-filled subway, a torii grove, pixelated grassland mountains, a raindrop dreamscape, and a cloud walk. Geometric symbols and visual metaphors guide users from anxiety to relaxation. Derivatives include poster designs and the magazine RELAXING TRAVEL, which systematically presents scene elements and the healing philosophy.',
        tools: ['Blender', '3D 建模', '平面设计', '海报设计'],
        roleZh: '独立创作者',
        roleEn: 'Solo Creator',
        durationZh: '3个月',
        durationEn: '3 Months',
        gradient: 'linear-gradient(135deg, #f43f5e, #ec4899, #d946ef)',
        icon: '3d',
        trailer: '',
        trailerBvid: 'BV1SvbS6YEiv',
        thumb: 'assets/covers/BV1SvbS6YEiv.webp',
        gallery: [
            { src: 'assets/relaxing-travel/scene-cave.webp', captionZh: '积水洞穴', captionEn: 'Ponded Water Cave' },
            { src: 'assets/relaxing-travel/scene-subway.webp', captionZh: '花海地铁', captionEn: 'Flora Subway' },
            { src: 'assets/relaxing-travel/scene-torii.webp', captionZh: '鸟居树林', captionEn: 'Torii Grove' },
            { src: 'assets/relaxing-travel/scene-mountain.webp', captionZh: '像素化草原山', captionEn: 'Pixelated Grassland Mountains' },
            { src: 'assets/relaxing-travel/scene-rain.webp', captionZh: '雨滴幻境', captionEn: 'Torrential Rain' },
            { src: 'assets/relaxing-travel/scene-cloud.webp', captionZh: '云端漫步', captionEn: 'Stroll in the Clouds' },
            { src: 'assets/relaxing-travel/poster-1.webp', captionZh: '海报 · 积水洞穴', captionEn: 'Poster · Ponded Water Cave' },
            { src: 'assets/relaxing-travel/poster-2.webp', captionZh: '海报 · 鸟居树林', captionEn: 'Poster · Torii Grove' },
            { src: 'assets/relaxing-travel/magazine-subway.webp', captionZh: '杂志《RELAXING TRAVEL》', captionEn: 'Magazine RELAXING TRAVEL' }
        ]
    },
    /* ===== 游戏作品 ===== */
    {
        id: 5,
        titleZh: 'IPHI',
        titleEn: 'IPHI',
        catZh: '游戏设计',
        catEn: 'Game Design',
        category: 'game',
        year: '2026',
        featured: true,
        descZh: '一款以大城市职场生存为题材的数字叙事游戏。主角 Iphi 来到大城市追求"更好的未来"，但高昂的房租与生活成本让她被迫在个人边界与短期稳定之间不断妥协。当工作带来的损耗累积到临界点，爱好、健康与自尊会以 Boss 的形式在梦境空间中反扑——它们不是反派，而是被压抑的自我。',
        descEn: 'A digital narrative game about surviving as a young professional in a big city. Protagonist Iphi moves to a metropolis for a "better future," but crushing rent and living costs force her to compromise personal boundaries for short-term stability. When the toll of overwork reaches a breaking point, her hobbies, health, and self-esteem return as Bosses in dreamlike spaces — not as enemies, but as repressed parts of herself.',
        tools: ['RPGMaker', 'Blender', 'Photoshop', 'After Effects'],
        roleZh: '项目主导 / 叙事设计 / 3D动画 / 海报设计',
        roleEn: 'Project Lead / Narrative Design / 3D Animation / Poster Design',
        durationZh: '6人团队 · 6个月开发',
        durationEn: '6-person team · 6 months dev',
        gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
        thumb: 'assets/iphi/poster.webp',
        icon: 'game',
        engine: 'RPGMaker',
        platform: ['PC', 'Steam', 'itch.io'],
        mechanicsZh: '对话 / 调查 / 战斗',
        mechanicsEn: 'Dialogue / Investigation / Combat',
        genreZh: '数字叙事 / 视觉小说 / 超现实象征',
        genreEn: 'Digital Narrative / Visual Novel / Surreal Symbolism',
        playLink: 'https://iphi-project-2026.netlify.app/',
        playLabelZh: '在线试玩 / 下载展示版',
        playLabelEn: 'Play Demo / Download',
        trailer: '',
        trailerBvid: 'BV1eKbD6GEkL',
        trailerCover: 'assets/covers/BV1eKbD6GEkL.webp',
        targetUsersZh: '20–35岁大城市青年职场人；喜欢叙事向、隐喻与心理主题的独立游戏玩家',
        targetUsersEn: 'Urban professionals aged 20–35; fans of narrative-driven indie games with metaphor and psychological themes',
        coreLoopZh: '对话 → 调查（读取空间与物件线索）→ 战斗（面对反扑的自我）',
        coreLoopEn: 'Dialogue → Investigation (read environmental clues) → Battle (face your repressed self)',
        synopsisZh: 'Iphi 来到中国一座大城市，想用努力换取"更好的未来"。但高昂的房租和生活成本让收入变成底线：一旦失去工作，生活会立刻断供。她进入公司成为新人，日常被模板、会议纪要、跨部门跟进、行动项清单填满。老板 Janus 会保持礼貌——前提是你的产出能为公司带来收益。当工作带来的损耗累积到某个阈值，梦境会转化为象征性的空间：爱好、健康与自尊以 Boss 的形式出现。它们本应是 Iphi 的朋友，但每一次加班、妥协、沉默，都会把它们推得更远，直到它们以冲突的方式反扑回来。',
        synopsisEn: 'Iphi arrives in a big Chinese city, hoping to trade effort for a "better future." But high rent and living costs turn income into a baseline: lose your job, and life stops immediately. She joins a company as a new hire, her days filled with templates, meeting minutes, cross-department follow-ups, and action item lists. Her boss Janus remains polite — as long as your output benefits the company. When the toll of overwork accumulates past a threshold, dreams transform into symbolic spaces where hobbies, health, and self-esteem appear as Bosses. They should have been Iphi\'s friends, but every overtime shift, every compromise, every silence pushes them further away, until they strike back as conflict.',
        backgroundZh: '本作试图让玩家通过可交互、可量化的体验，去评估一个现实问题：为了留在大城市换取更好前景与财务安全，不断牺牲爱好、健康与尊严，究竟"值不值得"？游戏把抽象的生存压力，转化为与主角潜意识的冲突——本该是朋友的爱好、健康与自尊，以对立力量向她发难。每一次选择加班、妥协、隐忍，都导向累积的疲惫、下滑的健康、被侵蚀的自尊与被压抑的爱好。在这场"短期收益换取长期耗尽"的循环中，游戏邀请玩家重新思考：为工作燃烧自己，究竟是在积累未来的选择权，还是仅仅买入一张继续留在城市的门票。',
        backgroundEn: 'The purpose of this game is to let players evaluate a real-world question through an interactive, measurable experience: in order to stay in a major city for better prospects and financial security, is it really "worth it" to keep sacrificing one\'s hobbies, health, and dignity? The game translates abstract survival pressure into conflicts with the protagonist\'s subconscious—where hobbies, health, and self-esteem, which should have been her friends, confront her as antagonistic forces. Each overtime shift, compromise, or endurance leads to accumulating fatigue, declining health, eroded self-esteem, and suppressed hobbies. Through this loop of short-term gains traded for long-term depletion, the game invites players to reconsider whether burning oneself out for work is truly building future options—or simply buying a ticket to stay in the city.',
        research: [
            { num: '01', titleZh: '高生活成本 · 低收入', titleEn: 'High Cost, Low Income', statZh: '房租收入比 > 30%', statEn: 'Rent-to-income > 30%', detailZh: '2025年3月，深圳、北京、上海、三亚等大城市房租收入比平均超过 30%。', detailEn: 'In March 2025, the rent-to-income ratio in major cities such as Shenzhen, Beijing, Shanghai, and Sanya averaged over 30%.' },
            { num: '02', titleZh: '过长工时', titleEn: 'Excessive Working Hours', statZh: '周均 48.6–49.0 小时', statEn: '48.6–49.0 hrs/week', detailZh: '国家统计局周均工时 2024年49.0小时、2025年48.6小时；一线城市白领调查 95.7% 有加班经历，38.7% 几乎天天加班，近60% 无加班费，40.1% "隐形加班"。', detailEn: 'NBS average weekly hours: 49.0h (2024), 48.6h (2025). Surveys of first-tier white-collar workers: 95.7% experienced overtime, 38.7% almost daily, ~60% unpaid, 40.1% "invisible overtime".' },
            { num: '03', titleZh: '激烈竞争', titleEn: 'Fierce Competition', statZh: '青年失业率 ~16.5%', statEn: 'Youth Unemployment ~16.5%', detailZh: '2026届毕业生达1270万；16–24岁青年失业率约16.5%（2025年12月）；热门稳定岗位常百人竞一岗（国考约98:1）。', detailEn: '12.7M graduates in the 2026 cohort; youth unemployment ~16.5% (ages 16–24, Dec 2025); hot stable jobs attract ~100 applicants each (~98:1 civil service exam).' }
        ],
        audience: {
            coreZh: '20–35岁大城市青年职场人（尤其新人 / 试用期员工 / 高压行业）',
            coreEn: 'Young professionals in big cities aged 20–35 (especially newcomers / probationary employees / high-pressure industries)',
            painZh: '加班、绩效考核、年终奖、被迫牺牲生活、健康与自尊',
            painEn: 'Overtime, performance reviews, year-end bonuses, forced sacrifice of life, health, and self-esteem',
            attractionZh: '复现职场真实困境，将爱好与健康具象为 Boss 战，引发共鸣与情绪释放',
            attractionEn: 'Recreates real workplace struggles, personifies hobbies and health as Boss battles, resonating and providing emotional release',
            expandZh: '喜欢叙事向、象征隐喻、角色心理类独立游戏的玩家，关注社会议题与职场文化',
            expandEn: 'Fans of narrative-driven, symbolic, character-psychology indie games interested in social issues and workplace culture',
            preferenceZh: '剧情驱动 · 强美术风格 · 角色对话 · 象征性 Boss',
            preferenceEn: 'Story-driven · strong art style · character dialogue · symbolic Boss'
        },
        scenes2d: [
            { nameZh: 'Dion & Lock 的酒吧舞台', nameEn: 'Dion & Lock — Bar & Stage', descZh: '锁链直接传达"被困"的意象；酒吧的整洁与秩序天然契合调酒师克制而诱人的气质；舞台的开放契合 Lock 的表达需求。', descEn: 'The chains immediately communicate the idea of being trapped. The bar\'s neatness and order naturally match the bartender\'s polished, controlled, tempting presence; the stage\'s openness fits Lock\'s need for expression.', elements: ['红酒杯', '乐谱', '锁链', '酒瓶', '吉他'] },
            { nameZh: 'Gia 的自然花野', nameEn: 'Gia — Nature & Meadow', descZh: '蓝天、花田、树木与草地营造清新治愈的氛围；角色的绿色调、花环与藤蔓元素与环境共享同一视觉语言，一眼便能认出这是"健康"的空间。秋千、开阔地平线与水暗示休息、活力与补给。', descEn: 'Blue sky, flower fields, trees, and grass create a fresh, sunlit, nature-healing atmosphere. The character\'s green palette, floral crown, and vine elements share the same visual language as the environment, making it clear this space is tied to "health." The swing, open horizon, and water suggest rest, vitality, and replenishment.', elements: ['维生素', '秋千椅', '花环', '帐篷', '风车玩具'] },
            { nameZh: 'Reta 的评审长廊', nameEn: 'Reta — Review Hallway', descZh: '走廊、壁灯、门与长椅营造"等待被叫号"的评审氛围，奖杯象征表现与认可的终点，整体强烈暗示这一空间与自尊紧密相连。', descEn: 'The corridor, wall lamps, doors, and benches create a review-hallway atmosphere of waiting to be called in, while the trophy reads as the endpoint of performance and recognition — strongly tying the space to self-esteem.', elements: ['奖章', '镜面碎片', '奖杯展示架', '档案柜', '日记本'] }
        ],
        scenes3d: {
            roomZh: '主角的房间会在三天内逐渐改变，形成有力的视觉隐喻：第一天，吉他、酒杯等个人物品占据显眼位置，代表以爱好为中心的生活；第二天，这些物品被收起，象征生活被工作取代；第三天，个人物品痕迹完全消失，空间彻底变成工作区。我们用动态变化而非静态道具，呈现"工作逐渐吞噬生活"。',
            roomEn: 'The protagonist\'s room is designed to change gradually over three days, creating a powerful visual metaphor: Day 1, personal items like guitars and wine glasses occupy prominent positions, representing a life centered on hobbies; Day 2, these items are put away, symbolizing life replaced by work; Day 3, all personal traces disappear, and the space is completely transformed into a workspace. Dynamic change shows how work gradually takes over life.',
            days: [
                { day: 'Day 1', img: 'assets/iphi/room-day1.webp', descZh: '吉他、酒杯等个人物品占据显眼位置——以爱好为中心的生活', descEn: 'Personal items prominent — a life centered on hobbies' },
                { day: 'Day 2', img: 'assets/iphi/room-day2.webp', descZh: '物品被收起——生活被工作取代', descEn: 'Items put away — life replaced by work' },
                { day: 'Day 3', img: 'assets/iphi/room-day3.webp', descZh: '个人痕迹完全消失——空间变为工作区', descEn: 'All personal traces gone — transformed into a workspace' }
            ],
            bossImg: 'assets/iphi/char-janus.webp',
            bossZh: '这一 Boss 设计的强项在于极强的权威感与高记忆点：锐利的侧影剪影自带威慑，克制的表情与侧目像在"评估"你而非与你互动，暗含"筛选与打分"的隐喻，让人过目不忘。油头长发、黑西装配白高领的干净组合，进一步强化冷峻、难以接近的高管气质——与你"施加压力却维持专业假面"的 Boss 概念高度一致。',
            bossEn: 'The strengths of this boss design lie in its strong sense of authority and high memorability: the sharp side-profile silhouette gives an inherently intimidating presence, while the restrained expression and sideways glance feel like he is "evaluating" you rather than engaging—conveying an implicit metaphor of selection and scoring. The slicked-back long hair and the clean black suit with white high-neck further reinforce a polished, cold, unapproachable executive vibe.'
        },
        gallery: [
            { src: 'assets/iphi/scene-room.webp', captionZh: '房间对话 · Themis 叫醒 Iphi', captionEn: 'Room dialogue · Themis wakes Iphi' },
            { src: 'assets/iphi/scene-office.webp', captionZh: '办公室场景 · 职场日常', captionEn: 'Office scene · daily corporate life' },
            { src: 'assets/iphi/scene-subway.webp', captionZh: '3D 地铁通勤 · 现实切片', captionEn: '3D subway commute · slice of reality' },
            { src: 'assets/iphi/battle-dion-lock.webp', captionZh: 'Boss 战 · Dion & Lock', captionEn: 'Boss battle · Dion & Lock' },
            { src: 'assets/iphi/battle-reta.webp', captionZh: 'Boss 战 · Reta', captionEn: 'Boss battle · Reta' },
            { src: 'assets/iphi/battle-gia.webp', captionZh: 'Boss 战 · Gia', captionEn: 'Boss battle · Gia' }
        ],
        gameFlow: {
            titleZh: 'Demo 流程', titleEn: 'Demo Flow',
            stepsZh: ['家中移动与探索', '地铁/公司对话推进剧情', '小游戏获取点数', '梦境空间探索', 'Boss 战'],
            stepsEn: ['Home movement & exploration', 'Metro/Company dialogue advances plot', 'Mini-game to gain points', 'Dreamscape exploration', 'Boss battle']
        },
        map2d3d: {
            titleZh: '2D 地图 + 3D 演出', titleEn: '2D Map + 3D Action',
            descZh: '游戏以 2D 与 3D 结合的方式呈现：2D 负责地图探索与叙事，3D 段落则以预录视频形式在玩家触发特定事件时播放，用更高的视觉密度表现“现实”的重量。',
            descEn: 'The game combines 2D and 3D: 2D handles map exploration and narrative, while 3D segments are pre-recorded videos played when the player triggers specific events, using denser visuals to convey the weight of "reality".'
        },
        battleSystem: {
            titleZh: '战斗系统', titleEn: 'Battle System',
            descZh: '1v1 回合制战斗。主角初始 300 HP / 90 MP，开局拥有 4 个技能，最终可学习至 6 个；不同技能组合可击败敌人。部分技能可积攒 TP 槽，TP 达到 100 时可释放高伤害终结技。',
            descEn: '1v1 turn-based combat. The protagonist starts with 300 HP / 90 MP and 4 skills, eventually learning up to 6; different skill combinations defeat enemies. Certain skills charge the TP gauge; at 100 TP, unleash a powerful finisher.',
            detailsZh: ['回合制 1v1', '300 HP / 90 MP', '4 → 6 个技能', 'TP 槽 & 终结技', 'Boss 带有特殊状态影响'],
            detailsEn: ['Turn-based 1v1', '300 HP / 90 MP', '4 → 6 skills', 'TP gauge & finisher', 'Bosses apply special status effects']
        },
        characters: [
            { name: 'Iphi', img: 'assets/iphi/char-iphi.webp', age: '24', roleZh: '主角 / 试用期新员工', roleEn: 'Protagonist / Probationary Employee', descZh: '24岁，性格胆小，面对不公平待遇也不敢说"不"，耐受度极高；爱好是去酒吧喝酒、弹吉他。被"更好前景"的期待驱动来到大城市，但高房租与生活成本让她一旦失去收入就无法负担房租与基本开销，被迫在"留在城市"与"牺牲个人生活"间反复抉择。名字源自希腊神话中为让船队顺利出航而被献祭的 Iphigenia——以代价换取"出航"。', descEn: '24, timid by nature, unable to say "no" to unfair treatment, highly tolerant; her hobbies are going to the bar for a drink and playing the guitar. Driven by hopes for better prospects, she moved to a major city — but high rent and living costs mean losing income would leave her unable to cover rent and basics, forcing a repeated choice between staying and sacrificing personal life. Name derived from Iphigenia — sacrificed so the fleet could sail.' },
            { name: 'Themis', img: 'assets/iphi/char-themis.webp', age: '—', roleZh: 'Iphi 的想象之友', roleEn: 'Iphi\'s Imaginary Friend', descZh: '希腊神话中"秩序、法则与正当性"的拟人化。务实、对未来过分执着但非常可靠。她是 Iphi 务实潜意识的化身，Iphi 极度依赖她——因依赖之深，她能像真人一样与 Iphi "对话"，过去帮 Iphi 做过许多决定；某种意义上，她是最被信任的朋友。她相信 Iphi 的未来前景比当下的牺牲更重要。', descEn: 'Personification of "order, law, and justice" in Greek myth. Practical, overly focused on future prospects, but very reliable. She is the personification of Iphi\'s pragmatic subconscious; Iphi depends on her so heavily that she can "speak" with Iphi as if real, and has helped Iphi make many decisions. In a sense, she is the friend Iphi trusts most. She believes future prospects matter more than present sacrifice.' },
            { name: 'Dion & Lock', img: 'assets/iphi/char-dion.webp', img2: 'assets/iphi/char-lock.webp', age: '—', roleZh: '爱好之化身 / 调酒师与摇滚乐手', roleEn: 'Embodiment of Hobbies / Bartender & Rocker', descZh: 'Dion（酒神狄俄尼索斯）克制礼貌，代表一杯酒带来的片刻宁静；Lock（锁 / Rock 谐音）易怒暴躁，被锁链束缚、布满尖刺，代表音乐、激情与叛逆。当高压工作把生活挤压到窒息，他们会用劝说或怒吼把 Iphi 拉回自己；当 Iphi 为房租与生存压抑他们，爱好便以 Boss 形式反击，阻止生活彻底变成工作。', descEn: 'Dion (Dionysus) is restrained and polite, representing the calm of a drink; Lock (lock / Rock pun) is irritable and quick-tempered, chained and covered in spikes, representing music, passion, and rebellion. When pressure squeezes life to suffocation, they pull Iphi back; when Iphi suppresses them for rent and survival, her hobbies strike back as a Boss.' },
            { name: 'Gia', img: 'assets/iphi/char-gia.webp', age: '—', roleZh: '健康之化身', roleEn: 'Embodiment of Health', descZh: '源自 Hygieia（健康女神）。活泼开朗的小女孩，完美诠释 Iphi 的身体状况。她不反对 Iphi 为房租与生存工作，但坚决反对把睡眠、饮食、喝水、休息当作可无限延后的"消耗品"——因为她知道，这样做迟早会以更昂贵痛苦的方式反弹（失眠、胃痛、心悸、崩溃）。尤其反感 Themis "咬牙挺过去"的逻辑。', descEn: 'Derived from Hygieia (goddess of health). A lively, cheerful little girl who mirrors Iphi\'s physical condition. She doesn\'t oppose working for rent and survival, but firmly resists treating sleep, food, water, and rest as indefinitely postponable "consumables" — knowing it will rebound in costlier, more painful ways. She especially dislikes Themis\'s "grit your teeth" logic.' },
            { name: 'Reta', img: 'assets/iphi/char-reta.webp', age: '—', roleZh: '自尊之化身', roleEn: 'Embodiment of Self-Esteem', descZh: '源自 Areté（卓越、德性）。严肃且自尊心极强，绝不屈服于她认为是错误的事。她对 Iphi 竟选择向工作妥协、牺牲爱好与健康感到愤怒与失望，也对那个怂恿 Iphi 向压力低头的想象之友感到愤怒——正是它让 Iphi 弄丢了原本属于自己的生活。', descEn: 'Derived from Areté (excellence, virtue). Serious with strong self-respect, never yielding to what she considers wrong. She feels furious and disappointed that Iphi chooses to compromise with work and sacrifice her hobbies and health, and is enraged at the imaginary friend for egging Iphi on to bow to pressure — making her lose the life that was once her own.' },
            { name: 'Janus', img: 'assets/iphi/char-janus.webp', age: '40', roleZh: 'Iphi 的部门主管', roleEn: 'Iphi\'s Department Supervisor', descZh: '罗马神话中掌管"门、门槛与转折点"的神。40岁，Iphi 的部门直属主管，被"内卷"文化塑形的以结果为导向管理者：只要你持续高投入、保持在线、产出对公司有益的成果，他就温和有礼，甚至给予称赞；但要求始终强硬，惯用目标、优先级、截止日期与绩效、年终奖等隐性杠杆，把"自愿加班"训练成不言自明的默认规则，让主角在几乎无察觉中让出个人边界，去换取可量化的结果。', descEn: 'Roman god of "doors, thresholds, and turning points." Age 40, Iphi\'s direct supervisor — a results-driven manager shaped by "involution" culture: as long as you stay highly invested, always online, and deliver outcomes that benefit the company, he remains warm and polite, even praising you. But his demands are always firm; he uses goals, deadlines, and levers like performance ratings and year-end bonuses to train "voluntary overtime" into an unspoken default, pushing the protagonist to trade personal boundaries for measurable results.' }
        ],
        team: [
            { name: '刘冠辰', roleZh: '项目主导 / 叙事设计 / 3D动画 / 海报设计', roleEn: 'Project Lead / Narrative / 3D Animation / Poster', isUser: true },
            { name: '涂茗书', roleZh: '3D场景设计 / 灯光材质 / 3D角色 / 音频 / 网站', roleEn: '3D Scene / Lighting / 3D Character / Audio / Web', isUser: false },
            { name: '肖涵月', roleZh: '角色设计 / 角色立绘 / 2D行走动画 / 插画', roleEn: 'Character Design / Portraits / 2D Walk Anim / Illustration', isUser: false },
            { name: '郑景凡', roleZh: '2D场景 / 战斗技能美术 / UI设计', roleEn: '2D Scene / Battle VFX / UI Design', isUser: false },
            { name: '潘安琪', roleZh: 'RPGMaker制作 / 玩法设计 / 剧情润色', roleEn: 'RPGMaker / Gameplay / Story Polish', isUser: false }
        ],
        versions: [
            { ver: 'v0.9.0', date: '2026/04/23', noteZh: '展示版发布：固化 vertical slice 流程，统一界面文案，调整战斗节奏', noteEn: 'Presentation Build: finalized vertical slice, unified UI text, adjusted battle pacing' },
            { ver: 'v0.8.0', date: '2026/04/06', noteZh: '第二版可玩：重新梳理事件链，Boss战技能更新，接入更多角色立绘', noteEn: 'Playable Build 2: restructured event chain, updated Boss skills, integrated more portraits' },
            { ver: 'v0.7.0', date: '2026/03/15', noteZh: 'Vertical Slice 框架确定：对话+调查+Boss战，核心循环后果反馈上线', noteEn: 'Vertical Slice framework: dialogue + investigation + Boss battle, consequence feedback online' },
            { ver: 'v0.6.0', date: '2026/03/02', noteZh: '项目资产首次合入：2D/3D场景跑通，角色立绘接入，宣传海报完成', noteEn: 'First integration: 2D/3D scenes running, portraits integrated, poster completed' }
        ]
    }
];

/* 图标 SVG */
const icons = {
    vr: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="6" y="14" width="36" height="22" rx="4" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="25" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="32" cy="25" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M6 20H3M6 30H3M42 20h3M42 30h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18 14l2-4h8l2 4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    product: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 6L8 16v16l16 10 16-10V16z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 16l16 10 16-10M24 26v16" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="24" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/></svg>',
    brand: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 4l6 14h14l-11 9 4 15-13-9-13 9 4-15L4 18h14z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    award: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="20" r="12" stroke="currentColor" stroke-width="1.5"/><path d="M24 14v6l4 2M18 32l-2 10 8-4 8 4-2-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    game: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M12 18h24a6 6 0 016 6v6a6 6 0 01-10.5 4L30 32H18l-1.5 2A6 6 0 016 30v-6a6 6 0 016-6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M16 24v4M14 26h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="33" cy="25" r="1.5" fill="currentColor"/><circle cx="35" cy="27" r="1.5" fill="currentColor"/></svg>'
};

/* ========================================
   语言管理 / Language Manager
   ======================================== */
// 语言偏好持久化：URL 参数（?lang=en）> localStorage > 默认中文
// 支持 hreflang 英文版 ?lang=en 直达；切换时同步回写 URL（见 langToggle）
const urlLang = new URLSearchParams(window.location.search).get('lang');
let currentLang = (urlLang === 'zh' || urlLang === 'en') ? urlLang : (localStorage.getItem('lang') || 'zh');

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.body.classList.toggle('lang-en', lang === 'en');

    // 更新所有带 data-zh/data-en 的元素
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
        el.textContent = el.dataset[lang];
    });

    // 更新语言切换按钮显示
    const langActive = document.querySelector('.lang-active');
    const langInactive = document.querySelector('.lang-inactive');
    if (lang === 'zh') {
        langActive.textContent = '中';
        langInactive.textContent = 'EN';
    } else {
        langActive.textContent = 'EN';
        langInactive.textContent = '中';
    }

    // 同步图标按钮 aria-label，避免英文模式下仍是中文
    const tt = document.getElementById('themeToggle');
    if (tt) {
        const label = lang === 'zh' ? '切换暗黑模式' : 'Toggle dark mode';
        tt.setAttribute('aria-label', label);
        tt.title = label;
    }
    const hm = document.getElementById('hamburger');
    if (hm) hm.setAttribute('aria-label', lang === 'zh' ? '菜单' : 'Menu');

    // 重新渲染作品集（更新语言）
    renderWorks();
}

/* ========================================
   作品集渲染 / Works Rendering
   ======================================== */
function renderWorks(filter = 'all') {
    const grid = document.getElementById('worksGrid');
    const filtered = filter === 'all' ? worksData : worksData.filter(w => w.category === filter);

    grid.innerHTML = filtered.map(work => `
        <div class="work-card${work.featured ? ' work-card-featured' : ''}" data-id="${work.id}" data-category="${work.category}">
            <div class="work-thumb">
                ${work.thumb ? `<picture class="work-thumb-bg"><source srcset="${work.thumb}" type="image/webp"><img src="${work.thumb.replace(/\.webp$/i, '.jpg')}" alt="${currentLang === 'zh' ? work.titleZh : work.titleEn}" loading="lazy" decoding="async"></picture>` : `<div class="work-thumb-bg" style="background: ${work.gradient};"></div>`}
                ${work.thumb ? '' : `<div class="work-thumb-icon">${icons[work.icon] || icons.award}</div>`}
                <span class="work-year">${work.year}</span>
                ${work.featured ? '<span class="work-featured-badge">★ Featured</span>' : ''}
                <div class="work-overlay">
                    <span class="work-cat">${currentLang === 'zh' ? work.catZh : work.catEn}</span>
                    <h3 class="work-title">${currentLang === 'zh' ? work.titleZh : work.titleEn}</h3>
                    <p class="work-desc">${currentLang === 'zh' ? work.descZh : work.descEn}</p>
                </div>
            </div>
        </div>
    `).join('');

    // 绑定点击事件
    grid.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
    });

    // 重新观察新卡片
    grid.querySelectorAll('.work-card').forEach(card => {
        revealObserver.observe(card);
    });
}

/* ========================================
   作品弹窗 / Work Modal
   ======================================== */
function bilibiliIframeSrc(bvid) {
    const bv = encodeURIComponent(bvid);
    return `https://player.bilibili.com/player.html?bvid=${bv}&page=1&high_quality=1&danmaku=0&autoplay=1`;
}

function buildTrailerHTML(work, embed) {
    if (work && work.trailerBvid) {
        const iframeSrc = bilibiliIframeSrc(work.trailerBvid);
        const coverWebp = work.trailerCover || work.thumb;
        // embed=true（如 IPHI 预告片占位已由外层按钮触发）或无封面时，直接注入 iframe
        if (!embed && coverWebp) {
            const coverJpg = coverWebp.replace(/\.webp$/i, '.jpg');
            const playLabel = currentLang === 'zh' ? '点击播放' : 'Click to play';
            const coverAlt = currentLang === 'zh' ? '视频封面' : 'Video cover';
            return `<button type="button" class="trailer-placeholder modal-trailer-placeholder" data-iframe-src="${iframeSrc}" aria-label="${playLabel}">
                <picture>
                    <source srcset="${coverWebp}" type="image/webp">
                    <img src="${coverJpg}" alt="${coverAlt}" class="trailer-placeholder-img" loading="lazy" decoding="async">
                </picture>
                <span class="trailer-placeholder-play">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                        <circle cx="20" cy="20" r="20" fill="currentColor" opacity="0.95"/>
                        <path d="M27 20l-12 7V13l12 7z" fill="#0a0a0c"/>
                    </svg>
                    <span class="trailer-placeholder-text">${playLabel}</span>
                </span>
                <span class="trailer-placeholder-badge" data-zh="B 站 · 高清" data-en="Bilibili · HD">B 站 · 高清</span>
            </button>`;
        }
        return `<iframe class="iphi-trailer-iframe" loading="lazy" src="${iframeSrc}" scrolling="no" border="0" frameborder="no" framespacing="0" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="true" title="Bilibili Trailer"></iframe>`;
    }
    if (work && work.trailer) {
        return `<video class="iphi-trailer-video" controls preload="metadata" poster="${work.thumb || ''}" playsinline><source src="${work.trailer}" type="video/mp4"><span>${currentLang === 'zh' ? '您的浏览器不支持视频播放。' : 'Your browser does not support the video tag.'}</span></video>`;
    }
    return '';
}

function openModal(id) {
    const work = worksData.find(w => w.id === id);
    if (!work) return;

    const modal = document.getElementById('workModal');
    const body = document.getElementById('modalBody');
    const title = currentLang === 'zh' ? work.titleZh : work.titleEn;
    const cat = currentLang === 'zh' ? work.catZh : work.catEn;
    const desc = currentLang === 'zh' ? work.descZh : work.descEn;
    const role = currentLang === 'zh' ? work.roleZh : work.roleEn;
    const duration = currentLang === 'zh' ? work.durationZh : work.durationEn;

    body.innerHTML = `
        <div class="modal-hero" style="background: ${work.gradient};">
            ${icons[work.icon] ? icons[work.icon].replace('width="48"', 'width="80"').replace('height="48"', 'height="80"') : ''}
            ${work.category === 'game' ? `
                <div class="modal-platforms">
                    ${work.platform.map(p => `<span class="platform-badge">${p}</span>`).join('')}
                </div>
            ` : ''}
        </div>
        <div class="modal-info">
            <div class="modal-cat">${cat}</div>
            <h2 class="modal-title">${title}</h2>
            <div class="modal-meta">
                <span class="modal-meta-item"><strong>${currentLang === 'zh' ? '年份' : 'Year'}:</strong> ${work.year}</span>
                <span class="modal-meta-item"><strong>${currentLang === 'zh' ? '角色' : 'Role'}:</strong> ${role}</span>
                ${duration ? `<span class="modal-meta-item"><strong>${currentLang === 'zh' ? '周期' : 'Duration'}:</strong> ${duration}</span>` : ''}
                ${work.engine ? `<span class="modal-meta-item"><strong>${currentLang === 'zh' ? '引擎' : 'Engine'}:</strong> ${work.engine}</span>` : ''}
                ${work.genreZh ? `<span class="modal-meta-item"><strong>${currentLang === 'zh' ? '类型' : 'Genre'}:</strong> ${currentLang === 'zh' ? work.genreZh : work.genreEn}</span>` : ''}
            </div>
            <p class="modal-desc">${desc}</p>

            ${work.projectOverviewZh ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '项目概述' : 'Overview'}</h3>
                    <p class="modal-synopsis">${currentLang === 'zh' ? work.projectOverviewZh : work.projectOverviewEn}</p>
                </div>
            ` : ''}

            ${work.ideationZh ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '设计构思' : 'Ideation'}</h3>
                    <p class="modal-synopsis">${currentLang === 'zh' ? work.ideationZh : work.ideationEn}</p>
                </div>
            ` : ''}

            ${work.synopsisZh ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '故事简介' : 'Story Synopsis'}</h3>
                    <p class="modal-synopsis">${currentLang === 'zh' ? work.synopsisZh : work.synopsisEn}</p>
                </div>
            ` : ''}

            ${work.coreLoopZh ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '核心玩法循环' : 'Core Gameplay Loop'}</h3>
                    <div class="modal-coreloop">${currentLang === 'zh' ? work.coreLoopZh : work.coreLoopEn}</div>
                </div>
            ` : ''}

            ${work.targetUsersZh ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '目标用户' : 'Target Audience'}</h3>
                    <p class="modal-target">${currentLang === 'zh' ? work.targetUsersZh : work.targetUsersEn}</p>
                </div>
            ` : ''}

            ${work.mechanicsZh ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '核心玩法机制' : 'Core Mechanics'}</h3>
                    <div class="modal-coreloop">${currentLang === 'zh' ? work.mechanicsZh : work.mechanicsEn}</div>
                </div>
            ` : ''}

            ${work.backgroundZh ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '游戏立意' : 'Intended Impact'}</h3>
                    <p class="modal-synopsis">${currentLang === 'zh' ? work.backgroundZh : work.backgroundEn}</p>
                </div>
            ` : ''}

            ${work.persona ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '用户画像 · Persona' : 'User Persona'}</h3>
                    <div class="persona-card">
                        <div class="persona-head">
                            <span class="char-name">${work.persona.name}</span>
                            ${work.persona.age ? `<span class="char-age">${work.persona.age}</span>` : ''}
                            <span class="char-role">${currentLang === 'zh' ? work.persona.roleZh : work.persona.roleEn}</span>
                        </div>
                        <div class="persona-quote">${currentLang === 'zh' ? work.persona.quoteZh : work.persona.quoteEn}</div>
                        <div class="audience-list">
                            <div class="audience-item"><span class="audience-label">${currentLang === 'zh' ? '背景' : 'Background'}</span><span class="audience-value">${currentLang === 'zh' ? work.persona.bgZh : work.persona.bgEn}</span></div>
                            <div class="audience-item"><span class="audience-label">${currentLang === 'zh' ? '痛点' : 'Pain Points'}</span><span class="audience-value">${currentLang === 'zh' ? work.persona.painZh : work.persona.painEn}</span></div>
                            <div class="audience-item"><span class="audience-label">${currentLang === 'zh' ? '目标' : 'Goals'}</span><span class="audience-value">${currentLang === 'zh' ? work.persona.goalZh : work.persona.goalEn}</span></div>
                            <div class="audience-item"><span class="audience-label">${currentLang === 'zh' ? '期望' : 'Expectation'}</span><span class="audience-value">${currentLang === 'zh' ? work.persona.expectZh : work.persona.expectEn}</span></div>
                        </div>
                    </div>
                </div>
            ` : ''}

            ${work.userJourney ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '用户旅程' : 'User Journey'}</h3>
                    <div class="modal-flow">
                        ${(currentLang === 'zh' ? work.userJourney.stepsZh : work.userJourney.stepsEn).map((step, i) => `
                            <div class="modal-flow-item">
                                <span class="modal-flow-num">0${i + 1}</span>
                                <span class="modal-flow-text">${step}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.gameFlow ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? work.gameFlow.titleZh : work.gameFlow.titleEn}</h3>
                    <div class="modal-flow">
                        ${(currentLang === 'zh' ? work.gameFlow.stepsZh : work.gameFlow.stepsEn).map((step, i) => `
                            <div class="modal-flow-item">
                                <span class="modal-flow-num">0${i + 1}</span>
                                <span class="modal-flow-text">${step}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.map2d3d ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? work.map2d3d.titleZh : work.map2d3d.titleEn}</h3>
                    <p class="modal-synopsis">${currentLang === 'zh' ? work.map2d3d.descZh : work.map2d3d.descEn}</p>
                </div>
            ` : ''}

            ${work.battleSystem ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? work.battleSystem.titleZh : work.battleSystem.titleEn}</h3>
                    <p class="modal-synopsis">${currentLang === 'zh' ? work.battleSystem.descZh : work.battleSystem.descEn}</p>
                    <div class="modal-battle-details">
                        ${(currentLang === 'zh' ? work.battleSystem.detailsZh : work.battleSystem.detailsEn).map(d => `<span class="modal-battle-tag">${d}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.visualDesign ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '视觉设计' : 'Visual Design'}</h3>
                    <p class="modal-synopsis">${currentLang === 'zh' ? work.visualDesign.summaryZh : work.visualDesign.summaryEn}</p>
                    <div class="vd-block">
                        <h4 class="vd-title">${currentLang === 'zh' ? '品牌标识 · Logo' : 'Brand Identity · Logo'}</h4>
                        <div class="vd-logo-row">
                            ${work.visualDesign.logoImg ? `<img src="${work.visualDesign.logoImg}" alt="Logo" class="vd-logo" loading="lazy">` : ''}
                            <p class="vd-desc">${currentLang === 'zh' ? work.visualDesign.logoZh : work.visualDesign.logoEn}</p>
                        </div>
                    </div>
                    <div class="vd-block">
                        <h4 class="vd-title">${currentLang === 'zh' ? '配色规范' : 'Colour Specification'}</h4>
                        <div class="vd-swatches">
                            ${work.visualDesign.colors.map(c => `
                                <div class="vd-swatch">
                                    <span class="vd-swatch-color" style="background: ${c.hex};"></span>
                                    <span class="vd-swatch-hex">${c.hex}</span>
                                    <span class="vd-swatch-name">${currentLang === 'zh' ? c.nameZh : c.nameEn}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="vd-block">
                        <h4 class="vd-title">${currentLang === 'zh' ? '字体规范' : 'Typeface Specification'}</h4>
                        <div class="vd-fonts">
                            ${work.visualDesign.fonts.map(f => `
                                <div class="vd-font">
                                    <span class="vd-font-name">${f.name}</span>
                                    <span class="vd-font-usage">${currentLang === 'zh' ? f.usageZh : f.usageEn}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="vd-block">
                        <h4 class="vd-title">${currentLang === 'zh' ? '图标概念' : 'Icon Design Concepts'}</h4>
                        <p class="vd-desc">${currentLang === 'zh' ? work.visualDesign.iconZh : work.visualDesign.iconEn}</p>
                    </div>
                </div>
            ` : ''}

            ${work.healingScenes ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '治愈场景设计' : 'Healing Scene Design'}</h3>
                    <div class="scene2d-grid">
                        ${work.healingScenes.map(s => `
                            <div class="scene-card">
                                ${s.img ? `<img src="${s.img}" alt="${currentLang === 'zh' ? s.nameZh : s.nameEn}" class="scene-card-img" loading="lazy">` : ''}
                                <h4 class="scene-name">${currentLang === 'zh' ? s.nameZh : s.nameEn}</h4>
                                <p class="scene-desc">${currentLang === 'zh' ? s.descZh : s.descEn}</p>
                                <div class="scene-elements">
                                    ${s.elements.map(e => `<span class="scene-el">${e}</span>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.uiDesign ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '界面设计' : 'UI Design'}</h3>
                    <div class="modal-battle-details">
                        ${(currentLang === 'zh' ? work.uiDesign.featuresZh : work.uiDesign.featuresEn).map(f => `<span class="modal-battle-tag">${f}</span>`).join('')}
                    </div>
                    ${work.uiDesign.shots ? `
                        <div class="ui-shots">
                            ${work.uiDesign.shots.map(s => `
                                <div class="ui-shot" data-src="${s.src}" data-caption="${currentLang === 'zh' ? s.captionZh : s.captionEn}">
                                    ${s.src ? `<img src="${s.src}" alt="${currentLang === 'zh' ? s.captionZh : s.captionEn}" class="ui-shot-img${s.tall ? ' ui-shot-img-tall' : ''}" loading="lazy">` : ''}
                                    <span class="ui-shot-caption">${currentLang === 'zh' ? s.captionZh : s.captionEn}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            ${work.testing ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '用户测试与迭代' : 'Testing & Iteration'}</h3>
                    <div class="version-timeline">
                        ${work.testing.map(t => `
                            <div class="version-item">
                                <div class="version-ver">${t.ver}</div>
                                <div class="version-date">${t.date}</div>
                                <div class="version-note">${currentLang === 'zh' ? t.noteZh : t.noteEn}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.reflectionZh ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '反思与展望' : 'Reflection & Outlook'}</h3>
                    <p class="modal-synopsis">${currentLang === 'zh' ? work.reflectionZh : work.reflectionEn}</p>
                </div>
            ` : ''}

            ${work.gallery ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '作品图集' : 'Gallery'}</h3>
                    <div class="modal-gallery-grid">
                        ${work.gallery.map(g => `
                            <div class="modal-gallery-item" data-src="${g.src}" data-caption="${currentLang === 'zh' ? g.captionZh : g.captionEn}">
                                <img src="${g.src}" alt="${currentLang === 'zh' ? g.captionZh : g.captionEn}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.research ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '创作背景 · 大城市青年困境' : 'Creation Context · Urban Youth Plight'}</h3>
                    <div class="research-grid">
                        ${work.research.map(r => `
                            <div class="research-card">
                                <span class="research-num">${r.num}</span>
                                <div class="research-body">
                                    <div class="research-title">${currentLang === 'zh' ? r.titleZh : r.titleEn}</div>
                                    <div class="research-stat">${currentLang === 'zh' ? r.statZh : r.statEn}</div>
                                    <p class="research-detail">${currentLang === 'zh' ? r.detailZh : r.detailEn}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.audience ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '目标用户画像' : 'Audience Profile'}</h3>
                    <div class="audience-list">
                        <div class="audience-item"><span class="audience-label">${currentLang === 'zh' ? '核心人群' : 'Core'}</span><span class="audience-value">${currentLang === 'zh' ? work.audience.coreZh : work.audience.coreEn}</span></div>
                        <div class="audience-item"><span class="audience-label">${currentLang === 'zh' ? '痛点' : 'Pain Points'}</span><span class="audience-value">${currentLang === 'zh' ? work.audience.painZh : work.audience.painEn}</span></div>
                        <div class="audience-item"><span class="audience-label">${currentLang === 'zh' ? '吸引力' : 'Appeal'}</span><span class="audience-value">${currentLang === 'zh' ? work.audience.attractionZh : work.audience.attractionEn}</span></div>
                        <div class="audience-item"><span class="audience-label">${currentLang === 'zh' ? '可扩展' : 'Expand To'}</span><span class="audience-value">${currentLang === 'zh' ? work.audience.expandZh : work.audience.expandEn}</span></div>
                        <div class="audience-item"><span class="audience-label">${currentLang === 'zh' ? '偏好' : 'Preference'}</span><span class="audience-value">${currentLang === 'zh' ? work.audience.preferenceZh : work.audience.preferenceEn}</span></div>
                    </div>
                </div>
            ` : ''}

            ${work.scenes2d ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '2D 场景设计' : '2D Scene Design'}</h3>
                    <div class="scene2d-grid">
                        ${work.scenes2d.map(s => `
                            <div class="scene-card">
                                <h4 class="scene-name">${currentLang === 'zh' ? s.nameZh : s.nameEn}</h4>
                                <p class="scene-desc">${currentLang === 'zh' ? s.descZh : s.descEn}</p>
                                <div class="scene-elements">
                                    ${s.elements.map(e => `<span class="scene-el">${e}</span>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.scenes3d ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '3D 场景与角色设计' : '3D Scene & Character Design'}</h3>
                    <p class="modal-synopsis">${currentLang === 'zh' ? work.scenes3d.roomZh : work.scenes3d.roomEn}</p>
                    <div class="room-days">
                        ${work.scenes3d.days.map(d => `
                            <div class="day-item">
                                ${d.img ? `<img src="${d.img}" alt="${d.day}" class="day-item-img" loading="lazy">` : ''}
                                <span class="day-tag">${d.day}</span>
                                <span class="day-desc">${currentLang === 'zh' ? d.descZh : d.descEn}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="boss-note">
                        <div class="boss-note-media">
                            ${work.scenes3d.bossImg ? `<img src="${work.scenes3d.bossImg}" alt="Janus" class="boss-note-img" loading="lazy">` : ''}
                            <div>
                                <h4 class="boss-title">${currentLang === 'zh' ? 'Boss 设计 · Janus' : 'Boss Design · Janus'}</h4>
                                <p class="boss-desc">${currentLang === 'zh' ? work.scenes3d.bossZh : work.scenes3d.bossEn}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}

            ${work.characters ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '角色介绍' : 'Characters'}</h3>
                    <div class="char-grid">
                        ${work.characters.map(c => `
                            <div class="char-card">
                                ${c.img ? `
                                    <div class="char-card-imgs">
                                        <img src="${c.img}" alt="${c.name}" class="char-card-img" loading="lazy">
                                        ${c.img2 ? `<img src="${c.img2}" alt="${c.name}" class="char-card-img" loading="lazy">` : ''}
                                    </div>
                                ` : ''}
                                <div class="char-card-header">
                                    <span class="char-name">${c.name}</span>
                                    ${c.age !== '—' ? `<span class="char-age">${c.age}</span>` : ''}
                                </div>
                                <div class="char-role">${currentLang === 'zh' ? c.roleZh : c.roleEn}</div>
                                <p class="char-desc">${currentLang === 'zh' ? c.descZh : c.descEn}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.team ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '制作团队' : 'Credits'}</h3>
                    <div class="team-list">
                        ${work.team.map(t => `
                            <div class="team-member${t.isUser ? ' team-member-self' : ''}">
                                <span class="team-name">${t.name}${t.isUser ? ' ★' : ''}</span>
                                <span class="team-role">${currentLang === 'zh' ? t.roleZh : t.roleEn}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${work.versions ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '开发历程' : 'Development Timeline'}</h3>
                    <div class="version-timeline">
                        ${work.versions.map(v => `
                            <div class="version-item">
                                <div class="version-ver">${v.ver}</div>
                                <div class="version-date">${v.date}</div>
                                <div class="version-note">${currentLang === 'zh' ? v.noteZh : v.noteEn}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="modal-tools">
                ${work.tools.map(t => `<span class="modal-tool">${t}</span>`).join('')}
            </div>
            ${work.playLink ? `
                <a href="${work.playLink}" class="modal-play-btn" target="_blank" rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 3l10 6-10 6V3z" fill="currentColor"/></svg>
                    <span>${currentLang === 'zh' ? work.playLabelZh : work.playLabelEn}</span>
                </a>
            ` : ''}
            ${(work.trailer || work.trailerBvid) ? `
                <div class="modal-video">
                    ${buildTrailerHTML(work)}
                </div>
            ` : work.videoNote === false ? '' : `
                <div class="modal-video-note">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M8 7l5 3-5 3V7z" fill="currentColor"/></svg>
                    <span>${currentLang === 'zh' ? '可将作品视频上传至 B站后在此嵌入' : 'Upload the work video to Bilibili to embed it here'}</span>
                </div>
            `}
        </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // 给动态生成的标题加 id，供 aria-labelledby 引用
    const titleEl = body.querySelector('.modal-title');
    if (titleEl) titleEl.id = 'modalTitle';
    // 焦点管理：记录触发元素 → 焦点移入弹窗 → 启用 Tab 陷阱
    lastFocused = document.activeElement;
    activeTrap = modal;
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();

    // 作品弹窗内的 B 站视频：点击播放占位后才注入 iframe（与 IPHI 预告片一致，避免打开弹窗即出声）
    body.querySelectorAll('.modal-trailer-placeholder').forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.dataset.iframeSrc;
            if (!src) return;
            const wrap = btn.parentElement;
            if (!wrap) return;
            wrap.innerHTML = `<iframe class="iphi-trailer-iframe" loading="lazy" src="${src}" scrolling="no" border="0" frameborder="no" framespacing="0" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="true" title="Bilibili Trailer"></iframe>`;
        }, { once: true });
    });
}

function closeModal() {
    const modal = document.getElementById('workModal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeTrap = null;
    if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
        lastFocused = null;
    }
}

/* ========================================
   图片灯箱 / Image Lightbox
   ======================================== */
function openLightbox(src, caption) {
    const box = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    img.src = src;
    cap.textContent = caption || '';
    box.classList.add('active');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lastFocused = document.activeElement;
    activeTrap = box;
    const closeBtn = document.getElementById('lightboxClose');
    if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
    const box = document.getElementById('lightbox');
    box.classList.remove('active');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeTrap = null;
    if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
        lastFocused = null;
    }
}

/* ========================================
   滚动动画 / Scroll Reveal
   ======================================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

/* ========================================
   技能条动画 / Skill Bar Animation
   ======================================== */
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const level = fill.dataset.level;
            fill.style.width = level + '%';
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

/* ========================================
   初始化 / Initialization
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {

    // --- 联系方式：用 CONTACT 常量同步 HTML（单一数据源） ---
    syncContactInfo();

    // --- 语言：应用 localStorage 中保存的偏好（默认中文） ---
    applyLanguage(currentLang);

    // --- 暗黑模式：初始化（localStorage 记忆，否则跟随系统） ---
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 同步浏览器地址栏 theme-color（手动切换主题时不依赖 prefers-color-scheme media query）
    const themeColorMeta = document.getElementById('themeColorMeta');
    function updateThemeColor(theme) {
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', theme === 'dark' ? '#0f0f0f' : '#fafafa');
        }
    }
    updateThemeColor(initialTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeColor(next);
    });

    // 实时跟随系统主题变化（仅当用户未手动设置过时）
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const t = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', t);
            updateThemeColor(t);
        }
    });

    // --- 加载画面：资源就绪即隐藏，最多等 800ms（取先到者，避免慢网络白屏 / 快网络干等） ---
    const loader = document.getElementById('loader');
    let loaderHidden = false;
    const hideLoader = () => {
        if (loaderHidden) return;
        loaderHidden = true;
        loader.classList.add('hidden');
    };
    setTimeout(hideLoader, 800);
    window.addEventListener('load', hideLoader);

    // --- IPHI 预告片：用户点击播放按钮后才注入 iframe，避免进页自动出声（MEI 高分浏览器常见）
    const iphiWork = worksData.find(w => w.id === 5) || worksData.find(w => w.titleEn === 'IPHI');
    const trailerFrame = document.getElementById('iphiTrailerFrame');
    const trailerPlayBtn = document.getElementById('trailerPlayBtn');
    if (iphiWork && trailerFrame && trailerPlayBtn) {
        trailerPlayBtn.addEventListener('click', () => {
            trailerFrame.innerHTML = buildTrailerHTML(iphiWork, true);
        }, { once: true });
    }

    // --- 「查看完整作品」按钮：打开对应作品弹窗（作品展示）---
    document.querySelectorAll('[data-open-work]').forEach(btn => {
        btn.addEventListener('click', () => openModal(parseInt(btn.dataset.openWork, 10)));
    });

    // --- 自定义光标（动态启停：窗口缩放 / 触屏设备自动关闭，避免空转 rAF） ---
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let cursorActive = false;
    let cursorRafId = null;

    // 仅在宽屏 + 精确指针（鼠标）下启用，触屏设备自动跳过
    const cursorMQ = window.matchMedia('(min-width: 1025px) and (pointer: fine)');

    function onCursorMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }

    function animateRing() {
        if (!cursorActive) return;
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        cursorRafId = requestAnimationFrame(animateRing);
    }

    function startCursor() {
        if (cursorActive) return;
        cursorActive = true;
        document.body.classList.add('cursor-ready');
        document.addEventListener('mousemove', onCursorMove);
        animateRing();
        // 可交互元素光标变大
        document.querySelectorAll('a, button, .work-card, .skill-card, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('expand'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('expand'));
        });
    }

    function stopCursor() {
        if (!cursorActive) return;
        cursorActive = false;
        document.body.classList.remove('cursor-ready');
        document.removeEventListener('mousemove', onCursorMove);
        if (cursorRafId) {
            cancelAnimationFrame(cursorRafId);
            cursorRafId = null;
        }
    }

    // 初始化 + 响应窗口变化动态启停
    if (cursorMQ.matches) startCursor();
    cursorMQ.addEventListener('change', (e) => { e.matches ? startCursor() : stopCursor(); });

    // --- 滚动进度 ---
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    // 滚动事件：rAF 合并写入 + passive，提升滚动性能
    let scrollTicking = false;
    const onScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight || 1;
        scrollProgress.style.width = (scrollTop / docHeight) * 100 + '%';
        navbar.classList.toggle('scrolled', scrollTop > 50);
        backToTop.classList.toggle('visible', scrollTop > 600);
        updateNavActive();
        scrollTicking = false;
    };
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(onScroll);
            scrollTicking = true;
        }
    }, { passive: true });

    // --- 导航高亮（缓存 section offsetTop，避免每次滚动读取布局触发 reflow） ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let sectionTops = [];

    function calcSectionTops() {
        sectionTops = Array.from(sections).map(s => ({
            id: s.getAttribute('id'),
            top: s.offsetTop - 120
        }));
    }
    calcSectionTops();

    // 窗口尺寸变化后重新计算（防抖，避免 resize 高频触发）
    let navResizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(navResizeTimer);
        navResizeTimer = setTimeout(calcSectionTops, 150);
    });

    function updateNavActive() {
        const y = window.scrollY;
        let current = '';
        for (const s of sectionTops) {
            if (y >= s.top) current = s.id;
            else break;
        }
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    // --- 平滑滚动 ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                // 关闭移动端菜单
                document.getElementById('navMenu').classList.remove('active');
                document.getElementById('hamburger').classList.remove('active');
            }
        });
    });

    // --- 汉堡菜单 ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // --- 语言切换：切换后写入 localStorage，刷新后保持（与暗黑模式一致） ---
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        applyLanguage(newLang);
        localStorage.setItem('lang', newLang);
        // 同步回写 URL：en → ?lang=en；zh → 移除参数（保留 # 锚点），与 hreflang 保持一致
        try {
            const u = new URL(window.location.href);
            if (newLang === 'en') u.searchParams.set('lang', 'en');
            else u.searchParams.delete('lang');
            history.replaceState(null, '', u.toString());
        } catch (e) {}
    });

    // --- 作品筛选 ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderWorks(btn.dataset.filter);
        });
    });

    // --- 弹窗关闭 ---
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', closeModal);
    document.getElementById('modalBack').addEventListener('click', closeModal);

    // --- 图片灯箱 ---
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') closeLightbox();
    });

    // --- 统一 Esc 关闭：优先关灯箱，其次关弹窗（避免两个监听互相干扰）---
    document.addEventListener('keydown', (e) => {
        // 焦点陷阱：弹窗内 Tab 循环，不逸出到背景
        if (e.key === 'Tab' && activeTrap) {
            trapFocus(activeTrap, e);
            return;
        }
        if (e.key !== 'Escape') return;
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        } else {
            closeModal();
        }
    });
    document.body.addEventListener('click', (e) => {
        const item = e.target.closest('.modal-gallery-item, .ui-shot');
        if (item) {
            const img = item.querySelector('img');
            const caption = item.dataset[currentLang === 'zh' ? 'captionZh' : 'captionEn'] || item.dataset.caption || img.alt;
            openLightbox(item.dataset.src || img.src, caption);
        }
    });

    // --- 返回顶部 ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 表单提交（mailto：校验后打开邮件客户端；未打开时给出复制邮箱降级方案）---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('#cf-name').value.trim();
        const email = contactForm.querySelector('#cf-email').value.trim();
        const company = contactForm.querySelector('#cf-company').value.trim();
        const message = contactForm.querySelector('#cf-message').value.trim();

        if (!name || !message) return;
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailOk) {
            const emailField = contactForm.querySelector('#cf-email');
            emailField.classList.add('is-invalid');
            emailField.focus();
            emailField.reportValidity();
            return;
        }

        const subject = encodeURIComponent(`[网站留言] ${name}${company ? ' · ' + company : ''}`);
        const body = encodeURIComponent(`${message}\n\n---\n姓名: ${name}\n邮箱: ${email}${company ? '\n公司: ' + company : ''}`);
        window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

        const btn = contactForm.querySelector('button[type="submit"]');
        const span = btn.querySelector('span');
        const originalText = span.textContent;
        span.textContent = currentLang === 'zh' ? '正在打开邮件客户端…' : 'Opening mail client…';
        btn.disabled = true;

        // 降级检测：mailto 触发后若 1.2s 内页面仍持有焦点（未发生跳转），
        // 说明邮件客户端未打开（Webmail 用户常见），显示复制邮箱提示
        const fallback = document.getElementById('formFallback');
        let fallbackShown = false;
        const fallbackTimer = setTimeout(() => {
            if (document.hasFocus() && fallback) {
                fallback.hidden = false;
                fallbackShown = true;
            }
        }, 1200);

        setTimeout(() => {
            span.textContent = originalText;
            btn.disabled = false;
            contactForm.reset();
            clearTimeout(fallbackTimer);
            // 若降级提示已展示，保持显示以便用户复制邮箱
        }, 3000);
    });

    // 降级提示：复制邮箱到剪贴板
    const formFallbackCopy = document.getElementById('formFallbackCopy');
    if (formFallbackCopy) {
        formFallbackCopy.addEventListener('click', () => {
            const email = CONTACT.email;
            const doneLabel = currentLang === 'zh' ? '已复制' : 'Copied';
            const resetLabel = () => formFallbackCopy.textContent = currentLang === 'zh' ? '复制' : 'Copy';
            const copyLegacy = (text) => {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); formFallbackCopy.textContent = doneLabel; } catch (e) { /* ignore */ }
                ta.remove();
                setTimeout(resetLabel, 2000);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    formFallbackCopy.textContent = doneLabel;
                    setTimeout(resetLabel, 2000);
                }).catch(() => copyLegacy(email));
            } else {
                copyLegacy(email);
            }
        });
    }

    // 输入时清除错误高亮
    contactForm.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', () => el.classList.remove('is-invalid'));
    });

    // --- 简历下载：同步拦截 + 异步探测，修复异步 preventDefault 无效的 bug ---
    const triggerDownload = (url) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
    document.querySelectorAll('.about-resume').forEach((resumeLink) => {
        resumeLink.addEventListener('click', (e) => {
            e.preventDefault(); // 必须同步拦截，否则 <a download> 默认行为已触发
            const fileName = resumeLink.dataset.file || 'resume.pdf';
            fetch(resumeLink.href, { method: 'HEAD' })
                .then((resp) => {
                    if (resp.status === 404) showResumeMissing(fileName);
                    else triggerDownload(resumeLink.href);
                })
                .catch(() => {
                    // file:// 或网络受限：无法探测，直接尝试下载（浏览器原生处理）
                    triggerDownload(resumeLink.href);
                });
        });
    });

    function showResumeMissing(fileName) {
        alert(currentLang === 'zh'
            ? `未找到简历 PDF，请先将文件放到 assets/${fileName}`
            : `CV PDF not found. Please place it at assets/${fileName} first.`);
    }

    // --- 初始渲染 ---
    renderWorks();

    // --- 启动滚动动画观察 ---
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // --- 启动技能条动画 ---
    document.querySelectorAll('.skill-fill').forEach(el => {
        skillObserver.observe(el);
    });

    // 为 section 添加 reveal（注：IPHI 弹窗内元素由 JS 动态生成，不在此处处理）
    document.querySelectorAll('.section-header, .about-grid > *, .timeline-item, .skill-category, .contact-method, .iphi-visual, .iphi-body > *').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
});
