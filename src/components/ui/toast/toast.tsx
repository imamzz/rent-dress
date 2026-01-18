import CheckCircle from "../../icons/CheckCircle";
import { Toast as ToastType } from "./use-toast";

export function Toast({ message }: ToastType) {
  return (
    <div className="flex w-80 items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-lg">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle className="h-3.5 w-3.5" />
      </div>

      <p className="text-sm font-medium text-gray-900">
        {message}
      </p>
    </div>
  );
}
