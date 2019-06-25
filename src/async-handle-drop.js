import * as VirtualFileSystem from "datastore/virtual-file-system";
import AsyncHandleDropWorker from "./async-handle-drop.worker";

export default (hook, dropped_folder_path) => {
  return new Promise((resolve, reject) => {
    const worker = new AsyncHandleDropWorker();
    worker.addEventListener("message", e => {
      switch (e.data.status) {
        case "return":
          const vfs = VirtualFileSystem.fromJs(e.data.vfs);
          worker.terminate();
          resolve(vfs);
          break;
        case "error":
          worker.terminate();
          reject(e.data.message);
          break;
        default:
          hook(e.data);
      }
    });
    worker.postMessage({
      dropped_folder_path
    });
  });
};
