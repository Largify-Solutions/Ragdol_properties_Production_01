import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const now = new Date()

function buildLocalizedContent(language, summary, bullets, outlook) {
  if (language === 'ar') {
    return [
      summary,
      '',
      'أهم النقاط:',
      ...bullets.map((item) => `- ${item}`),
      '',
      `التوقعات: ${outlook}`,
    ].join('\n')
  }

  return [
    summary,
    '',
    'Key Highlights:',
    ...bullets.map((item) => `- ${item}`),
    '',
    `Outlook: ${outlook}`,
  ].join('\n')
}

function inferTab(category) {
  const normalized = String(category || '').toLowerCase()
  if (normalized.includes('market') || normalized.includes('report')) return 'market-reports'
  if (normalized.includes('development') || normalized.includes('project')) return 'developments'
  return 'insights'
}

const blueprints = [
  {
    slug: 'new-waterfront-development-dubai-marina',
    titleEn: 'New Waterfront Development Announced in Dubai Marina',
    titleAr: 'الإعلان عن مشروع جديد على الواجهة البحرية في دبي مارينا',
    category: 'New Developments',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'A new mixed-use waterfront project is launching in Dubai Marina with residential towers, branded retail, and marina-facing amenities.',
    summaryAr: 'يتم إطلاق مشروع جديد متعدد الاستخدامات في دبي مارينا يضم أبراجاً سكنية ومتاجر مميزة ومرافق مطلة على المارينا.',
    bulletsEn: ['Premium waterfront inventory is limited and highly competitive', 'Payment plans are structured in phased milestones', 'Launch pricing is positioned for early investor traction'],
    bulletsAr: ['المخزون الفاخر على الواجهة البحرية محدود وتنافسي', 'خطط الدفع منظمة على مراحل واضحة', 'أسعار الإطلاق مهيأة لجذب المستثمرين في المراحل الأولى'],
    outlookEn: 'Strong absorption is expected through launch quarter.',
    outlookAr: 'من المتوقع تحقيق معدل بيع قوي خلال ربع الإطلاق.',
    tags: ['development', 'projects', 'dubai marina', 'تطوير', 'مشاريع'],
  },
  {
    slug: 'palm-jumeirah-villa-cluster-final-phase',
    titleEn: 'Palm Jumeirah Villa Cluster Enters Final Construction Phase',
    titleAr: 'مجموعة فلل نخلة جميرا تدخل المرحلة النهائية من الإنشاء',
    category: 'Development Projects',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'The latest villa cluster in Palm Jumeirah has entered final construction with handover expected next year.',
    summaryAr: 'دخلت أحدث مجموعة فلل في نخلة جميرا المرحلة النهائية من الإنشاء مع توقعات بالتسليم العام المقبل.',
    bulletsEn: ['Façade and MEP works are nearing completion', 'Developer confirms no revision to handover window', 'Buyer demand remains resilient in ultra-prime segment'],
    bulletsAr: ['أعمال الواجهات والخدمات الكهروميكانيكية تقترب من الإنجاز', 'المطور يؤكد عدم تعديل موعد التسليم', 'الطلب مستقر في شريحة العقارات فائقة الفخامة'],
    outlookEn: 'Inventory is likely to tighten ahead of handover.',
    outlookAr: 'من المرجح أن يتقلص المعروض قبل موعد التسليم.',
    tags: ['development', 'project', 'palm jumeirah', 'نخلة جميرا'],
  },
  {
    slug: 'dubai-q2-market-report-transaction-volume',
    titleEn: 'Dubai Q2 Market Report: Transaction Volume Continues Upward Trend',
    titleAr: 'تقرير سوق دبي للربع الثاني: استمرار ارتفاع حجم المعاملات',
    category: 'Market Reports',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Q2 data shows continued momentum in transaction volume, especially in mid-to-premium communities.',
    summaryAr: 'تشير بيانات الربع الثاني إلى استمرار الزخم في حجم المعاملات خاصة في المجتمعات المتوسطة إلى الفاخرة.',
    bulletsEn: ['Off-plan share increased compared with previous quarter', 'Average ticket size grew in selected waterfront zones', 'Secondary market liquidity improved in mature districts'],
    bulletsAr: ['ارتفعت حصة البيع على الخارطة مقارنة بالربع السابق', 'ارتفع متوسط قيمة الصفقة في مناطق مختارة على الواجهة البحرية', 'تحسنت سيولة السوق الثانوي في المناطق الناضجة'],
    outlookEn: 'Balanced growth expected if launch cadence remains disciplined.',
    outlookAr: 'يتوقع نمو متوازن إذا استمر انضباط وتيرة الإطلاق.',
    tags: ['market', 'report', 'dubai', 'تقرير', 'سوق'],
  },
  {
    slug: 'investment-insight-infrastructure-corridors-price-growth',
    titleEn: 'Investment Insight: Why Infrastructure Corridors Drive Price Growth',
    titleAr: 'رؤية استثمارية: لماذا تدفع ممرات البنية التحتية نمو الأسعار',
    category: 'Investment Insights',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Infrastructure-led corridors continue to outperform in capital appreciation and rental resilience.',
    summaryAr: 'تواصل الممرات المدعومة بالبنية التحتية التفوق في نمو رأس المال واستقرار العوائد الإيجارية.',
    bulletsEn: ['Transit connectivity compresses vacancy risk', 'Amenity density supports tenant retention', 'Institutional demand is rising near logistics nodes'],
    bulletsAr: ['الاتصال بشبكات النقل يقلل مخاطر الشغور', 'كثافة الخدمات تدعم احتفاظ المستأجرين', 'الطلب المؤسسي يرتفع قرب مراكز الخدمات اللوجستية'],
    outlookEn: 'Corridor-adjacent assets remain a priority allocation theme.',
    outlookAr: 'تبقى الأصول القريبة من الممرات محوراً رئيسياً للتخصيص الاستثماري.',
    tags: ['investment', 'insight', 'trend', 'استثمار', 'تحليل'],
  },
  {
    slug: 'off-plan-project-pipeline-emerging-districts',
    titleEn: 'Off-Plan Project Pipeline Expands Across Emerging Districts',
    titleAr: 'توسع خط مشاريع البيع على الخارطة في المناطق الناشئة',
    category: 'Projects & Development',
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Developers are expanding off-plan launches in high-demand emerging districts.',
    summaryAr: 'يواصل المطورون توسيع إطلاقات البيع على الخارطة في المناطق الناشئة ذات الطلب المرتفع.',
    bulletsEn: ['Masterplan communities are attracting first-time investors', 'Flexible installment structures are widening buyer pool', 'Launch velocity is stronger near education and retail anchors'],
    bulletsAr: ['المجتمعات المخططة تجذب المستثمرين الجدد', 'هياكل الأقساط المرنة توسع قاعدة المشترين', 'وتيرة الإطلاق أقوى قرب مراكز التعليم والتجزئة'],
    outlookEn: 'Supply depth should improve across next two quarters.',
    outlookAr: 'من المتوقع تحسن عمق المعروض خلال الربعين القادمين.',
    tags: ['off-plan', 'projects', 'development', 'بيع على الخارطة'],
  },
  {
    slug: 'jvc-midrise-community-launch-update-2026',
    titleEn: 'JVC Mid-Rise Community Launch Update 2026',
    titleAr: 'تحديث إطلاق مجتمع الأبراج المتوسطة في JVC لعام 2026',
    category: 'New Developments',
    image: 'https://images.unsplash.com/photo-1465800872432-6e11df9abf2f?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'A new mid-rise community in JVC introduces family-focused layouts and upgraded community retail.',
    summaryAr: 'يقدم مجتمع جديد في JVC تصاميم موجهة للعائلات مع تطويرات في مرافق التجزئة المجتمعية.',
    bulletsEn: ['Studios to 3BR typologies with optimized floor plans', 'Community retail podium to open in phased schedule', 'End-user demand strongest for 2BR units'],
    bulletsAr: ['وحدات من الاستوديو حتى 3 غرف مع مخططات محسنة', 'افتتاح تدريجي لمنصة التجزئة المجتمعية', 'الطلب الأعلى من المستخدمين النهائيين على وحدات الغرفتين'],
    outlookEn: 'Sell-through is expected to remain stable through construction cycle.',
    outlookAr: 'من المتوقع استقرار وتيرة المبيعات طوال دورة الإنشاء.',
    tags: ['jvc', 'new launch', 'development', 'إطلاق جديد'],
  },
  {
    slug: 'business-bay-canalside-office-towers-progress',
    titleEn: 'Business Bay Canalside Office Towers Show Construction Progress',
    titleAr: 'تقدم ملحوظ في إنشاء أبراج المكاتب على قناة الخليج التجاري',
    category: 'Development Projects',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Canalside office towers in Business Bay are progressing with upgraded sustainability specs.',
    summaryAr: 'تتقدم أبراج المكاتب على القناة في الخليج التجاري مع مواصفات استدامة مطورة.',
    bulletsEn: ['Core structures passed major engineering milestones', 'Green certification target moved to higher rating', 'Leasing pre-commitments are rising among regional firms'],
    bulletsAr: ['الهياكل الأساسية تجاوزت مراحل هندسية رئيسية', 'رفع مستهدف الشهادات الخضراء إلى تصنيف أعلى', 'ارتفاع الحجوزات المسبقة من الشركات الإقليمية'],
    outlookEn: 'Commercial occupancy outlook remains constructive.',
    outlookAr: 'توقعات الإشغال التجاري تبقى إيجابية.',
    tags: ['business bay', 'office', 'development', 'مكاتب'],
  },
  {
    slug: 'dubai-hills-quarterly-price-and-rent-report',
    titleEn: 'Dubai Hills Quarterly Price and Rent Report',
    titleAr: 'تقرير ربع سنوي للأسعار والإيجارات في دبي هيلز',
    category: 'Market Reports',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Quarterly analysis shows steady pricing and improving rent performance in Dubai Hills.',
    summaryAr: 'يظهر التحليل الربعي استقراراً في الأسعار وتحسناً في أداء الإيجارات في دبي هيلز.',
    bulletsEn: ['Villa segment led rental growth this quarter', 'Apartment absorption improved after new handovers', 'Tenant renewal rates remained above historical average'],
    bulletsAr: ['قادت الفلل نمو الإيجارات هذا الربع', 'تحسن استيعاب الشقق بعد التسليمات الجديدة', 'حافظت نسب التجديد على مستويات أعلى من المتوسط التاريخي'],
    outlookEn: 'Moderate upside expected with constrained prime supply.',
    outlookAr: 'يتوقع ارتفاع معتدل مع محدودية المعروض الفاخر.',
    tags: ['market report', 'dubai hills', 'rent', 'إيجارات'],
  },
  {
    slug: 'metro-proximity-investment-playbook-2026',
    titleEn: 'Metro Proximity Investment Playbook 2026',
    titleAr: 'دليل الاستثمار قرب المترو لعام 2026',
    category: 'Investment Insights',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Assets within walking distance of metro stations are showing consistent liquidity and lower vacancy.',
    summaryAr: 'تسجل الأصول الواقعة على مسافة مشي من محطات المترو سيولة أعلى ومعدلات شغور أقل.',
    bulletsEn: ['Smaller ticket assets improved resale velocity', 'Rental churn reduced in transit-adjacent assets', 'Transport-linked districts outperformed city median yields'],
    bulletsAr: ['تحسنت سرعة إعادة البيع للأصول ذات القيمة الأقل', 'انخفض تبدل المستأجرين في الأصول القريبة من النقل', 'تفوقت المناطق المرتبطة بالنقل على متوسط العائد في المدينة'],
    outlookEn: 'Transit-oriented allocations remain a defensive strategy.',
    outlookAr: 'تبقى الاستثمارات الموجهة للنقل استراتيجية دفاعية فعالة.',
    tags: ['investment', 'metro', 'yield', 'مترو'],
  },
  {
    slug: 'creek-harbour-urban-project-launch-roundup',
    titleEn: 'Creek Harbour Urban Project Launch Roundup',
    titleAr: 'ملخص إطلاق المشاريع الحضرية في خور دبي',
    category: 'Projects & Development',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Multiple urban-format projects launched in Creek Harbour with mixed residential and lifestyle components.',
    summaryAr: 'تم إطلاق عدة مشاريع حضرية في خور دبي تجمع بين السكن ومكونات نمط الحياة.',
    bulletsEn: ['Developers prioritized view-facing inventory', 'Community mobility plans support long-term occupancy', 'Launch mix includes compact and family floor plans'],
    bulletsAr: ['ركز المطورون على الوحدات ذات الإطلالات', 'خطط الحركة المجتمعية تدعم الإشغال طويل المدى', 'تشكيلة الإطلاق تشمل وحدات مدمجة وعائلية'],
    outlookEn: 'Launch momentum likely to continue through next season.',
    outlookAr: 'من المرجح استمرار زخم الإطلاق حتى الموسم القادم.',
    tags: ['creek harbour', 'projects', 'urban', 'خور دبي'],
  },
  {
    slug: 'international-investor-demand-tracker-dubai-2026',
    titleEn: 'International Investor Demand Tracker: Dubai 2026',
    titleAr: 'مؤشر طلب المستثمرين الدوليين: دبي 2026',
    category: 'Market Reports',
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Cross-border buyer activity remains concentrated in branded residences and transit-connected communities.',
    summaryAr: 'لا يزال نشاط المشترين الدوليين متركزاً في المساكن ذات العلامات التجارية والمجتمعات المرتبطة بالنقل.',
    bulletsEn: ['Branded inventory showed strong reservation depth', 'Higher cash-buyer ratio reduced financing dependency', 'Demand diversified across Europe, GCC, and Asia'],
    bulletsAr: ['سجلت الوحدات ذات العلامات التجارية عمق حجز قوي', 'ارتفاع نسبة المشترين النقديين قلل الاعتماد على التمويل', 'تنوع الطلب بين أوروبا والخليج وآسيا'],
    outlookEn: 'Foreign demand expected to stay broad-based.',
    outlookAr: 'يتوقع استمرار الطلب الأجنبي بشكل واسع ومتوازن.',
    tags: ['international', 'market report', 'demand', 'مستثمرون دوليون'],
  },
  {
    slug: 'arabian-ranches-phase-iii-development-progress',
    titleEn: 'Arabian Ranches Phase III Development Progress',
    titleAr: 'تقدم أعمال التطوير في المرحلة الثالثة من المرابع العربية',
    category: 'Development Projects',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Phase III infrastructure and landscaping are advancing with focus on family-oriented amenities.',
    summaryAr: 'تتقدم أعمال البنية التحتية والتشجير في المرحلة الثالثة مع التركيز على مرافق العائلات.',
    bulletsEn: ['Road and utility packages are largely completed', 'Community school and retail anchors are on schedule', 'Villa handover sequencing remains unchanged'],
    bulletsAr: ['اكتملت إلى حد كبير حزم الطرق والخدمات', 'المدرسة المجتمعية ومراكز التجزئة ضمن الجدول', 'لم يتغير تسلسل تسليم الفلل'],
    outlookEn: 'Family demand should support steady take-up.',
    outlookAr: 'من المتوقع أن يدعم طلب العائلات وتيرة بيع مستقرة.',
    tags: ['arabian ranches', 'development', 'villa', 'المرابع العربية'],
  },
  {
    slug: 'yield-risk-framework-for-off-plan-buyers',
    titleEn: 'Yield-Risk Framework for Off-Plan Buyers',
    titleAr: 'إطار العائد والمخاطر لمشتري العقارات على الخارطة',
    category: 'Investment Insights',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'A practical framework helps buyers compare projected yield, handover timing, and downside buffers.',
    summaryAr: 'يساعد إطار عملي المشترين على مقارنة العائد المتوقع وتوقيت التسليم وهوامش الحماية من المخاطر.',
    bulletsEn: ['Stress-test payment obligations against rental scenarios', 'Prioritize developers with transparent progress reporting', 'Use handover buffers in cash-flow planning'],
    bulletsAr: ['اختبر التزامات السداد مقابل سيناريوهات الإيجار', 'أعط الأولوية للمطورين ذوي تقارير التقدم الواضحة', 'استخدم هوامش زمنية للتسليم ضمن خطة التدفقات النقدية'],
    outlookEn: 'Disciplined underwriting remains key to risk-adjusted returns.',
    outlookAr: 'يبقى التحليل المنضبط أساس تحقيق عوائد معدلة بالمخاطر.',
    tags: ['off-plan', 'investment insights', 'yield', 'عائد'],
  },
  {
    slug: 'dubai-south-aviation-corridor-project-watch',
    titleEn: 'Dubai South Aviation Corridor Project Watch',
    titleAr: 'متابعة مشاريع ممر الطيران في دبي الجنوب',
    category: 'Projects & Development',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Project activity in Dubai South is accelerating around aviation and logistics growth corridors.',
    summaryAr: 'تتسارع حركة المشاريع في دبي الجنوب حول ممرات النمو المرتبطة بالطيران والخدمات اللوجستية.',
    bulletsEn: ['Mixed-use inventory is expanding near employment clusters', 'Logistics demand supports housing absorption', 'Institutional interest is rising in build-to-rent models'],
    bulletsAr: ['يتوسع المعروض متعدد الاستخدامات قرب مراكز التوظيف', 'طلب الخدمات اللوجستية يدعم استيعاب السكن', 'ارتفاع الاهتمام المؤسسي بنماذج البناء للتأجير'],
    outlookEn: 'Corridor momentum likely to strengthen medium-term.',
    outlookAr: 'من المرجح أن يتعزز زخم الممر على المدى المتوسط.',
    tags: ['dubai south', 'projects', 'aviation', 'دبي الجنوب'],
  },
  {
    slug: 'prime-rental-index-downtown-and-marina-2026',
    titleEn: 'Prime Rental Index: Downtown and Marina 2026',
    titleAr: 'مؤشر الإيجارات الفاخرة: وسط المدينة والمارينا 2026',
    category: 'Market Reports',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'Prime rental benchmarks show resilient growth in Downtown and Dubai Marina segments.',
    summaryAr: 'تظهر مؤشرات الإيجارات الفاخرة نمواً مستقراً في قطاعات وسط المدينة ودبي مارينا.',
    bulletsEn: ['Two-bedroom prime units led quarterly increases', 'Tenant tenure improved in amenity-rich towers', 'Furnished premium stock commanded higher premiums'],
    bulletsAr: ['قادت الوحدات الفاخرة من غرفتين الارتفاعات الفصلية', 'تحسن مدة بقاء المستأجرين في الأبراج الغنية بالمرافق', 'حققت الوحدات المفروشة الفاخرة علاوات سعرية أعلى'],
    outlookEn: 'Prime rents should remain supported by limited ready supply.',
    outlookAr: 'من المتوقع استمرار دعم الإيجارات الفاخرة بسبب محدودية المعروض الجاهز.',
    tags: ['market report', 'rental', 'downtown', 'إيجار فاخر'],
  },
  {
    slug: 'family-community-selection-guide-2026',
    titleEn: 'Family Community Selection Guide 2026',
    titleAr: 'دليل اختيار المجتمعات العائلية 2026',
    category: 'Investment Insights',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    summaryEn: 'A comparative guide for selecting family-oriented communities based on schools, commute, and livability.',
    summaryAr: 'دليل مقارن لاختيار المجتمعات العائلية بناءً على المدارس والتنقل وجودة الحياة.',
    bulletsEn: ['School proximity remains top decision factor', 'Daily commute time strongly affects renewal behavior', 'Community retail depth improves long-term occupancy'],
    bulletsAr: ['القرب من المدارس يبقى عامل القرار الأهم', 'مدة التنقل اليومية تؤثر بقوة على قرارات التجديد', 'عمق خدمات التجزئة المجتمعية يحسن الإشغال طويل المدى'],
    outlookEn: 'Family-centric assets remain attractive in mixed market cycles.',
    outlookAr: 'تبقى الأصول الموجهة للعائلات جذابة عبر دورات السوق المختلفة.',
    tags: ['family', 'insights', 'community', 'عائلي'],
  },
]

