import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
interface AlertDialogProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: (val: boolean) => void;
}
export const AlertDialog = ({
  isOpen = false,
  children,
  onClose,
}: AlertDialogProps) => {
  const [open, setOpen] = React.useState(isOpen);
  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const handleClose = () => {
    onClose?.(false);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
