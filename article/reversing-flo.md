---
title: "Flo 리버싱: Übersicht 위젯 만들기"
subtitle: "기본 위젯이 제 취향이 아닌걸 어떡하죠?"
icon: 🎵
date: 2021-01-03T02:40:45.593Z
tags:
    - reverse engineering
    - electron
    - music
    - flo
---

저는 [Flo](https://www.music-flo.com)를 써요. 이전에는 Spotify를 쓰다가, 국내 음원들을 더 듣고 싶어지고, VPN을 사용하것도 귀찮아져서 다른 스트리밍 서비스를 선택하게 되었어요. 물론 다른 선택지도 많았지만, 할인 혜택이 좀 많아 보여서 Flo를 구독하기로 결심했어요. 

그렇게 구독 6개월째를 지나치던 차에, 우연히 메뉴바에 있는 플로 아이콘을 발견했어요. 여태 몰랐던 것도 신기하지만, Flo를 실행하면 메뉴 바에 작은 위젯이 나타나요.

![flo-menu](/img/reversing-flo/flo-menu.png)

근데 몇가지 문제가 있는 것 같아요!

 - **디자인**이 제 취향이 아니에요: 물론, 누군가의 마음에는 쏙 드는 위젯일거라고 생각해요.
 - **접근성**이 떨어져요: macOS 10.15 기준, 이미 위젯 기능이 알림 센터에 포함되어 있어서 이쪽으로 통합했으면 더 좋지 않았을까? 라는 생각이 들어요.
 - **다크모드**가 지원되지 않아요: 다크모드를 사용해도 여전히 흰 배경이 나타나는 위젯이에요.

물론! 이 모든걸 바라는 건 욕심이에요. 위젯이 있다는 것만으로도 감사할 따름이죠. 하지만 시간이 남아도는 저는 좀 다른 방법을 써보기로 했어요.

## Übersicht 위젯을 만들어볼까?

macOS에서 위젯을 쓴다고 하면 다들 Dashboard, 혹은 알림센터를 연상할텐데요. 주로 심심한 배경화면을 쓰는 탓에 저는 [Übersicht](https://tracesof.net/uebersicht/)를 이용해서 배경화면에 위젯을 두곤 합니다. 무려 **React**를 이용해서 위젯을 직접 짤 수 도 있으니, 프론트엔드 개발자에겐 정말 천국같은 환경이죠?

그래서 Flo의 기본 위젯을 대체하기 위한, 데스크탑 화면에 둘 수 있는 Übersicht 위젯을 만들기로 했어요!

### 참고: Spotify 위젯

참고를 하기 위해 다른 음악 위젯들은 어떻게 구현되었는지 둘러보았어요.

당연하지만, [Übersicht Widget Gallery](https://tracesof.net/uebersicht-widgets/)에는 이미 다양한 위젯들이 나와있고, 심지어 [Spotify](https://tracesof.net/uebersicht-widgets/#Really-Simple-Spotify-Widget)를 위한 위젯도 이미 공개되어 있어요!

![flo-menu](/img/reversing-flo/osascript.png)

링크에 있는 위젯은 `osascript`(구 `AppleScript`)를 통해 [Scripting Bridge](https://developer.apple.com/documentation/scriptingbridge)에 접근하여 현재 재생중인 트랙에 대한 정보를 주고 받는것 같아요.

### 그럼, Flo는?

Scripting Bridge는 해당 애플리케이션의 개발자가 직접 구현해야하는 기능이에요. 다른말로는 원 제작자가 지원하지 않으면 사용할 방법이 없다는 거죠. 그렇게 희망을 안고 Flo를 뜯어보러 갔으나...

![flo-menu](/img/reversing-flo/flo-content.png)

Flo는 [electron](https://www.electronjs.org/)으로 만들어진 앱이었습니다(!) (네, 쉬운 방법은 일단 물건너 간 것 같아요...)

Electron을 이용해서 Scripting Bridge를 구현한 경우를 본적은 없어요. 물론 하라면 충분히 가능하겠지만... 코드베이스를 최대한 단일화시키기 위해 사용하는 electron인만큼, 그런 기대는 따로 하지 않기로 했어요.

## 남은건 리버싱 뿐

![21](/img/reversing-flo/21.png)

올해로 21살이 된 저는 이렇게 된 이상 소스를 까야겠다는 생각을 했어요. 마침 electron으로 짜여져있는 만큼, 결국에는 디버거를 꺼내들 수 있을거라는 생각이 들었어요.

하지만...

> 제7조 이용자의 의무
> 
> **① 이용자는 소프트웨어 또는 관련문서를 수정, 번역, 역컴파일, 역엔지니어링 또는 기타변형 등을 통해 임의로 조작하거나 가공할 수 없습니다.**
> 


리버싱은 (거의) 항상 불법이에요. 소스를 까면 안된다는 말이죠! 다만 이러한 규제가 걸려 있는 이유는 충분히 이해할 수 있어요. 소스가 공개되는것은 보안, 그리고 비즈니스면에서 큰 위협이 될 수 있기 때문이죠.

하지만 지금은 다른 방법이 없는 것 같아요. Third party를 위한 API도, 애플리케이션에 대한 다른 접근 방법도 존재하지 않아 직접 소스를 보아야 방법이 나타날 것 같아요.

단순히 사용의 편의를 위해 가공을 할 예정이며, 기존의 기능을 다른 UI로 감싸주는 것에 그치기 때문에 피해 없이 리버싱을 할 수 있을 것 같아, 윤리적인 적정선을 지켜가며 뜯어보기로 했어요. 

이러한 이유로 이 포스트에서는 소스코드를 직접 보여드리기는 어려울 듯 해요. 다만 구현을 한 방법이나 과정을 조금씩 설명해 드리고자 해요.


### 뜯어보기

Electron을 활용한 애플리케이션은 여러가지 방법으로 배포되는데요, 가장 흔한 방법 중 하나는 [asar](https://github.com/electron/asar)를 이용해 패킹하는거에요. 빠른 성능과 편리성을 위해 사용되지만, `asar extract` 커맨드 한줄로 바로 뜯길 수 있다는 위험이 있지요. `asar`는 추후 수정된 코드를 다시 컴파일 할 때, 같은 패키징 환경을 구성하기 위해 사용되기도 했어요.

이렇게 `asar`를 뜯고 나니 JavaScript로 짜여진 여러가지 파일들이 나타났어요. 이 중에서 어느것이 재생 상태를 관리할까, 찾아보려던 도중, 거의 모든 코드가 난독화되었다는 것을 알게 되었어요.

### Obfuscation: 코드 난독화

저는 난독화를 정말 선호하는 타입은 아니에요. 물론 난독화의 일종인 minification은 실제 퍼포먼스에 영향을 줄 수도 있지만, 다른 사람들의 코드를 보면서 배우는 것 만큼 좋은 trade-off는 아닌 것 같아요. 다만 충분히 이해할 수 있는 상황이에요! 코드를 보호하기 위한 좋은 수단 중 하나로, 변수명과 같은 정보를 완전히 제거해버리고 오직 코드의 관계만 파악할 수 있을 수준의, 같은 기능을 하는 다른 코드를 내뱉게 하는 과정이죠.

난독화가 된 코드는 정말, 정말로 읽기 어려워요. 대체 읽으라고 만든 코드인지...

물론 리버싱 고수들은 쿨하게 코드를 읽어나갈 수 있겠죠? 하지만 전 아직 고수가 아닌 관계로 다른 방법을 찾아나섰어요.

### Source Map: 소스 맵

운이 좋게도 이번에 뜯어 본 소스에는 소스맵이 들어있었어요. 소스맵은 원래 디버깅을 위해 존재하는데요, 위와 같이 minify되거나 난독화 처리된 코드를 디버깅 하기 위해, 디버깅 툴이 사용하는 일종의 "단서"라고 생각 할 수 있어요. 소스맵이 있으면 원래 소스를 복원할 수 있다는 거죠.

[`source-map-unpack`](https://www.npmjs.com/package/source-map-unpack) 패키지를 이용해서 소스맵에서 기존 소스를 복원시켜 보았어요. 원래 소스코드가 등장했고, 저는 열심히 코드를 읽기 시작했어요!

### 디버거, 그리고 Hook

Electron 애플리케이션을 디버깅 할 때 특별히 필요한 툴은 없어요. `console.log`를 사용하면 기존의 node 애플리케이션과 같이 콘솔창에서 출력값을 볼 수 있고, 이 출력값으로 유용한 정보를 얻을 수 있죠.

이전 단계에서 해당 electron 애플리케이션의 원래 소스를 접근 할 수 있게 되었죠? 이제 로그가 생성되는 포인트를 확인하고, 원하는 정보가 기존 위젯과 동기화되는 부분을 찾아 새로운 위젯에 전달할 방법을 찾기 시작했어요.

#### Repacking

수정한 코드를 실행하려면 이전에 풀었던 `asar` 패킹에 다시 담아주어야 해요. `node_modules`가 포함 된 소스를 한 폴더에 넣고 `asar pack`만 실행해주면 되어서, 수정된 `asar` 파일을 기존에 있던 애플리케이션의 위치에 넣어주면 끝이에요.

![injection](/img/reversing-flo/injection.png)

테스트를 위해 로그를 찍었었고, 성공적으로 로그가 나타나는 것을 확인했어요!

### 소켓 통신 구현하기

앞의 스크린샷에서 눈치 채셨겠지만, 제 목표를 소켓을 이용해서 Übersicht 프론트엔드와의 통신을 구현하는 것이에요. (말할 수 없는 방법으로) 어찌저찌 현재 재생중인 트랙에 대한 정보, 그리고 트랙이 바뀌는 시점 등을 파악했기 때문에 이제 서버를 만들고 제때 메시지를 주고 받기만 하면 돼요.

Übersicht에서도 이런 경우 WebSocket API를 사용하는 것을 권장해요! 따로 어렵게 하지 않고, 기본적으로 브라우저에서 지원하는 WebSocket API를 통해 서버와 클라이언트를 구현하기로 했어요.

#### 서버

Electron도 결국엔 node를 사용하기 때문에, node_modules에 새로운 모듈을 추가하는건 일도 아니에요. 이번에는 [`ws`](https://www.npmjs.com/package/ws) 패키지를 이용해 서버를 구축하기로 했어요. 

소켓 훅을 달아줄 포트를 임의로 정하고, 해당 포트에서 http 서버를 열어둔 뒤 웹소켓을 달아주는 방식으로 구현했어요.
또한 추후 애플리케이션이 열린 뒤에 위젯이 로딩 될 것을 감안하여 풀링 방식(기존의 http request)을 사용하여 정보를 받을 수 있도록 store를 통해 현재 재생중인 트랙을 캐싱하는 단계를 추가했어요.

디버깅을 하던 중 CORS가 걸리길래 해당 헤더도 넣어줬어요.

```javascript
console.log("[SOCKET HOOK] injecting listener");
const SHOOK_PORT = 3029;

const serverStore = (() => {
  let serverData = {};
  return {
    get: () => serverData,
    set: (d) => (serverData = d),
  };
})();

const server = require("http").createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(JSON.stringify(serverStore.get()));
});

const WebSocket = require("ws");

const wss = new WebSocket.Server({ server });

const emitMessage = (message, data) => {
  serverStore.set({
    ...serverStore.get(),
    [message]: data,
  });
  const json = JSON.stringify(serverStore.get());
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  });
};

server.listen(SHOOK_PORT, () => {
  console.log(`[SOCKET HOOK] listening on port: ${SHOOK_PORT}`);
});
```

추가적으로 해당 코드에서 보여드릴 수 없지만, 이후 재생/정지/스킵 기능을 구현할 수 있는 함수를 발견했어요. 웹소켓으로 요청을 받아 해당 기능을 실행시켜주는 엔드포인트를 추가해서, 위젯에 버튼을 넣어주기도 했어요.

#### 위젯

여기부터는 그냥 React 페이지를 만들듯이 접근했어요! 다만 Übersicht가 지원하는 API에 맞추기 위해 조금 다른 로직으로 접근했지요.

- `init` 함수에서 처음으로 소켓 연결을 시도하고
- `connect` 콜이 실패 할 경우 10초 간격으로 다시 연결을 시도해요
  - 이때 연결이 성공하면 (Flo 앱이 이미 실행중) 아까 만들어두었던 http 풀링 방식으로 현재 재생중인 트랙을 가져와요
- `socket`은 추후 재생 요청을 위해 global scope에 정의했어요

```javascript
const connect = (dispatch) => {
  console.log("attempting to connect...");
  socket = new WebSocket("ws://localhost:3029");
  socket.onerror = (error) => {
    dispatch({ type: "STATE", data: { error: "Could not connect to FLO" } });
  };
  socket.onclose = (event) => {
    console.log("socket closed");
    setTimeout(() => {
      connect(dispatch);
    }, 10000);
  };
  socket.onopen = async (event) => {
    console.log("socket connected");
    const res = await fetch("http://localhost:3029");
    const json = await res.json();
    dispatch({ type: "STATE", data: { ...json, error: null } });
  };
  socket.onmessage = (event) => {
    dispatch({ type: "STATE", data: JSON.parse(event.data) });
  };
};
export const init = (dispatch) => {
  connect(dispatch);
};
```


그렇게 열심히 뚝딱뚝딱 만들어 본 결과...

![widget](/img/reversing-flo/widget.png)

이렇게 꽤나 마음에 드는 위젯이 탄생했어요!

## 결과물

이제 모든게 실행되는 걸 확인해야겠죠? 위젯이 먼저 실행되는 경우, Flo가 먼저 실행되는 경우 등을 테스팅 해봤어요.

아래에 작동하는 gif를 첨부했어요.

![screen](/img/reversing-flo/screen.gif)

정말 재밌는 리버싱이었어요! 서버까지 붙여가는 약간 오버엔지니어링스러운 짓도 했지만, 그만큼 재밌고 마음에 드는 결과물이 나왔고, 무엇보다 실용적인 프로젝트여서 더 재미가 붙은것 같네요.