const seedPosts = blueprints.flatMap((item, index) => {
  const tabTag = `tab:${inferTab(item.category)}`
  const baseOffset = index * 12 * 60 * 60 * 1000

  const enPost = {
    title: item.titleEn,
    slug: `${item.slug}-en`,
    excerpt: item.summaryEn,
    content: buildLocalizedContent('en', item.summaryEn, item.bulletsEn, item.outlookEn),
    category: item.category,
    tags: [...item.tags, tabTag, 'lang:en'],
    featured_image: item.image,
    status: 'published',
    published_at: new Date(now.getTime() - baseOffset).toISOString(),
    seo_title: item.titleEn,
    seo_description: item.summaryEn,
  }

  const arPost = {
    title: item.titleAr,
    slug: `${item.slug}-ar`,
    excerpt: item.summaryAr,
    content: buildLocalizedContent('ar', item.summaryAr, item.bulletsAr, item.outlookAr),
    category: item.category,
    tags: [...item.tags, tabTag, 'lang:ar'],
    featured_image: item.image,
    status: 'published',
    published_at: new Date(now.getTime() - baseOffset - 30 * 60 * 1000).toISOString(),
    seo_title: item.titleAr,
    seo_description: item.summaryAr,
  }

  return [enPost, arPost]
})

async function run() {
  try {
    const payload = seedPosts.map((post) => ({
      ...post,
      updated_at: new Date().toISOString(),
    }))

    const { data, error } = await supabase
      .from('posts')
      .upsert(payload, { onConflict: 'slug' })
      .select('id, slug, title, category, status')

    if (error) {
      throw error
    }

    console.log(`Seed complete. Upserted ${data?.length || 0} posts.`)
    for (const post of data || []) {
      console.log(`- ${post.slug} [${post.category}] (${post.status})`)
    }
  } catch (err) {
    console.error('Failed to seed posts:', err)
    process.exit(1)
  }
}

run()
