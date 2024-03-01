import request from '@/utils/request'

export function fetchBookPage(query) {
  return request({
    url: '/book/page',
    method: 'get',
    params: query
  })
}

export function createBook(book) {
  return request({
    url: '/book/create',
    method: 'post',
    data: book
  })
}

export function getBook(id) {
  return request({
    url: '/book/get/' + id,
    method: 'get'
  })
}

export function updateBook(book) {
  return request({
    url: '/book/update',
    method: 'put',
    data: book
  })
}

export function deleteBook(id) {
  return request({
    url: '/book/delete/' + id,
    method: 'delete'
  })
}
