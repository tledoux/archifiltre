import { promises as fs } from "fs";
import { map, takeLast } from "rxjs/operators";
import { ArchifiltreThunkAction } from "../../reducers/archifiltre-types";
import { getFilesAndFoldersMetadataFromStore } from "../../reducers/files-and-folders-metadata/files-and-folders-metadata-selectors";
import {
  getAliasesFromStore,
  getCommentsFromStore,
  getFilesAndFoldersFromStore,
  getFilesToDeleteFromStore,
} from "../../reducers/files-and-folders/files-and-folders-selectors";
import { getTagsFromStore } from "../../reducers/tags/tags-selectors";
import translations from "../../translations/translations";
import { arrayToCsv } from "../../util/csv-util";
import { notifyInfo, notifySuccess } from "../../util/notifications-util";
import { generateResipExport$ } from "./resip-export.controller";

const resipExportTitle = translations.t("export.resipExportTitle");
const resipExportSuccessMessage = translations.t(
  "export.resipExportSuccessMessage"
);
const resipExportStartedMessage = translations.t(
  "export.resipExportStartedMessage"
);

/**
 * Thunk to export data to Resip
 * @param filePath - name of the output file
 */
export const resipExporterThunk = (
  filePath: string
): ArchifiltreThunkAction => (dispatch, getState) => {
  const state = getState();
  const tags = getTagsFromStore(state);
  const filesAndFolders = getFilesAndFoldersFromStore(state);
  const filesAndFoldersMetadata = getFilesAndFoldersMetadataFromStore(state);
  const aliases = getAliasesFromStore(state);
  const comments = getCommentsFromStore(state);
  const elementsToDelete = getFilesToDeleteFromStore(state);

  notifyInfo(resipExportStartedMessage, resipExportTitle);
  return new Promise((resolve) => {
    generateResipExport$({
      aliases,
      comments,
      elementsToDelete,
      filesAndFolders,
      filesAndFoldersMetadata,
      tags,
    })
      .pipe(takeLast(1))
      .pipe(map(({ resipCsv }) => arrayToCsv(resipCsv)))
      .subscribe(async (stringCsv) => {
        await fs.writeFile(filePath, stringCsv);
        notifySuccess(resipExportSuccessMessage, resipExportTitle);
        resolve();
      });
  });
};
