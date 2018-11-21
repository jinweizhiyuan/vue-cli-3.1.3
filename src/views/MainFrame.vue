<template>
    <div>
        <Header></Header>
        <router-view />
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/views/Header.vue'
import Footer from '@/views/Footer.vue'

export default {
    components: {
        Header,
        Footer
    }
}
</script>
