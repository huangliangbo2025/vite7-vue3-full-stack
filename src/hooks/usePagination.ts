export const usePagination = () => {
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
  })

  const handlePageChange = (newPage: number, newSize: number) => {
    pagination.currentPage = newPage
    pagination.pageSize = newSize
  }

  const handleSizeChange = (newSize: number) => {
    pagination.pageSize = newSize
  }

  const handleCurrentChange = (newPage: number) => {
    pagination.currentPage = newPage
  }

  return {
    pagination,
    handlePageChange,
    handleSizeChange,
    handleCurrentChange,
  }
}
