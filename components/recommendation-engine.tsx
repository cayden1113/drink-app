// 推荐引擎 - 基于生理数据生成水分配方推荐
const ingredientMap = {
  ginseng: "人参",
  astragalus: "黄芪",
  licorice: "甘草",
  goji: "枸杞",
  chrysanthemum: "菊花",
  schisandra: "五味子",
  angelica: "当归",
  poria: "茯苓",
  atractylodes: "白术",
  honeysuckle: "金银花",
  magnesium: "镁",
  calcium: "钙",
  potassium: "钾",
  sodium: "钠",
  zinc: "锌",
  selenium: "硒",
  electrolytes: "电解质",
  vitamin_b: "维生素B",
};

const RecommendationEngine = {
  generateRecommendations: (healthData: any) => {
    // 基于水分水平的推荐
    if (healthData.hydrationLevel < 50) {
      return {
        name: "快速水分补充配方",
        forCondition: "水分不足",
        elementLevels: {
          [ingredientMap.ginseng]: 15,
          [ingredientMap.astragalus]: 10,
          [ingredientMap.licorice]: 5,
          [ingredientMap.goji]: 12,
          [ingredientMap.chrysanthemum]: 8,
          [ingredientMap.schisandra]: 5,
          [ingredientMap.angelica]: 8,
          [ingredientMap.poria]: 10,
          [ingredientMap.magnesium]: 15,
          [ingredientMap.calcium]: 10,
          [ingredientMap.potassium]: 20,
          [ingredientMap.sodium]: 25,
          [ingredientMap.zinc]: 2,
          [ingredientMap.selenium]: 1,
          [ingredientMap.electrolytes]: 40,
          [ingredientMap.vitamin_b]: 5,
        },
        highlightedElements: [
          ingredientMap.electrolytes,
          ingredientMap.potassium,
          ingredientMap.sodium,
          ingredientMap.goji,
          ingredientMap.poria,
        ],
        type: "平衡型", // 中文类型
      };
    }

    // 基于压力水平的推荐（示例）
    if (healthData.stressLevel > 60) {
      return {
        name: "舒缓压力配方",
        forCondition: "压力水平高",
        elementLevels: {
          [ingredientMap.ginseng]: 20,
          [ingredientMap.schisandra]: 15,
          [ingredientMap.licorice]: 10,
          [ingredientMap.chrysanthemum]: 12,
          [ingredientMap.angelica]: 8,
          [ingredientMap.poria]: 15,
          [ingredientMap.atractylodes]: 10,
          [ingredientMap.honeysuckle]: 8,
          [ingredientMap.magnesium]: 35,
          [ingredientMap.calcium]: 15,
          [ingredientMap.potassium]: 10,
          [ingredientMap.sodium]: 5,
          [ingredientMap.zinc]: 5,
          [ingredientMap.selenium]: 3,
          [ingredientMap.electrolytes]: 20,
          [ingredientMap.vitamin_b]: 15,
        },
        highlightedElements: [
          ingredientMap.magnesium,
          ingredientMap.vitamin_b,
          ingredientMap.selenium,
          ingredientMap.schisandra,
          ingredientMap.poria,
        ],
        type: "中医侧重型", // 中文类型
      };
    }

    // 其他条件推荐...

    // 默认推荐
    return {
      name: "日常平衡配方",
      forCondition: "日常维护",
      elementLevels: {
        [ingredientMap.ginseng]: 10,
        [ingredientMap.astragalus]: 10,
        [ingredientMap.licorice]: 5,
        [ingredientMap.goji]: 10,
        [ingredientMap.chrysanthemum]: 5,
        [ingredientMap.schisandra]: 5,
        [ingredientMap.angelica]: 5,
        [ingredientMap.poria]: 10,
        [ingredientMap.magnesium]: 20,
        [ingredientMap.calcium]: 20,
        [ingredientMap.potassium]: 15,
        [ingredientMap.sodium]: 10,
        [ingredientMap.zinc]: 3,
        [ingredientMap.selenium]: 2,
        [ingredientMap.electrolytes]: 15,
        [ingredientMap.vitamin_b]: 5,
      },
      highlightedElements: [
        ingredientMap.magnesium,
        ingredientMap.calcium,
        ingredientMap.ginseng,
        ingredientMap.goji,
      ],
      type: "平衡型",
    };
  },
};

export default RecommendationEngine;
