"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Download,
  Facebook,
  Link,
  Linkedin,
  LoaderCircle,
  Mail,
  Share2,
  Twitter,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ShareModalProps {
  resumeId: string;
  loading?: boolean;
  handleExport?: () => void;
  resumeName: string;
}

export function ShareModal({
  resumeId,
  resumeName,
  handleExport,
  loading,
}: ShareModalProps) {
  const url = process.env.NEXT_PUBLIC_BASE_URL!;
  const [open, setOpen] = useState(false);
  const [shareLink, setShareLink] = useState(`${url}${resumeId}/preview`);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("copied");
  };

  const handleGenerateLink = () => {
    // In a real app, this would generate a new link with the selected options
    const newLink = `https://resumeos.com/share/${resumeId}${
      isPublic ? "" : "&protected=true"
    }`;
    setShareLink(newLink);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hover-lift flex gap-2 items-center justify-center">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Resume</DialogTitle>
          <DialogDescription>
            Share your resume "{resumeName}" with others.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="share-link">Share Link</Label>
            <div className="flex gap-2">
              <Input
                id="share-link"
                value={shareLink}
                readOnly
                className="flex-1"
              />
              <Button variant="outline" size="icon" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 border rounded-md p-4 bg-secondary/30">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="public-switch">Public Access</Label>
                <p className="text-xs text-muted-foreground">
                  Anyone with the link can view your resume
                </p>
              </div>
              <Switch
                id="public-switch"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>

            {!isPublic && (
              <div className="space-y-2">
                <Label htmlFor="password">Password Protection</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a password"
                />
              </div>
            )}

            <Button onClick={handleGenerateLink} className="w-full">
              <Link className="mr-2 h-4 w-4" />
              Generate Link
            </Button>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="sm:w-auto w-full"
          >
            Close
          </Button>
          <Button
            variant="outline"
            className="sm:w-auto w-full"
            onClick={handleExport}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle  className="animate-spin"/>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                <span> Download PDF</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
