import type { Database } from "./database.types";

// db의 public 스키마의 tables 중 post 테이블의 row 타입을 정의한다.
export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
