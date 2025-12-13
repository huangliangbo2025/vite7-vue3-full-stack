export const useDialog = () => {
  const dialogRef = ref('dialogRef')
  const dialogVisible = ref(false)
  const openDialog = (...reset: any) => {
    if (dialogRef.value && typeof (dialogRef.value as any).open === 'function')
      (dialogRef.value as any).open(...reset)
    else
      dialogVisible.value = true
  }

  const openEditDialog = (...reset: any[]) => {
    if (dialogRef.value && typeof (dialogRef.value as any).openEdit === 'function')
      (dialogRef.value as any).openEdit(...reset)
    else
      dialogVisible.value = true
  }

  const openDetailDialog = (...reset: any[]) => {
    if (dialogRef.value && typeof (dialogRef.value as any).openDetail === 'function')
      (dialogRef.value as any).openDetail(...reset)
    else
      dialogVisible.value = true
  }

  const closeDialog = () => {
    dialogVisible.value = false
  }

  return {
    dialogRef,
    dialogVisible,
    openDialog,
    openEditDialog,
    openDetailDialog,
    closeDialog,
  }
}

export const useDialogArray = () => {
  const {
    dialogRef,
    openDialog,
  } = useDialog()
  return [dialogRef, openDialog] as const
}
