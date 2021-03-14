export interface RightClickableE extends g.E {
  rightClickable: boolean;
  rightClickState: boolean;
  rightClickDown: g.Trigger<void>;
  rightClickUp: g.Trigger<void>;
}
