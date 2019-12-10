import { createFilesAndFolders } from "../reducers/files-and-folders/files-and-folders-test-utils";
import {
  countDuplicateFiles,
  countDuplicateFilesTotalSize,
  countDuplicateFolders,
  countDuplicatesPercentForFiles,
  countDuplicatesPercentForFolders,
  getBiggestDuplicatedFiles,
  getMostDuplicatedFiles
} from "./duplicates-util";

const folder1Id = "folder-1-id";
const folder2Id = "folder-2-id";
const file1Id = "file-1-id";
const file2Id = "file-2-id";
const file3Id = `${folder2Id}/file-3-id`;
const file4Id = `${folder2Id}/file-4-id`;
const file5Id = `${folder1Id}/file-5-id`;
const file6Id = `${folder1Id}/file-6-id`;
const hash1 = "first-hash-value";
const hash2 = "second-hash-value";
const hash3 = "third-hash-value";
const folderHash = "folder-1-hash";
const file1Size = 1000;
const file5Size = 2500;
const file1 = createFilesAndFolders({
  file_size: file1Size,
  id: file1Id
});
const file2 = createFilesAndFolders({
  file_size: 2000,
  id: file2Id
});
const file3 = createFilesAndFolders({
  file_size: file1Size,
  id: file3Id
});
const file4 = createFilesAndFolders({
  file_size: file1Size,
  id: file4Id
});

const file5 = createFilesAndFolders({
  file_size: file5Size,
  id: file5Id
});

const file6 = createFilesAndFolders({
  file_size: file5Size,
  id: file6Id
});

const folder1 = createFilesAndFolders({
  children: [file5Id, file6Id],
  id: folder1Id
});

const folder2 = createFilesAndFolders({
  children: [file5Id, file6Id],
  id: folder2Id
});

const file1WithHash = { ...file1, hash: hash1 };
const file3WithHash = { ...file3, hash: hash1 };
const file4WithHash = { ...file4, hash: hash1 };
const file5WithHash = { ...file5, hash: hash3 };
const file6WithHash = { ...file6, hash: hash3 };

const filesMap = {
  [file1Id]: file1,
  [file2Id]: file2,
  [file3Id]: file3,
  [file4Id]: file4,
  [file5Id]: file5,
  [file6Id]: file6,
  [folder1Id]: folder1,
  [folder2Id]: folder2
};

const hashesMap = {
  [file1Id]: hash1,
  [file2Id]: hash2,
  [file3Id]: hash1,
  [file4Id]: hash1,
  [file5Id]: hash3,
  [file6Id]: hash3,
  [folder1Id]: folderHash,
  [folder2Id]: folderHash
};

describe("duplicates-util", () => {
  describe("countDuplicateFiles", () => {
    it("should count the number of duplicates", () => {
      expect(countDuplicateFiles(filesMap, hashesMap)).toEqual(3);
    });
  });

  describe("countDuplicateFolders", () => {
    it("should count the number of duplicates", () => {
      expect(countDuplicateFolders(filesMap, hashesMap)).toEqual(1);
    });
  });

  describe("countDuplicatesPercentForFiles", () => {
    it("should count the percent of duplicates", () => {
      expect(countDuplicatesPercentForFiles(filesMap, hashesMap)).toEqual(
        3 / 6
      );
    });
  });

  describe("countDuplicatesPercentForFolders", () => {
    it("should count the percent of duplicates", () => {
      expect(countDuplicatesPercentForFolders(filesMap, hashesMap)).toEqual(
        1 / 2
      );
    });
  });

  describe("countDuplicateFilesTotalSize", () => {
    it("should count the totalSize of duplicates", () => {
      expect(countDuplicateFilesTotalSize(filesMap, hashesMap)).toEqual(
        2 * file1Size + file5Size
      );
    });
  });

  describe("getMostDuplicatedFiles", () => {
    it("should only return the duplicated items if too many are required", () => {
      expect(getMostDuplicatedFiles(3)(filesMap, hashesMap)).toEqual([
        [file1WithHash, file3WithHash, file4WithHash],
        [file5WithHash, file6WithHash]
      ]);
    });

    it("should not return too many duplicated items", () => {
      expect(getMostDuplicatedFiles(1)(filesMap, hashesMap)).toEqual([
        [file1WithHash, file3WithHash, file4WithHash]
      ]);
    });
  });

  describe("getBiggestDuplicatedFiles", () => {
    it("should only return the duplicated items if too many are required", () => {
      const biggestDuplicatedFiles = getBiggestDuplicatedFiles(3)(
        filesMap,
        hashesMap
      );
      expect(biggestDuplicatedFiles.length).toBe(2);
      expect(biggestDuplicatedFiles[0]).toEqual([file5WithHash, file6WithHash]);
      expect(biggestDuplicatedFiles[1]).toEqual([
        file1WithHash,
        file3WithHash,
        file4WithHash
      ]);
    });

    it("should not return too many duplicated items", () => {
      expect(getBiggestDuplicatedFiles(1)(filesMap, hashesMap)).toEqual([
        [file5WithHash, file6WithHash]
      ]);
    });
  });
});