export function createResponse(data: any, res?: any) {
  const params = res?.query || res?.body || {}
  if (data && data.list && Array.isArray(data.list)) {
    return {
      code: 1,
      message: 'success',
      data: {
        ...data,
        current: params.current ? Number(params.current) : 1,
        pageSize: params.pageSize ? Number(params.pageSize) : 10,
        total: 1000,
      },
    }
  }
  return {
    code: 1,
    message: 'success',
    data: {
      ...data,
      ...res?.body,
    },
  }
}
export function createErrorResponse(message = 'failed', code = 0) {
  return {
    code,
    message,
    data: null,
  }
}
