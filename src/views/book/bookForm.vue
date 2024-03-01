<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" append-to-body>
      <el-form ref="formRef" v-loading="formLoading" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="Name" prop="name">
          <el-input v-model="formData.name" placeholder="Please Enter Book Name" />
        </el-form-item>
        <el-form-item label="Author" prop="author">
          <el-input v-model="formData.author" placeholder="Please Enter Author" />
        </el-form-item>
        <el-form-item label="Publication" prop="publication">
          <el-date-picker
            v-model="formData.publication"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="Please Select publiction"
            clearable
          />
        </el-form-item>
        <el-form-item label="ISBN" prop="isbn">
          <el-input v-model="formData.isbn" placeholder="Please Enter ISBN" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="formLoading" @click="submitForm">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBook, createBook, updateBook } from '@/api/book'

export default {
  name: 'BookForm',
  data() {
    return {
      dialogTitle: '',
      dialogVisible: false,
      formLoading: false,
      formData: {
        id: undefined,
        name: undefined,
        author: undefined,
        publication: undefined,
        isbn: undefined
      },
      formRules: {
        name: [{ required: true, message: 'Book Name can not be Null', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async open(id) {
      this.dialogVisible = true
      this.reset()
      if (id) {
        this.formLoading = true
        try {
          const res = await getBook(id)
          this.formData = res.data
          this.title = 'Edit Book'
        } finally {
          this.formLoading = false
        }
      }
      this.title = 'Create Book'
    },
    async submitForm() {
      await this.$refs['formRef'].validate()
      this.formLoading = true
      try {
        const data = this.formData
        // handle update
        if (data.id) {
          await updateBook(data)
          this.$message({
            message: 'Update Success',
            type: 'success'
          })
          this.dialogVisible = false
          this.$emit('success')
          return
        }
        // handle create
        await createBook(data)
        this.$message({
          message: 'Create Success',
          type: 'success'
        })
        this.dialogVisible = false
        this.$emit('success')
      } finally {
        this.formLoading = false
      }
    },
    /** 表单重置 */
    reset() {
      this.formData = {
        id: undefined,
        name: undefined,
        author: undefined,
        publication: undefined,
        isbn: undefined
      }
      this.$refs['formRef']?.resetFields()
    }
  }
}
</script>
