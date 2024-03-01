<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">Add</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" prop="id" width="180" />
      <el-table-column align="center" label="Name" prop="name" width="240" />
      <el-table-column align="center" label="Author" prop="author" width="150" />
      <el-table-column align="center" label="Publication" prop="publication" width="120" />
      <el-table-column align="center" label="ISBN" prop="isbn" width="180" />
      <el-table-column align="center" label="Action" class-name="small-padding fixed-width" width="150">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">edit</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">Del</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <BookForm ref="formRef" @success="getList" />
  </div>
</template>

<script>
import { fetchBookPage, deleteBook } from '@/api/book'
import BookForm from '@/views/book/bookForm.vue'
import Pagination from '@/components/Pagination/index.vue'

export default {
  name: 'BookList',
  components: { Pagination, BookForm },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchBookPage(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleAdd() {
      this.$refs['formRef'].open()
    },
    handleUpdate(book) {
      this.$refs['formRef'].open(book.id)
    },
    async handleDelete(book) {
      const id = book.id
      this.$confirm('Are you sure delete this Book?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        return deleteBook(id)
      }).then(() => {
        this.getList()
        this.$message({
          type: 'success',
          message: 'Delete Success!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancel'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
