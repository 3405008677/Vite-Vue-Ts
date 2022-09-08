<template>
  <section id="app">
    <Suspense>
      <!--  -->
      <template #default>
        <router-view v-slot="{ Component, route }">
          <transition>
            <div style="height: 100%">
              <keep-alive>
                <component :is="Component" :key="route.path" v-if="route.meta.keepAlive" />
              </keep-alive>
              <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
            </div>
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

<style lang="scss"></style>
