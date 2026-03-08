import { Bell, BookmarkX, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const EmptyTests = () => {
  const navigate = useNavigate();
  return (
    <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center">
      <ClipboardList className="h-10 w-10 text-primary mx-auto mb-3" />
      <p className="font-semibold text-foreground mb-1">No tests taken yet</p>
      <p className="text-sm text-muted-foreground mb-4">Take your first test to see your progress!</p>
      <Button onClick={() => navigate("/mock-tests")}>Take Your First Test</Button>
    </div>
  );
};

export const EmptyBookmarks = () => (
  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
    <BookmarkX className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
    <p className="font-semibold text-foreground mb-1">No bookmarks yet</p>
    <p className="text-sm text-muted-foreground">Bookmark materials to see them here</p>
  </div>
);

export const EmptyNotifications = () => (
  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
    <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
    <p className="font-semibold text-foreground mb-1">You're all caught up!</p>
    <p className="text-sm text-muted-foreground">No new notifications</p>
  </div>
);
