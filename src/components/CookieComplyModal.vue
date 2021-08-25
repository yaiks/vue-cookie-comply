<template>
  <div class="cookie-comply__modal">
    <div class="cookie-comply__modal-middle">
      <div class="cookie-comply__modal-inner">
        <header class="cookie-comply__modal-header">
          <slot name="modal-header">
            <h3>Sua privacidade</h3>
          </slot>
        </header>

        <main class="cookie-comply__modal-content">
          <slot>
            <p>Quando você visita qualquer site, ele pode armazenar ou recuperar informações em seu navegador, principalmente na forma de cookies. Essas informações podem ser sobre você, suas preferências ou seu dispositivo, e são usadas principalmente para fazer o site funcionar como você espera. As informações geralmente não identificam você diretamente, mas podem lhe dar uma experiência web mais personalizada. Como respeitamos seu direito à privacidade, você pode optar por não permitir alguns tipos de cookies. Clique nos diferentes títulos de categoria para obter mais informações e alterar nossas configurações padrão. No entanto, bloquear alguns tipos de cookies pode afetar sua experiência no site e os serviços que podemos oferecer.</p>
          </slot>
        </main>

        <footer class="cookie-comply__modal-footer">
          <slot name="modal-footer">
            <button @click="onSaveConfiguration">Salvar</button>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieComplyModal',
  methods: {
    onSaveConfiguration() {
      this.$emit('close-modal');
    }
  }
}
</script>

<style>
.cookie-comply__modal {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.3);
}

.cookie-comply__modal-middle {
  display: table-cell;
  vertical-align: middle;
}

.cookie-comply__modal-inner {
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 6px 1px rgb(0 0 0 / 10%), 0 1px 7px 1px rgb(0 0 0 / 6%);
}

@media only screen and (max-width: 380px) {
  .cookie-comply__modal-middle {
    padding: 14px;
  }

  .cookie-comply__modal-inner {
    width: auto;
  }
}

.cookie-comply__modal-header {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}
</style>