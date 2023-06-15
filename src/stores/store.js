import { create } from "zustand";
import { createAuthSlice } from "./slices/createAuth";
export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
}));
