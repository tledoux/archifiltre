import undoable from "../enhancers/undoable/undoable";
import {
  IciclesSortMethod,
  SET_HOVERED_ELEMENT_ID,
  SET_ICICLES_SORT_METHOD,
  SET_LOCKED_ELEMENT_ID,
  SET_ORIGINAL_PATH,
  SET_SESSION_NAME,
  WorkspaceMetadataAction,
  WorkspaceMetadataState,
} from "./workspace-metadata-types";

const initialState: WorkspaceMetadataState = {
  hoveredElementId: "",
  iciclesSortMethod: IciclesSortMethod.SORT_BY_TYPE,
  lockedElementId: "",
  originalPath: "",
  sessionName: "",
};

const workspaceMetadataReducer = (
  state = initialState,
  action: WorkspaceMetadataAction
) => {
  switch (action.type) {
    case SET_SESSION_NAME:
      return { ...state, sessionName: action.sessionName };
    case SET_ORIGINAL_PATH:
      return { ...state, originalPath: action.originalPath };
    case SET_ICICLES_SORT_METHOD:
      return { ...state, iciclesSortMethod: action.sortMethod };
    case SET_HOVERED_ELEMENT_ID:
      return { ...state, hoveredElementId: action.hoveredElementId };
    case SET_LOCKED_ELEMENT_ID:
      return { ...state, lockedElementId: action.lockedElementId };
    default:
      return state;
  }
};

export { workspaceMetadataReducer };

export default undoable(workspaceMetadataReducer, initialState);
