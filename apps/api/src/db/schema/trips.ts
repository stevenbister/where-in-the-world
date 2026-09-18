import { int, text, snakeCase } from "drizzle-orm/sqlite-core";

export const trips = snakeCase.table("trips", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text().notNull(),
  startDate: int({ mode: "timestamp" }),
  endDate: int({ mode: "timestamp" }),
  coverPhotoId: text(),
  createdBy: text(),
  createdAt: int({ mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: int({ mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});
