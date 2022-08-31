<template>
  <section>
    <Suspense>
      <!--  -->
      <template #default>
        <router-view v-slot="{ Component, route }">
          <transition>
            <template>
              <keep-alive>
                <component :is="Component" :key="route.path" v-if="route.meta.keepAlive" />
              </keep-alive>
              <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
            </template>
          </transition>
        </router-view>
      </template>
      <!--  -->
      <template #fallback>Loading...</template>
      <!--  -->
    </Suspense>
  </section>
</template>

<script setup></script>

<style></style>
