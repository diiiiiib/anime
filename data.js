// ملف البيانات الرئيسي - يحتوي على جميع معلومات الأنميات
// يمكنك إضافة أنميات جديدة بسهولة عن طريق إضافة كائنات جديدة إلى مصفوفة animes

const animes = [


  {
    id: 3,
    title: "المهمة الاخيرة",
    type: "movie",
    cover: "assets/js/hntr.jpg",
    background: "assets/js/hntr.jpg",
    description: "الفيلم يتناول قصة أنمي Hunter x Hunter في مغامرة مثيرة تدور حول المهمة الأخيرة التي يُطلب من مجموعة من الأبطال أن ينفذوا.",
    genre: ["رومانسي", "دراما", "خيال"],
    rating: "8.9",
    year: "2013",
    episodes: [
      {
        number: 1,
        title: "الفيلم الكامل",
        video: "https://archive.org/download/hhtlm/hhtlm.mp4"
      }
    ]
  },
  {
    id: 5,
    title: "Phantom rouge",
    type: "movie",
    cover: "assets/js/fantoum.jpg",
    background: "assets/js/fantoum.jpg",
    description: "فيلم Phantom Rouge هو فيلم أنمي يروي قصة مثيرة تدور حول شخصية غون فريكس، الذي يواجه تحديات جديدة في عالم الصيادين. يتناول الفيلم مغامرات غون وصديقه كيلوا زولديك أثناء مواجهتهما لأعداء جدد واكتشاف أسرار جديدة في عالم الصيادين.",
    genre: ["مغامرة", "خيال", "عائلي"],
    rating: "9.3",
    year: "2013",
    episodes: [
      {
        number: 1,
        title: "الفيلم الكامل",
        video: "https://archive.org/download/hxh1_20251109/hxh1.mp4"
      }
    ]
  },
  {
    id: 6,
    title: "قاتل الشياطين",
    type: "series",
    cover: "assets/js/morrt.jpg",
    background: "assets/js/morrt.jpg",
    description: "تدور القصة حول الفتى تانجيرو كامادو الذي يعيش حياة هادئة مع عائلته في الجبال. تتغير حياته بشكل مأساوي عندما تهاجم عائلته من قبل الشياطين، وتتحول أخته الصغيرة إلى شيطان. ينطلق تانجيرو في رحلة للبحث عن علاج لأخته والانتقام من الشياطين الذين قتلوا عائلته.",
    genre: ["أكشن", "مغامرة", "دراما"],
    rating: "9.0",
    year: "2019",
    episodes: [
      { number: 1, title: "الحلقة الأولى", video: "https://f.top4top.io/m_34794d37e1.mp4" },
      { number: 2, title: "الحلقة الثانية", video: "https://g.top4top.io/m_3479ezced2.mp4" },
      { number: 3, title: "الحلقة الثالثة", video: "https://i.top4top.io/m_34796pu873.mp4" },
      { number: 4, title: "الحلقة الرابعة", video: "https://j.top4top.io/m_3479zdodw4.mp4" },
      { number: 5, title: "الحلقة الخامسة", video: "https://k.top4top.io/m_34795pos75.mp4" },
      { number: 6, title: "الحلقة السادسة", video: "https://l.top4top.io/m_3479l7zx86.mp4" },
      { number: 7, title: "الحلقة السابعة", video: "https://a.top4top.io/m_3479nomo57.mp4" },
      { number: 8, title: "الحلقة الثامنة", video: "https://b.top4top.io/m_3479ffdpm8.mp4" },
      { number: 9, title: "الحلقة التاسعة", video: "https://j.top4top.io/m_3479qam739.mp4" },
      { number: 10, title: "الحلقة العاشرة", video: "https://k.top4top.io/m_34799s0qw10.mp4" },
      { number: 11, title: "الحلقة الحادية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/11.mp4" },
      { number: 12, title: "الحلقة الثانية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/12.mp4" },
      { number: 13, title: "الحلقة الثالثة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/13.mp4" },
      { number: 14, title: "الحلقة الرابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/14.mp4" },
      { number: 15, title: "الحلقة الخامسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/15.mp4" },
      { number: 16, title: "الحلقة السادسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/16.mp4" },
      { number: 17, title: "الحلقة السابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/17.mp4" },
      { number: 18, title: "الحلقة الثامنة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/18.mp4" },
      { number: 19, title: "الحلقة التاسعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/19.mp4" },
      { number: 20, title: "الحلقة العشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/20.mp4" },
      { number: 21, title: "الحلقة الحادية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/21.mp4" },
      { number: 22, title: "الحلقة الثانية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/22.mp4" },
      { number: 23, title: "الحلقة الثالثة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/23.mp4" },
      { number: 24, title: "الحلقة الرابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/24.mp4" },
      { number: 25, title: "الحلقة الخامسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/25.mp4" },
      { number: 26, title: "الحلقة السادسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/26.mp4" },
      { number: 27, title: "الحلقة السابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/27.mp4" },
      { number: 28, title: "الحلقة الثامنة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/28.mp4" },
      { number: 29, title: "الحلقة التاسعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/29.mp4" },
      { number: 30, title: "الحلقة الثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/30.mp4" },
      { number: 31, title: "الحلقة الحادية والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/31.mp4" },
      { number: 32, title: "الحلقة الثانية والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/32.mp4" },
      { number: 33, title: "الحلقة الثالثة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/33.mp4" },
      { number: 34, title: "الحلقة الرابعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/34.mp4" },
      { number: 35, title: "الحلقة الخامسة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/35.mp4" },
      { number: 36, title: "الحلقة السادسة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/36.mp4" },
      { number: 37, title: "الحلقة السابعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/37.mp4" },
      { number: 38, title: "الحلقة الثامنة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/38.mp4" },
      { number: 39, title: "الحلقة التاسعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/39.mp4" },
      { number: 40, title: "الحلقة الأربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/40.mp4" }
    ]
  },
  {
    id: 7,
    title: "وان بيس",
    type: "series",
    cover: "assets/js/one-piece.jpg",
    background: "assets/js/one-piece.jpg",
    description: "تدور قصة الأنمي حول مونكي دي لوفي، صبي صغير يأكل ثمرة الشيطان ويحصل على قدرة مطاطية. يحلم لوفي بأن يصبح ملك القراصنة، ويخرج في رحلة للبحث عن الكنز الأسطوري \"ون بيس\".",
    genre: ["أكشن", "مغامرة", "كوميديا"],
    rating: "9.2",
    year: "1999",
    episodes: [
      { number: 1, title: "الحلقة الأولى", video: "https://e.top4top.io/m_3551q6wr71.mp4" },
      { number: 2, title: "الحلقة الثانية", video: "https://f.top4top.io/m_3551j539y2.mp4" },
      { number: 3, title: "الحلقة الثالثة", video: "https://h.top4top.io/m_3551qbnle3.mp4" },
      { number: 4, title: "الحلقة الرابعة", video: "https://i.top4top.io/m_3551pg9ma4.mp4" },
      { number: 5, title: "الحلقة الخامسة", video: "https://j.top4top.io/m_3551nwon85.mp4" },
      { number: 6, title: "الحلقة السادسة", video: "https://k.top4top.io/m_3551ykl8f6.mp4" },
      { number: 7, title: "الحلقة السابعة", video: "https://l.top4top.io/m_3551ok4u17.mp4" },
      { number: 8, title: "الحلقة الثامنة", video: "https://c.top4top.io/m_3551jixim8.mp4" },
      { number: 9, title: "الحلقة التاسعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/9.mp4" },
      { number: 10, title: "الحلقة العاشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/10.mp4" },
      { number: 11, title: "الحلقة الحادية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/11.mp4" },
      { number: 12, title: "الحلقة الثانية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/12.mp4" },
      { number: 13, title: "الحلقة الثالثة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/13.mp4" },
      { number: 14, title: "الحلقة الرابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/14.mp4" },
      { number: 15, title: "الحلقة الخامسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/15.mp4" },
      { number: 16, title: "الحلقة السادسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/16.mp4" },
      { number: 17, title: "الحلقة السابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/17.mp4" },
      { number: 18, title: "الحلقة الثامنة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/18.mp4" },
      { number: 19, title: "الحلقة التاسعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/19.mp4" },
      { number: 20, title: "الحلقة العشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/20.mp4" },
      { number: 21, title: "الحلقة الحادية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/21.mp4" },
      { number: 22, title: "الحلقة الثانية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/22.mp4" },
      { number: 23, title: "الحلقة الثالثة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/23.mp4" },
      { number: 24, title: "الحلقة الرابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/24.mp4" },
      { number: 25, title: "الحلقة الخامسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/25.mp4" },
      { number: 26, title: "الحلقة السادسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/26.mp4" },
      { number: 27, title: "الحلقة السابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/27.mp4" },
      { number: 28, title: "الحلقة الثامنة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/28.mp4" },
      { number: 29, title: "الحلقة التاسعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/29.mp4" },
      { number: 30, title: "الحلقة الثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/30.mp4" },
      { number: 31, title: "الحلقة الحادية والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/31.mp4" },
      { number: 32, title: "الحلقة الثانية والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/32.mp4" },
      { number: 33, title: "الحلقة الثالثة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/33.mp4" },
      { number: 34, title: "الحلقة الرابعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/34.mp4" },
      { number: 35, title: "الحلقة الخامسة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/35.mp4" },
      { number: 36, title: "الحلقة السادسة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/36.mp4" },
      { number: 37, title: "الحلقة السابعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/37.mp4" },
      { number: 38, title: "الحلقة الثامنة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/38.mp4" },
      { number: 39, title: "الحلقة التاسعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/39.mp4" },
      { number: 40, title: "الحلقة الأربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/op/40.mp4" }
    ]
  },
  {
    id: 8,
    title: "هنتر اكس هنتر",
    type: "series",
    cover: "assets/js/hntr.jpg",
    background: "assets/js/hntr.jpg",
    description: "تدور قصة الأنمي حول صبي صغير يدعى غون فريكس، الذي يكتشف أن والده، الذي كان يعتقد أنه ميت، هو صياد محترف. قرر غون أن يصبح صيادًا أيضًا للعثور على والده ومعرفة المزيد عن عالم الصيادين.",
    genre: ["أكشن", "غموض", "مغامرات", "دراما"],
    rating: "9.5",
    year: "2011",
    episodes: [
      { number: 1, title: "الحلقة الأولى", video: "https://h.top4top.io/m_3555478vd1.mp4" },
      { number: 2, title: "الحلقة الثانية", video: "https://i.top4top.io/m_3555vbhxh2.mp4" },
      { number: 3, title: "الحلقة الثالثة", video: "https://j.top4top.io/m_3555i6ecd3.mp4" },
      { number: 4, title: "الحلقة الرابعة", video: "https://k.top4top.io/m_355552u7u4.mp4" },
      { number: 5, title: "الحلقة الخامسة", video: "https://l.top4top.io/m_35559knxl5.mp4" },
      { number: 6, title: "الحلقة السادسة", video: "https://a.top4top.io/m_35554q15c6.mp4" },
      { number: 7, title: "الحلقة السابعة", video: "https://b.top4top.io/m_3555z42js7.mp4" },
      { number: 8, title: "الحلقة الثامنة", video: "https://c.top4top.io/m_3555h708g8.mp4" },
      { number: 9, title: "الحلقة التاسعة", video: "https://d.top4top.io/m_3555bly8q9.mp4" },
      { number: 10, title: "الحلقة العاشرة", video: "https://e.top4top.io/m_35558jmi810.mp4" },
      { number: 11, title: "الحلقة الحادية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/11.mp4" },
      { number: 12, title: "الحلقة الثانية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/12.mp4" },
      { number: 13, title: "الحلقة الثالثة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/13.mp4" },
      { number: 14, title: "الحلقة الرابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/14.mp4" },
      { number: 15, title: "الحلقة الخامسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/15.mp4" },
      { number: 16, title: "الحلقة السادسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/16.mp4" },
      { number: 17, title: "الحلقة السابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/17.mp4" },
      { number: 18, title: "الحلقة الثامنة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/18.mp4" },
      { number: 19, title: "الحلقة التاسعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/19.mp4" },
      { number: 20, title: "الحلقة العشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/20.mp4" },
      { number: 21, title: "الحلقة الحادية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/21.mp4" },
      { number: 22, title: "الحلقة الثانية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/22.mp4" },
      { number: 23, title: "الحلقة الثالثة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/23.mp4" },
      { number: 24, title: "الحلقة الرابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/24.mp4" },
      { number: 25, title: "الحلقة الخامسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/25.mp4" },
      { number: 26, title: "الحلقة السادسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/26.mp4" },
      { number: 27, title: "الحلقة السابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/27.mp4" },
      { number: 28, title: "الحلقة الثامنة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/28.mp4" },
      { number: 29, title: "الحلقة التاسعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/29.mp4" },
      { number: 30, title: "الحلقة الثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/30.mp4" },
      { number: 31, title: "الحلقة الحادية والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/31.mp4" },
      { number: 32, title: "الحلقة الثانية والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/32.mp4" },
      { number: 33, title: "الحلقة الثالثة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/33.mp4" },
      { number: 34, title: "الحلقة الرابعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/34.mp4" },
      { number: 35, title: "الحلقة الخامسة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/35.mp4" },
      { number: 36, title: "الحلقة السادسة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/36.mp4" },
      { number: 37, title: "الحلقة السابعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/37.mp4" },
      { number: 38, title: "الحلقة الثامنة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/38.mp4" },
      { number: 39, title: "الحلقة التاسعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/39.mp4" },
      { number: 40, title: "الحلقة الأربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/hxh2011/40.mp4" }
    ]
  },
  {
    id: 9,
    title: "أكاديمية بطلي",
    type: "series",
    cover: "assets/js/myhero.jpg",
    background: "assets/js/myhero.jpg",
    description: "تدور القصة حول إيزوكو ميدوريا، صبي يولد بدون قوة خارقة في عالم حيث 80% من البشر يمتلكون قوى خارقة. يحلم إيزوكو بأن يصبح بطلاً مثل بطله المفضل \"أول مايت\".",
    genre: ["أكشن", "كوميديا", "خيال علمي"],
    rating: "8.8",
    year: "2016",
    episodes: [
      { number: 1, title: "الحلقة الأولى", video: "https://k.top4top.io/m_3559oca3r1.mp4" },
      { number: 2, title: "الحلقة الثانية", video: "https://l.top4top.io/m_3559msle52.mp4" },
      { number: 3, title: "الحلقة الثالثة", video: "https://a.top4top.io/m_3559whcm63.mp4" },
      { number: 4, title: "الحلقة الرابعة", video: "https://c.top4top.io/m_3559k2tfx4.mp4" },
      { number: 5, title: "الحلقة الخامسة", video: "https://d.top4top.io/m_3559udtxg5.mp4" },
      { number: 6, title: "الحلقة السادسة", video: "https://e.top4top.io/m_35597hdcc6.mp4" },
      { number: 7, title: "الحلقة السابعة", video: "https://g.top4top.io/m_3559kjsum7.mp4" },
      { number: 8, title: "الحلقة الثامنة", video: "https://k.top4top.io/m_35597gxqt8.mp4" },
      { number: 9, title: "الحلقة التاسعة", video: "https://l.top4top.io/m_3559cd12d9.mp4" },
      { number: 10, title: "الحلقة العاشرة", video: "https://a.top4top.io/m_3559aig3010.mp4" },
      { number: 11, title: "الحلقة الحادية عشرة", video: "https://l.top4top.io/m_3559ctxd01.mp4" },
      { number: 12, title: "الحلقة الثانية عشرة", video: "https://a.top4top.io/m_3559a8coz2.mp4" },
      { number: 13, title: "الحلقة الثالثة عشرة", video: "https://b.top4top.io/m_3559zylwy3.mp4" },
      { number: 14, title: "الحلقة الرابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/01.mp4" },
      { number: 15, title: "الحلقة الخامسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/02.mp4" },
      { number: 16, title: "الحلقة السادسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/03.mp4" },
      { number: 17, title: "الحلقة السابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/04.mp4" },
      { number: 18, title: "الحلقة الثامنة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/05.mp4" },
      { number: 19, title: "الحلقة التاسعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/06.mp4" },
      { number: 20, title: "الحلقة العشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/07.mp4" },
      { number: 21, title: "الحلقة الحادية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/08.mp4" },
      { number: 22, title: "الحلقة الثانية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/09.mp4" },
      { number: 23, title: "الحلقة الثالثة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/010.mp4" },
      { number: 24, title: "الحلقة الرابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/011.mp4" },
      { number: 25, title: "الحلقة الخامسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/012.mp4" },
      { number: 26, title: "الحلقة السادسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/013.mp4" },
      { number: 27, title: "الحلقة السابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/014.mp4" },
      { number: 28, title: "الحلقة الثامنة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/015.mp4" },
      { number: 29, title: "الحلقة التاسعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/016.mp4" },
      { number: 30, title: "الحلقة الثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/017.mp4" },
      { number: 31, title: "الحلقة الحادية والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/018.mp4" },
      { number: 32, title: "الحلقة الثانية والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/019.mp4" },
      { number: 33, title: "الحلقة الثالثة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/020.mp4" },
      { number: 34, title: "الحلقة الرابعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/021.mp4" },
      { number: 35, title: "الحلقة الخامسة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/022.mp4" },
      { number: 36, title: "الحلقة السادسة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/023.mp4" },
      { number: 37, title: "الحلقة السابعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/024.mp4" },
      { number: 38, title: "الحلقة الثامنة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/025.mp4" },
      { number: 39, title: "الحلقة التاسعة والثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/001.mp4" },
      { number: 40, title: "الحلقة الأربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/002.mp4" },
      { number: 41, title: "الحلقة الحادية والاربعون ", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/003.mp4" },
      { number: 42, title: "الحلقة الثانية والاربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/004.mp4" },
      { number: 43, title: "الحلقة الثالثة والاربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/005.mp4" },
      { number: 44, title: "الحلقة الرابعة والاربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/006.mp4" },
      { number: 45, title: "الحلقة الخامسة والاربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/007.mp4" },
      { number: 46, title: "الحلقة السادسة والاربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/008.mp4" },
      { number: 47, title: "الحلقة السابعة والاربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/009.mp4" },
      { number: 48, title: "الحلقة الثامنة والاربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0010.mp4" },
      { number: 49, title: "الحلقة التاسعة والاربعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0011.mp4" },
      { number: 50, title: "الحلقة الخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0012.mp4" },
      { number: 51, title: "الحلقة  الواحد والخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0013.mp4" },
      { number: 52, title: "الحلقة الثانية والخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0014.mp4" },
      { number: 53, title: "الحلقة الثالثة والخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0015.mp4" },
      { number: 54, title: "الحلقة الرابعة والخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0016.mp4" },
      { number: 55, title: "الحلقة الخامسة والخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0017.mp4" },
      { number: 56, title: "الحلقة السادسة والخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0018.mp4" },
      { number: 57, title: "الحلقة السابعة والخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0019.mp4" },
      { number: 58, title: "الحلقة الثامنة والخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0020.mp4" },
      { number: 59, title: "الحلقة التاسعة والخمسون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0021.mp4" },
      { number: 60, title: "الحلقة الستون ", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0022.mp4" },
      { number: 61, title: "الحلقة الحادية والستون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0023.mp4" },
      { number: 62, title: "الحلقة الثانية والستون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0024.mp4" },
      { number: 63, title: "الحلقة الثالثة والستون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0025.mp4" },
      { number: 64, title: "الحلقة الرابعة والستون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0001.mp4" },
      { number: 65, title: "الحلقة الخامسة والستون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0002.mp4" },
      { number: 66, title: "الحلقة السادسة والستون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0003.mp4" },
      { number: 67, title: "الحلقة السابعة والستون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0004.mp4" },
      { number: 68, title: "الحلقة الثامنة والستون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0005.mp4" },
      { number: 69, title: "الحلقة التاسعة والستون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0006.mp4" },
      { number: 70, title: "الحلقة السبعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0008.mp4" },
      { number: 71, title: "الحلقة السبعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/0009.mp4" },
      { number: 72, title: "الحلقة السبعون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/myhero/00010.mp4" },


      ]
  },
  {
    id: 10,
    title: "دكتور ستون",
    type: "series",
    cover: "assets/js/doctor.jpeg",
    background: "assets/js/doctor.jpeg",
    description: "تدور القصة حول سينكو إيشيغامي، عبقري في العلوم، الذي يوقظ كل البشرية من سبات استمر لـ 3700 عام بعد أن تحولت إلى حجر بسبب ضوء غامض. يسعى سينكو لإعادة بناء الحضارة باستخدام العلم.",
    genre: ["أكشن", "مغامرة", "خيال علمي"],
    rating: "8.9",
    year: "2019",
    episodes: [
      { number: 1, title: "الحلقة الأولى", video: "https://archive.org/download/drs3_20251020/drs1.mp4" },
      { number: 2, title: "الحلقة الثانية", video: "https://archive.org/download/drs3_20251020/drs2.mp4" },
      { number: 3, title: "الحلقة الثالثة", video: "https://archive.org/download/drs3_20251020/drs3.mp4" },
      { number: 4, title: "الحلقة الرابعة", video: "https://archive.org/download/drs3_20251020/drs4.mp4" },
      { number: 5, title: "الحلقة الخامسة", video: "https://archive.org/download/drs3_20251020/drs5.mp4" },
      { number: 6, title: "الحلقة السادسة", video: "https://archive.org/download/drs3_20251020/drs6.mp4" },
      { number: 7, title: "الحلقة السابعة", video: "https://archive.org/download/drs3_20251020/drs7.mp4" },
      { number: 8, title: "الحلقة الثامنة", video: "https://archive.org/download/drs3_20251020/drs8.mp4" },
      { number: 9, title: "الحلقة التاسعة", video: "https://archive.org/download/drs3_20251020/drs9.mp4" },
      { number: 10, title: "الحلقة العاشرة", video: "https://archive.org/download/drs3_20251020/drs10.mp4" },
      { number: 11, title: "الحلقة الحادية عشرة", video: "https://archive.org/download/drs3_20251020/drs11.mp4" },
      { number: 12, title: "الحلقة الثانية عشرة", video: "https://archive.org/download/drs3_20251020/drs12.mp4" },
      { number: 13, title: "الحلقة الثالثة عشرة", video: "https://archive.org/download/drs3_20251020/drs13.mp4" },
      { number: 14, title: "الحلقة الرابعة عشرة", video: "https://archive.org/download/drs3_20251020/drs14.mp4" },
      { number: 15, title: "الحلقة الخامسة عشرة", video: "https://archive.org/download/drs3_20251020/drs15.mp4" },
      { number: 16, title: "الحلقة السادسة عشرة", video: "https://archive.org/download/drs3_20251020/drs16.mp4" },
      { number: 17, title: "الحلقة السابعة عشرة", video: "https://archive.org/download/drs3_20251020/drs17.mp4" },
      { number: 18, title: "الحلقة الثامنة عشرة", video: "https://archive.org/download/drs3_20251020/drs18.mp4" },
      { number: 19, title: "الحلقة التاسعة عشرة", video: "https://archive.org/download/drs3_20251020/drs19.mp4" },
      { number: 20, title: "الحلقة العشرون", video: "https://archive.org/download/drs3_20251020/drs20.mp4" },
      { number: 21, title: "الحلقة الحادية والعشرون", video: "https://archive.org/download/drs3_20251020/drs21.mp4" },
      { number: 22, title: "الحلقة الثانية والعشرون", video: "https://archive.org/download/drs3_20251020/drs22.mp4" },
      { number: 23, title: "الحلقة الثالثة والعشرون", video: "https://archive.org/download/drs3_20251020/drs23.mp4" },
      { number: 24, title: "الحلقة الرابعة والعشرون", video: "https://archive.org/download/drs3_20251020/drs24.mp4" },
      { number: 25, title: "الحلقة الخامسة والعشرون", video: "https://archive.org/download/drs3_20251020/drs25.mp4" }
    ]
  },
  {
    id: 11,
    title: "جوجوتسو كايسن",
    type: "series",
    cover: "assets/js/juju.jfif",
    background: "assets/js/juju.jfif",
    description: "تدور القصة حول يوجي إيتادوري، طالب ثانوي يمتلك قوة جسدية خارقة. يبتلع يوجي إصبع شيطان مملوكة ليحصل على قوى سحرية، ويصبح عضواً في منظمة جوجوتسو كايسن لمحاربة الشياطين.",
    genre: ["أكشن", "رعب", "خيال"],
    rating: "9.1",
    year: "2020",
    episodes: [
      { number: 1, title: "الحلقة الأولى", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/1.mp4" },
      { number: 2, title: "الحلقة الثانية", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/2.mp4" },
      { number: 3, title: "الحلقة الثالثة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/3.mp4" },
      { number: 4, title: "الحلقة الرابعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/4.mp4" },
      { number: 5, title: "الحلقة الخامسة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/5.mp4" },
      { number: 6, title: "الحلقة السادسة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/6.mp4" },
      { number: 7, title: "الحلقة السابعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/7.mp4" },
      { number: 8, title: "الحلقة الثامنة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/8.mp4" },
      { number: 9, title: "الحلقة التاسعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/9.mp4" },
      { number: 10, title: "الحلقة العاشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/10.mp4" },
      { number: 11, title: "الحلقة الحادية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/11.mp4" },
      { number: 12, title: "الحلقة الثانية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/12.mp4" },
      { number: 13, title: "الحلقة الثالثة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/13.mp4" },
      { number: 14, title: "الحلقة الرابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/14.mp4" },
      { number: 15, title: "الحلقة الخامسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/15.mp4" },
      { number: 16, title: "الحلقة السادسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/16.mp4" },
      { number: 17, title: "الحلقة السابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/17.mp4" },
      { number: 18, title: "الحلقة الثامنة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/18.mp4" },
      { number: 19, title: "الحلقة التاسعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/19.mp4" },
      { number: 20, title: "الحلقة العشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/20.mp4" },
      { number: 21, title: "الحلقة الحادية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/21.mp4" },
      { number: 22, title: "الحلقة الثانية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/22.mp4" },
      { number: 23, title: "الحلقة الثالثة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/23.mp4" },
      { number: 24, title: "الحلقة الرابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/24.mp4" },
      { number: 25, title: "الحلقة الخامسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/25.mp4" },
      { number: 26, title: "الحلقة السادسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/26.mp4" },
      { number: 27, title: "الحلقة السابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/27.mp4" },
      { number: 28, title: "الحلقة الثامنة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/28.mp4" },
      { number: 29, title: "الحلقة التاسعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/29.mp4" },
      { number: 30, title: "الحلقة الثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/jujutsu/30.mp4" }
    ]
  },
  {
    id: 12,
    title: "عائلة الجاسوس",
    type: "series",
    cover: "assets/js/family.jpg",
    background: "assets/js/family.jpg",
    description: "تدور القصة حول جاسوس يجب عليه إنشاء عائلة مزيفة لإنجاز مهمة سرية. يتزوج من امرأة قاتلة محترفة وينتبل طفلة قادرة على قراءة الأفكار.",
    genre: ["كوميديا", "أكشن", "عائلي"],
    rating: "8.9",
    year: "2022",
    episodes: [
      { number: 1, title: "الحلقة الأولى", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/1.mp4" },
      { number: 2, title: "الحلقة الثانية", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/2.mp4" },
      { number: 3, title: "الحلقة الثالثة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/3.mp4" },
      { number: 4, title: "الحلقة الرابعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/4.mp4" },
      { number: 5, title: "الحلقة الخامسة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/5.mp4" },
      { number: 6, title: "الحلقة السادسة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/6.mp4" },
      { number: 7, title: "الحلقة السابعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/7.mp4" },
      { number: 8, title: "الحلقة الثامنة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/8.mp4" },
      { number: 9, title: "الحلقة التاسعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/9.mp4" },
      { number: 10, title: "الحلقة العاشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/10.mp4" },
      { number: 11, title: "الحلقة الحادية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/11.mp4" },
      { number: 12, title: "الحلقة الثانية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/12.mp4" },
      { number: 13, title: "الحلقة الثالثة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/13.mp4" },
      { number: 14, title: "الحلقة الرابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/14.mp4" },
      { number: 15, title: "الحلقة الخامسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/15.mp4" },
      { number: 16, title: "الحلقة السادسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/16.mp4" },
      { number: 17, title: "الحلقة السابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/17.mp4" },
      { number: 18, title: "الحلقة الثامنة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/18.mp4" },
      { number: 19, title: "الحلقة التاسعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/19.mp4" },
      { number: 20, title: "الحلقة العشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/20.mp4" },
      { number: 21, title: "الحلقة الحادية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/21.mp4" },
      { number: 22, title: "الحلقة الثانية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/22.mp4" },
      { number: 23, title: "الحلقة الثالثة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/23.mp4" },
      { number: 24, title: "الحلقة الرابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/24.mp4" },
      { number: 25, title: "الحلقة الخامسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/25.mp4" },
      { number: 26, title: "الحلقة السادسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/26.mp4" },
      { number: 27, title: "الحلقة السابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/27.mp4" },
      { number: 28, title: "الحلقة الثامنة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/28.mp4" },
      { number: 29, title: "الحلقة التاسعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/29.mp4" },
      { number: 30, title: "الحلقة الثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/spyfamily/30.mp4" }
    ]
  },
  {
    id: 13,
    title: "أنا وأنت مختلفان",
    type: "series",
    cover: "assets/js/youi.jpg",
    background: "assets/js/youi.jpg",
    description: "تدور القصة حول طالبين في المدرسة الثانوية، أحدهما شاب هادئ والآخر فتاة مشاغبة، يجدان نفسيهما في علاقة غير متوقعة.",
    genre: ["رومانسي", "دراما", "كوميديا"],
    rating: "8.5",
    year: "2021",
    episodes: [
      { number: 1, title: "الحلقة الأولى", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/opposites/نقيضان 1.mp4" },
      { number: 2, title: "الحلقة الثانية", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/opposites/نقيضان 2.mp4" },
      { number: 3, title: "الحلقة الثالثة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/opposites/نقيضان 3.mp4" },
      { number: 4, title: "الحلقة الرابعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/opposites/نقيضان 4.mp4" },
      { number: 5, title: "الحلقة الخامسة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/opposites/نقيضان 5.mp4" }
    ]
  },
  {
    id: 14,
    title: "مونت كريستو",
    type: "series",
    cover: "assets/js/mont.jpg",
    background: "assets/js/mont.jpg",
    description: "تدور القصة حول ألبرت دي مورسيرف، شاب فرنسي يصادف كونت مونت كريستو الغامض، ويكتشف قصة مأساوية من الماضي.",
    genre: ["دراما", "غموض", "تاريخي"],
    rating: "8.7",
    year: "2004",
    episodes: [
      { number: 1, title: "الحلقة الأولى", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/1.mp4" },
      { number: 2, title: "الحلقة الثانية", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/2.mp4" },
      { number: 3, title: "الحلقة الثالثة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/3.mp4" },
      { number: 4, title: "الحلقة الرابعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/4.mp4" },
      { number: 5, title: "الحلقة الخامسة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/5.mp4" },
      { number: 6, title: "الحلقة السادسة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/6.mp4" },
      { number: 7, title: "الحلقة السابعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/7.mp4" },
      { number: 8, title: "الحلقة الثامنة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/8.mp4" },
      { number: 9, title: "الحلقة التاسعة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/9.mp4" },
      { number: 10, title: "الحلقة العاشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/10.mp4" },
      { number: 11, title: "الحلقة الحادية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/11.mp4" },
      { number: 12, title: "الحلقة الثانية عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/12.mp4" },
      { number: 13, title: "الحلقة الثالثة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/13.mp4" },
      { number: 14, title: "الحلقة الرابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/14.mp4" },
      { number: 15, title: "الحلقة الخامسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/15.mp4" },
      { number: 16, title: "الحلقة السادسة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/16.mp4" },
      { number: 17, title: "الحلقة السابعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/17.mp4" },
      { number: 18, title: "الحلقة الثامنة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/18.mp4" },
      { number: 19, title: "الحلقة التاسعة عشرة", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/19.mp4" },
      { number: 20, title: "الحلقة العشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/20.mp4" },
      { number: 21, title: "الحلقة الحادية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/21.mp4" },
      { number: 22, title: "الحلقة الثانية والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/22.mp4" },
      { number: 23, title: "الحلقة الثالثة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/23.mp4" },
      { number: 24, title: "الحلقة الرابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/24.mp4" },
      { number: 25, title: "الحلقة الخامسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/25.mp4" },
      { number: 26, title: "الحلقة السادسة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/26.mp4" },
      { number: 27, title: "الحلقة السابعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/27.mp4" },
      { number: 28, title: "الحلقة الثامنة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/28.mp4" },
      { number: 29, title: "الحلقة التاسعة والعشرون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/29.mp4" },
      { number: 30, title: "الحلقة الثلاثون", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/mountcristo/30.mp4" }
    ]
  },
  {
    id: 15,
    title: "قاتل الشياطين | القلعة النهائية",
    type: "movie",
    cover: "assets/js/kimfilm.jpg",
    background: "assets/js/kimfilm.jpg",
    description: "فيلم قاتل الشياطين: القلعة النهائية هو فيلم أنمي يروي قصة تانجيرو كامادو وأصدقائه في معركة ضد الشياطين في قلعة مظلمة.",
    genre: ["أكشن", "رعب", "مغامرة"],
    rating: "9.1",
    year: "2020",
    episodes: [
      { number: 1, title: "الفيلم الكامل", video: "https://pub-b534f19ddae84293ae0e0fb360695fcf.r2.dev/kimetsu/knyic.mp4" }
    ]
  },
  {
    id: 16,
    title: "قاتل الشياطين | قطار النهاية",
    type: "movie",
    cover: "assets/js/kimetsu_f.jpg",
    background: "assets/js/kimetsu_f.jpg",
    description: "فيلم قاتل الشياطين: قطار النهاية هو فيلم أنمي يروي قصة تانجيرو كامادو وأصدقائه في معركة على متن قطار ملعون.",
    genre: ["أكشن", "رعب", "مغامرة"],
    rating: "9.0",
    year: "2020",
    episodes: [
      { number: 1, title: "الفيلم الكامل", video: "https://archive.org/download/dsit_20251015/dsit.mp4" }
    ]
  }
];

// دالة للحصول على أنمي بواسطة المعرف
function getAnimeById(id) {
  return animes.find(anime => anime.id === parseInt(id));
}

// دالة للحصول على جميع المسلسلات
function getSeries() {
  return animes.filter(anime => anime.type === 'series');
}

// دالة للحصول على جميع الأفلام
function getMovies() {
  return animes.filter(anime => anime.type === 'movie');
}

// دالة للبحث عن أنمي بالاسم
function searchAnime(query) {
  const lowerQuery = query.toLowerCase();
  return animes.filter(anime => 
    anime.title.toLowerCase().includes(lowerQuery)
  );
}

// دالة للبحث عن المسلسلات فقط
function searchSeries(query) {
  const lowerQuery = query.toLowerCase();
  return getSeries().filter(anime =>
    anime.title.toLowerCase().includes(lowerQuery)
  );
}

// دالة للبحث عن الأفلام فقط
function searchMovies(query) {
  const lowerQuery = query.toLowerCase();
  return getMovies().filter(anime =>
    anime.title.toLowerCase().includes(lowerQuery)
  );
}

// دالة للحصول على حلقة محددة من أنمي معين
function getEpisode(animeId, episodeNumber) {
  const anime = getAnimeById(animeId);
  if (!anime) return null;
  return anime.episodes.find(ep => ep.number === parseInt(episodeNumber));
}
