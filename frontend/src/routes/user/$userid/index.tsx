import Spinner from "@/components/ui/Spinner";
import useAuthStatus from "@/hooks/useAuthStatus";
import { createFileRoute } from "@tanstack/react-router";
import pfp from "../../../assets/Default_pfp.jpg";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useState } from "react";
import Overlay from "@/components/ui/Overlay";

export const Route = createFileRoute("/user/$userid/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, user, profile } = useAuthStatus();
  const [files, setFiles] = useState<File[] | undefined>();
  const [showDropzone, setShowDropzone] = useState(false);

  if (isLoading) return <Spinner />;
  if (!user) return <div>You must be logged in to accesss this page</div>;

  if (user) console.log(user);
  let joinDate;
  if (user) joinDate = new Date(user.created_at);

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Account</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <img
            className="w-[10rem] rounded-full"
            src={pfp}
            alt="user profile pic"
          />
          <button
            onClick={() => setShowDropzone(true)}
            className="hover:text-blue400 cursor-pointer text-blue-500"
          >
            Upload
          </button>
          {showDropzone && (
            <Overlay setOpenOverlay={setShowDropzone}>
              <Dropzone
                accept={{ "image/*": [] }}
                onDrop={handleDrop}
                onError={console.error}
                src={files}
              >
                <DropzoneEmptyState className="h-[10rem] w-[20rem]" />
                <DropzoneContent />
              </Dropzone>
            </Overlay>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold capitalize">
            {profile?.name}
          </span>
          <span>{user?.email}</span>
          <span className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            Joined {joinDate?.toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl">Watchlist</h2>
      </div>
    </div>
  );
}
