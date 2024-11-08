# 미션 - 댓글/대댓글 API

### 구현 기능
- [x] 댓글 작성 API
- [x] 대댓글 작성 API
- [x] 댓글/대댓글 조회 API
  - [x] Pagination 적용
  - [x] 숨김처리된 댓글/대댓글 조회 불가능
- [x] 댓글/대댓글 삭제 API
  - [x] 삭제된 댓글/대댓글은 DB에 남지 않음
- [x] 댓글/대댓글 좋아요 API
  - [x] 한 댓글에 대해 중복 좋아요 불가능
- [x] 댓글/대댓글 신고하기 API
  - 10개 이상 신고된 댓글/대댓글은 조회시 숨김처리

## 🎯 서버 세팅 방식
- setup.sh 스크립트를 실행하여 서버를 세팅한다.
- setup.sh 스크립트는 다음과 같은 작업을 수행한다.
  - orm `typeorm, prisma`, 패키지 매니저 `npm, yarn, pnpm` 선택
  - npm install | yarn | pnpm install 실행

```bash
./setup.sh
```

## 🔍 진행 방식

- 미션은 **기능 요구 사항, 프로그래밍 요구 사항, 과제 진행 요구 사항** 세 가지로 구성되어 있다.
- 세 개의 요구 사항을 만족하기 위해 노력한다. 특히 기능을 구현하기 전에 기능 목록을 만들고, 기능 단위로 커밋 하는 방식으로 진행한다.
- 기능 요구 사항에 기재되지 않은 내용은 스스로 판단하여 구현한다.

## 📮 미션 제출 방법

- 미션 구현을 완료한 후 GitHub PR 요청을 통해 제출합니다.

### 테스트 실행 가이드

- 터미널에서 `npm run test` 명령을 실행하여 모든 테스트가 아래와 같이 통과하는지 확인한다.

```
Ran all test suites.
```

---

## 🚀 기능 요구 사항

게시글에 댓글과 대댓글을 작성할 수 있는 API를 구현한다.
<br/> `❗ 단, 추후 게시글의 대댓글의 대댓글을 작성할 수 있도록 확장성을 고려해서 설계 및 구현해야한다.`


예시) 
1. 게시글에 댓글을 작성한다.
2. 게시글에 작성된 댓글에 대댓글을 작성한다.

총 6개의 API 엔드포인트로 구성해야한다.

- 댓글 작성 API
  1. 게시글에 댓글을 작성한다.
  2. 댓글의 최대 길이는 1000자로 제한한다.
  3. 댓글의 최소 길이는 1자로 제한한다.


- 대댓글 작성 API
  1. 댓글에 대댓글을 작성한다.
  2. 대댓글의 최대/최소 길이는 댓글과 동일하다.

    
- 댓글/대댓글 조회 API
  1. 게시글에 작성된 댓글/대댓글을 조회한다.
  2. 숨김처리된 댓글/대댓글은 조회되지 않는다.
  3. 기본적으로 `Pagination`을 적용해야한다.


- 댓글/대댓글 삭제 API
  1. 게시글에 작성된 댓글/대댓글을 삭제한다.
  2. 삭제된 댓글/대댓글은 DB에 남지 않는다.


- 댓글/대댓글 좋아요 API
  1. 게시글에 작성된 댓글에 좋아요를 한다.
  2. 한 댓글에 대해 중복 좋아요는 불가능하다.
  3. 댓글/대댓글 좋아요 갯수는 댓글/대댓글 조회 API를 통해 확인할 수 있다.


- 댓글/대댓글 신고하기 API
  1. 게시글에 작성된 댓글/대댓글을 신고한다.
  2. 한 댓글/대댓글에 대해 중복 신고는 불가능하다.
  3. 댓글/대댓글 신고 갯수가 10개 이상이면 해당 댓글/대댓글이 조회시 숨김처리되어야한다.


### 공통 필수 예외처리 사항

- API에 요청받은 Body 값의 타입을 검증하여 올바르지 않은 타입일 경우 `400 BadRequest` 에러를 리턴해야한다.
- API에 요청받은 Body 값의 필수 값이 누락되거나/빈 값인 경우 `400 BadRequest` 에러를 리턴해야한다.


### API 요청/응답 요구 사항
1. 모든 API의 요청/응답은 DTO를 통해 TypeSafe하게 이루어져야한다.
2. DTO의 타입은 `class-validator`를 이용하여 검증한다.
3. DTO 내부 요소의 명칭은 `camelCase`로 작성한다.

#### 요청
- 댓글 내용은 1자 이상 1000자 이상의 `string` 형식이다.
```typescript
content: '댓글은 최소 1자 이상 1000자 이하로 작성해야합니다.'
```
- 댓글 작성자는 1자 이상 20자 이하의 `string` 형식이다.
```typescript
writer: '댓글 작성자는 최소 1자 이상 20자 이하로 작성해야합니다.'
```
- 댓글/대댓글 조회시 `Pagination`을 지원한다.
```
page : 1
limit : 10
```

#### 응답
- 댓글/대댓글 좋아요 수는 `number` 형식이다.
```typescript
likeCount: '댓글 좋아요 수는 number 타입입니다.'
```

- 댓글/대댓글 신고 수는 `number` 형식이다.
```typescript
reportCount: '댓글 신고 수는 number 타입입니다.'
```

---

## 🎯 프로그래밍 요구 사항

- **Javascript 코드가 아닌 Typescript 코드로만 구현해야 한다.**
- **Swagger**를 이용하여 API 명세를 작성한다.
- **package.json**에 명시된 라이브러리만을 이용하여 구현한다.
- **eslint**, **prettier** 등의 코드 포맷팅 라이브러리를 이용하여 제공된 코드 컨벤션에 맞추어 코드를 작성한다.
- `node`, `npm` 버전은 `package.json`에 명시된 버전을 사용한다. [Volta를 이용하여 node 버전을 관리한다.](https://docs.volta.sh/guide/getting-started)


- **(선택 사항)** API 구현이 완료되고, 유닛 테스트, E2E 테스트등 모든 테스트 코드를 작성하여 테스트를 통과하면 굿!
---

## ✏️ 과제 진행 요구 사항

- 미션은 [nest-comment-3](https://github.com/eojjeoda-nest/nest-comment-3) 저장소를 Fork & Clone 하고 시작한다.
- **기능을 구현하기 전 `README.md`에 구현할 기능/예외처리를 목록으로 정리**해 추가한다.