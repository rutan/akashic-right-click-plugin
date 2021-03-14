import { RightClickableE } from './RightClickableE';

export function asRightClickable(e: g.E): RightClickableE {
  const rightClickableE = e as RightClickableE;
  rightClickableE.rightClickable = true;
  rightClickableE.touchable = true;
  if (!rightClickableE.rightClickDown) rightClickableE.rightClickDown = new g.Trigger();
  if (!rightClickableE.rightClickUp) rightClickableE.rightClickUp = new g.Trigger();
  return rightClickableE;
}

export function asUnRightClickable(e: g.E): g.E {
  const rightClickableE = e as RightClickableE;
  delete (rightClickableE as any).rightClickable;

  if (rightClickableE.rightClickDown) {
    if (!rightClickableE.rightClickDown.destroyed()) rightClickableE.rightClickDown.destroy();
    delete (rightClickableE as any).rightClickDown;
  }

  if (rightClickableE.rightClickUp) {
    if (!rightClickableE.rightClickUp.destroyed()) rightClickableE.rightClickUp.destroy();
    delete (rightClickableE as any).rightClickUp;
  }

  return rightClickableE as g.E;
}
