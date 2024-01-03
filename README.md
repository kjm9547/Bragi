# Bragi

스포티파이 오픈 API를 활용한 음악 공유 SNS 모바일 앱입니다.
프론트 작업에 참여 하였으며 백의 경우 팀원분이 참여하였습니다.

피드를 통하여 사용자들의 게시글들이 확인 가능하며 좋아요 표시 댓글 달기 기능이 가능합니다.
스포티파이 api를 통하여 음악 검색 및 재생이 가능합니다.
사용자들의 자신의 개인 음악 창작물 업로드 또한 가능합니다.


<br>

## 기술스택


📱OS

![js](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

✔Front

![js](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![js](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

✔Back

![js](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![js](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

✔DB

![js](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)


## Previews

### 최초화면
![Screenshot_1704264329](https://github.com/kjm9547/Bragi/assets/50660458/dfedf15f-f11b-45ff-a021-437effe20d4c)

앱 실행 시 최초 화면이며 회원가입과 로그인이 가능합니다.

<br>

### Main
![feedView](https://github.com/kjm9547/Bragi/assets/50660458/f12d35e2-1d67-4820-8050-6bbed6b8f757)

피드 페이지입니다.

게시글 확인이 가능하며 좋아요 기능과 댓글 작성이 가능합니다.

유저 개개인은 게시글 작성이 가능하며 게시글 작성 시 음악 콘텐츠를 선택하여 게시글을 작성하게 됩니다.

<br>

### Msuic
![Screenshot_1704264407](https://github.com/kjm9547/Bragi/assets/50660458/d58e6e3c-1a0b-4491-b2f5-3c98dcb102dc)

음악 검색 및 재생 페이지입니다.

스포티파이로부터 발급받은 토큰을 인증키로 활용하여 스포티파이 서버에 검색 요청을 통하여 결과값을 받아옵니다.

음악 재생이 가능합니다.

음악 재생은 react-native-track-plyer를 활용하였습니다.

<br>

### Upload
![uloadView](https://github.com/kjm9547/Bragi/assets/50660458/ab6edef6-86cf-47b5-8486-f4764e008e2e)

개인 창작물 업로드 페이지입니다.

업로드 되어 있는 콘텐츠들의 확인이 가능하며 콘텐츠 재생이 가능합니다.

react-native-sound-player를 활용하였습니다.

또한 유저는 자신의 창작물 업로드 가능합니다.

<br>

### Detail
![Screenshot_1704264429](https://github.com/kjm9547/Bragi/assets/50660458/b7e2b023-61ce-48c4-88bf-739e179ba475)

유저 개인 페이지입니다.

유저가 올린 게시물을 확인이 가능합니다.

<br>
