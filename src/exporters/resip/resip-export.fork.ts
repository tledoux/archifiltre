import translations from "../../translations/translations";
import {
  AsyncWorkerEvent,
  createAsyncWorkerForChildProcess,
  fakeChildProcess,
} from "../../util/async-worker-util";
import { MessageTypes } from "../../util/batch-process/batch-process-util-types";
import { hookCounter } from "../../util/hook-utils";
import resipExporter from "./resip-exporter";

const asyncWorker = createAsyncWorkerForChildProcess();

asyncWorker.addEventListener(
  AsyncWorkerEvent.MESSAGE,
  ({ type, data }: any) => {
    if (type === "initialize") {
      const messageHook = (count) => {
        asyncWorker.postMessage({
          result: { count, resipCsv: [] },
          type: MessageTypes.RESULT,
        });
      };
      const { hook, getCount } = hookCounter(messageHook);

      const {
        aliases,
        comments,
        elementsToDelete,
        filesAndFolders,
        filesAndFoldersMetadata,
        tags,
        language,
      } = data;
      translations.changeLanguage(language);

      const resipExportData = resipExporter(
        {
          aliases,
          comments,
          elementsToDelete,
          filesAndFolders,
          filesAndFoldersMetadata,
          tags,
        },
        hook
      );

      asyncWorker.postMessage({
        result: { count: getCount(), resipCsv: resipExportData },
        type: MessageTypes.RESULT,
      });

      asyncWorker.postMessage({
        type: MessageTypes.COMPLETE,
      });
    }
  }
);

export default fakeChildProcess;
