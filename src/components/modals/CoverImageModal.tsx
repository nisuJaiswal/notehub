"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

const CoverImageModal = () => {
  const coverImage = useCoverImage();
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg text-center font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>TODO: UPLOAD IMAGE</div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
