// 推荐引擎 - 基于生理数据生成水分配方推荐
const RecommendationEngine = {
  generateRecommendations: (healthData: any) => {
    // 基于水分水平的推荐
    if (healthData.hydrationLevel < 50) {
      return {
        name: "快速水分补充配方",
        forCondition: "水分不足",
        elementLevels: {
          // 中医成分
          ginseng: 15,
          astragalus: 10,
          licorice: 5,
          goji: 12,
          chrysanthemum: 8,
          schisandra: 5,
          angelica: 8,
          poria: 10,
          // 西医成分
          magnesium: 15,
          calcium: 10,
          potassium: 20,
          sodium: 25,
          zinc: 2,
          selenium: 1,
          electrolytes: 40,
          vitamin_b: 5,
        },
        highlightedElements: ["electrolytes", "potassium", "sodium", "goji", "poria"],
        type: "balanced",
      }
    }

    // 基于压力水平的推荐
    if (healthData.stressLevel > 60) {
      return {
        name: "舒缓压力配方",
        forCondition: "压力水平高",
        elementLevels: {
          // 中医成分
          ginseng: 20,
          schisandra: 15,
          licorice: 10,
          chrysanthemum: 12,
          angelica: 8,
          poria: 15,
          atractylodes: 10,
          honeysuckle: 8,
          // 西医成分
          magnesium: 35,
          calcium: 15,
          potassium: 10,
          sodium: 5,
          zinc: 5,
          selenium: 3,
          electrolytes: 20,
          vitamin_b: 15,
        },
        highlightedElements: ["magnesium", "vitamin_b", "selenium", "schisandra", "poria"],
        type: "tcm-focused",
      }
    }

    // 基于心率的推荐
    if (healthData.heartRate > 85) {
      return {
        name: "心血管支持配方",
        forCondition: "心率偏高",
        elementLevels: {
          // 中医成分
          ginseng: 10,
          schisandra: 15,
          chrysanthemum: 20,
          honeysuckle: 10,
          angelica: 5,
          // 西医成分
          magnesium: 25,
          calcium: 15,
          potassium: 25,
          sodium: 5,
          zinc: 3,
          selenium: 2,
          electrolytes: 15,
          vitamin_b: 5,
        },
        highlightedElements: ["potassium", "magnesium", "chrysanthemum", "schisandra"],
        type: "balanced",
      }
    }

    // 基于体温的推荐
    if (healthData.bodyTemperature > 37.2) {
      return {
        name: "降温平衡配方",
        forCondition: "体温偏高",
        elementLevels: {
          // 中医成分
          chrysanthemum: 25,
          honeysuckle: 20,
          licorice: 10,
          goji: 5,
          // 西医成分
          magnesium: 15,
          calcium: 10,
          potassium: 15,
          sodium: 20,
          zinc: 5,
          selenium: 2,
          electrolytes: 30,
          vitamin_b: 3,
        },
        highlightedElements: ["electrolytes", "sodium", "chrysanthemum", "honeysuckle"],
        type: "tcm-focused",
      }
    }

    // 默认推荐
    return {
      name: "日常平衡配方",
      forCondition: "日常维护",
      elementLevels: {
        // 中医成分
        ginseng: 10,
        astragalus: 10,
        licorice: 5,
        goji: 10,
        chrysanthemum: 5,
        schisandra: 5,
        angelica: 5,
        poria: 10,
        // 西医成分
        magnesium: 20,
        calcium: 20,
        potassium: 15,
        sodium: 10,
        zinc: 3,
        selenium: 2,
        electrolytes: 15,
        vitamin_b: 5,
      },
      highlightedElements: ["magnesium", "calcium", "ginseng", "goji"],
      type: "balanced",
    }
  },
}

export default RecommendationEngine
