/* ========================================
   作品集数据 / Portfolio Data
   ======================================== */
const worksData = [
    {
        id: 1,
        titleZh: '智能环境交互艺术装置',
        titleEn: 'Smart Environmental Interactive Art Installation',
        catZh: 'VR/交互装置',
        catEn: 'VR / Interaction',
        category: 'vr',
        year: '2022',
        descZh: '独立完成户外智能交互艺术装置的整体设计、技术选型与落地实施。运用Arduino+红外传感器+实时投影技术实现人机互动，装置落地后日均互动人次超过200，被校方列为生态科普示范项目，并作为数字艺术与环保教育融合的创新案例对外展示。',
        descEn: 'Independently completed the full design, technology selection, and implementation of an outdoor smart interactive art installation. Used Arduino + IR sensors + real-time projection for human-computer interaction. After deployment, averaged 200+ daily interactions, designated as an ecological science demonstration project and showcased as an innovative case merging digital art with environmental education.',
        tools: ['Arduino', '红外传感器', '实时投影', 'Blender'],
        roleZh: '主设计师 / 技术实施',
        roleEn: 'Lead Designer / Technical Implementation',
        durationZh: '完整项目周期',
        durationEn: 'Full project cycle',
        gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4, #14b8a6)',
        icon: 'vr',
        trailer: '',
        trailerBvid: 'BV1NAbS6xEXT'
        thumb: 'assets/covers/BV1NAbS6xEXT.jpg'
    },
    {
        id: 2,
        titleZh: '胰岛素笔舒适腕带',
        titleEn: 'Insulin Pen Comfort Wristband',
        catZh: '产品设计',
        catEn: 'Product Design',
        category: 'product',
        year: '2023',
        descZh: '针对儿童糖尿病患者使用痛点，完成胰岛素笔舒适腕带的创新结构设计。使用Rhino+Keyshot完成三维建模与写实渲染，方案兼顾安全、舒适与美学，获项目导师及行业专家一致好评，并被推荐为校内优秀设计案例展示。',
        descEn: 'Addressed pain points for pediatric diabetes patients by designing an innovative insulin pen wristband. Completed 3D modeling and photorealistic rendering using Rhino + Keyshot. The design balanced safety, comfort, and aesthetics, earning unanimous praise from mentors and industry experts, recommended as an outstanding design showcase.',
        tools: ['Rhino', 'Keyshot', 'Photoshop'],
        roleZh: '产品设计师',
        roleEn: 'Product Designer',
        durationZh: 'IF国际新锐设计人才项目',
        durationEn: 'IF Emerging Design Talent Program',
        gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6)',
        icon: 'product',
        trailer: '',
        trailerBvid: ''
    },
    {
        id: 3,
        titleZh: '毛戈平品牌视觉体系升级',
        titleEn: 'MAOGEPING Brand Visual System Upgrade',
        catZh: '品牌视觉',
        catEn: 'Brand Visual',
        category: 'brand',
        year: '2023 — 2024',
        descZh: '协助北京地区12家线下门店完成品牌视觉体系升级，优化陈列视觉层次与产品展示动线。改进后重点产品顾客平均停留时长提升约15%，品牌辨识度调研好评率提高22%，有效支撑门店引流与转化。',
        descEn: 'Assisted 12 retail stores in Beijing with brand visual system upgrades, optimizing display visual hierarchy and product flow. Post-improvement: average customer dwell time increased ~15%, brand recognition approval rate rose 22%, effectively supporting store traffic and conversion.',
        tools: ['Photoshop', 'Illustrator', 'After Effects'],
        roleZh: '设计助理',
        roleEn: 'Design Assistant',
        durationZh: '3个月（北京分公司）',
        durationEn: '3 months (Beijing)',
        gradient: 'linear-gradient(135deg, #ff3b30, #ff9500, #fbbf24)',
        icon: 'brand',
        trailer: '',
        trailerBvid: ''
    },
    {
        id: 4,
        titleZh: '中国高校设计优秀作品展 · 全国一等奖',
        titleEn: 'China University Design Exhibition · National First Prize',
        catZh: '3D建模/数字媒体',
        catEn: '3D / Digital Media',
        category: '3d',
        year: '2024',
        descZh: '作品在第八届中国高校设计优秀作品展数字媒体类别中获全国一等奖。结合3D建模、动态视觉与数字交互技术，展现出色的数字艺术创作能力与创新设计思维。同时获大学生创新创业竞赛校级一等奖（前5%）。',
        descEn: 'Won national first prize in the Digital Media category at the 8th China University Design Exhibition. Combined 3D modeling, motion graphics, and digital interaction technology to demonstrate outstanding digital art creation and innovative design thinking. Also won first prize (top 5%) in the College Innovation & Entrepreneurship Competition.',
        tools: ['Blender', 'After Effects', 'Unity', 'Photoshop'],
        roleZh: '独立创作者',
        roleEn: 'Solo Creator',
        durationZh: '2024年',
        durationEn: '2024',
        gradient: 'linear-gradient(135deg, #f43f5e, #ec4899, #d946ef)',
        icon: 'award',
        trailer: '',
        trailerBvid: 'BV1SvbS6YEiv'
        thumb: 'assets/covers/BV1SvbS6YEiv.jpg'
    },
    /* ===== 游戏作品 ===== */
    {
        id: 5,
        titleZh: 'IPHI',
        titleEn: 'IPHI',
        catZh: '游戏设计',
        catEn: 'Game Design',
        category: 'game',
        year: '2025 — 2026',
        featured: true,
        descZh: '一款以大城市职场生存为题材的数字叙事游戏。主角 Iphi 来到大城市追求"更好的未来"，但高昂的房租与生活成本让她被迫在个人边界与短期稳定之间不断妥协。当工作带来的损耗累积到临界点，爱好、健康与自尊会以 Boss 的形式在梦境空间中反扑——它们不是反派，而是被压抑的自我。',
        descEn: 'A digital narrative game about surviving as a young professional in a big city. Protagonist Iphi moves to a metropolis for a "better future," but crushing rent and living costs force her to compromise personal boundaries for short-term stability. When the toll of overwork reaches a breaking point, her hobbies, health, and self-esteem return as Bosses in dreamlike spaces — not as enemies, but as repressed parts of herself.',
        tools: ['RPGMaker', 'Blender', 'Photoshop', 'After Effects'],
        roleZh: '项目主导 / 叙事设计 / 3D动画 / 海报设计',
        roleEn: 'Project Lead / Narrative Design / 3D Animation / Poster Design',
        durationZh: '6人团队 · 6个月开发',
        durationEn: '6-person team · 6 months dev',
        gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
        thumb: 'assets/iphi/poster.jpg',
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
                { day: 'Day 1', img: 'assets/iphi/room-day1.png', descZh: '吉他、酒杯等个人物品占据显眼位置——以爱好为中心的生活', descEn: 'Personal items prominent — a life centered on hobbies' },
                { day: 'Day 2', img: 'assets/iphi/room-day2.png', descZh: '物品被收起——生活被工作取代', descEn: 'Items put away — life replaced by work' },
                { day: 'Day 3', img: 'assets/iphi/room-day3.png', descZh: '个人痕迹完全消失——空间变为工作区', descEn: 'All personal traces gone — transformed into a workspace' }
            ],
            bossImg: 'assets/iphi/char-janus.png',
            bossZh: '这一 Boss 设计的强项在于极强的权威感与高记忆点：锐利的侧影剪影自带威慑，克制的表情与侧目像在"评估"你而非与你互动，暗含"筛选与打分"的隐喻，让人过目不忘。油头长发、黑西装配白高领的干净组合，进一步强化冷峻、难以接近的高管气质——与你"施加压力却维持专业假面"的 Boss 概念高度一致。',
            bossEn: 'The strengths of this boss design lie in its strong sense of authority and high memorability: the sharp side-profile silhouette gives an inherently intimidating presence, while the restrained expression and sideways glance feel like he is "evaluating" you rather than engaging—conveying an implicit metaphor of selection and scoring. The slicked-back long hair and the clean black suit with white high-neck further reinforce a polished, cold, unapproachable executive vibe.'
        },
        gallery: [
            { src: 'assets/iphi/scene-room.jpeg', captionZh: '房间对话 · Themis 叫醒 Iphi', captionEn: 'Room dialogue · Themis wakes Iphi' },
            { src: 'assets/iphi/scene-office.png', captionZh: '办公室场景 · 职场日常', captionEn: 'Office scene · daily corporate life' },
            { src: 'assets/iphi/scene-subway.png', captionZh: '3D 地铁通勤 · 现实切片', captionEn: '3D subway commute · slice of reality' },
            { src: 'assets/iphi/battle-dion-lock.png', captionZh: 'Boss 战 · Dion & Lock', captionEn: 'Boss battle · Dion & Lock' },
            { src: 'assets/iphi/battle-reta.png', captionZh: 'Boss 战 · Reta', captionEn: 'Boss battle · Reta' },
            { src: 'assets/iphi/battle-gia.png', captionZh: 'Boss 战 · Gia', captionEn: 'Boss battle · Gia' }
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
            { name: 'Iphi', img: 'assets/iphi/char-iphi.png', age: '24', roleZh: '主角 / 试用期新员工', roleEn: 'Protagonist / Probationary Employee', descZh: '24岁，性格胆小，面对不公平待遇也不敢说"不"，耐受度极高；爱好是去酒吧喝酒、弹吉他。被"更好前景"的期待驱动来到大城市，但高房租与生活成本让她一旦失去收入就无法负担房租与基本开销，被迫在"留在城市"与"牺牲个人生活"间反复抉择。名字源自希腊神话中为让船队顺利出航而被献祭的 Iphigenia——以代价换取"出航"。', descEn: '24, timid by nature, unable to say "no" to unfair treatment, highly tolerant; her hobbies are going to the bar for a drink and playing the guitar. Driven by hopes for better prospects, she moved to a major city — but high rent and living costs mean losing income would leave her unable to cover rent and basics, forcing a repeated choice between staying and sacrificing personal life. Name derived from Iphigenia — sacrificed so the fleet could sail.' },
            { name: 'Themis', img: 'assets/iphi/char-themis.png', age: '—', roleZh: 'Iphi 的想象之友', roleEn: 'Iphi\'s Imaginary Friend', descZh: '希腊神话中"秩序、法则与正当性"的拟人化。务实、对未来过分执着但非常可靠。她是 Iphi 务实潜意识的化身，Iphi 极度依赖她——因依赖之深，她能像真人一样与 Iphi "对话"，过去帮 Iphi 做过许多决定；某种意义上，她是最被信任的朋友。她相信 Iphi 的未来前景比当下的牺牲更重要。', descEn: 'Personification of "order, law, and justice" in Greek myth. Practical, overly focused on future prospects, but very reliable. She is the personification of Iphi\'s pragmatic subconscious; Iphi depends on her so heavily that she can "speak" with Iphi as if real, and has helped Iphi make many decisions. In a sense, she is the friend Iphi trusts most. She believes future prospects matter more than present sacrifice.' },
            { name: 'Dion & Lock', img: 'assets/iphi/char-dion.png', img2: 'assets/iphi/char-lock.png', age: '—', roleZh: '爱好之化身 / 调酒师与摇滚乐手', roleEn: 'Embodiment of Hobbies / Bartender & Rocker', descZh: 'Dion（酒神狄俄尼索斯）克制礼貌，代表一杯酒带来的片刻宁静；Lock（锁 / Rock 谐音）易怒暴躁，被锁链束缚、布满尖刺，代表音乐、激情与叛逆。当高压工作把生活挤压到窒息，他们会用劝说或怒吼把 Iphi 拉回自己；当 Iphi 为房租与生存压抑他们，爱好便以 Boss 形式反击，阻止生活彻底变成工作。', descEn: 'Dion (Dionysus) is restrained and polite, representing the calm of a drink; Lock (lock / Rock pun) is irritable and quick-tempered, chained and covered in spikes, representing music, passion, and rebellion. When pressure squeezes life to suffocation, they pull Iphi back; when Iphi suppresses them for rent and survival, her hobbies strike back as a Boss.' },
            { name: 'Gia', img: 'assets/iphi/char-gia.png', age: '—', roleZh: '健康之化身', roleEn: 'Embodiment of Health', descZh: '源自 Hygieia（健康女神）。活泼开朗的小女孩，完美诠释 Iphi 的身体状况。她不反对 Iphi 为房租与生存工作，但坚决反对把睡眠、饮食、喝水、休息当作可无限延后的"消耗品"——因为她知道，这样做迟早会以更昂贵痛苦的方式反弹（失眠、胃痛、心悸、崩溃）。尤其反感 Themis "咬牙挺过去"的逻辑。', descEn: 'Derived from Hygieia (goddess of health). A lively, cheerful little girl who mirrors Iphi\'s physical condition. She doesn\'t oppose working for rent and survival, but firmly resists treating sleep, food, water, and rest as indefinitely postponable "consumables" — knowing it will rebound in costlier, more painful ways. She especially dislikes Themis\'s "grit your teeth" logic.' },
            { name: 'Reta', img: 'assets/iphi/char-reta.png', age: '—', roleZh: '自尊之化身', roleEn: 'Embodiment of Self-Esteem', descZh: '源自 Areté（卓越、德性）。严肃且自尊心极强，绝不屈服于她认为是错误的事。她对 Iphi 竟选择向工作妥协、牺牲爱好与健康感到愤怒与失望，也对那个怂恿 Iphi 向压力低头的想象之友感到愤怒——正是它让 Iphi 弄丢了原本属于自己的生活。', descEn: 'Derived from Areté (excellence, virtue). Serious with strong self-respect, never yielding to what she considers wrong. She feels furious and disappointed that Iphi chooses to compromise with work and sacrifice her hobbies and health, and is enraged at the imaginary friend for egging Iphi on to bow to pressure — making her lose the life that was once her own.' },
            { name: 'Janus', img: 'assets/iphi/char-janus.png', age: '40', roleZh: 'Iphi 的部门主管', roleEn: 'Iphi\'s Department Supervisor', descZh: '罗马神话中掌管"门、门槛与转折点"的神。40岁，Iphi 的部门直属主管，被"内卷"文化塑形的以结果为导向管理者：只要你持续高投入、保持在线、产出对公司有益的成果，他就温和有礼，甚至给予称赞；但要求始终强硬，惯用目标、优先级、截止日期与绩效、年终奖等隐性杠杆，把"自愿加班"训练成不言自明的默认规则，让主角在几乎无察觉中让出个人边界，去换取可量化的结果。', descEn: 'Roman god of "doors, thresholds, and turning points." Age 40, Iphi\'s direct supervisor — a results-driven manager shaped by "involution" culture: as long as you stay highly invested, always online, and deliver outcomes that benefit the company, he remains warm and polite, even praising you. But his demands are always firm; he uses goals, deadlines, and levers like performance ratings and year-end bonuses to train "voluntary overtime" into an unspoken default, pushing the protagonist to trade personal boundaries for measurable results.' }
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
let currentLang = 'zh';

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
                ${work.thumb ? `<div class="work-thumb-bg" style="background-image: url('${work.thumb}'); background-size: cover; background-position: center;"></div>` : `<div class="work-thumb-bg" style="background: ${work.gradient};"></div>`}
                ${work.thumb ? '' : `<div class="work-thumb-icon">${icons[work.icon] || icons.award}</div>`}
                <span class="work-year">${work.year}</span>
                ${work.featured ? '<span class="work-featured-badge">★ Featured</span>' : ''}
                <div class="work-overlay">
                    <span class="work-cat">${currentLang === 'zh' ? work.catZh : work.catEn}</span>
                    <h3 class="work-title">${currentLang === 'zh' ? work.titleZh : work.titleEn}</h3>
                    <p class="work-desc">${currentLang === 'zh' ? work.descZh.substring(0, 50) + '...' : work.descEn.substring(0, 50) + '...'}</p>
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
function buildTrailerHTML(work) {
    if (work && work.trailerBvid) {
        const bv = encodeURIComponent(work.trailerBvid);
        return `<iframe class="iphi-trailer-iframe" src="https://player.bilibili.com/player.html?bvid=${bv}&page=1&high_quality=1&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" title="IPHI Trailer on Bilibili"></iframe>`;
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
                <span class="modal-meta-item"><strong>${currentLang === 'zh' ? '周期' : 'Duration'}:</strong> ${duration}</span>
                ${work.engine ? `<span class="modal-meta-item"><strong>${currentLang === 'zh' ? '引擎' : 'Engine'}:</strong> ${work.engine}</span>` : ''}
                ${work.genreZh ? `<span class="modal-meta-item"><strong>${currentLang === 'zh' ? '类型' : 'Genre'}:</strong> ${currentLang === 'zh' ? work.genreZh : work.genreEn}</span>` : ''}
            </div>
            <p class="modal-desc">${desc}</p>

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

            ${work.gallery ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">${currentLang === 'zh' ? '游戏图集' : 'Game Gallery'}</h3>
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
            ${work.category === 'game' && work.playLink ? `
                <a href="${work.playLink}" class="modal-play-btn" target="_blank">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 3l10 6-10 6V3z" fill="currentColor"/></svg>
                    <span>${currentLang === 'zh' ? work.playLabelZh : work.playLabelEn}</span>
                </a>
            ` : ''}
            ${(work.trailer || work.trailerBvid) ? `
                <div class="modal-video">
                    ${buildTrailerHTML(work)}
                </div>
            ` : `
                <div class="modal-video-note">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M8 7l5 3-5 3V7z" fill="currentColor"/></svg>
                    <span>${currentLang === 'zh' ? '可将作品视频上传至 B站后在此嵌入' : 'Upload the work video to Bilibili to embed it here'}</span>
                </div>
            `}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('workModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
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
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const box = document.getElementById('lightbox');
    box.classList.remove('active');
    document.body.style.overflow = '';
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

    // --- 暗黑模式：初始化（localStorage 记忆，否则跟随系统） ---
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // 实时跟随系统主题变化（仅当用户未手动设置过时）
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // --- 加载画面 ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1600);

    // --- IPHI 预告片：有 B站 BV 号则嵌入，否则回退本地视频 ---
    const iphiWork = worksData.find(w => w.trailer || w.trailerBvid);
    const trailerFrame = document.getElementById('iphiTrailerFrame');
    if (iphiWork && trailerFrame) {
        trailerFrame.innerHTML = buildTrailerHTML(iphiWork);
    }

    // --- 「查看完整作品」按钮：打开对应作品弹窗（作品展示）---
    document.querySelectorAll('[data-open-work]').forEach(btn => {
        btn.addEventListener('click', () => openModal(parseInt(btn.dataset.openWork, 10)));
    });

    // --- 自定义光标 ---
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // 光标环平滑跟随
        function animateRing() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // 可交互元素光标变大
        document.querySelectorAll('a, button, .work-card, .skill-card, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('expand'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('expand'));
        });
    }

    // --- 滚动进度 ---
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPct = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPct + '%';

        // 导航栏
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 返回顶部按钮
        if (scrollTop > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // 导航高亮
        updateNavActive();
    });

    // --- 导航高亮 ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateNavActive() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
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

    // --- 语言切换 ---
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        applyLanguage(newLang);
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
        if (e.key !== 'Escape') return;
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        } else {
            closeModal();
        }
    });
    document.body.addEventListener('click', (e) => {
        const item = e.target.closest('.iphi-gallery-item, .modal-gallery-item');
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

    // --- 表单提交 ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input, textarea');
        const name = inputs[0].value;
        const email = inputs[1].value;
        const company = inputs[2].value;
        const message = inputs[3].value;
        const subject = encodeURIComponent(`[网站留言] ${name}${company ? ' · ' + company : ''}`);
        const body = encodeURIComponent(`${message}\n\n---\n姓名: ${name}\n邮箱: ${email}${company ? '\n公司: ' + company : ''}`);
        window.location.href = `mailto:liugc367@163.com?subject=${subject}&body=${body}`;

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.querySelector('span').textContent;
        btn.querySelector('span').textContent = currentLang === 'zh' ? '已打开邮件客户端 ✓' : 'Opened mail client ✓';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.querySelector('span').textContent = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // --- 简历下载（文件不存在时提示） ---
    const resumeLink = document.getElementById('resumeLink');
    if (resumeLink) {
        resumeLink.addEventListener('click', (e) => {
            // 仅靠 HTTP HEAD 探测；file:// 协议下 fetch 会直接抛错，
            // 此时不应拦截下载，否则本地双击打开页面时永远无法下载已存在的简历。
            fetch(resumeLink.href, { method: 'HEAD' })
                .then((resp) => {
                    if (resp.ok === false) {
                        e.preventDefault();
                        showResumeMissing();
                    }
                })
                .catch(() => { /* file:// 或网络受限：放行，依赖浏览器原生下载 */ });
        });
    }

    function showResumeMissing() {
        alert(currentLang === 'zh'
            ? '请先将简历 PDF 放到 assets/resume.pdf'
            : 'Please place your CV PDF at assets/resume.pdf first.');
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
