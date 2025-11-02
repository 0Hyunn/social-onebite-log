import { ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useSession } from "@/store/session";
import { useOpenAlertModal } from "@/store/alert-modal";

// 이미지 타입 정의
type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const session = useSession();

  const { isOpen, close } = usePostEditorModal();

  const openAlertModal = useOpenAlertModal();

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      toast.error("포스트 생성에 실패했습니다.", { position: "top-center" });
    },
  });

  const [content, setContent] = useState("");

  // 이미지 상태 관리 (이미지 n개, 미리보기 URL n개)
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 이미지 추가 버튼 클릭 시, 파일 입력 요청
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 내용 변경 시 텍스트 영역 높이 자동 조절
  // 초기에는 auto로 설정하고, 내용이 변경되면 scrollHeight를 사용하여 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  // 모달 열릴 때 텍스트 영역에 포커스, 텍스트영역과 이미지 영역 초기화
  useEffect(() => {
    if (!isOpen) {
      images.forEach((image) => {
        // 이미지 미리보기 URL 해제 (메모리로 부터 해제)
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }
    textareaRef.current?.focus();

    setContent("");
    setImages([]);
  }, [isOpen]);

  // 모달 닫기 버튼 클릭 시, 모달 닫기
  const handleCloseModal = () => {
    if (content !== "" || images.length !== 0) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다.",
        description:
          "게시글 작성이 마무리 되지 않았습니다. 정말 닫으시겠습니까?",
        onPositive: () => {
          close();
        },
      });
      return;
    }
    close();
  };

  // 모달 저장 버튼 클릭 시, 포스트 생성 요청 (supabase insert)
  const handleCreatePostClick = () => {
    if (content.trim() === "") return;
    createPost({
      content,
      images: images.map((image) => image.file),
      userId: session!.user.id,
    });
  };

  // 이미지 선택 시, 이미지 상태 업데이트
  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    // 파일이 있다면? 배열 형태로 저장
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // 파일 배열을 순회하며, 이미지 상태 업데이트
      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    // 파일 선택 초기화 (동일한 파일을 두번 이상 선택할 수 없도록 하기 위해)
    e.target.value = "";
  };

  // 이미지 삭제 함수
  const handleDeleteImage = (image: Image) => {
    // 이미지 배열을 순회하며, 삭제할 이미지의 미리보기 URL과 일치하지 않는 이미지들을 필터링하여 새로운 배열 생성
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );

    URL.revokeObjectURL(image.previewUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          ref={textareaRef}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isCreatePostPending}
        />

        <input
          onChange={handleSelectImages}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
        />

        {/* 이미지가 있을 경우, 캐러셀 컴포넌트 렌더링 */}
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {/* 이미지 배열을 순회하며, 캐러셀 아이템 렌더링 */}
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    {/* 이미지 삭제 버튼 */}
                    <div
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                    >
                      <XIcon className="size-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="cursor-pointer"
          disabled={isCreatePostPending}
        >
          <ImageIcon />
          이미지 추가
        </Button>
        <Button
          className="cursor-pointer"
          onClick={handleCreatePostClick}
          disabled={isCreatePostPending}
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
