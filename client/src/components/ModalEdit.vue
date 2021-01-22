<template>
  <div id="modal-edit" class="modal">
    <div class="modal-content">
      <div class="row">
        <div class="col s12 center black-text">
          <h3>Edit Product</h3>
        </div>
        <form @submit.prevent="create" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="name"
                value=""
                id="create-name"
                type="text"
                class="validate"
              />
              <label for="create-name">Name</label>
            </div>
            <div class="input-field col s12">
              <input
                v-model="image_url"
                value=""
                id="create-image-url"
                type="text"
                class="validate"
              />
              <label for="create-image-url">Image Url</label>
            </div>
            <div class="input-field col s12">
              <input
                v-model="price"
                value=""
                id="create-price"
                type="number"
                class="validate"
              />
              <label for="create-stock">Price</label>
            </div>
            <div class="input-field col s12">
              <input
                v-model="stock"
                value=""
                id="create-stock"
                type="number"
                class="validate"
              />
              <label for="create-price">Stock</label>
            </div>
          </div>
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
          </button>
        </form>
      </div>
      <div class="modal-footer">
        <a href="" class="modal-close waves-effect btn-flat">Close</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
