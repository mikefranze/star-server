import React, { useEffect, useRef } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { StyledButton } from '../../styles';
import useElection from '../../ElectionContextProvider';


export default function RaceDialog({
  onSaveRace, open, handleClose, children, editedRace, resetStep
}) {
    const { election } = useElection()
    const handleSave = () => onSaveRace()

    const onClose = (event, reason) => {
        if (reason && reason == "backdropClick")
            return;
        handleClose();
    }

    useEffect(() => {
      if (! open) resetStep();
    }, [open]);

    const dialogContentRef = useRef<HTMLDivElement>(null);

    useEffect( () => {
      if (open) {
        setTimeout( () => {
          if (dialogContentRef.current) {
            dialogContentRef.current.scrollTop = 0;
          }
        }, 100);
      };
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={'paper'}
            keepMounted>
            <DialogTitle> Edit Race </DialogTitle>
            <DialogContent ref={dialogContentRef}>
                {children}
            </DialogContent>
            <DialogActions>
                <StyledButton
                    type='button'
                    variant="contained"
                    width="100%"
                    fullWidth={false}
                    onClick={handleClose}>
                    Cancel
                </StyledButton>
                <StyledButton
                    type='button'
                    variant="contained"
                    fullWidth={false}
                    onClick={() => handleSave()}
                    disabled={election.state!=='draft'}>
                    Save
                </StyledButton>
            </DialogActions>

        </Dialog>
    )
}
