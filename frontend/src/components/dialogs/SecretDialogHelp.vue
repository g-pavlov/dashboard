<!--
SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company and Gardener contributors

SPDX-License-Identifier: Apache-2.0
 -->

<template>
  <v-dialog v-model="visible" max-width="750">
    <v-card>
      <v-card-title class="toolbar-background">
        <v-icon color="toolbar-title" large>mdi-help-circle-outline</v-icon>
        <span class="headline ml-5 toolbar-title--text">{{title}}</span>
      </v-card-title>
      <v-card-text class="secret-dialog pa-4">
        <slot name="help-content"></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click.native.stop="hide">
          Got it
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    visible: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    hide () {
      this.visible = false
    }
  }
}
</script>
