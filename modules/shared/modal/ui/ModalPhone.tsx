"use client";

import { FC, useState, ReactElement } from "react";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ModalPhoneProps {
    isOpen?: boolean;
    onClose?: () => void;
    ButtonInit?: ReactElement;
}

const ModalPhone: FC<ModalPhoneProps> = ({ isOpen: propIsOpen, ButtonInit, onClose }) => {
    const [phone, setPhone] = useState<string>("");
    const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);

    const isControlled = typeof propIsOpen === "boolean" && onClose;
    const isOpen = isControlled ? propIsOpen : internalIsOpen;

    const handleOpenChange = (open: boolean) => {
        if (isControlled) {
            onClose?.();
        } else {
            setInternalIsOpen(open);
        }
    };

    const handleSubmit = () => {
        alert(`Phone number: ${phone}`);
        handleOpenChange(false);
    };

    const defaultButton = (
        <Button onClick={() => handleOpenChange(true)}>
            Open Modal
        </Button>
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            {ButtonInit ? (
                <DialogTrigger asChild>{ButtonInit}</DialogTrigger>
            ) : (
                <></>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Leave your phone number</DialogTitle>
                    <DialogDescription>
                        We will get back to you shortly.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <Input
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mb-2"
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <DialogClose asChild>
                        <Button variant="ghost">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalPhone;
