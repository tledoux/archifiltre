import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilesAndFoldersMetadataFromStore } from "../../reducers/files-and-folders-metadata/files-and-folders-metadata-selectors";
import {
  markAsToDelete,
  unmarkAsToDelete,
} from "../../reducers/files-and-folders/files-and-folders-actions";
import {
  getAliasesFromStore,
  getCommentsFromStore,
  getFilesAndFoldersFromStore,
  getFilesToDeleteFromStore,
  getHashesFromStore,
} from "../../reducers/files-and-folders/files-and-folders-selectors";
import {
  updateAliasThunk,
  updateCommentThunk,
} from "../../reducers/files-and-folders/files-and-folders-thunks";
import { StoreState } from "../../reducers/store";
import { addTag, untagFile } from "../../reducers/tags/tags-actions";
import {
  getAllTagIdsForFile,
  getTagsByIds,
  getTagsFromStore,
} from "../../reducers/tags/tags-selectors";
import {
  getWorkspaceMetadataFromStore,
  useWorkspaceMetadata,
} from "../../reducers/workspace-metadata/workspace-metadata-selectors";
import { useFillColor } from "../../util/color-util";
import ReportApiToProps from "./report";

interface ReportContainerProps {
  api: any;
  fillColor: (ffId: string) => string;
}

const ReportContainer: FC<ReportContainerProps> = ({ api }) => {
  /* <Legacy> : to replace */
  const displayRoot = api.icicle_state.display_root();

  const { hoveredElementId, lockedElementId } = useWorkspaceMetadata();

  const filesAndFoldersId = lockedElementId || hoveredElementId;
  /* </Legacy> */
  const tagIdsForCurrentFile = useSelector((state: StoreState) =>
    getAllTagIdsForFile(getTagsFromStore(state), filesAndFoldersId)
  );

  const tagsForCurrentFile = useSelector((state: StoreState) =>
    getTagsByIds(getTagsFromStore(state), tagIdsForCurrentFile)
  );

  const currentFileAlias =
    useSelector(getAliasesFromStore)[filesAndFoldersId] || "";
  const currentFileComment =
    useSelector(getCommentsFromStore)[filesAndFoldersId] || "";

  const filesAndFolders = useSelector(getFilesAndFoldersFromStore);

  const filesAndFoldersMetadata = useSelector(
    getFilesAndFoldersMetadataFromStore
  );

  const currentFileHash = useSelector((state: StoreState) =>
    getHashesFromStore(state)
  )[filesAndFoldersId];
  const { originalPath } = useSelector(getWorkspaceMetadataFromStore);

  const filesToDelete = useSelector(getFilesToDeleteFromStore);
  const isCurrentFileMarkedToDelete = filesToDelete.includes(filesAndFoldersId);

  const { iciclesSortMethod } = useWorkspaceMetadata();

  const fillColor = useFillColor(
    filesAndFolders,
    filesAndFoldersMetadata,
    iciclesSortMethod,
    displayRoot
  );

  const dispatch = useDispatch();

  const createTag = useCallback(
    (tagName, ffId) => {
      dispatch(addTag(tagName, ffId));
      api.undo.commit();
    },
    [dispatch, api]
  );

  const untag = useCallback(
    (tagName, ffId) => {
      dispatch(untagFile(tagName, ffId));
      api.undo.commit();
    },
    [dispatch, api]
  );

  const updateComment = useCallback(
    (comments) => {
      dispatch(updateCommentThunk(filesAndFoldersId, comments));
      api.undo.commit();
    },
    [dispatch, api, filesAndFoldersId]
  );

  const updateAlias = useCallback(
    (alias) => {
      dispatch(updateAliasThunk(filesAndFoldersId, alias));
      api.undo.commit();
    },
    [dispatch, api, filesAndFoldersId]
  );

  const toggleCurrentFileDeleteState = useCallback(() => {
    isCurrentFileMarkedToDelete
      ? dispatch(unmarkAsToDelete(filesAndFoldersId))
      : dispatch(markAsToDelete(filesAndFoldersId));
  }, [dispatch, isCurrentFileMarkedToDelete, filesAndFoldersId]);

  return (
    <ReportApiToProps
      originalPath={originalPath}
      tagsForCurrentFile={tagsForCurrentFile}
      isLocked={lockedElementId !== ""}
      currentFileHash={currentFileHash}
      currentFileAlias={currentFileAlias}
      currentFileComment={currentFileComment}
      filesAndFolders={filesAndFolders}
      filesAndFoldersId={filesAndFoldersId}
      filesAndFoldersMetadata={filesAndFoldersMetadata}
      isCurrentFileMarkedToDelete={isCurrentFileMarkedToDelete}
      updateAlias={updateAlias}
      updateComment={updateComment}
      toggleCurrentFileDeleteState={toggleCurrentFileDeleteState}
      fillColor={fillColor}
      createTag={createTag}
      untag={untag}
    />
  );
};

export default ReportContainer;
