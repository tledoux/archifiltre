import { createEmptyStore } from "../store-test-utils";
import { getFilesAndFoldersMetadataFromStore } from "./files-and-folders-metadata-selectors";
import { createFilesAndFoldersMetadata } from "./files-and-folders-metadata-test-utils";
import { FilesAndFoldersMetadataMap } from "./files-and-folders-metadata-types";

describe("files-and-folders-metadata-selectors", () => {
  describe("getFilesAndFoldersMetadataFromStore", () => {
    it("should return the corresponding metadata on filesAndFolders", () => {
      const filesAndFoldersMetadata: FilesAndFoldersMetadataMap = {
        fileId: createFilesAndFoldersMetadata({
          averageLastModified: 200,
          childrenTotalSize: 1000,
          maxLastModified: 500,
          medianLastModified: 300,
          minLastModified: 100,
        }),
      };

      const emptyStore = createEmptyStore();

      const testStore = {
        ...emptyStore,
        filesAndFoldersMetadata: {
          filesAndFoldersMetadata,
        },
      };

      expect(getFilesAndFoldersMetadataFromStore(testStore)).toEqual(
        filesAndFoldersMetadata
      );
    });
  });
});
