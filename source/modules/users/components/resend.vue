<i18n>
en:
  TITLE: Resend temporary password
  CONFIRM:
    MESSAGE: This will resend the temporary password to the user.
    LABEL: Confirm temporary password resend.
  MESSAGES:
    ERROR: "Couldn't resend temporary password."
    SUCCESS: Temporary password resent.
  RESEND: Resend
</i18n>

<template lang="pug">
.ui.blue.left.aligned.segment
  h4.ui.blue.header {{ $t('TITLE') }}
  p {{ $t('CONFIRM.MESSAGE') }}

  .ui.basic.vertical.segment
    label.ui.fluid.labeled.basic.icon.button(
      :disabled="resending"
      role="button"
      )

      input(
        v-model="data.confirm"
        type="checkbox"
        v-show="false"
        )

      i.icon(:class="iconClass")
      | {{ $t('CONFIRM.LABEL') }}

  button.ui.fluid.right.labeled.blue.icon.button(
    :disabled="!data.confirm || resending"
    :class="buttonClass"
    @click="resend"
    type="button"
    )

    i.send.icon
    | {{ $t('RESEND') }}
</template>

<script>
import AWS from 'aws-sdk';

export default {
  name: 'user-resend',

  props: ['params', 'user'],

  computed: {
    iconClass() {
      return {
        'square outline': !this.data.confirm,
        'checkmark box': this.data.confirm
      };
    },

    buttonClass() {
      return {
        loading: this.resending
      };
    }
  },

  data() {
    return {
      resending: false,

      cognito: new AWS.CognitoIdentityServiceProvider(),

      data: {
        confirm: false
      }
    };
  },

  methods: {
    /**
     * Resend callback.
     *
     * @param {Object} err Error object.
     */
    onResend(err) {
      this.resending = false;

      if (err) {
        this.$toastr.error(this.$t('MESSAGES.ERROR'));

        console.error(err);

        return;
      }

      this.$toastr.success(this.$t('MESSAGES.SUCCESS'));
    },

    /**
     * Disables the account.
     */
    resend() {
      this.data.confirm = false;
      this.resending = true;

      const params = Object.assign({}, this.params, {
        Username: this.user.email,
        MessageAction: 'RESEND'
      });

      this.cognito.adminCreateUser(params, this.onResend);
    }
  }
};
</script>
