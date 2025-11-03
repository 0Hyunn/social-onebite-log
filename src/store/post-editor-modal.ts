import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type CreateMode = {
  isOpen: true;
  type: "CREATE";
};

type EditMode = {
  isOpen: true;
  type: "EDIT";
  postId: number;
  content: string;
  imageUrls: string[] | null;
};

type OpenState = CreateMode | EditMode;

type CloseState = {
  isOpen: false;
};

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

// 포스트 작성 모달 스토어
const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () => {
          set({ isOpen: true, type: "CREATE" });
        },
        // isOpen, type 프로퍼티를 제외한 타입 정의
        openEdit: (param: Omit<EditMode, "isOpen" | "type">) => {
          set({ ...param, isOpen: true, type: "EDIT" });
        },

        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "postEditorModalStore" },
  ),
);

// 포스트 작성 모달 여는 함수 내보내기
export const useOpenCreatePostModal = () => {
  const openCreate = usePostEditorModalStore(
    (store) => store.actions.openCreate,
  );
  return openCreate;
};

// 포스트 수정 모달 여는 함수 내보내기
export const useOpenEditPostModal = () => {
  const openEdit = usePostEditorModalStore((store) => store.actions.openEdit);
  return openEdit;
};

// 포스트 작성 모달 상태 조회 함수 내보내기
export const usePostEditorModal = () => {
  const store = usePostEditorModalStore();

  return store as typeof store & State;
};
