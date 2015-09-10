#hapi를 활용한 rest api server 구축 예제 1

간단한 계정의 생성/조회/수정/삭제가 가능한 서버를 돌려볼 수 있습니다.

계정 생성시 local에 있는 mongodb에 저장이 되고 차후 수정 및 삭제가 가능합니다.

swagger plugin의 도움으로 api의 문서화가 편해졌고 문서에서 직접 요청을 보내서 테스트해볼 수 있습니다.

models, routes, controllers 폴더로 분리를 해두었는데 models에는 각종 데이터베이스 모델 관련 파일들, routes에는 API 관련 파일들, controllers에는 실제 로직 파일들이 들어있습니다.

#기본 필요 사항
- node js
- mongodb

#설치 방법
- clone후 npm install을 통해 모듈 설치
- node app.js로 실행
- http://localhost:8080/docs로 swagger 실행

#history
- 2015/9/10 작성
