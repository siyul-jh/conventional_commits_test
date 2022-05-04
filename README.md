### `해당 프로젝트는 초기설정 안내용 프로젝트이다.`
# Conventional Commits Test

기업 및 협업에 있어서 `Git Message`는 중요하다.

여러 명이 함께 하나의 프로젝트에 참여하게 될 때 **Commit Message**가 명확하지 않으면 **History** 파악이 힘들기 때문이다.

그렇기에 **Commit Message**의 규칙이 필요로 하다.
기능, 수정 사항 및 변경사항을 담아서 관리할 필요가 있다.

# Husky

`husky`는 Node.js 프로젝트에서 git hooks를 쉽게 관리하기 위한 도구 이다.
git hooks와 husky는 공식 문서를 통해 확인해보자.

[git hooks 한글 공식 문서](https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks)

[husky 공식 레퍼지토리](https://github.com/typicode/husky)

```bash
# npm을 사용하는 경우
npm install husky --save-dev
npx husky install

# yarn을를 사용하는 경우
yarn add husky -D
yarn husky install

# 설치 후
npx husky install
```

# Commitlint

`commitlint는` Commit Message에 대한 lint를 확인하여 성공과 실패를 출력한다.

```bash
# npm을 사용하는 경우
npm install @commitlint/config-conventional @commitlint/cli -D

# yarn을 사용하는 경우
yarn add @commitlint/config-conventional @commitlint/cli -D
```

패키지 설치 후, 프로젝트 `root` 디렉토리에 `commitlint.config.js` 또는 `commitlint.config.ts` 를 만들고 아래와 같이 작성해준다.

```javascript
module.exports = { extends: ['@commitlint/config-conventional'] };
```

`commitlint`를 적용하기 위해서 다음과 같이 입력한다.

```bash
npx husky add .husky/commit-msg
```
`root` 디렉토리 밑의 `.husky/commit-msg`에 **undefined**를 지우고 아래의 명령어를 추가해준다.
```bash
# npm을 사용하는 경우
npx --no commitlint --edit $1

# yarn을 사용하는 경우
yarn commitlint --edit $1
```


# Rules

**Commit Message**는 허용되는 Type에 따라 나눌 수 있다.

## Types
> @commitlint/config-conventional은 Anguler Convention를 기반으로 한다.

- **build**:    빌드 시스템 또는 외부 종속성에 영향을 미치는 변경 사항(예: gulp, broccoli, npm)
- **ci**:   CI 구성 파일 및 스크립트의 변경 사항(예: 범위: Travis, Circle, BrowserStack, SourceLabs)
- **docs**: 문서만 변경
- **feat**: 새로운 기능
- **fix**:  버그 수정
- **perf**: 성능을 향상시키는 코드 변경
- **refactor**: 버그를 수정하거나 기능을 추가하지 않는 코드 변경
- **style**: 코드의 의미에 영향을 미치지 않는 변경 사항(공백, 정렬, 세미콜론 등)
- **test**: 누락된 테스트 추가 또는 기존 테스트 수정


```bash
# 실패 케이스
$ git add .
$ git commit -m "테스트입니다"
⧗ input: 테스트입니다
✖ subject may not be empty [subject-empty]
✖ type may not be empty [type-empty]

✖ found 2 problems, 0 warnings
ⓘ Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

error Command failed with exit code 1.

# 성공 케이스
$ git commit -m "build: commitlint 적용"
Done in 0.21s.
[main 7cefd09] build: commitlint 적용
```

## Prompt
prompt를 이용하여 조금 더 쉽게 규칙을 지키며 Commit 할 수 있다.
```bash
# npm을 사용하는 경우
npm install @commitlint/prompt-cli -D

# yarn을 사용하는 경우
yarn add @commitlint/prompt-cli -D
```

`package.json`에 아래 항목을 추가한다.
```
{
    "scripts": {
        "commit": "commit"
  }
}
```
사용방법은 간단하다.
```bash
git add .
yarn commit
```
`yarn commit`을 하게 되면 다음과 같이 출력된다.
```bash
$ commit
Please enter a type: [required] [tab-completion] [header]
<type> holds information about the goal of a change.

<type>(<scope>): <subject>
<body>
<footer>

? type:
99 characters left
```
> **type**: Commit Message의 타입
**scope**:  적용 범위(선택사항)
**subject**:    Message 내용
**body**:   본문(선택사항)
**footer**: 꼬리말(선택사항)

자세한 내용은 [Conventional Commits 한글 공식 문서](https://www.conventionalcommits.org/ko/v1.0.0/)에서 확인 할 수 있다.


규칙을 수정하고 싶다면 `commitlint.config.js` 파일을 수정하여 적용 할 수 있다.\
자세한 수정 및 설정방법은 공식 문서를 확인해보자.

[Commitlint 공식 문서](https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md)

# 공식 문서 링크
#### [git hooks 한글 공식 문서](https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks)
#### [husky 공식 레퍼지토리](https://github.com/typicode/husky)
#### [Conventional Commits 한글 공식 문서](https://www.conventionalcommits.org/ko/v1.0.0/)
#### [Commitlint 공식 문서](https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md)