# @rutan/akashic-right-click-plugin

[Akashic Engine](https://akashic-games.github.io/) 上で右クリックを有効にするプラグインです。

## How to use

### インストール

```
akashic install --plugin 5 @rutan/akashic-right-click-plugin
```

※インストール後、 game.json 内の path の中身を `lib/index.js` から `/lib/RightClickPlugin.js` に書き換える必要があります。

### 利用方法

`asRightClickable` に右クリックを有効にしたい `E` のインスタンスを渡してください。

```typescript
import { asRightClickable } from '@rutan/akashic-right-click-plugin';

const rect = new g.FilledRect({
  scene,
  width: 100,
  height: 100,
  cssColor: '#f00',
});
scene.append(rect);

const rectR = asRightClickable(rect);
rectR.rightClickDown.add(() => {
  console.log('right click!');
});
```

## respect

- [akashic-hover-plugin](https://github.com/akashic-games/akashic-hover-plugin)
