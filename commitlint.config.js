const rules = [
    {
        key: "build",
        description: "빌드 시스템 또는 외부 종속성에 영향을 미치는 변경 사항(예: gulp, broccoli, npm)"
    },
    {
        key: "ci",
        description: "CI 구성 파일 및 스크립트의 변경 사항(예: Travis, Circle, BrowserStack, SauceLabs)"
    },
    {
        key: "docs",
        description: "문서만 변경"
    },
    {
        key: "feat",
        description: "새로운 기능"
    },
    {
        key: "fix",
        description: "버그 수정"
    },
    {
        key: "perf",
        description: "성능을 향상시키는 코드 변경"
    },
    {
        key: "refactor",
        description: "버그를 수정하거나 기능을 추가하지 않는 코드 변경"
    },
    {
        key: "style",
        description: "코드의 의미에 영향을 미치지 않는 변경 사항(공백, 정렬, 세미콜론 등)"
    },
    {
        key: "test",
        description: "누락된 테스트 추가 또는 기존 테스트 수정"
    }
];
module.exports = {
    extends: ["@commitlint/config-conventional"],
    plugins: [
        {
            rules: {
                "type-enum": (parsed, _when, enums) => {
                    let typeEnum = false;
                    for (let i in enums) {
                        if (parsed.type === enums[i]) {
                            typeEnum = true;
                            break;
                        }
                    }
                    if (parsed.type === null || !typeEnum) {
                        console.log("\x1b[36m%s\x1b[0m", "----------------------------------------Commitlint rules----------------------------------------");
                        rules.forEach(rule => {
                            console.log("\x1b[33m%s\x1b[0m", `${rule.key}: `, `${rule.description}`);
                        });
                        console.log("\x1b[36m%s\x1b[0m", "------------------------------------------------------------------------------------------------");
                        return [false, `키워드는 [${enums.join(", ")}] 중 하나이어야 합니다.`];
                    }
                    return [true, ""];
                }
            }
        }
    ],
    rules: {
        "type-enum": [2, "always", rules.map(rule => rule.key)]
    }
};
