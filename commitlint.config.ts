module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		/*
		 * docs: 문서만 변경
		 * fix: 버그 수정
		 * feat: 새로운 기능
		 * refactor: 버그를 수정하거나 기능을 추가하지 않는 코드 변경
		 * perf: 성능을 향상시키는 코드 변경
		 * test: 누락된 테스트 추가 또는 기존 테스트 수정
		 * style: 코드의 의미에 영향을 미치지 않는 변경 사항(공백, 정렬, 세미콜론 등)
		 * etc: style과 같음
		 */
		'type-enum': [2, 'always', ['docs', 'fix', 'feat', 'refactor', 'perf', 'test', 'style', 'etc']],
	},
};
