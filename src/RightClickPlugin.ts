import { RightClickableE } from './RightClickableE';

export const RightClickPlugin: g.OperationPluginStatic = class RightClickPlugin implements g.OperationPlugin {
  static isSupported(): boolean {
    return typeof document !== 'undefined' && typeof document.addEventListener === 'function';
  }

  game: g.Game;
  view: HTMLElement;
  operationTrigger: g.Trigger<g.OperationPluginOperation | (number | string)[]>;

  private _getScale: (() => { x: number; y: number }) | null;
  private _currentTarget: RightClickableE | null;

  constructor(game: g.Game, view: g.OperationPluginViewInfo | null, option: any) {
    this.operationTrigger = new g.Trigger();
    this.game = game;
    this.view = (view as any).view;
    this._getScale = (view as any).getScale ? () => (view as any).getScale() : null;
    this._currentTarget = null;
  }

  start() {
    if (RightClickPlugin.isSupported()) {
      this.view.addEventListener('contextmenu', this._onContextMenu, { passive: false });
      this.view.addEventListener('mousedown', this._onRightDown, { passive: false });
      this.view.addEventListener('mouseup', this._onRightUp, { passive: false });
    }

    return true;
  }

  stop() {
    if (RightClickPlugin.isSupported()) {
      this.view.removeEventListener('contextmenu', this._onContextMenu);
      this.view.removeEventListener('mousedown', this._onRightDown);
      this.view.removeEventListener('mouseup', this._onRightUp);
    }
  }

  /**
   * 右クリックメニューの開始
   * @param e
   */
  private _onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  /**
   * 右クリックON
   * @param e
   */
  private _onRightDown = (e: MouseEvent) => {
    e.preventDefault();
    if (e.button !== 2) return;
    this._resetState();

    const scene = this.game.scene();
    if (!scene) return;

    const point = this._getClickPoint(e);
    const target = scene.findPointSourceByPoint(point).target as RightClickableE;
    if (!target || !target.rightClickable) return;
    this._currentTarget = target;
    target.rightClickState = true;
    target.rightClickDown.fire();
  };

  /**
   * 右クリックOFF
   * @param e
   */
  private _onRightUp = (e: MouseEvent) => {
    e.preventDefault();
    if (e.button !== 2) return;

    const scene = this.game.scene();
    if (!scene) return;

    const point = this._getClickPoint(e);
    const target = scene.findPointSourceByPoint(point).target as RightClickableE;
    if (target && this._currentTarget === target) {
      target.rightClickUp.fire();
    }
    this._resetState();
  };

  private _resetState() {
    if (this._currentTarget) {
      this._currentTarget.rightClickState = false;
      this._currentTarget = null;
    }
  }

  private _getClickPoint(e: MouseEvent) {
    const rect = this.view.getBoundingClientRect();
    const positionX = rect.left + window.pageXOffset;
    const positionY = rect.top + window.pageYOffset;
    const offsetX = e.pageX - positionX;
    const offsetY = e.pageY - positionY;
    const scale = this._getScale ? this._getScale() : { x: 1, y: 1 };

    return {
      x: offsetX / scale.x,
      y: offsetY / scale.y,
    };
  }
};
