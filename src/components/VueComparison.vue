<script setup lang="ts">
import { ref } from 'vue';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

interface Props {
  leftTitle: string;
  rightTitle: string;
  leftLabel: string;
  rightLabel: string;
}

const props = defineProps<Props>();

const activeTab = ref<'left' | 'right'>('left');
</script>

<template>
  <div class="vue-comparison">
    <div class="mb-6">
      <div class="flex space-x-2 mb-4">
        <Button
          :variant="activeTab === 'left' ? 'default' : 'outline'"
          @click="activeTab = 'left'"
        >
          {{ props.leftLabel }}
        </Button>
        <Button
          :variant="activeTab === 'right' ? 'default' : 'outline'"
          @click="activeTab = 'right'"
        >
          {{ props.rightLabel }}
        </Button>
      </div>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>
          {{ activeTab === 'left' ? props.leftTitle : props.rightTitle }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="comparison-content">
          <slot v-if="activeTab === 'left'" name="left">
            <div class="text-gray-500 p-4 text-center">
              No content provided for left comparison
            </div>
          </slot>
          <slot v-else name="right">
            <div class="text-gray-500 p-4 text-center">
              No content provided for right comparison
            </div>
          </slot>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.vue-comparison {
  max-width: 100%;
}

.comparison-content {
  min-height: 200px;
}

.comparison-content pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
